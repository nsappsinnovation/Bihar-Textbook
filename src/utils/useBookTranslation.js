import { useTranslation } from "react-i18next";

/**
 * Hook that provides helpers to translate class names and book titles
 * based on the current language (en / hi).
 *
 * Usage:
 *   const { translateClassName, translateBookTitle } = useBookTranslation();
 *   translateClassName("Class 5")         → "कक्षा 5"  (hi) | "Class 5"  (en)
 *   translateBookTitle(book.title, book.subject) → "गणित" (hi) | "Ganit" (en)
 */
export function useBookTranslation() {
  const { t, i18n } = useTranslation();

  /**
   * Translate "Class N" → "कक्षा N" using the classWord key.
   * Works for any class name that follows the "Class <number>" pattern,
   * or for custom names stored in the data.
   */
  const translateClassName = (name) => {
    if (!name) return name;
    // Match "Class 1", "Class 12", etc.
    const match = name.match(/^class\s+(\d+)$/i);
    if (match) {
      return `${t("booksPage.classWord")} ${match[1]}`;
    }
    // Fallback: return as-is
    return name;
  };

  /**
   * Translate a book title using the subject slug as the lookup key.
   * Falls back to the raw title if no translation exists.
   *
   * @param {string} title   - Original book title (e.g. "GANIT")
   * @param {string} subject - Subject slug from Book.json (e.g. "ganit")
   */
  const translateBookTitle = (title, subject) => {
    if (!subject) return title;
    const key = `booksPage.subjects.${subject}`;
    const translated = t(key);
    // i18next returns the key itself when a translation is missing
    return translated === key ? title : translated;
  };

  return { translateClassName, translateBookTitle };
}
