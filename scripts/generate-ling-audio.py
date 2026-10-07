"""
Regenerates the Diverse Language (Linguistics) audio in public/audio/{phrases,words,conversation}/{lang}/
with native Microsoft neural voices, reading the text straight from src/linguistics/LingModule.jsx so the
audio always matches what is shown on screen.

    pip install edge-tts
    python scripts/generate-ling-audio.py            # all files
    python scripts/generate-ling-audio.py --only fr  # one language

File names stay the same as before, so no code change is needed when re-running.
"""
import argparse
import asyncio
import re
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "src/linguistics/LingModule.jsx"
AUDIO = ROOT / "public/audio"
LANGS = ["hi", "en", "fr", "es", "de", "it", "ja"]

# (girl, boy) voice per language. The boy speaks the words and phrases and his lines in the conversation;
# the girl speaks her conversation lines.
VOICES = {
    "hi": ("hi-IN-SwaraNeural", "hi-IN-MadhurNeural"),
    "en": ("en-IN-NeerjaNeural", "en-IN-PrabhatNeural"),
    "fr": ("fr-FR-DeniseNeural", "fr-FR-HenriNeural"),
    "es": ("es-ES-XimenaNeural", "es-ES-AlvaroNeural"),
    "de": ("de-DE-KatjaNeural", "de-DE-ConradNeural"),
    "it": ("it-IT-IsabellaNeural", "it-IT-DiegoNeural"),
    "ja": ("ja-JP-NanamiNeural", "ja-JP-KeitaNeural"),
}
# There are no child voices for most of these languages, so the adult voices are pitched up to sound like children
PITCH = {"girl": "+25Hz", "boy": "+20Hz"}
RATE = "-10%"  # a little slower for learners

# A kanji spoken on its own gets its Chinese-style reading (車 -> "sha", 月 -> "getsu"). The app teaches the
# native word given in the romaji, so single-kanji words are spoken from their kana reading instead.
JA_READINGS = {"家": "いえ", "本": "ほん", "木": "き", "月": "つき", "車": "くるま", "火": "ひ",
               "水": "みず", "猫": "ねこ", "犬": "いぬ", "鳥": "とり", "花": "はな"}

PAIR = re.compile(r'\b([a-z]{2}):\s*"((?:[^"\\]|\\.)*)"')


def block(src, name, end):
    start = src.index(f"const {name}")
    return src[start:src.index(end, start)]


def concept_translations(src, name, end):
    """[{lang: text}] for each concept's `translations: {...}`."""
    return [dict(PAIR.findall(m)) for m in re.findall(r"translations:\s*\{([^}]*)\}", block(src, name, end))]


def conversation(src):
    rows = []
    for line in re.findall(r"\{\s*speaker:[^\n]*\}", block(src, "CONVERSATION_FLOW", "const LANG_NAMES")):
        rows.append({
            "speaker": re.search(r"speaker:\s*'(\w+)'", line).group(1),
            "audioFile": re.search(r"audioFile:\s*'([^']+)'", line).group(1),
            **dict(PAIR.findall(line)),
        })
    return rows


def spoken(text, lang=None):
    text = re.sub(r"\s*\([^)]*\)\s*", " ", text).strip()  # Japanese romaji in brackets is for reading, not speaking
    text = JA_READINGS.get(text, text)
    # Short items without a full stop get their last syllable clipped ("Guten Morgen" sounds like "Guten Abend")
    if lang and not re.search(r"[.!?。！？।]$", text):
        text += {"ja": "。", "hi": "।"}.get(lang, ".")
    return text


def file_name(english):
    # Same rule as LingModule.jsx: concept.translations.en.replace(/['?,!.]/g, '').replace(/ /g, '_')
    return re.sub(r"['?,!.]", "", english).replace(" ", "_")


async def synth(text, voice, pitch, out, sem):
    async with sem:
        for attempt in range(4):
            try:
                await edge_tts.Communicate(text, voice, rate=RATE, pitch=pitch).save(str(out))
                return
            except Exception as error:  # network hiccups: retry
                if attempt == 3:
                    raise RuntimeError(f"{out}: {error}") from error
                await asyncio.sleep(2 * (attempt + 1))


async def main(only):
    src = SOURCE.read_text(encoding="utf-8")
    jobs = []
    for folder, name, end in [("words", "WORD_CONCEPTS", "const PHRASE_CONCEPTS"),
                              ("phrases", "PHRASE_CONCEPTS", "const CONVERSATION_FLOW")]:
        for t in concept_translations(src, name, end):
            for lang in only:
                jobs.append((spoken(t.get(lang) or t["en"], lang), VOICES[lang][1], PITCH["boy"], AUDIO / folder / lang / f"{file_name(t['en'])}.mp3"))
    for row in conversation(src):
        for lang in only:
            voice = VOICES[lang][1] if row["speaker"] == "boy" else VOICES[lang][0]
            jobs.append((spoken(row.get(lang) or row["en"], lang), voice, PITCH[row["speaker"]], AUDIO / "conversation" / lang / f"{row['audioFile']}.mp3"))

    sem = asyncio.Semaphore(6)
    for *_, out in jobs:
        out.parent.mkdir(parents=True, exist_ok=True)
    await asyncio.gather(*(synth(text, voice, pitch, out, sem) for text, voice, pitch, out in jobs))
    print(f"wrote {len(jobs)} files")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", nargs="*", default=LANGS, choices=LANGS)
    asyncio.run(main(parser.parse_args().only))
