import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, BookOpen, Clock,
  Brain, Lightbulb, Cpu, Trophy, CheckCircle2,
  Play, GraduationCap, XCircle,
  MessageSquare, Sparkles, Palette, Bot, Volume2, Globe,
  WandSparkles, ChevronRight, Copy, Mic, MicOff, HelpCircle, Award, Gamepad2,
  Eye, Shield, Star, Check, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const toolsCategories = [
  { id: 'All', label: 'All Tools' },
  { id: 'Writing', label: 'Writing' },
  { id: 'Image', label: 'Image' },
  { id: 'Voice', label: 'Voice' },
  { id: 'Learning', label: 'Learning' },
  { id: 'Productivity', label: 'Productivity' }
];

const toolsDataList = [
  { name: 'Sarvam AI', tag: 'Indic Voice & AI', desc: 'India’s foundational AI platform specialized in Indian languages, voice AI, and localized generative models.', icon: <WandSparkles size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Voice', 'Writing', 'Learning'] },
  { name: 'BharatGPT', tag: 'Multilingual AI', desc: 'India’s indigenous conversational AI assistant supporting 14+ Indian languages with voice and text capabilities.', icon: <MessageSquare size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Writing', 'Learning', 'Productivity'] },
  { name: 'ChatGPT', tag: 'Writing Assistant', desc: 'AI chatbot that helps answer questions, write content, and explain ideas.', icon: <MessageSquare size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Writing', 'Learning'] },
  { name: 'Google Gemini', tag: 'Learning Assistant', desc: 'AI assistant by Google that helps with writing, learning, and exploring ideas.', icon: <Sparkles size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Writing', 'Learning', 'Productivity'] },
  { name: 'Krutrim AI', tag: 'Indic LLM Platform', desc: 'India’s AI platform building multilingual foundational models and generative AI for Indian contexts.', icon: <Sparkles size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Writing', 'Learning', 'Productivity'] },
  { name: 'Bhashini AI', tag: 'Indic Translation', desc: 'National AI platform breaking language barriers with speech-to-speech and text translation across Indian languages.', icon: <Globe size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Voice', 'Learning', 'Productivity'] },
  { name: 'Canva AI', tag: 'Image Creator', desc: 'AI design tool that helps create posters, presentations, and images easily.', icon: <Palette size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Image', 'Productivity'] },
  { name: 'Project Indus', tag: 'Hindi & Dialect LLM', desc: 'A foundational Indian language model built specifically for Hindi and Indian regional dialects to democratize AI.', icon: <Brain size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Learning', 'Writing'] },
  { name: 'QuillBot', tag: 'Writing Helper', desc: 'AI writing tool that helps paraphrase, summarize, and improve your writing.', icon: <Bot size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Writing'] },
  { name: 'KissanAI', tag: 'Agri AI Assistant', desc: 'Multilingual AI voice and text assistant providing real-time agricultural advice and farming guidance in regional languages.', icon: <Bot size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Voice', 'Productivity'] },
  { name: 'ElevenLabs', tag: 'Voice AI', desc: 'AI voice tool that converts text into natural-sounding speech.', icon: <Volume2 size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Voice'] },
  { name: 'DeepL', tag: 'Translation', desc: 'AI tool that helps translate text more accurately and naturally.', icon: <Globe size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Writing', 'Productivity'] }
];

const quizQuestions = [
  // Redesigned Concept Questions
  { question: "Unlike regular computer programs that just follow static rules, what makes AI special?", options: ["It runs without electricity", "It can learn from pictures and experiences", "It is always a physical metal robot", "It only works on smart TV"], correct: 1 },
  { question: "Which AI superpower helps a phone unlock when it looks at your face?", options: ["Natural Language Processing", "Generative Art", "Computer Vision (AI Eyes)", "Machine Learning"], correct: 2 },
  { question: "When Siri or Google Assistant understands what you say, what technology are they using?", options: ["Computer Vision", "Natural Language Processing (NLP)", "Data Tables", "Generative Art"], correct: 1 },
  { question: "Which AI superpower lets you create a brand-new painting of a blue cat simply by typing a description?", options: ["Machine Learning", "Generative AI (AI Artist)", "Computer Vision", "NLP Voice Assistant"], correct: 1 },
  { question: "What is the very first step in teaching or training a new AI helper?", options: ["Let it guess without any rules", "Showing it millions of photos/examples (Data Training)", "Giving it a metal body", "Uninstalling its software"], correct: 1 },
  { question: "What is a Smart Rule when chatting with a new AI online?", options: ["Tell it your password and home address", "Never share private secrets or real passwords", "Believe everything it says without checking", "Use it to do all your homework for you"], correct: 1 },
  { question: "What should you do if an AI helper gives you a silly or incorrect fact?", options: ["Trust it anyway", "Double-check the fact with a textbook, teacher, or parent", "Get angry and break the computer", "Share it with all your friends as 100% true"], correct: 1 },

  // Prompt Academy Questions
  { question: "In Prompt Academy, what does giving the AI a 'Magic Mask' (System Role) do?", options: ["It hides the computer screen", "It commands the AI to act as a specific character or helper", "It turns off the AI program", "It prints a superhero mask"], correct: 1 },
  { question: "If you want the AI artist to draw a cozy house, how can you be a 'Detail Detective'?", options: ["Just type 'house'", "Describe details like materials, colors, surroundings, and weather", "Ask your parents to draw it", "Wait for the AI to guess"], correct: 1 },
  { question: "Which of these is a 'Super Prompt' to write a story?", options: ["'write a story'", "'make a story about a forest'", "'Act as a medieval wizard storyteller. Write an enchanting story about a hidden fairy fountain, using magical metaphors.'", "'story'"], correct: 2 },

  // General AI and Tools Questions
  { question: "You want to write a superhero story — which AI tool will help you?", options: ["Calculator app", "AI Story Writer", "Paint app", "Camera"], correct: 1 },
  { question: "How does a self-driving car recognize traffic lights?", options: ["The driver tells it", "Computer Vision (AI eyes)", "Using GPS", "By honking"], correct: 1 },
  { question: "What is a 'neural network' in Deep Learning?", options: ["Internet network", "Tiny thinking bulbs inside a computer", "WiFi signal", "Electric wire"], correct: 1 },
  { question: "What does a Chatbot do?", options: ["Takes photos", "Answers your questions", "Downloads games", "Makes videos"], correct: 1 },
  { question: "If you want to make a graph of your class marks, which AI topic will help?", options: ["Create with AI", "Chat with AI", "Fun with Data", "Meet AI Robots"], correct: 2 }
];
const optionLabels = ['A', 'B', 'C', 'D'];



const lessonsData = [
  {
    id: 1,
    title: "Image Creator",
    icon: "🎨",
    concept: "Image Generation",
    learn: {
      title: "Image Creator (Be an Art Director)",
      subtitle: "Describe colors, style, and lighting for amazing pictures!",
      description: "When using AI image generators, a simple prompt like 'a turtle' will give you a plain, boring photograph. To make a masterpiece, you must act like an Art Director! Tell the AI the style (like 3D Pixar cartoon, watercolor, or neon chalk), the colors, the lighting (like sunset glow), and the details.",
      tips: [
        "Specify the Art Style: 'Pixar 3D animation', '8-bit pixel art', or 'watercolor'.",
        "Describe the Lighting: 'Warm sunset golden hour' or 'bright glowing neon'.",
        "Add fine details: Describe the character's clothing, expressions, and surroundings."
      ]
    },
    quest: {
      characterName: "AI Art Assistant",
      characterImage: "",
      characterMsg: "I want to paint a cosmic sea turtle, but in a cool neon chalk style on a dark blackboard. Help me choose the right style and lighting details to generate this image!",
      targetType: "Image Creator",
      boringPrompt: "a turtle in space",
      boringOutputImage: "/images/ai/flat_turtle.png",
      superOutputImage: "/images/ai/neon_turtle.png",
      badge: "Master Artist",
      ingredients: [
        {
          id: "l1_style",
          label: "Medium Power-up",
          text: "A glowing neon chalk illustration drawn on a dark slate blackboard,",
          type: "role",
          desc: "Sets the specific art medium."
        },
        {
          id: "l1_subject",
          label: "Subject Power-up",
          text: "showing a magical sea turtle swimming through the cosmos,",
          type: "detail",
          desc: "Describes the turtle subject."
        },
        {
          id: "l1_details",
          label: "Detail Power-up",
          text: "with its shell made of shimmering violet star constellations,",
          type: "background",
          desc: "Adds galactic details to the shell."
        },
        {
          id: "l1_finish",
          label: "Texture Power-up",
          text: "creating bright glowing edges and dusty chalk textures.",
          type: "style",
          desc: "Adds glowing borders and textures."
        }
      ]
    },
    sandbox: {
      category: "image",
      title: "Art Director Sandbox",
      inputs: [
        {
          key: "subject",
          label: "Subject Description",
          type: "text",
          placeholder: "e.g., a happy flying cat"
        },
        {
          key: "style",
          label: "Art Style",
          type: "select",
          options: [
            "Pixar 3D Animation",
            "8-Bit Retro Pixel Art",
            "Delicate Watercolor Painting",
            "Glow-in-the-dark Neon Cyberpunk"
          ]
        }
      ],
      template: t => `Create a high-quality drawing of ${t.subject || "a friendly baby dragon"} in a ${t.style || "Pixar 3D Animation"} style.`
    },
    battle: {
      scenario: "You want an image of a puppy playing in the rain, but styled like an old-school video game. Which prompt should you use?",
      options: [
        {
          text: "draw a puppy in a rain game",
          isCorrect: false,
          feedback: "Too simple! The AI might make a flat cartoon drawing instead of actual retro pixel grids."
        },
        {
          text: "A cute golden retriever puppy splashing in a puddle under the rain. Retro 8-bit pixel art style, blocky pixel grids, and game boy color palette.",
          isCorrect: true,
          feedback: "Spot on! You specified the pixel style, blocky grids, and color palette."
        },
        {
          text: "cute puppy rain video game graphics",
          isCorrect: false,
          feedback: "A bit short. The AI generator won't know if you want 3D, pixel art, or realistic drawing."
        },
        {
          text: "puppy in rain vector illustration logo",
          isCorrect: false,
          feedback: "Vector illustration logo is a clean flat graphic, not an old-school video game pixel art style!"
        }
      ],
      explanation: "Specific style keywords (like '8-bit pixel art' and 'blocky grids') guide the AI image generator to produce the exact artistic style you want."
    }
  },
  {
    id: 2,
    title: "Story & Essay Builder",
    icon: "✍️",
    concept: "Essay Writing",
    learn: {
      title: "Story & Essay Builder (Structure your Writing)",
      subtitle: "Tell the AI exactly how to organize your paragraphs!",
      description: "A bad essay prompt like 'write an essay about lions' will give you a giant, boring block of text that is hard to read. A good prompt tells the AI who to act as (like a creative writer), who the reader is (like school kids), how many paragraphs to write, and to include a title and subheadings!",
      tips: [
        "Tell the AI the layout: 'Include a title, introduction, body, and conclusion.'",
        "Set a length limit: 'Write exactly 3 short paragraphs.'",
        "Define the tone: 'Write in an exciting and informative style.'"
      ]
    },
    quest: {
      characterName: "AI Writing Assistant",
      characterImage: "",
      characterMsg: "I want to write a short essay about lions for my class. My boring prompt 'write an essay about lions' is just too long and messy. Can you help me prompt the AI to write a structured, 3-paragraph essay with a catchy title?",
      targetType: "Script Generator",
      boringPrompt: "write an essay about lions",
      boringOutputText: "Lions are big cats. They live in Africa. They are called the king of the jungle. They hunt in groups called prides. They eat meat. They sleep a lot.",
      superOutputText: "The Majestic Kings of the Savannah\n\nIntroduction: Lions are powerful big cats that live in the grassy savannahs of Africa. They are famous for their golden fur, loud roars, and strong bodies, earning them the title 'King of the Jungle'.\n\nFamily Life: Unlike other cats, lions live in large family groups called prides. The female lionesses do most of the hunting and work together to protect their cute cubs.\n\nConclusion: Lions are essential protectors of their environment. By keeping the animal population in balance, they help keep the savannah healthy and beautiful for everyone.",
      badge: "Master Essayist",
      ingredients: [
        {
          id: "l2_role",
          label: "Role Power-up",
          text: "Act as a creative children's encyclopedia writer,",
          type: "role",
          desc: "Tells the AI what mask to wear."
        },
        {
          id: "l2_subject",
          label: "Subject Power-up",
          text: "write an informative article about the life of African lions,",
          type: "detail",
          desc: "Describes the main topic."
        },
        {
          id: "l2_structure",
          label: "Structure Power-up",
          text: "structured with a title and exactly three paragraphs (Introduction, Body, Conclusion),",
          type: "background",
          desc: "Sets the format rules."
        },
        {
          id: "l2_tone",
          label: "Tone Power-up",
          text: "using an engaging and educational tone suitable for a school project.",
          type: "style",
          desc: "Specifies the writing tone."
        }
      ]
    },
    sandbox: {
      category: "text",
      title: "Essay Organizer Sandbox",
      inputs: [
        {
          key: "subject",
          label: "Subject Description",
          type: "text",
          placeholder: "e.g., why honeybees are important"
        },
        {
          key: "paragraphs",
          label: "Paragraph Count",
          type: "select",
          options: [
            "exactly 2 short paragraphs",
            "exactly 3 short paragraphs",
            "exactly 4 short paragraphs"
          ]
        },
        {
          key: "tone",
          label: "Writing Tone",
          type: "select",
          options: [
            "exciting and energetic",
            "factual and serious",
            "simple and easy for kids"
          ]
        }
      ],
      template: t => `Act as a creative educational writer. Write a short article about ${t.subject || "saving trees"}. Structure: Include a title and write ${t.paragraphs || "exactly 3 short paragraphs"}. Tone: Use a ${t.tone || "simple and easy for kids"} style.`
    },
    battle: {
      scenario: "You need to write a descriptive essay about your school. Which prompt gets you a well-structured essay?",
      options: [
        {
          text: "write a story about school",
          isCorrect: false,
          feedback: "Too vague! The AI will write a random story rather than a structured essay about your specific school."
        },
        {
          text: "Act as a school guide. Write a 3-paragraph descriptive essay about my school. Paragraph 1: The beautiful building. Paragraph 2: The friendly teachers and students. Paragraph 3: Why I love it. Include a title.",
          isCorrect: true,
          feedback: "Perfect! You specified the role, the number of paragraphs, and what each paragraph should cover."
        },
        {
          text: "make an essay about school with 5000 words",
          isCorrect: false,
          feedback: "Too long! That will generate a huge wall of text that is hard to read."
        },
        {
          text: "school essay format",
          isCorrect: false,
          feedback: "This just asks for a format template, not a completed structured essay."
        }
      ],
      explanation: "Defining what goes into each paragraph ensures the AI doesn't ramble and gives you exactly what you need."
    }
  },
  {
    id: 3,
    title: "Poem & Story Explainer",
    icon: "📖",
    concept: "Literature Simplifier",
    learn: {
      title: "Poem & Story Explainer (Bilingual)",
      subtitle: "Simplify and translate poems or stories in English & Hindi!",
      description: "Reading old or classic poems and stories can be difficult due to complex words, metaphors, and cultural contexts. A lazy prompt like 'what does this poem mean?' might reply with even more confusing explanations. A great prompt tells the AI to act as a bilingual literature teacher, break down the core message, and explain it in simple, child-friendly terms in BOTH English and Hindi!",
      tips: [
        "Set a clear role: 'Act as a friendly bilingual literature teacher.'",
        "Specify the source: 'Explain the central theme and hidden meaning of the poem [Name].'",
        "Request bilingual output: 'Provide the summary in both English and Hindi sections using simple words.'"
      ]
    },
    quest: {
      characterName: "AI Literature Assistant",
      characterImage: "",
      characterMsg: "I am trying to understand the famous poem 'Where the Mind is Without Fear' by Rabindranath Tagore. But the language is too deep for me! Can you help me build a Super Prompt that explains it in simple terms in both English and Hindi?",
      targetType: "Script Generator",
      boringPrompt: "explain Where the mind is without fear",
      boringOutputText: "Where the Mind is Without Fear is a patriotic poem written by Rabindranath Tagore expressing his vision of a free and awakened India.",
      superOutputText: "Where the Mind is Without Fear Meaning / कविता का अर्थ\n- Central Theme / मुख्य विषय: The poem expresses Rabindranath Tagore's dream of a free nation where people live with dignity, self-respect, and truth without any fear.\n- English Explanation: Tagore prays for a country where knowledge is free for all children, where society is not divided by caste or religion, and everyone speaks the truth.\n- Hindi Explanation: कवि रबींद्रनाथ टैगोर एक ऐसे देश की कामना करते हैं जहाँ सब बिना किसी डर के गर्व से जिएं, ज्ञान सबके लिए मुफ्त हो, और लोग आपस में न लड़ें।\n- Core Lesson / सीख: True freedom means having a fearless mind, holding your head high with self-respect, and always walking on the path of truth.",
      badge: "Literature Scholar",
      ingredients: [
        {
          id: "l3_role",
          label: "Role Power-up",
          text: "Act as a friendly bilingual literature teacher,",
          type: "role",
          desc: "Tells the AI to play a bilingual teacher."
        },
        {
          id: "l3_subject",
          label: "Subject Power-up",
          text: "explain the meaning of the poem 'Where the mind is without fear',",
          type: "detail",
          desc: "Defines the poem to explain."
        },
        {
          id: "l3_constraint",
          label: "Bilingual Power-up",
          text: "breaking it down into simple terms in both English and Hindi,",
          type: "background",
          desc: "Asks for a simple bilingual breakdown."
        },
        {
          id: "l3_format",
          label: "Format Power-up",
          text: "formatting the output with bullet points for Theme, English meaning, and Hindi meaning.",
          type: "style",
          desc: "Specifies a clean bulleted layout."
        }
      ]
    },
    sandbox: {
      category: "text",
      title: "Poem & Story Simplifier Sandbox",
      inputs: [
        {
          key: "subject",
          label: "Poem/Story Title",
          type: "text",
          placeholder: "e.g., Where the Mind is Without Fear"
        },
        {
          key: "language",
          label: "Languages",
          type: "select",
          options: [
            "both English and Hindi",
            "only English (simplified)",
            "only Hindi (सरल हिंदी)"
          ]
        },
        {
          key: "format",
          label: "Output Format",
          type: "select",
          options: [
            "bulleted summary",
            "line-by-line breakdown",
            "short story summary"
          ]
        }
      ],
      template: t => `Act as a friendly bilingual literature teacher. Explain the meaning and theme of the poem/story "${t.subject || "Where the Mind is Without Fear"}" in ${t.language || "both English and Hindi"}. Format the output as a ${t.format || "bulleted summary"} in simple, child-friendly words.`
    },
    battle: {
      scenario: "You want to understand the moral of the classic story 'The Boy Who Cried Wolf' in simple terms. Which prompt will get you a clear explanation in both English and Hindi?",
      options: [
        {
          text: "what is the boy who cried wolf story about",
          isCorrect: false,
          feedback: "Too simple! The AI will write a long summary of the story in English, but it won't give a bilingual explanation of the moral."
        },
        {
          text: "Act as a friendly bilingual literature teacher. Explain the core moral of 'The Boy Who Cried Wolf' in simple, easy-to-understand terms. Provide the response in two clear bullet points: first in English, and second in Hindi (हिंदी).",
          isCorrect: true,
          feedback: "Fantastic! This prompt specifies the role, the story, simple language, and the bilingual bulleted output."
        },
        {
          text: "translate the story of the wolf boy into hindi",
          isCorrect: false,
          feedback: "This just translates the whole story into Hindi. It does not explain the moral in simple terms in both languages."
        },
        {
          text: "moral of the boy who cried wolf",
          isCorrect: false,
          feedback: "This asks for the moral, but does not specify simple language or the bilingual (English and Hindi) requirement."
        }
      ],
      explanation: "Using a role like 'bilingual literature teacher' and asking for a structured output ensures you get the moral explained simply in both languages!"
    }
  },
  {
    id: 4,
    title: "Math Solver",
    icon: "📐",
    concept: "Math Questioning",
    learn: {
      title: "Math Solver (Solve Word Problems)",
      subtitle: "Make AI think step-by-step to solve math correctly!",
      description: "A bad math prompt just asks for the answer, which can make the AI guess or skip steps. A good math prompt tells the AI to act as a math teacher, write down each step of the calculation, and explain the rules like PEMDAS. PEMDAS stands for: P (Parentheses), E (Exponents), M (Multiplication), D (Division), A (Addition), and S (Subtraction) — the magic order of operations in math!",
      tips: [
        "Tell the AI: 'Explain each step of the calculation.'",
        "Use the magic words: 'Let's think step-by-step.'",
        "Specify the rules: 'Use PEMDAS (Parentheses, Exponents, Multiplication, Division, Addition, Subtraction) order of operations.'"
      ]
    },
    quest: {
      characterName: "AI Mathematics Assistant",
      characterImage: "",
      characterMsg: "I need to solve a tricky math puzzle: 'What is 4 + 3 x 5?' If I write a simple prompt like 'solve 4+3x5', the AI might calculate it left-to-right (4+3=7, 7x5=35) instead of using PEMDAS (3x5=15, 4+15=19). Help me craft a Super Prompt with the math rules!",
      targetType: "Script Generator",
      boringPrompt: "solve 4+3x5",
      boringOutputText: "The answer is 35.",
      superOutputText: "Let's solve the math problem 4 + 3 x 5 step-by-step:\n1. Rule (PEMDAS): Multiplication must be performed before addition.\n2. Step 1: Multiply 3 by 5. (3 x 5 = 15).\n3. Step 2: Add 4 to the result of Step 1. (4 + 15 = 19).\nConclusion: The final correct answer is 19.",
      badge: "Math Champion",
      ingredients: [
        {
          id: "l4_role",
          label: "Role Power-up",
          text: "Act as a patient math tutor,",
          type: "role",
          desc: "Tells AI to play a patient math tutor."
        },
        {
          id: "l4_subject",
          label: "Question Power-up",
          text: "solve the expression 4 + 3 x 5,",
          type: "detail",
          desc: "Provides the expression to solve."
        },
        {
          id: "l4_logic",
          label: "Logic Power-up",
          text: "thinking step-by-step using PEMDAS order of operations,",
          type: "background",
          desc: "Instructs AI to think step-by-step using PEMDAS (Parentheses, Exponents, Mult/Div, Add/Sub)."
        },
        {
          id: "l4_conclusion",
          label: "Answer Power-up",
          text: "and highlighting the final answer in a clear conclusion line.",
          type: "style",
          desc: "Specifies formatting of the final answer."
        }
      ]
    },
    sandbox: {
      category: "text",
      title: "Math Prompt Builder",
      inputs: [
        {
          key: "subject",
          label: "Subject Description",
          type: "text",
          placeholder: "e.g., 10 - 2 x 4 + 1"
        },
        {
          key: "rule",
          label: "Select Rule",
          type: "select",
          options: [
            "PEMDAS rules",
            "Step-by-step steps",
            "Explain the logic"
          ]
        }
      ],
      template: t => `Act as a patient math tutor, solve the problem ${t.subject || "5 + 2 x 3"}. Let's think step-by-step and explain each calculation using ${t.rule || "PEMDAS rules"}.`
    },
    battle: {
      scenario: "You want the AI to help you solve a word problem: 'Sam has 12 apples. He gives half to Roy, and gets 3 back.' Which prompt ensures a correct explanation?",
      options: [
        {
          text: "what is 12 divided by 2 plus 3",
          isCorrect: false,
          feedback: "Too simple! The AI might give you just a number without explaining how it solved it."
        },
        {
          text: "Act as a friendly math teacher. Solve the word problem about Sam's apples. Think step-by-step, showing the subtraction and addition steps separately, and explain the final answer.",
          isCorrect: true,
          feedback: "Excellent! The AI will show each step clearly, helping you understand the math behind it."
        },
        {
          text: "explain this math question: Sam had 12 apples, gave half away, and got 3",
          isCorrect: false,
          feedback: "A bit too vague. The AI might write a long story instead of showing the step-by-step math."
        },
        {
          text: "write a python code to calculate 12/2 + 3",
          isCorrect: false,
          feedback: "This just writes computer code, it doesn't explain the math problem step-by-step in plain English!"
        }
      ],
      explanation: "Asking the AI to show its steps helps it keep track of numbers and gives you a clear explanation to learn from."
    }
  },
  {
    id: 5,
    title: "Science Explorer",
    icon: "🔬",
    concept: "Science Related",
    learn: {
      title: "Science Explorer (Use Metaphors)",
      subtitle: "Ask the AI for simple metaphors to understand hard topics!",
      description: "Science has many big words and tricky ideas, like photosynthesis or gravity. A bad prompt like 'what is photosynthesis' gives you a hard, college-level textbook page. A good prompt tells the AI to use a simple metaphor (like comparing a leaf to a solar-powered food factory) so it is super easy and fun to learn!",
      tips: [
        "Ask for metaphors: 'Explain this using a simple metaphor (like a factory or a train).'",
        "Target the age: 'Explain it to a 10-year-old child.'",
        "Keep it brief: 'Keep the explanation under 100 words.'"
      ]
    },
    quest: {
      characterName: "AI Science Assistant",
      characterImage: "",
      characterMsg: "I want to explain photosynthesis to my little sister. But the textbook answer is too complicated! Can we prompt the AI to explain it using a fun metaphor, like a kitchen or a solar panel, in simple words?",
      targetType: "Script Generator",
      boringPrompt: "explain photosynthesis",
      boringOutputText: "Photosynthesis is the chemical process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water.",
      superOutputText: "The Solar-Powered Leaf Kitchen!\n\nImagine every green leaf on a plant is a tiny, solar-powered kitchen!\n1. The Ingredients: The plant breathes in Carbon Dioxide from the air and sips Water from the soil.\n2. The Chef: Sunlight acts as the magical chef, cooking the water and air together.\n3. The Food: The chef makes delicious Sugar (plant food) to help the plant grow strong.\n4. The Gift: As a thank you, the kitchen releases fresh Oxygen into the air for us to breathe!",
      badge: "Junior Scientist",
      ingredients: [
        {
          id: "l5_role",
          label: "Role Power-up",
          text: "Act as a friendly science teacher,",
          type: "role",
          desc: "Tells the AI what role to play."
        },
        {
          id: "l5_subject",
          label: "Subject Power-up",
          text: "explain the scientific process of photosynthesis,",
          type: "detail",
          desc: "Defines the science topic."
        },
        {
          id: "l5_metaphor",
          label: "Metaphor Power-up",
          text: "using the metaphor of a 'solar-powered kitchen' cooking food,",
          type: "background",
          desc: "Adds the comparison metaphor."
        },
        {
          id: "l5_limit",
          label: "Limit Power-up",
          text: "and organizing it in 4 simple bullet points under 120 words.",
          type: "style",
          desc: "Specifies formatting and length constraints."
        }
      ]
    },
    sandbox: {
      category: "text",
      title: "Science Explainer Sandbox",
      inputs: [
        {
          key: "subject",
          label: "Science Subject",
          type: "text",
          placeholder: "e.g., how gravity works"
        },
        {
          key: "metaphor",
          label: "Metaphor Idea",
          type: "text",
          placeholder: "e.g., an invisible rubber band"
        },
        {
          key: "length",
          label: "Output Length",
          type: "select",
          options: [
            "under 50 words",
            "under 100 words",
            "under 150 words"
          ]
        }
      ],
      template: t => `Act as a science tutor. Explain ${t.subject || "how clouds make rain"} using the metaphor of "${t.metaphor || "a wet sponge being squeezed"}". Rule: Keep it ${t.length || "under 100 words"} and simple for children.`
    },
    battle: {
      scenario: "You want to understand what black holes are. Which prompt will give you the easiest explanation to understand?",
      options: [
        {
          text: "what is a black hole in space",
          isCorrect: false,
          feedback: "The AI will give you complex astrophysics formulas and terms like 'singularity' and 'event horizon'."
        },
        {
          text: "Act as a space guide. Explain what a black hole is to a 5th grader. Use a simple metaphor (like a cosmic vacuum cleaner) and keep it under 80 words.",
          isCorrect: true,
          feedback: "Fantastic! This uses a simple metaphor, targets the right age, and limits the word count for a clear explanation."
        },
        {
          text: "give me the Event Horizon research paper",
          isCorrect: false,
          feedback: "This will give you a dense, university-level scientific paper, not an easy explanation."
        },
        {
          text: "draw a picture of a black hole",
          isCorrect: false,
          feedback: "A text-based AI chatbot cannot draw actual pictures directly; it can only write text explanations."
        }
      ],
      explanation: "Metaphors connect new, difficult scientific ideas to simple things you already know, making them easy to understand."
    }
  },
  {
    id: 6,
    title: "GK Tutor",
    icon: "🧠",
    concept: "General Knowledge",
    learn: {
      title: "GK Tutor (Concept Breakdown)",
      subtitle: "Turn the AI into an interactive quizmaster!",
      description: "Learning general knowledge (like geography, history, or music) can feel dry if you just read a long Wikipedia article. A good prompt turns the AI into an interactive tutor that breaks down history or geography into easy bullet points, highlights important words in bold, and finishes with a fun quiz question!",
      tips: [
        "Ask for interactive questions: 'End your answer with a multiple-choice question to test me!'",
        "Highlight key terms: 'Use bold text for important dates, names, and places.'",
        "Simplify: 'Explain the history of [topic] as a story for kids.'"
      ]
    },
    quest: {
      characterName: "AI Knowledge Assistant",
      characterImage: "",
      characterMsg: "I want to learn about the history of the Taj Mahal for a school quiz. But the online articles are too long and boring! Can we prompt the AI to act as a history tutor, give me 3 cool facts with bold words, and test me with a question at the end?",
      targetType: "Script Generator",
      boringPrompt: "when was the taj mahal built and why",
      boringOutputText: "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in Agra. It was commissioned in 1632 by Shah Jahan to house the tomb of Mumtaz Mahal.",
      superOutputText: "History Lesson: The Taj Mahal 🕌\nWelcome! Let's explore this world wonder together:\n- The Emperor's Promise: The Taj Mahal was built in Agra, India, starting in the year **1632** by the Mughal Emperor **Shah Jahan**.\n- A Monument of Love: He built it to honor his beloved wife, **Mumtaz Mahal**, as a beautiful resting place.\n- The White Marble: Over **20,000 workers** and artists spent **22 years** carving the white marble blocks, which glow pink in the morning and golden under the moon!",
      badge: "GK Champion",
      ingredients: [
        {
          id: "l6_role",
          label: "Role Power-up",
          text: "Act as an interactive history tutor for kids,",
          type: "role",
          desc: "Tells the AI to act as a tutor."
        },
        {
          id: "l6_subject",
          label: "Subject Power-up",
          text: "explain the creation and purpose of the Taj Mahal in Agra,",
          type: "detail",
          desc: "Defines the GK subject."
        },
        {
          id: "l6_style",
          label: "Style Power-up",
          text: "highlighting key names and dates in **bold text**,",
          type: "background",
          desc: "Specifies typographic highlights."
        },
        {
          id: "l6_format",
          label: "Format Power-up",
          text: "and ending with a fun, 3-option multiple choice question to test my knowledge.",
          type: "style",
          desc: "Adds the interactive quiz challenge."
        }
      ]
    },
    sandbox: {
      category: "text",
      title: "GK Tutor Sandbox",
      inputs: [
        {
          key: "subject",
          label: "GK Topic",
          type: "text",
          placeholder: "e.g., how Mount Everest was formed"
        },
        {
          key: "style",
          label: "Explanation Style",
          type: "select",
          options: [
            "highlighting key terms in bold",
            "writing it as a fun story",
            "using bullet points and emojis"
          ]
        },
        {
          key: "quiz",
          label: "Quiz Option",
          type: "select",
          options: [
            "include a multiple choice question",
            "include a true or false question",
            "no quiz, just the facts"
          ]
        }
      ],
      template: t => `Act as an interactive tutor for kids. Explain ${t.subject || "the history of the wheel"} by ${t.style || "using bullet points and emojis"}. Rule: Please ${t.quiz || "include a multiple choice question"} at the end.`
    },
    battle: {
      scenario: "You want to learn about the solar system and test yourself. Which prompt works best?",
      options: [
        {
          text: "explain the solar system",
          isCorrect: false,
          feedback: "This will output a large wall of text without any interactive test questions."
        },
        {
          text: "Act as a space tutor. Break down the solar system's planets into 4 bullet points with bold names. End with a 3-option multiple choice quiz question about the planets.",
          isCorrect: true,
          feedback: "Splendid! This prompt gives structure, visual highlights, and an interactive quiz to test what you learned."
        },
        {
          text: "write a story about space planets",
          isCorrect: false,
          feedback: "A story is nice, but it doesn't give you structured facts or quiz questions to test your knowledge."
        },
        {
          text: "give me the exact distance to Jupiter",
          isCorrect: false,
          feedback: "This just asks for a single fact, not an interactive general knowledge lesson with a quiz."
        }
      ],
      explanation: "Adding a quiz question at the end of a tutor prompt makes learning active, helping you remember the facts much better!"
    }
  },
  {
    id: 7,
    title: "Science Experiments",
    icon: "🧪",
    concept: "Science Experiments",
    learn: {
      title: "Science Lab Assistant (Experiment Planner)",
      subtitle: "Prompt the AI to design safe, step-by-step science experiments!",
      description: "When you want to perform a science experiment in physics, chemistry, or biology, a simple prompt like 'how does celery experiment work' or 'vinegar and baking soda' only gives a short explanation. To get a professional, repeatable result, you must ask like a Scientist! Specify the materials available, request detailed step-by-step steps, ask for safety precautions, and include an observation chart to record the results.",
      tips: [
        "Specify the resources: Tell the AI if you are using 'household kitchen ingredients' or 'school laboratory tools'.",
        "Request safety tips: Always prompt for safety precautions (like adult help or protective eyewear).",
        "Add observation guides: Request a time-based chart or observation questions to record your findings."
      ]
    },
    quest: {
      characterName: "AI Science Assistant",
      characterImage: "",
      characterMsg: "I want to perform a biology experiment to show plant transpiration using celery, food coloring, and water. But my boring prompt 'how celery experiment works' gives a vague explanation. Let's build a Super Prompt that guides me step-by-step with materials, safety, and an observation table!",
      targetType: "Script Generator",
      boringPrompt: "celery transpiration experiment",
      boringOutputText: "Celery transpiration is shown by placing a celery stalk in water colored with food dye. Over time, the capillary action draws the colored water up into the leaves, illustrating water movement in plants.",
      superOutputText: "Celery Transpiration Science Lab Guide 🌿\n- Objective: To visually demonstrate how plants transport water from roots to leaves using capillary action and transpiration.\n- Materials Needed:\n  1. Fresh celery stalks with leaves intact\n  2. Glass jar or cup filled with water\n  3. Blue or red food coloring (10-15 drops)\n  4. Knife/scissors (for cutting stem base)\n- Safety Precautions: Use caution when cutting the celery stalk. Ask an adult for help if using sharp blades.\n- Step-by-Step Procedure:\n  1. Cut about 1 inch off the bottom of the celery stalk at a 45-degree angle under water.\n  2. Add 10-15 drops of food coloring to your water jar and stir.\n  3. Place the celery stalk cut-side down into the colored water.\n  4. Leave it undisturbed and check it at 2 hours, 6 hours, and 24 hours.\n- Observation Guide:\n  - 2 Hours: Look for small colored dots on the celery bottom showing xylem tubes filled with dye.\n  - 24 Hours: Watch the leaves change color as transpiration pulls water out of the leaves.\n- Scientific Explanation: The water molecules stick to the walls of the tiny tubes inside the celery (adhesion) and stick to each other (cohesion), pulling the colored water upwards. When water evaporates from the leaves (transpiration), it acts like a straw pulling more water up from the jar!",
      badge: "Lab Specialist",
      ingredients: [
        {
          id: "l7_role",
          label: "Role Power-up",
          text: "Act as a professional science lab instructor,",
          type: "role",
          desc: "Tells the AI to act as a lab teacher."
        },
        {
          id: "l7_subject",
          label: "Subject Power-up",
          text: "design a step-by-step biology experiment to show celery transpiration,",
          type: "detail",
          desc: "Defines the experiment subject."
        },
        {
          id: "l7_materials",
          label: "Equipment Power-up",
          text: "using home-friendly materials and listing safety precautions,",
          type: "background",
          desc: "Defines materials & safety guidelines."
        },
        {
          id: "l7_format",
          label: "Format Power-up",
          text: "including an observation timetable and the underlying scientific explanation.",
          type: "style",
          desc: "Requests structured observation and theory."
        }
      ]
    },
    sandbox: {
      category: "text",
      title: "Lab Planner Sandbox",
      inputs: [
        {
          key: "subject",
          label: "Experiment Subject (Physics/Chemistry/Biology)",
          type: "text",
          placeholder: "e.g., chemical reaction of vinegar and baking soda"
        },
        {
          key: "materials",
          label: "Equipment Level",
          type: "select",
          options: [
            "household kitchen materials",
            "school science lab apparatus",
            "professional high-tech lab equipment"
          ]
        },
        {
          key: "structure",
          label: "Output Content",
          type: "select",
          options: [
            "step-by-step steps and safety instructions",
            "materials list, steps, and observation questions",
            "full lab report outline with scientific formula"
          ]
        }
      ],
      template: t => `Act as a professional science lab instructor. Design an experiment regarding ${t.subject || "water boiling point changes"}. Assume we are using ${t.materials || "household kitchen materials"}. Output a detailed guide including: ${t.structure || "materials list, steps, and observation questions"}.`
    },
    battle: {
      scenario: "You want to perform a physics experiment at home to study magnetic force fields using simple bar magnets and paperclips. Which prompt gives the most structured and educational result?",
      options: [
        {
          text: "how do magnets attract paperclips",
          isCorrect: false,
          feedback: "This just gives a short textual description of magnetism, not a structured experiment you can perform."
        },
        {
          text: "Act as a science lab instructor. Design a step-by-step physics experiment on magnetic force fields using home-friendly magnets and paperclips. Include a list of materials, safety guidelines, experimental steps, and observation questions.",
          isCorrect: true,
          feedback: "Perfect! This prompt structures the experiment so it has clear, actionable instructions, materials, safety, and active observations."
        },
        {
          text: "tell me about magnetism",
          isCorrect: false,
          feedback: "This is a generic query that results in a long article, not an interactive lab experiment planner."
        },
        {
          text: "can you solve a magnetism physics problem",
          isCorrect: false,
          feedback: "This is for solving math equations, not planning a physical experiment."
        }
      ],
      explanation: "Specifying 'materials', 'safety guidelines', and 'observation questions' ensures the AI generates a complete, safe, and structured laboratory protocol that you can easily follow."
    }
  }
];


const BoringVsSuperPromptImage = ({ imageUrl, altText, isAwesome }) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={altText}
        className={`h-48 sm:h-56 w-auto object-contain rounded-xl shadow-md ${isAwesome ? "" : "filter grayscale-[30%]"}`}
      />
    );
  }
  return (
    <div className={`w-full h-full min-h-[160px] rounded-xl flex flex-col items-center justify-center p-6 text-center transition-all ${isAwesome
      ? 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-800 text-white shadow-lg'
      : 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 shadow-inner'
      }`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 shadow-md ${isAwesome ? 'bg-white/20 animate-pulse' : 'bg-slate-100/60'
        }`}>
        {isAwesome ? "" : ""}
      </div>
      <h4 className="text-xs font-black uppercase tracking-wider mb-1">
        {isAwesome ? "Super AI Render" : "Boring Draft"}
      </h4>
      <p className="text-[10px] opacity-90 font-medium max-w-[200px] leading-relaxed">
        {isAwesome
          ? "A highly detailed, color-rich, stylized masterpiece matching your power-up settings!"
          : "A simple, low-detail draft with flat lighting and generic colors."}
      </p>
    </div>
  );
};

const getCharacterImage = (lesson) => {
  if (lesson.quest.characterImage) {
    return (
      <img
        src={lesson.quest.characterImage}
        className="w-full h-full object-cover rounded-full"
        alt={lesson.quest.characterName}
      />
    );
  }

  // Fallback to beautiful emojis with gradients
  const gradients = [
    "from-indigo-400 to-indigo-600",
    "from-emerald-400 to-emerald-600",
    "from-sky-400 to-blue-600",
    "from-pink-400 to-rose-600",
    "from-amber-400 to-yellow-600",
    "from-purple-400 to-violet-600",
    "from-teal-400 to-teal-600"
  ];
  const emojis = ["🧙‍♂️", "🎨", "✍️", "📖", "📐", "🔬", "🧠"];
  const grad = gradients[lesson.id % gradients.length];
  const emoji = emojis[lesson.id % emojis.length];

  return (
    <div className={`w-full h-full rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-4xl shadow-inner select-none`}>
      {emoji}
    </div>
  );
};

const renderProfessionalTextOutput = (text, lessonId) => {
  // Lesson 4: Math Step-by-Step PEMDAS
  if (lessonId === 4) {
    const lines = text.split('\n').filter(line => line.trim());
    const steps = [];
    let intro = "";
    let conclusion = "";

    lines.forEach(line => {
      if (line.toLowerCase().startsWith("let's") || line.toLowerCase().startsWith('solve')) {
        intro = line;
      } else if (line.toLowerCase().startsWith('conclusion:')) {
        conclusion = line.replace(/conclusion:/i, '').trim();
      } else {
        const match = line.match(/^(\d+)\.\s*(.*)/);
        if (match) {
          steps.push({ num: match[1], text: match[2] });
        } else {
          steps.push({ num: steps.length + 1, text: line });
        }
      }
    });

    return (
      <div className="space-y-4 w-full text-left font-body">
        {intro && (
          <p className="text-xs sm:text-sm font-bold text-slate-500 italic px-1">
            {intro}
          </p>
        )}
        <div className="relative pl-6 border-l-2 border-indigo-100 ml-4 space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shadow-sm font-display">
                {step.num}
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-lg px-3.5 py-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5 font-display">
                  Step {step.num}
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-700 leading-normal">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        {conclusion && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-center gap-3 shadow-sm">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shrink-0 font-bold">
              ✓
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block font-display leading-none mb-1">
                Conclusion
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-emerald-950 leading-tight">
                {conclusion}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Lesson 2: Essay / Writing
  if (lessonId === 2) {
    const blocks = text.split('\n\n').filter(block => block.trim());
    const title = blocks[0] || "Story/Essay Output";
    const paragraphs = blocks.slice(1);

    return (
      <div className="w-full text-left space-y-4 font-body">
        <h4 className="text-sm sm:text-base font-black text-purple-900 border-b border-purple-100 pb-1.5 font-display">
          📝 {title}
        </h4>
        <div className="space-y-3">
          {paragraphs.map((p, idx) => {
            const parts = p.split(':');
            if (parts.length > 1) {
              const label = parts[0];
              const rest = parts.slice(1).join(':');
              return (
                <div key={idx} className="bg-slate-50 border border-slate-100/80 rounded-xl p-3.5 space-y-1 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block font-display">
                    {label}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                    {rest.trim()}
                  </p>
                </div>
              );
            }
            return (
              <p key={idx} className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                {p}
              </p>
            );
          })}
        </div>
      </div>
    );
  }

  // Lesson 5: Science explanation using Metaphor
  if (lessonId === 5) {
    const lines = text.split('\n').filter(line => line.trim());
    const title = lines[0] || "ScienceMetaphor";
    const intro = lines[1];
    const items = lines.slice(2);

    return (
      <div className="w-full text-left space-y-4 font-body">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 shadow-sm">
          <h4 className="text-xs sm:text-sm font-black text-emerald-900 font-display flex items-center gap-1.5">
            🌿 {title}
          </h4>
          {intro && (
            <p className="text-xs text-emerald-800 font-bold mt-1 leading-normal">
              {intro}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {items.map((item, idx) => {
            const cleaned = item.replace(/^\d+\.\s*/, '');
            const parts = cleaned.split(':');
            const label = parts.length > 1 ? parts[0] : `Concept ${idx + 1}`;
            const desc = parts.length > 1 ? parts.slice(1).join(':') : cleaned;

            return (
              <div key={idx} className="bg-white border border-slate-100 rounded-xl p-3 flex gap-3 shadow-sm hover:border-emerald-200 transition-colors">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block font-display leading-none mb-1">
                    {label}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-normal">
                    {desc.trim()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Lesson 3: Poem & Story Explainer bullet summary
  if (lessonId === 3) {
    const lines = text.split('\n').filter(line => line.trim());
    const header = lines[0] || "Poem/Story Meaning";
    const bullets = lines.slice(1);

    return (
      <div className="w-full text-left space-y-4 font-body">
        <div className="border-l-4 border-violet-500 pl-3 py-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-violet-600 block font-display">
            Literature breakdown
          </span>
          <h4 className="text-xs sm:text-sm font-black text-slate-800 font-display">
            📖 {header}
          </h4>
        </div>
        <div className="space-y-3">
          {bullets.map((bullet, idx) => {
            const cleaned = bullet.replace(/^-\s*/, '');
            const parts = cleaned.split(':');
            const label = parts.length > 1 ? parts[0] : "Explanation";
            const desc = parts.length > 1 ? parts.slice(1).join(':') : cleaned;

            return (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 shadow-sm space-y-1">
                <span className="text-[10px] font-black text-violet-600 uppercase tracking-widest block font-display">
                  {label}
                </span>
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  {desc.trim()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Lesson 6: GK Tutor concept breakdown + quiz
  if (lessonId === 6) {
    const sections = text.split('\n\n').filter(s => s.trim());
    const factLines = sections[0] ? sections[0].split('\n').filter(l => l.trim()) : [];
    const title = factLines[0] || "General Knowledge breakdown";
    const welcome = factLines[1];
    const facts = factLines.slice(2);

    // Quiz lines parsing
    let quizTitle = "Quick Quiz";
    let quizOptions = [];
    if (sections.length > 1) {
      const quizLines = sections[1].split('\n').filter(l => l.trim());
      quizTitle = quizLines[0];
      quizOptions = quizLines.slice(1);
    }

    const renderBoldText = (textStr) => {
      const parts = textStr.split('**');
      return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-slate-900 bg-amber-50 px-1 rounded">{part}</strong> : part);
    };

    return (
      <div className="w-full text-left space-y-5 font-body">
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 shadow-sm">
          <h4 className="text-xs sm:text-sm font-black text-purple-900 font-display">
            🕌 {title}
          </h4>
          {welcome && (
            <p className="text-xs text-purple-800 font-bold mt-0.5">
              {welcome}
            </p>
          )}
        </div>

        <div className="space-y-2.5">
          {facts.map((fact, idx) => {
            const cleaned = fact.replace(/^-\s*/, '');
            const parts = cleaned.split(':');
            const label = parts.length > 1 ? parts[0] : "Fact";
            const desc = parts.length > 1 ? parts.slice(1).join(':') : cleaned;

            return (
              <div key={idx} className="bg-white border border-slate-100 rounded-xl p-3 flex gap-3 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block font-display leading-none mb-1">
                    {label}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 leading-normal">
                    {renderBoldText(desc.trim())}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {quizOptions.length > 0 && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block font-display">
              {quizTitle}
            </span>
            <div className="grid grid-cols-1 gap-2">
              {quizOptions.map((opt, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 shadow-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500">
                    {opt.trim().substring(0, 1)}
                  </span>
                  <span>
                    {opt.trim().substring(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Lesson 7: Science Experiments Lab Guide
  if (lessonId === 7) {
    const sections = text.split('\n- ').filter(sec => sec.trim());

    let objective = "";
    let materials = [];
    let safety = "";
    let procedure = [];
    let observation = [];
    let explanation = "";

    sections.forEach(sec => {
      const trimmed = sec.trim();
      if (trimmed.startsWith("Objective:")) {
        objective = trimmed.replace("Objective:", "").trim();
      } else if (trimmed.startsWith("Materials Needed:")) {
        materials = trimmed.split("\n").slice(1).map(l => l.replace(/^\s*\d+\.\s*/, "").trim()).filter(l => l);
      } else if (trimmed.startsWith("Safety Precautions:")) {
        safety = trimmed.replace("Safety Precautions:", "").trim();
      } else if (trimmed.startsWith("Step-by-Step Procedure:")) {
        procedure = trimmed.split("\n").slice(1).map(l => l.replace(/^\s*\d+\.\s*/, "").trim()).filter(l => l);
      } else if (trimmed.startsWith("Observation Guide:")) {
        observation = trimmed.split("\n").slice(1).map(l => l.replace(/^\s*-\s*/, "").trim()).filter(l => l);
      } else if (trimmed.startsWith("Scientific Explanation:")) {
        explanation = trimmed.replace("Scientific Explanation:", "").trim();
      }
    });

    return (
      <div className="w-full text-left space-y-4 font-body text-slate-700">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 shadow-sm">
          <h4 className="text-xs sm:text-sm font-black text-blue-900 font-display flex items-center gap-1.5">
            🧪 Celery Transpiration Science Lab Guide 🌿
          </h4>
          {objective && (
            <p className="text-xs text-blue-800 font-bold mt-1 leading-normal">
              <strong>Objective:</strong> {objective}
            </p>
          )}
        </div>

        {safety && (
          <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3 flex gap-2.5 text-xs text-amber-800 font-bold items-center shadow-sm">
            <span className="text-lg">⚠️</span>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 block font-display">Safety Precaution</span>
              <p className="leading-snug">{safety}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {materials.length > 0 && (
            <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block mb-2 font-display">
                📋 Required Materials
              </span>
              <ul className="space-y-1.5 text-xs font-semibold text-slate-600">
                {materials.map((m, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {observation.length > 0 && (
            <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block mb-2 font-display">
                ⏳ Observation Timetable
              </span>
              <ul className="space-y-1.5 text-xs font-semibold text-slate-600">
                {observation.map((o, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {procedure.length > 0 && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 shadow-sm space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block font-display">
              🚶‍♂️ Step-by-Step Procedure
            </span>
            <div className="space-y-2">
              {procedure.map((p, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-black font-display shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed">
                    {p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {explanation && (
          <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-3.5 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block mb-1 font-display">
              🔬 Scientific Explanation (Capillary Action)
            </span>
            <p className="text-xs sm:text-sm font-semibold text-purple-950 leading-relaxed">
              {explanation}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-indigo-700 font-extrabold leading-relaxed">
      {text}
    </pre>
  );
};



const PromptAcademyComponent = () => {
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem("prompt_academy_xp") || "0", 10));
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("prompt_academy_completed_lessons") || "[]");
    } catch {
      return [];
    }
  });
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("learn");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isQuestCasting, setIsQuestCasting] = useState(false);
  const [castingStep, setCastingStep] = useState(0);
  const [questCleared, setQuestCleared] = useState({});
  const [sandboxInputs, setSandboxInputs] = useState({
    1: { subject: "", style: "Pixar 3D Animation" },
    2: { subject: "", paragraphs: "exactly 3 short paragraphs", tone: "simple and easy for kids" },
    3: { subject: "", language: "both English and Hindi", format: "bulleted summary" },
    4: { subject: "", rule: "PEMDAS rules" },
    5: { subject: "", metaphor: "", length: "under 100 words" },
    6: { subject: "", style: "using bullet points and emojis", quiz: "include a multiple choice question" },
    7: { subject: "", materials: "household kitchen materials", structure: "materials list, steps, and observation questions" }
  });
  const [isCopied, setIsCopied] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [battleAnswered, setBattleAnswered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const activeLesson = lessonsData[activeLessonIdx];

  const optionLabels = ["A", "B", "C", "D"];

  // Reset/stop text to speech when navigating lessons or tabs
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [activeLessonIdx, activeTab]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const text = `${activeLesson.learn.title}. ${activeLesson.learn.subtitle}. ${activeLesson.learn.description}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const awardXp = (amount) => {
    setXp(prev => {
      const newXp = prev + amount;
      localStorage.setItem("prompt_academy_xp", newXp.toString());
      return newXp;
    });
  };

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);
      localStorage.setItem("prompt_academy_completed_lessons", JSON.stringify(updated));
      awardXp(50);
    }
  };

  const selectLesson = (idx) => {
    setActiveLessonIdx(idx);
    setActiveTab("learn");
    setSelectedIngredients([]);
    setIsQuestCasting(false);
    setSelectedOption(null);
    setBattleAnswered(false);
  };

  const toggleIngredient = (ing) => {
    if (selectedIngredients.some(x => x.id === ing.id)) {
      setSelectedIngredients(prev => prev.filter(q => q.id !== ing.id));
    } else {
      setSelectedIngredients(prev => [...prev, ing]);
    }
  };

  const isIngredientSelected = (id) => selectedIngredients.some(x => x.id === id);

  const handleCastSpell = () => {
    if (selectedIngredients.length < activeLesson.quest.ingredients.length) return;
    setQuestCleared(q => ({ ...q, [activeLesson.id]: true }));
    awardXp(50);
  };

  useEffect(() => {
    let timer;
    if (isQuestCasting) {
      timer = setInterval(() => {
        setCastingStep(prev => {
          if (prev >= 3) {
            clearInterval(timer);
            setIsQuestCasting(false);
            setQuestCleared(q => ({ ...q, [activeLesson.id]: true }));
            awardXp(50);
            return 0;
          }
          return prev + 1;
        });
      }, 750);
    }
    return () => clearInterval(timer);
  }, [isQuestCasting, activeLesson.id]);

  const castingTexts = [
    "Analysing prompt keywords...",
    "Mixing roleplay attributes...",
    "Injecting detailed descriptions...",
    "Simulating magical AI output..."
  ];

  const getLivePromptText = () => {
    if (selectedIngredients.length === 0) return "";
    return [...selectedIngredients]
      .sort((a, b) => {
        const idxA = activeLesson.quest.ingredients.findIndex(x => x.id === a.id);
        const idxB = activeLesson.quest.ingredients.findIndex(x => x.id === b.id);
        return idxA - idxB;
      })
      .map(x => x.text)
      .join(" ");
  };

  const renderLivePromptBadges = () => {
    if (selectedIngredients.length === 0) {
      return (
        <span className="text-slate-400 italic">
          Click the Power-up badges below to craft the prompt spell!
        </span>
      );
    }
    const sorted = [...selectedIngredients].sort((a, b) => {
      const idxA = activeLesson.quest.ingredients.findIndex(x => x.id === a.id);
      const idxB = activeLesson.quest.ingredients.findIndex(x => x.id === b.id);
      return idxA - idxB;
    });

    const getBadgeTypeColor = (type) => {
      switch (type) {
        case "role": return "text-sky-600 bg-sky-50 border-sky-100";
        case "detail": return "text-emerald-600 bg-emerald-50 border-emerald-100";
        case "background": return "text-indigo-600 bg-indigo-50 border-indigo-100";
        case "style": return "text-amber-600 bg-amber-50 border-amber-100";
        default: return "text-purple-600 bg-purple-50 border-purple-100";
      }
    };

    return (
      <div className="flex flex-wrap gap-y-1.5 gap-x-1 leading-relaxed">
        {sorted.map(ing => (
          <span
            key={ing.id}
            className={`text-xs sm:text-sm font-bold px-2 py-0.5 rounded border ${getBadgeTypeColor(ing.type)}`}
          >
            {ing.text}
          </span>
        ))}
      </div>
    );
  };

  const handleSandboxInputChange = (key, val) => {
    setSandboxInputs(prev => ({
      ...prev,
      [activeLesson.id]: {
        ...prev[activeLesson.id],
        [key]: val
      }
    }));
  };

  const getSandboxPromptText = () => activeLesson.sandbox.template(sandboxInputs[activeLesson.id]);

  const handleCopySandboxSpell = () => {
    navigator.clipboard.writeText(getSandboxPromptText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSelectBattleOption = (optIdx) => {
    if (battleAnswered) return;
    setSelectedOption(optIdx);
    setBattleAnswered(true);
  };

  const handleCompleteBattle = () => {
    if (activeLesson.battle.options[selectedOption]?.isCorrect) {
      completeLesson(activeLesson.id);
      if (activeLessonIdx < lessonsData.length - 1) {
        selectLesson(activeLessonIdx + 1);
      } else {
        alert(`Congratulations! You have completed all ${lessonsData.length} lessons of the AI Prompt Academy and unlocked the Prompt Grandmaster rank!`);
      }
    } else {
      setSelectedOption(null);
      setBattleAnswered(false);
    }
  };

  const getIngredientColorClass = (type, isActive) => {
    if (!isActive) return "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:border-slate-300";
    switch (type) {
      case "role": return "bg-sky-50 border-sky-400 text-sky-700 shadow-sm";
      case "detail": return "bg-emerald-50 border-emerald-400 text-emerald-700 shadow-sm";
      case "background": return "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm";
      case "style": return "bg-amber-50 border-amber-400 text-amber-700 shadow-sm";
      default: return "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm";
    }
  };

  const progressPercentage = (completedLessons.length / lessonsData.length) * 100;

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10 font-body relative overflow-hidden">
      {/* Academy Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-display flex items-center gap-3">
            <WandSparkles className="text-purple-500 animate-pulse" size={32} /> Prompt Academy
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-lg">
            Master the art of asking AI and unlock magical results through {lessonsData.length} interactive quests!
          </p>
        </div>
      </div>



      {/* Main double column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Syllabus Navigator */}
        <div className="lg:col-span-3 space-y-3 max-h-[620px] overflow-y-auto pr-1 prompt-academy-scrollbar" data-lenis-prevent>
          <h3 className="text-[11px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-1 font-display">
            Syllabus Directory
          </h3>
          {lessonsData.map((lesson, idx) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isActive = activeLessonIdx === idx;
            const isLocked = lesson.id > 1 && !completedLessons.includes(lesson.id - 1) && !isActive;

            let cardStyle = "border-slate-100 bg-white hover:border-purple-200 hover:bg-purple-50/30 text-slate-600";
            if (isActive) {
              cardStyle = "border-purple-400 bg-purple-50/50 text-purple-950 shadow-sm ring-1 ring-purple-500/20";
            } else if (isLocked) {
              cardStyle = "border-slate-50 bg-slate-50/40 text-slate-400 opacity-60 cursor-not-allowed";
            }

            return (
              <button
                key={lesson.id}
                disabled={isLocked}
                onClick={() => selectLesson(idx)}
                className={`w-full flex items-center justify-between gap-3 p-4 rounded-2xl border text-left transition-all cursor-pointer ${cardStyle}`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="text-3xl shrink-0">{lesson.icon}</span>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block leading-none mb-1.5 font-display">
                      Lesson {lesson.id}
                    </span>
                    <h4 className="text-sm font-black font-display truncate leading-tight mb-0.5">
                      {lesson.title}
                    </h4>
                    <span className="text-[11px] font-bold text-slate-400 truncate block">
                      {lesson.concept}
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  {isCompleted ? (
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md font-display uppercase tracking-wider">
                      Done
                    </span>
                  ) : isActive ? (
                    <span className="text-[10px] font-black text-purple-600 bg-purple-50 border border-purple-100 px-2 py-1 rounded-md animate-pulse font-display uppercase tracking-wider">
                      Active
                    </span>
                  ) : isLocked ? (
                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 border border-slate-200 px-2 py-1 rounded-md font-display uppercase tracking-wider">
                      Locked
                    </span>
                  ) : (
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-md font-display uppercase tracking-wider">
                      Open
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right column: Active lesson content area */}
        <div className="lg:col-span-9 bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Active Lesson Header Banner */}
          <div className="bg-white border-b border-purple-100/60 p-6 sm:p-8 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-purple-500 bg-purple-50 px-3 py-1.5 rounded-lg mb-2 inline-block font-display border border-purple-100/50">
                Level {activeLesson.id}: {activeLesson.concept}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight mt-1">
                {activeLesson.title}
              </h3>
            </div>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {[
              { id: "learn", label: "Learn", subtitle: "Concept", icon: <BookOpen size={16} /> },
              { id: "quest", label: "Quest", subtitle: "Help Hero", icon: <Trophy size={16} /> },
              { id: "battle", label: "Battle", subtitle: "Final Test", icon: <Gamepad2 size={16} /> }
            ].map(tab => {
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3.5 text-center transition-all cursor-pointer border-b-2 outline-none flex flex-col items-center justify-center ${isTabActive
                    ? "border-purple-500 bg-white text-purple-600 font-black"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                >
                  <span className="text-sm sm:text-base font-black font-display flex items-center gap-1.5">{tab.icon} {tab.label}</span>
                  <span className="text-[10px] sm:text-xs font-semibold opacity-70 leading-none mt-1 hidden sm:block">
                    {tab.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sub-tab content renderer */}
          <div className="p-5 md:p-7 min-h-[380px] relative">
            <AnimatePresence mode="wait">
              {/* LEARN STEP */}
              {activeTab === 'learn' && (
                <motion.div
                  key={`learn-${activeLesson.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-800 font-display mb-1">
                        {activeLesson.learn.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-purple-500 font-black font-display">
                        {activeLesson.learn.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50/80 to-purple-50/40 border border-purple-100 rounded-2xl p-5 text-sm sm:text-base text-slate-700 font-medium leading-relaxed shadow-sm">
                    {activeLesson.learn.description}
                  </div>

                  <div className="bg-white border border-slate-100/80 shadow-sm rounded-2xl p-5">
                    <span className="text-xs sm:text-sm font-black text-purple-600 uppercase tracking-wider block mb-3 font-display flex items-center gap-1.5">
                      <Lightbulb size={16} className="text-amber-500" /> Prompt Master Tips
                    </span>
                    <ul className="space-y-2.5 text-sm text-slate-700 font-medium list-disc pl-5 leading-normal">
                      {activeLesson.learn.tips.map((tip, tIdx) => (
                        <li key={tIdx} className="marker:text-purple-400">{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setActiveTab("quest")}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl text-xs sm:text-sm font-black font-display transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1"
                    >
                      Let's Go to Quest! <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* QUEST STEP */}
              {activeTab === 'quest' && (
                <motion.div
                  key={`quest-${activeLesson.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Casting Loader overlay */}
                  {isQuestCasting && (
                    <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center p-8 text-center rounded-2xl">
                      <div className="relative w-24 h-24 mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-purple-100 border-t-purple-500 animate-spin" />
                        <div className="absolute inset-2 bg-purple-50 rounded-full flex items-center justify-center shadow-inner">
                          <WandSparkles className="text-purple-500 animate-bounce" size={28} />
                        </div>
                      </div>
                      <h3 className="text-base font-black text-slate-800 font-display mb-1">
                        Casting Spell...
                      </h3>
                      <p className="text-sm font-black text-purple-600 animate-pulse font-display">
                        {castingTexts[castingStep]}
                      </p>
                    </div>
                  )}

                  {questCleared[activeLesson.id] ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Boring Output */}
                        <div className="bg-slate-50/40 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-500">
                                  😴
                                </div>
                                <div>
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-display leading-none">Before</span>
                                  <span className="text-xs sm:text-sm font-bold text-slate-700 font-display">Boring Prompt Result</span>
                                </div>
                              </div>
                              <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-[9px] font-black text-red-500 uppercase tracking-wider border border-red-100 flex items-center gap-1">
                                <XCircle size={10} /> Dull
                              </span>
                            </div>

                            <div className="bg-slate-100/50 border border-slate-200/60 rounded-2xl p-4">
                              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1 font-display">
                                Lazy Input Prompt
                              </span>
                              <p className="text-sm font-mono italic text-slate-650 leading-relaxed">
                                "{activeLesson.quest.boringPrompt}"
                              </p>
                            </div>
                          </div>

                          {activeLesson.quest.boringOutputImage ? (
                            <div className="mt-5 bg-slate-100/40 rounded-2xl overflow-hidden h-[280px] sm:h-[320px] w-full border border-slate-200/50 shadow-inner relative">
                              <img
                                src={activeLesson.quest.boringOutputImage}
                                alt="Boring output"
                                className="w-full h-full object-cover filter grayscale-[30%]"
                              />
                              <span className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-md font-display uppercase tracking-wider border border-white/10 z-10">
                                Draft Output
                              </span>
                              <div className="absolute bottom-3 left-3 right-3 bg-red-950/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-red-900/20 text-[11px] text-red-200 font-bold font-display flex items-center gap-1.5 z-10 shadow-md">
                                <span>⚠️ Low resolution, flat colors, no depth</span>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-5 bg-slate-100/40 rounded-2xl overflow-hidden min-h-[280px] flex flex-col items-center justify-center p-5 border border-slate-200/50 shadow-inner relative">
                              <span className="absolute top-3 right-3 bg-slate-200 text-slate-500 text-[9px] font-bold px-2.5 py-1 rounded-md font-display uppercase tracking-wider border border-slate-300/30">
                                Draft Output
                              </span>
                              <div className="w-full text-left bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm leading-relaxed">
                                <p className="text-xs font-mono text-slate-400 italic">"{activeLesson.quest.boringOutputText}"</p>
                                <div className="text-[10px] text-slate-400 font-bold font-display mt-4 border-t border-slate-100 pt-3 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                                  <span>No formatting, missing style guide or specific details</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Awesome Super Output */}
                        <div className="bg-purple-50/20 border border-purple-200 rounded-3xl p-6 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-all duration-300">

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-sm font-semibold text-white shadow-sm shadow-purple-500/20">
                                  ✨
                                </div>
                                <div>
                                  <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest block font-display leading-none">After</span>
                                  <span className="text-xs sm:text-sm font-bold text-slate-800 font-display">Supercharged Prompt Result</span>
                                </div>
                              </div>
                              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-[9px] font-black text-white uppercase tracking-wider shadow-sm flex items-center gap-1">
                                <Sparkles size={10} /> Active
                              </span>
                            </div>

                            <div className="bg-white/80 border border-purple-100 rounded-2xl p-4 shadow-sm">
                              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block mb-1 font-display">
                                Assembled Super Prompt
                              </span>
                              <p className="text-sm sm:text-base font-mono font-bold text-slate-850 leading-relaxed">
                                "{getLivePromptText()}"
                              </p>
                            </div>
                          </div>

                          {activeLesson.quest.superOutputImage ? (
                            <div className="mt-5 bg-white rounded-2xl overflow-hidden h-[280px] sm:h-[320px] w-full border border-purple-150 shadow-sm hover:shadow-md transition-all duration-300 relative">
                              <img
                                src={activeLesson.quest.superOutputImage}
                                alt="Awesome output"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="mt-5 bg-white rounded-2xl overflow-hidden min-h-[280px] flex items-center justify-center p-5 border border-purple-150 shadow-md relative">
                              <div className="w-full bg-white max-h-[240px] overflow-y-auto prompt-academy-scrollbar pr-1" data-lenis-prevent>
                                {renderProfessionalTextOutput(activeLesson.quest.superOutputText, activeLesson.id)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          onClick={() => setActiveTab("battle")}
                          className="px-5 py-3.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-750 text-white rounded-xl text-xs sm:text-sm font-black font-display transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2 group"
                        >
                          <span>Next Challenge ⚔️</span>
                          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Character bubble banner (Top) */}
                      <div className="bg-gradient-to-r from-purple-50/60 to-indigo-50/40 border border-purple-100 rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

                        <div className="relative w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-purple-400 to-indigo-500 shadow-md flex items-center justify-center shrink-0">
                          <div className="w-full h-full rounded-full bg-white overflow-hidden border border-white flex items-center justify-center">
                            {getCharacterImage(activeLesson)}
                          </div>
                        </div>

                        <div className="flex-grow space-y-1.5 text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                            <h4 className="text-base font-black text-slate-800 tracking-tight font-display">
                              {activeLesson.quest.characterName}
                            </h4>
                            <span className="inline-flex self-center sm:self-start items-center px-2.5 py-0.5 rounded-full bg-purple-100/70 text-[9px] font-black text-purple-600 uppercase tracking-wider font-display">
                              Quest Guide
                            </span>
                          </div>
                          <p className="italic text-sm sm:text-base font-semibold text-slate-700 leading-relaxed">
                            "{activeLesson.quest.characterMsg}"
                          </p>
                        </div>
                      </div>

                      {/* Ingredients selection below */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                          <div className="space-y-1">
                            <h4 className="text-sm sm:text-base font-black text-slate-800 font-display flex items-center gap-2">
                              <WandSparkles size={18} className="text-purple-500 animate-pulse" />
                              Assemble Ingredients
                            </h4>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                              Select all 4 power-ups below to construct your prompt spell!
                            </div>
                          </div>
                          <div className="px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-700 text-[11px] sm:text-xs font-black font-mono tracking-wider self-start sm:self-center">
                            Progress: {selectedIngredients.length} / {activeLesson.quest.ingredients.length}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {activeLesson.quest.ingredients.map(ing => {
                            const isSelected = isIngredientSelected(ing.id);

                            let colorTheme = {
                              bg: "bg-white border-slate-150 text-slate-700 hover:border-slate-355 hover:bg-slate-50/50",
                              activeBg: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent shadow-lg shadow-purple-500/20",
                              pillBg: "bg-slate-100 text-slate-500",
                              activePillBg: "bg-white/20 text-white"
                            };

                            if (ing.type === 'role') {
                              colorTheme = {
                                bg: "bg-white border-slate-205 text-slate-700 hover:border-sky-300 hover:bg-sky-50/10",
                                activeBg: "bg-gradient-to-br from-sky-500 to-blue-600 text-white border-transparent shadow-lg shadow-blue-500/20",
                                pillBg: "bg-sky-50 text-sky-600",
                                activePillBg: "bg-white/20 text-white"
                              };
                            } else if (ing.type === 'detail') {
                              colorTheme = {
                                bg: "bg-white border-slate-205 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/10",
                                activeBg: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-transparent shadow-lg shadow-emerald-500/20",
                                pillBg: "bg-emerald-50 text-emerald-600",
                                activePillBg: "bg-white/20 text-white"
                              };
                            } else if (ing.type === 'background') {
                              colorTheme = {
                                bg: "bg-white border-slate-205 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/10",
                                activeBg: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/20",
                                pillBg: "bg-indigo-50 text-indigo-600",
                                activePillBg: "bg-white/20 text-white"
                              };
                            } else if (ing.type === 'style') {
                              colorTheme = {
                                bg: "bg-white border-slate-205 text-slate-700 hover:border-amber-300 hover:bg-amber-50/10",
                                activeBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white border-transparent shadow-lg shadow-amber-500/20",
                                pillBg: "bg-amber-50 text-amber-700",
                                activePillBg: "bg-white/20 text-white"
                              };
                            }

                            return (
                              <button
                                key={ing.id}
                                onClick={() => toggleIngredient(ing)}
                                className={`group p-4.5 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[155px] relative overflow-hidden ${isSelected
                                  ? colorTheme.activeBg + " -translate-y-1"
                                  : colorTheme.bg
                                  }`}
                              >
                                <div className="flex items-center justify-between w-full mb-3">
                                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md font-display ${isSelected ? colorTheme.activePillBg : colorTheme.pillBg}`}>
                                    {ing.label}
                                  </span>
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${isSelected
                                    ? "bg-white text-purple-600 scale-110 shadow-sm"
                                    : "border border-slate-200 text-slate-400 group-hover:border-slate-400 group-hover:scale-105"
                                    }`}>
                                    {isSelected ? <Check size={11} strokeWidth={4} /> : <Plus size={11} strokeWidth={3} />}
                                  </div>
                                </div>

                                <div className="flex-grow flex items-center py-1">
                                  <p className={`text-sm font-bold font-mono leading-snug tracking-tight ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                                    "{ing.text}"
                                  </p>
                                </div>

                                <p className={`text-[11px] sm:text-xs mt-2 leading-snug ${isSelected ? 'text-white/80 font-medium' : 'text-slate-500 font-normal'}`}>
                                  {ing.desc}
                                </p>

                                {isSelected && (
                                  <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Bottom live prompt preview and cast button */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <div className="bg-gradient-to-br from-purple-50/40 via-white to-indigo-50/30 border border-purple-100 rounded-2xl p-5 shadow-sm relative overflow-hidden">
                          <div className="absolute top-4 left-4 flex gap-1.5 z-10 opacity-60">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" style={{ backgroundColor: '#ff5f56' }} />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" style={{ backgroundColor: '#ffbd2e' }} />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" style={{ backgroundColor: '#27c93f' }} />
                          </div>

                          <div className="text-center mb-3">
                            <span className="text-[9px] font-black uppercase tracking-widest text-purple-500 font-display">
                              AI Prompt Spell Compiler
                            </span>
                          </div>

                          <div className="bg-white/70 border border-purple-100/50 p-4.5 rounded-xl min-h-[72px] flex items-center leading-relaxed text-xs sm:text-sm font-mono text-slate-700 shadow-inner relative mt-1">
                            {selectedIngredients.length === 0 ? (
                              <span className="text-slate-400 font-medium italic select-none">
                                // Select power-up ingredients above to compile your prompt spell...
                              </span>
                            ) : (
                              renderLivePromptBadges()
                            )}
                          </div>
                        </div>

                        <button
                          onClick={handleCastSpell}
                          disabled={selectedIngredients.length < activeLesson.quest.ingredients.length}
                          className={`w-full py-4 rounded-2xl text-sm sm:text-base font-black font-display transition-all duration-300 relative overflow-hidden ${selectedIngredients.length === activeLesson.quest.ingredients.length
                            ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-600/20 active:scale-[0.98] cursor-pointer"
                            : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed"
                            }`}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Sparkles size={18} className={selectedIngredients.length === activeLesson.quest.ingredients.length ? "animate-pulse" : ""} />
                            <span>Cast Prompt Spell!</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* BATTLE STEP */}
              {activeTab === 'battle' && (
                <motion.div
                  key={`battle-${activeLesson.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-800 font-display mb-1">
                      Prompt Battle Trivia
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Pick the prompt that uses all guidelines to defeat the Boring Text Monster!
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm">
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                      {activeLesson.battle.scenario}
                    </h4>
                  </div>

                  <div className="space-y-3.5">
                    {activeLesson.battle.options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      let optionStyle = "bg-white border-slate-200 text-slate-700 hover:border-purple-200 hover:bg-purple-50/20";
                      if (battleAnswered) {
                        if (option.isCorrect) {
                          optionStyle = "bg-emerald-50 border-emerald-400 text-emerald-700 font-bold";
                        } else if (isSelected) {
                          optionStyle = "bg-rose-50 border-rose-400 text-rose-700 font-bold";
                        } else {
                          optionStyle = "bg-slate-50 border-slate-100 text-slate-400 opacity-60";
                        }
                      }
                      return (
                        <button
                          key={idx}
                          disabled={battleAnswered}
                          onClick={() => handleSelectBattleOption(idx)}
                          className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-250 cursor-pointer font-medium ${optionStyle}`}
                        >
                          <span className={`w-7 h-7 rounded-md flex items-center justify-center text-xs sm:text-sm font-black shrink-0 transition-all shadow-sm ${battleAnswered && option.isCorrect
                            ? "bg-emerald-500 text-white"
                            : battleAnswered && isSelected && !option.isCorrect
                              ? "bg-rose-500 text-white"
                              : isSelected
                                ? "bg-purple-500 text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}>
                            {battleAnswered && option.isCorrect ? "✓" : battleAnswered && isSelected && !option.isCorrect ? "✗" : optionLabels[idx]}
                          </span>
                          <div className="flex-1">
                            <p className="text-xs sm:text-sm leading-relaxed font-mono">
                              "{option.text}"
                            </p>
                            {battleAnswered && isSelected && (
                              <p className="text-xs sm:text-sm font-bold mt-2 text-current opacity-90 leading-normal">
                                {option.feedback}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {battleAnswered && (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleCompleteBattle}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl text-xs sm:text-sm font-black font-display transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1"
                      >
                        {activeLesson.battle.options[selectedOption]?.isCorrect ? (
                          activeLessonIdx < lessonsData.length - 1 ? (
                            <>
                              Complete & Unlock Next <ChevronRight size={16} />
                            </>
                          ) : (
                            "Complete Prompt Academy!"
                          )
                        ) : (
                          "Try Battle Again"
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};


const LearnAndPromptAcademyComponent = () => {
  const [activeSection, setActiveSection] = useState('concepts'); // 'concepts' or 'academy'
  const [activeConceptTab, setActiveConceptTab] = useState('basics'); // 'basics', 'superpowers', 'learning'

  return (
    <div className="space-y-8 font-body max-w-7xl mx-auto">
      {/* Sleek Top Mode Selector / Header */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto p-1 bg-slate-50 rounded-2xl border border-slate-100/80">
          <button
            onClick={() => setActiveSection('concepts')}
            className={`flex-1 sm:flex-initial px-5 sm:px-7 py-3 rounded-xl font-black font-display text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${activeSection === 'concepts'
              ? 'bg-white text-purple-600 shadow-sm border border-purple-100'
              : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
              }`}
          >
            <Lightbulb size={18} className={activeSection === 'concepts' ? 'text-purple-500 animate-pulse' : ''} />
            <span>AI Quick Concepts</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold ml-1 ${activeSection === 'concepts' ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-600'}`}>Easy</span>
          </button>
          <button
            onClick={() => setActiveSection('academy')}
            className={`flex-1 sm:flex-initial px-5 sm:px-7 py-3 rounded-xl font-black font-display text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${activeSection === 'academy'
              ? 'bg-white text-purple-600 shadow-sm border border-purple-100'
              : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
              }`}
          >
            <span>Prompt Academy Course</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold ml-1 ${activeSection === 'academy' ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-600'}`}>{lessonsData.length} Lessons</span>
          </button>
        </div>

      </div>

      {/* Dynamic Content View */}
      <AnimatePresence mode="wait">
        {activeSection === 'concepts' && (
          <motion.div
            key="quick-concepts"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8 pb-16"
          >
            {/* Sub-navigation for AI Concepts */}
            <div className="flex flex-wrap items-center gap-2 pb-4">
              {[
                { id: 'basics', label: '1. What is AI?', icon: Sparkles },
                { id: 'superpowers', label: '2. Superpowers', icon: Eye },
                { id: 'learning', label: '3. How AI Learns & Safety', icon: Brain },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveConceptTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider font-display flex items-center gap-2 transition-all cursor-pointer ${activeConceptTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200 scale-[1.02] border border-transparent'
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/30'
                    }`}
                >
                  <tab.icon size={16} className={activeConceptTab === tab.id ? 'text-indigo-200' : 'opacity-70'} />
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeConceptTab === 'basics' && (
                <motion.div key="basics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  {/* Top Hero Banner: What is AI? (Engaging 2-Column Layout) */}
                  <div className="bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-sm border border-indigo-100/60 flex flex-col md:flex-row items-center justify-between gap-10">

                    {/* Left Content */}
                    <div className="relative z-10 w-full md:w-3/5 space-y-5 text-left">
                      {/* Badges */}


                      {/* Title & Text */}
                      <div className="space-y-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-900 tracking-tight leading-tight">
                          What is Artificial Intelligence?
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
                          Think of AI as a <strong className="text-indigo-600 font-bold">super-smart digital brain</strong>. Instead of just following rules, AI learns from real-world examples (like photos or text) to solve problems, recognize patterns, and create new things!
                        </p>

                        {/* Extra Content: Real World Examples & Fun Fact */}
                        <div className="pt-2 space-y-3">
                          <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider font-display">Where do we use it?</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm font-medium text-slate-700">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Smart Assistants
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Video Recommendations
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Self-Driving Cars
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Math & Homework Tutors
                            </li>
                          </ul>
                        </div>

                        <div className="mt-6 bg-indigo-50/50 border border-indigo-100/80 rounded-xl p-3.5 flex items-start gap-3 max-w-xl shadow-sm">
                          <Lightbulb size={18} className="text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-[13px] text-indigo-900 font-medium leading-relaxed">
                            <strong>Fun Fact:</strong> The term "Artificial Intelligence" was actually invented way back in <strong>1956</strong> by a scientist named John McCarthy during a summer conference!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Visual (Abstract Representation of AI) */}
                    <div className="relative w-full md:w-2/5 flex justify-center items-center py-4 md:py-0">
                      <div className="absolute inset-0 bg-indigo-300/20 blur-[50px] rounded-full w-48 h-48 mx-auto" />
                      <div className="relative grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-50 flex flex-col items-center justify-center gap-2 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
                          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><Eye size={20} /></div>
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-wide">Vision</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-50 flex flex-col items-center justify-center gap-2 transform translate-y-4 rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
                          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center"><MessageSquare size={20} /></div>
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-wide">Chat</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-50 flex flex-col items-center justify-center gap-2 transform -translate-y-2 -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300">
                          <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center"><Palette size={20} /></div>
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-wide">Create</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-50 flex flex-col items-center justify-center gap-2 transform translate-y-6 rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300">
                          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><Brain size={20} /></div>
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-wide">Learn</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeConceptTab === 'superpowers' && (
                <motion.div key="superpowers" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="space-y-4">
                  {/* 4 Superpowers Visual Grid (No long text!) */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-left px-2">
                      <div>
                        <span className="text-xs font-black text-purple-600 uppercase tracking-wider font-display">
                          Core Skills
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                          4 Amazing AI Superpowers
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold">
                        How AI helps us every single day
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Power 1 */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-blue-300 hover:shadow-lg transition-all text-left flex flex-col justify-between group">
                        <div className="space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-inner">
                            <Eye size={24} />
                          </div>
                          <h4 className="text-base font-black text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                            Computer Vision
                          </h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            AI looks at pixels to recognize shapes, colors, faces, and traffic signs instantly.
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase font-mono tracking-wider">
                            FaceID &amp; Cars
                          </span>
                        </div>
                      </div>

                      {/* Power 2 */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-purple-300 hover:shadow-lg transition-all text-left flex flex-col justify-between group">
                        <div className="space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-inner">
                            <MessageSquare size={24} />
                          </div>
                          <h4 className="text-base font-black text-slate-900 font-display group-hover:text-purple-600 transition-colors">
                            Talking Chatbots
                          </h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            AI reads sentences, translates languages, and chats like a real human tutor.
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2 py-1 rounded-md uppercase font-mono tracking-wider">
                            Siri &amp; ChatGPT
                          </span>
                        </div>
                      </div>

                      {/* Power 3 */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-emerald-300 hover:shadow-lg transition-all text-left flex flex-col justify-between group">
                        <div className="space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-inner">
                            <Brain size={24} />
                          </div>
                          <h4 className="text-base font-black text-slate-900 font-display group-hover:text-emerald-600 transition-colors">
                            Pattern Finder
                          </h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            AI scans millions of data rows to find hidden secrets and predict future trends.
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase font-mono tracking-wider">
                            YouTube Recommendations
                          </span>
                        </div>
                      </div>

                      {/* Power 4 */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-purple-300 hover:shadow-lg transition-all text-left flex flex-col justify-between group">
                        <div className="space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-inner">
                            <Palette size={24} />
                          </div>
                          <h4 className="text-base font-black text-slate-900 font-display group-hover:text-purple-600 transition-colors">
                            Generative Art
                          </h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            AI learns artistic styles to build stunning new pictures and stories from your prompts.
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2 py-1 rounded-md uppercase font-mono tracking-wider">
                            AI Image Creators
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeConceptTab === 'learning' && (
                <motion.div key="learning" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  {/* How AI Learns & Golden Rules in a clean 2-column layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Left Box: How AI Learns (3 Easy Steps) */}
                    <div className="lg:col-span-6 bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between text-left">
                      <div>
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-wider font-display block mb-1">
                          Simple Timeline
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 font-display mb-4">
                          How Does AI Get Smart?
                        </h3>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3.5 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black font-display text-sm flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
                              1
                            </div>
                            <div>
                              <h4 className="text-sm font-black text-slate-900 font-display">Feed the Data</h4>
                              <p className="text-xs text-slate-600 font-medium mt-0.5">We show AI millions of examples (photos, books, numbers) so it learns shapes and facts.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3.5 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black font-display text-sm flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
                              2
                            </div>
                            <div>
                              <h4 className="text-sm font-black text-slate-900 font-display">Practice &amp; Guess</h4>
                              <p className="text-xs text-slate-600 font-medium mt-0.5">AI practices guessing. When it makes a mistake, we correct it until its score reaches 100%!</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3.5 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black font-display text-sm flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
                              3
                            </div>
                            <div>
                              <h4 className="text-sm font-black text-slate-900 font-display">Spot Secrets</h4>
                              <p className="text-xs text-slate-600 font-medium mt-0.5">AI works like a detective, automatically spotting patterns without human help!</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Box: 4 Golden Rules of Safe AI */}
                    <div className="lg:col-span-6 bg-gradient-to-br from-amber-50/70 to-orange-50/40 rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-sm flex flex-col justify-between text-left">
                      <div>
                        <span className="text-xs font-black text-amber-700 uppercase tracking-wider font-display block mb-1">
                          Safety First
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 font-display mb-4">
                          4 Smart Rules of Using AI
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-sm">
                            <div className="mb-1 text-amber-500"><Shield size={20} /></div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 font-display">Keep Secrets Secret</h4>
                            <p className="text-[11px] text-slate-600 font-medium mt-0.5">Never share passwords, real addresses, or phone numbers with AI.</p>
                          </div>

                          <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-sm">
                            <div className="mb-1 text-amber-500"><CheckCircle2 size={20} /></div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 font-display">Double-Check Facts</h4>
                            <p className="text-[11px] text-slate-600 font-medium mt-0.5">AI can make silly mistakes. Verify important facts with a textbook or teacher.</p>
                          </div>

                          <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-sm">
                            <div className="mb-1 text-amber-500"><Brain size={20} /></div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 font-display">Learn, Don't Copy</h4>
                            <p className="text-[11px] text-slate-600 font-medium mt-0.5">Let AI explain *how* to solve homework instead of just copying the answer.</p>
                          </div>

                          <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-100 shadow-sm">
                            <div className="mb-1 text-amber-500"><Star size={20} /></div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 font-display">Be Creative &amp; Kind</h4>
                            <p className="text-[11px] text-slate-600 font-medium mt-0.5">Use AI to brainstorm stories, practice coding, and build positive art!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeSection === 'academy' && (
          <motion.div
            key="prompt-academy"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PromptAcademyComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const ExploreToolsComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const filteredTools = selectedCategory === 'All' ? toolsDataList : toolsDataList.filter(t => t.categories.includes(selectedCategory));

  return (
    <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Explore AI Tools</h2>

        </div>
        <div className="flex flex-wrap items-center gap-2">
          {toolsCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
            >
              <span>{cat.icon}</span> <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map(tool => (
          <div key={tool.name} className="p-5 rounded-[20px] border border-slate-100 bg-white hover:border-purple-200 hover:shadow-lg transition-all group cursor-pointer relative">

            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl ${tool.iconBg}`}>
                {tool.icon}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">{tool.name}</h4>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mt-1 inline-block ${tool.color}`}>
                  {tool.tag}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              {tool.desc}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};

const QuizComponent = () => {
  const challengeModes = {
    superpowers: {
      title: "AI Superpowers Arena",
      desc: "Test your knowledge of the 4 core AI skills: Vision, NLP, Pattern Finder, and Generative Art.",
      badge: "Beginner",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
      color: "from-blue-500 to-cyan-500",
      questions: [
        {
          question: "Unlike regular programs that just follow rules, what makes AI special?",
          options: [
            "It can run without electricity",
            "It learns from pictures and experiences, just like a human",
            "It only works on smart refrigerators",
            "It is always a metallic robot with red eyes"
          ],
          correct: 1,
          funnySuccess: "Bingo! AI learns from data instead of static code.",
          funnyFailure: "Incorrect. AI requires data training, not just power."
        },
        {
          question: "Siri and Google Assistant understand your voice using which AI superpower?",
          options: [
            "Natural Language Processing (NLP)",
            "X-ray Vision",
            "Telepathy",
            "Sub-atomic coding"
          ],
          correct: 0,
          funnySuccess: "NLP magic! The AI listens, converts speech to text, and replies.",
          funnyFailure: "Incorrect. Siri and Google Assistant use NLP to process spoken language."
        },
        {
          question: "When a self-driving car spots a red light, what superpower is it using?",
          options: [
            "Hypnotic persuasion",
            "Computer Vision (AI Eyes)",
            "Super speed",
            "Baking skills"
          ],
          correct: 1,
          funnySuccess: "Correct! Computer Vision allows the car to process visual pixels and identify traffic signals.",
          funnyFailure: "Incorrect. Computer Vision is the key technology for self-driving cars to see surroundings."
        },
        {
          question: "What is the absolute first step to training a new AI helper?",
          options: [
            "Giving it a fancy metal suit",
            "Showing it millions of photos or examples (Data Training)",
            "Shouting at the monitor until it works",
            "Buying it a cup of coffee"
          ],
          correct: 1,
          funnySuccess: "Awesome! Data is food for the AI brain.",
          funnyFailure: "Incorrect. You must supply data to train an AI model."
        },
        {
          question: "What is a 'neural network' in deep learning?",
          options: [
            "A spiderweb made of fiber cables",
            "Layers of tiny digital thinking units that mimic human brain cells",
            "A social network for robots to share memes",
            "The power grid of a small town"
          ],
          correct: 1,
          funnySuccess: "Genius! Neural networks simulate biological brains to learn complex patterns.",
          funnyFailure: "Incorrect. Neural networks are layers of processing units that mimic brain cells."
        }
      ]
    },
    prompting: {
      title: "Prompt Spellbook Academy",
      desc: "Master the art of prompt engineering: Magic Masks, Detail Detectives, and Output Controls.",

      badge: "Intermediate",
      badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
      color: "from-purple-500 to-indigo-500",
      questions: [
        {
          question: "What happens when you give an AI a 'Magic Mask' (System Role)?",
          options: [
            "It hides its webcam so you can't see it",
            "It acts as a specific character or expert helper (like a Math Tutor or Art Director)",
            "It changes the website background color to black",
            "It prints out a superhero costume"
          ],
          correct: 1,
          funnySuccess: "Perfect! System roles frame the AI's persona, making its replies targeted and useful.",
          funnyFailure: "Incorrect. A system role defines the AI persona or character."
        },
        {
          question: "You want an AI artist to generate a cozy cabin. How do you act as a 'Detail Detective'?",
          options: [
            "Just type 'cabin' and cross your fingers",
            "Describe materials, colors, surrounding weather, and the lighting style",
            "Send the AI a photo of your own bedroom",
            "Write 'draw a cabin or else'"
          ],
          correct: 1,
          funnySuccess: "Yes! High-detail descriptions lead to breathtaking AI images.",
          funnyFailure: "Incorrect. Providing rich details helps the AI create the exact image you want."
        },
        {
          question: "Why should we use 'Ingredients' (Constraint Prompting) in our prompts?",
          options: [
            "To make the AI output taste better",
            "To guide the AI to follow specific rules (like word count, format, or language)",
            "To speed up the internet connection",
            "To change the computer's CPU temperature"
          ],
          correct: 1,
          funnySuccess: "Brilliant! Constraints prevent the AI from generating random or irrelevant content.",
          funnyFailure: "Incorrect. Constraints help guide the formatting and style of the AI response."
        },
        {
          question: "Which of these is a 'Supercharged Prompt' for writing a story?",
          options: [
            "'write a story'",
            "'make a forest story'",
            "'Act as a wizard storyteller. Write an enchanting story about a hidden fairy fountain, using magical metaphors.'",
            "'story please'"
          ],
          correct: 2,
          funnySuccess: "Spell Cast! That prompt specifies role, topic, style, and tone for a rich, beautiful story.",
          funnyFailure: "Incorrect. The most descriptive prompt with role and tone definitions works best."
        },
        {
          question: "If you want an AI to summarize a long poem, what format instruction works best?",
          options: [
            "'summarize it'",
            "'provide 3 bullet points with bold key terms and highlights'",
            "'write a story about a poem'",
            "'explain the meaning in a single 1000-word paragraph'"
          ],
          correct: 1,
          funnySuccess: "Perfect! Bullet points and bold keywords make the summary readable and engaging.",
          funnyFailure: "Incorrect. Requesting specific bullet points with highlights yields the most readable summary."
        }
      ]
    },
    science: {
      title: "Lab Instructor's Challenge",
      desc: "Put on your safety goggles! Learn to design science experiments in Physics, Chemistry, and Biology.",
      badge: "Expert",
      badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
      color: "from-emerald-500 to-teal-500",
      questions: [
        {
          question: "Why must you prompt the AI for safety precautions when designing an experiment?",
          options: [
            "To make the experiment take longer",
            "To avoid dangerous accidents (like mixing wrong chemicals or using sharp blades unsafely)",
            "To get a higher score on the dashboard",
            "To make the output look more colorful"
          ],
          correct: 1,
          funnySuccess: "Safety First! Prompting for safety guidelines prevents laboratory mishaps.",
          funnyFailure: "Incorrect. Safety precautions are essential to prevent physical accidents during experiments."
        },
        {
          question: "You want to study plant transpiration. What is the best way to prompt the AI for the experiment guide?",
          options: [
            "'tell me about plant leaves'",
            "'Act as a lab instructor. Design a step-by-step experiment showing plant transpiration using celery, food coloring, and jars. Include safety tips and an observation log.'",
            "'how does water get to celery'",
            "'draw a diagram of celery'"
          ],
          correct: 1,
          funnySuccess: "Scientist level! The prompt specifies the instructor role, materials, safety, steps, and observation charts.",
          funnyFailure: "Incorrect. The most educational prompt specifies the experiment details and structure."
        },
        {
          question: "If you are performing a science experiment at home, why should you tell the AI to use 'home-friendly materials'?",
          options: [
            "So you don't have to buy expensive school lab apparatus like Bunsen burners or toxic acids",
            "To make the experiment look like a cooking show",
            "Because the AI doesn't know what a test tube is",
            "To save electricity in the house"
          ],
          correct: 0,
          funnySuccess: "Correct! Tailoring materials to what is available at home makes the experiment feasible.",
          funnyFailure: "Incorrect. Requesting home-friendly materials ensures you can safely perform it in a kitchen."
        },
        {
          question: "What is the purpose of requesting an 'observation timetable' in a science experiment prompt?",
          options: [
            "To practice drawing tables in math",
            "To record physical changes at set times and track results systematically",
            "To show the AI how fast you can write",
            "To make the text output look like a calendar"
          ],
          correct: 1,
          funnySuccess: "Systematic! Observation timetables guide you on when and what to look for during the reaction.",
          funnyFailure: "Incorrect. Timetables help you collect data at precise intervals."
        },
        {
          question: "To study magnetic force fields at home, which prompt is most educational?",
          options: [
            "'magnets science project'",
            "'Act as a physics lab tutor. Design a step-by-step experiment on magnetic force fields using simple magnets and paperclips. List safety warnings.'",
            "'show me a magnet video'",
            "'what is a magnetic field'"
          ],
          correct: 1,
          funnySuccess: "Superb! It covers role, topics, home apparatus, safety warnings, and experimental steps.",
          funnyFailure: "Incorrect. A specific prompt requesting lab tutorial instructions is much better."
        }
      ]
    }
  };

  const [selectedMode, setSelectedMode] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const startMode = (modeKey) => {
    setSelectedMode(modeKey);
    setShowRules(true);
    setCurrentQ(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setLives(3);
    setStreak(1);
    setShowResult(false);
    setIsGameOver(false);
  };

  const handleSelect = (idx) => {
    if (isAnswered || isGameOver) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const modeData = challengeModes[selectedMode];
    const qData = modeData.questions[currentQ];
    const isCorrect = idx === qData.correct;

    if (isCorrect) {
      const addedScore = 10 * streak;
      setScore(prev => prev + addedScore);
      setStreak(prev => prev + 1);
    } else {
      setLives(prev => {
        const nextLives = prev - 1;
        if (nextLives <= 0) {
          setIsGameOver(true);
        }
        return nextLives;
      });
      setStreak(1);
    }
  };

  const handleNext = () => {
    const modeData = challengeModes[selectedMode];
    if (currentQ < modeData.questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetGame = () => {
    setSelectedMode(null);
    setShowRules(false);
    setCurrentQ(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setLives(3);
    setStreak(1);
    setShowResult(false);
    setIsGameOver(false);
  };

  const optionLabels = ["A", "B", "C", "D"];

  // Render Selection Screen
  if (!selectedMode) {
    return (
      <div className="space-y-6 font-body text-slate-800 max-w-5xl mx-auto">
        <div className="text-center space-y-2 py-4">
          <span className="text-xs font-black text-purple-600 uppercase tracking-widest font-display block">
            Arena Challenges
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            AI Quiz Quest Arena
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto font-medium">
            Test your knowledge in a retro gaming style. Lose 3 lives and the AI breaks! Build a streak for higher XP scores!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(challengeModes).map(key => {
            const mode = challengeModes[key];
            return (
              <div
                key={key}
                className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{mode.icon}</span>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${mode.badgeColor}`}>
                      {mode.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 font-display mb-1 group-hover:text-purple-600 transition-colors">
                      {mode.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      {mode.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => startMode(key)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white border border-slate-200 hover:border-transparent text-slate-700 rounded-xl text-xs font-black font-display transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Start Quest
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const modeData = challengeModes[selectedMode];
  const q = modeData.questions[currentQ];
  const progress = ((currentQ + (isAnswered ? 1 : 0)) / modeData.questions.length) * 100;

  // Render Rules Screen
  if (selectedMode && showRules) {
    return (
      <div className="w-full max-w-lg mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white font-body shadow-2xl relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <button
            onClick={resetGame}
            className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            ← Back
          </button>
          <span className="text-[10px] font-black text-purple-400 bg-purple-950/40 border border-purple-800/30 px-3 py-1 rounded-md font-display uppercase tracking-wider">
            {modeData.badge} Arena
          </span>
        </div>

        {/* Quest Info */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{modeData.icon}</span>
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-display leading-none mb-1">Active Quest</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-100 font-display">
                {modeData.title}
              </h3>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed">
            {modeData.desc}
          </p>
        </div>

        {/* Game Rules Card */}
        <div className="bg-slate-850 border border-slate-800 rounded-2xl p-5 space-y-4 mb-6">
          <h4 className="text-xs font-black uppercase text-purple-400 tracking-wider font-display flex items-center gap-2">
            <Shield size={16} className="text-purple-500" /> Quest Rules & Guidelines
          </h4>
          <ul className="space-y-3 text-xs text-slate-355 font-medium">
            <li className="flex items-start gap-2.5">
              <span className="text-base shrink-0">❤️</span>
              <div>
                <strong className="text-white">3 Lives (Hearts):</strong> You start with 3 lives. Every incorrect answer costs you 1 life. Don't let your lives reach 0!
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-base shrink-0 text-amber-500 font-bold">»</span>
              <div>
                <strong className="text-white">Combo Streak:</strong> Answer consecutive questions correctly to increase your combo streak. A higher streak multiplies your XP reward!
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-base shrink-0 text-amber-500 font-bold">»</span>
              <div>
                <strong className="text-white">{modeData.questions.length} Quest Questions:</strong> Complete all questions to log your score and unlock your Prompt Master Rank.
              </div>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <button
          onClick={() => setShowRules(false)}
          className="w-full py-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-black font-display transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Begin Quest</span>
        </button>
      </div>
    );
  }

  // Render Game Over Screen
  if (isGameOver) {
    return (
      <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-white font-body shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        <h2 className="text-xl font-black font-display text-rose-500 uppercase tracking-widest mb-1">
          System Glitch
        </h2>
        <h3 className="text-2xl font-black font-display mb-3">
          Game Over
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto font-semibold mb-6">
          All 3 lives lost! The AI got confused and forgot your prompts. Let's rebuild the digital brain!
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => startMode(selectedMode)}
            className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl text-xs font-black font-display transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Retry Quest
          </button>
          <button
            onClick={resetGame}
            className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-black font-display transition-all active:scale-95 cursor-pointer"
          >
            Back to Arenas
          </button>
        </div>
      </div>
    );
  }

  // Render Results Screen
  if (showResult) {
    const getRank = () => {
      if (score >= 40) return { title: "AI Whisperer", color: "text-purple-400 bg-purple-950/40 border-purple-800/30" };
      if (score >= 25) return { title: "Prompt Apprentice", color: "text-indigo-400 bg-indigo-950/40 border-indigo-800/30" };
      return { title: "AI Novice", color: "text-slate-400 bg-slate-900 border-slate-800" };
    };
    const rank = getRank();

    return (
      <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-white font-body shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />

        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/5">
          <Trophy size={32} />
        </div>
        <h2 className="text-xl font-black font-display text-amber-400 uppercase tracking-widest mb-1">
          Quest Complete!
        </h2>
        <h3 className="text-2xl font-black font-display mb-4">
          Results Logged
        </h3>

        <div className="space-y-4 mb-6">
          {/* Star Rating based on remaining lives */}
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((starNum) => {
                const isFilled = starNum <= lives;
                return (
                  <Star
                    key={starNum}
                    size={32}
                    className={`transition-all duration-500 ${isFilled
                      ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] scale-110"
                      : "text-slate-700 fill-slate-850 opacity-40"
                      }`}
                  />
                );
              })}
            </div>
            <p className="text-xs text-slate-400 font-bold">
              {lives === 3 ? "Perfect Run! 3/3 Hearts Saved" : lives === 2 ? "Great Job! 2/3 Hearts Saved" : "Completed! 1/3 Hearts Saved"}
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-4 inline-block min-w-[200px]">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Total Score XP</span>
            <span className="text-3xl font-black text-purple-400 font-display">{score} XP</span>
          </div>

          <div className="block">
            <div className={`px-4 py-2 rounded-xl border text-xs font-black font-display inline-block ${rank.color}`}>
              Unlocked Rank: {rank.title}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => startMode(selectedMode)}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl text-xs font-black font-display transition-all active:scale-95 cursor-pointer"
          >
            Play Again
          </button>
          <button
            onClick={resetGame}
            className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl text-xs font-black font-display transition-all active:scale-95 cursor-pointer"
          >
            Choose Other Arena
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 text-white font-body shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none" />

      {/* Quest Header Status Bar */}
      <div className="flex items-center justify-between gap-3 mb-5 pb-3.5 border-b border-slate-800">
        <button
          onClick={resetGame}
          className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
        >
          ← Quit
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="text-[15px] filter drop-shadow">
              {i < lives ? "❤️" : "🖤"}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {streak > 1 && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-[10px] font-black text-white px-2 py-0.5 rounded-md font-display uppercase tracking-wider animate-bounce shadow-sm">
              x{streak} Streak
            </span>
          )}
          <span className="bg-slate-800 border border-slate-700/60 px-2.5 py-1 rounded-lg text-[11px] font-black font-display text-purple-400">
            {score} XP
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress Log */}
        <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest font-display">
          <span>{modeData.title}</span>
          <span>Question {currentQ + 1}/{modeData.questions.length}</span>
        </div>

        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
        </div>

        {/* Question Text */}
        <h2 className="text-sm sm:text-base font-black leading-snug mb-2 font-display text-slate-100">
          {q.question}
        </h2>

        {/* Options */}
        <div className="space-y-2.5">
          {q.options.map((opt, idx) => {
            let btnStyle = "bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700";
            let pillStyle = "bg-slate-800 text-slate-400";

            if (isAnswered) {
              if (idx === q.correct) {
                btnStyle = "bg-emerald-950/60 border-emerald-500/50 text-emerald-100 shadow-md shadow-emerald-500/5";
                pillStyle = "bg-emerald-500 text-white";
              } else if (idx === selectedOption) {
                btnStyle = "bg-rose-950/60 border-rose-500/50 text-rose-100 shadow-md shadow-rose-500/5";
                pillStyle = "bg-rose-500 text-white";
              } else {
                btnStyle = "bg-slate-900 border-slate-850 text-slate-500 opacity-40";
                pillStyle = "bg-slate-850 text-slate-600";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border text-left transition-all duration-200 cursor-pointer font-semibold ${btnStyle}`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 transition-all font-display ${pillStyle}`}>
                  {isAnswered && idx === q.correct ? "✓"
                    : isAnswered && idx === selectedOption && idx !== q.correct ? "✗"
                      : optionLabels[idx]}
                </span>
                <span className="text-xs sm:text-sm font-semibold flex-1 leading-snug">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Witty Feedback panel */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`p-3.5 rounded-xl border text-xs font-bold leading-relaxed flex gap-2 ${selectedOption === q.correct
                ? "bg-emerald-950/40 border-emerald-900/30 text-emerald-300"
                : "bg-rose-950/40 border-rose-900/30 text-rose-300"
                }`}
            >
              {selectedOption === q.correct ? (
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider block font-display mb-0.5">
                  {selectedOption === q.correct ? "Correct" : "Incorrect"}
                </span>
                <p>{selectedOption === q.correct ? q.funnySuccess : q.funnyFailure}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        {isAnswered && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl text-xs font-black font-display transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>{currentQ < modeData.questions.length - 1 ? "Next Question" : "Check Score"}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const AiIntelligenceDashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Learn & Prompt Academy');
  const [selectedItem, setSelectedItem] = useState(null);
  const [learnSubTab, setLearnSubTab] = useState('meet');

  const aiVideos = [
    { id: 1, title: 'What is Artificial Intelligence?', desc: 'Learn the basics of Artificial Intelligence and how machines can think.', image: 'https://img.youtube.com/vi/Q4JKii6cJK4/hqdefault.jpg', duration: '5:00', level: 'Beginner', content: 'Join us on a fun journey to understand Artificial Intelligence! You will learn how computers are trained to see, hear, and solve problems.', youtubeUrl: 'https://www.youtube.com/embed/Q4JKii6cJK4?autoplay=1' },
    { id: 2, title: 'How do Robots Learn?', desc: 'Discover how machines are trained with data to become smarter.', image: 'https://img.youtube.com/vi/alrIxT_ozKA/hqdefault.jpg', duration: '4:15', level: 'Beginner', content: 'Just like you learn by reading books, robots learn by looking at lots of data (like pictures or text). The more data they see, the smarter they get!', youtubeUrl: 'https://www.youtube.com/embed/alrIxT_ozKA?autoplay=1' },
    { id: 3, title: 'Computer Vision Magic', desc: 'Learn how computers can see and recognize objects in pictures.', image: 'https://img.youtube.com/vi/YnJ0dxOuaqk/hqdefault.jpg', duration: '6:10', level: 'Intermediate', content: "Computer Vision is when AI uses cameras to understand what it's looking at. It can recognize dogs, cats, faces, and even read traffic signs!", youtubeUrl: 'https://www.youtube.com/embed/YnJ0dxOuaqk?autoplay=1' },
    { id: 4, title: 'Talking to AI (Chatbots)', desc: 'Understand how AI can chat and answer your questions intelligently.', image: 'https://img.youtube.com/vi/jwJ7YH_pKu8/hqdefault.jpg', duration: '3:45', level: 'Beginner', content: 'Chatbots use something called Natural Language Processing (NLP) to understand what you type or say, and then they figure out the best way to reply to you!', youtubeUrl: 'https://www.youtube.com/embed/jwJ7YH_pKu8?autoplay=1' },
    { id: 5, title: 'Machine Learning Basics', desc: 'Dive into the world of machine learning and data patterns.', image: 'https://img.youtube.com/vi/gM782sItczs/hqdefault.jpg', duration: '5:30', level: 'Intermediate', content: 'Machine learning is a way of teaching computers to learn from examples and experiences, rather than writing a program for every single step.', youtubeUrl: 'https://www.youtube.com/embed/gM782sItczs?autoplay=1' },
    { id: 6, title: 'The Future of AI', desc: 'Explore the exciting possibilities of Artificial Intelligence in the future.', image: 'https://img.youtube.com/vi/76v_EvCnIf8/hqdefault.jpg', duration: '7:20', level: 'Advanced', content: 'From self-driving cars to space exploration, see how AI is shaping the future of technology and human life in amazing ways.', youtubeUrl: 'https://www.youtube.com/embed/76v_EvCnIf8?autoplay=1' },
    { id: 7, title: 'AI in Everyday Life', desc: 'Find out how you are already using AI every single day.', image: 'https://img.youtube.com/vi/vTkn_ce4_qo/hqdefault.jpg', duration: '4:40', level: 'Beginner', content: 'Did you know Netflix recommendations and smartphone face unlock use AI? Let’s explore all the hidden AI around us!', youtubeUrl: 'https://www.youtube.com/embed/vTkn_ce4_qo?autoplay=1' },
    { id: 8, title: 'Understanding Algorithms', desc: 'Learn the secret recipes that make computer programs work.', image: 'https://img.youtube.com/vi/Fvt-Wwl6SMU/hqdefault.jpg', duration: '6:00', level: 'Beginner', content: 'An algorithm is just a step-by-step set of instructions. Discover how computers use these instructions to solve huge problems quickly.', youtubeUrl: 'https://www.youtube.com/embed/Fvt-Wwl6SMU?autoplay=1' },
    { id: 9, title: 'Neural Networks Explained', desc: 'How do computer brains mimic human brains? Let’s find out.', image: 'https://img.youtube.com/vi/_jY3RGb46yY/hqdefault.jpg', duration: '8:15', level: 'Advanced', content: 'Neural networks are designed to work just like our own brains. Learn about neurons, layers, and how they connect to make smart decisions.', youtubeUrl: 'https://www.youtube.com/embed/_jY3RGb46yY?autoplay=1' },
    { id: 10, title: 'Deep Learning for Kids', desc: 'A fun introduction to the deepest parts of machine learning.', image: 'https://img.youtube.com/vi/FU15Eul9KJw/hqdefault.jpg', duration: '5:50', level: 'Intermediate', content: 'Deep learning uses many layers of artificial neurons to understand complex things like human speech and detailed images.', youtubeUrl: 'https://www.youtube.com/embed/FU15Eul9KJw?autoplay=1' },
    { id: 11, title: 'AI and Ethics', desc: 'Why is it important to use Artificial Intelligence responsibly?', image: 'https://img.youtube.com/vi/g7LwR5ZNupg/hqdefault.jpg', duration: '4:55', level: 'Intermediate', content: 'As AI gets smarter, we must make sure it is fair, unbiased, and helpful for everyone. Learn the rules of responsible AI.', youtubeUrl: 'https://www.youtube.com/embed/g7LwR5ZNupg?autoplay=1' },
    { id: 12, title: 'How AI Generates Art', desc: 'Can computers be creative? Discover how AI creates paintings and music.', image: 'https://img.youtube.com/vi/jWDf3l1G9HI/hqdefault.jpg', duration: '6:30', level: 'Beginner', content: 'AI can analyze millions of paintings to learn styles and create brand new artwork from simple text prompts. Let’s see the magic of generative AI!', youtubeUrl: 'https://www.youtube.com/embed/jWDf3l1G9HI?autoplay=1' },
    { id: 13, title: 'Voice Assistants & NLP', desc: 'How does Alexa or Siri understand what you are saying?', image: 'https://img.youtube.com/vi/SfLzvl1yEzA/hqdefault.jpg', duration: '5:10', level: 'Intermediate', content: 'Natural Language Processing helps computers hear your voice, turn it into text, figure out what you mean, and speak back to you.', youtubeUrl: 'https://www.youtube.com/embed/SfLzvl1yEzA?autoplay=1' },
    { id: 14, title: 'Robotics and AI', desc: 'What happens when you put an AI brain into a robot body?', image: 'https://img.youtube.com/vi/Cty3wcYIYgw/hqdefault.jpg', duration: '7:45', level: 'Intermediate', content: 'Robots need AI to navigate, pick up objects, and interact with humans safely. Explore the cool intersection of robotics and AI.', youtubeUrl: 'https://www.youtube.com/embed/Cty3wcYIYgw?autoplay=1' },
    { id: 15, title: 'Building Your First AI', desc: 'Ready to create your own AI? Here is how you can start.', image: 'https://img.youtube.com/vi/y1ef7C8RqBk/hqdefault.jpg', duration: '9:00', level: 'Advanced', content: 'You do not need to be a genius to build AI. Learn about simple tools and block-coding platforms that let anyone create their first smart model!', youtubeUrl: 'https://www.youtube.com/embed/y1ef7C8RqBk?autoplay=1' }
  ];

  const quickStats = [
    { label: 'Learn & Prompt Academy', value: 'Concepts & Prompts', icon: <WandSparkles className="text-purple-600" />, color: 'bg-purple-50' },
    { label: 'Explore Tools', value: 'AI tools', icon: <Cpu className="text-purple-600" />, color: 'bg-purple-50' },
    { label: 'Take Challenges', value: 'Test skills', icon: <Trophy className="text-orange-500" />, color: 'bg-orange-50' }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
        onClick={() => navigate("/#missions-grid")}
        className="fixed top-3 left-3 md:top-5 md:left-5 z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-green-600 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-4 overflow-y-auto">
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">



          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] 2xl:min-h-[380px] pb-4 md:pb-6">
              <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:w-1/2 space-y-3 md:space-y-4">
                <h1 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                  Build. Learn. &amp; <br /> Think Smarter with <br />
                  <span className="text-purple-600">AI Intelligence</span>
                </h1>
                <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                  Your AI-powered learning hub for skills and knowledge.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      const target = document.getElementById("content-section");
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 bg-purple-600 text-white rounded-full font-bold text-[12px] sm:text-[14px] flex items-center gap-2 hover:bg-purple-700 transition-colors w-max shadow-sm shadow-purple-200"
                  >
                    Start Learning <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                <img src="/images/ai/rhs.png" alt="AI Intelligence" className="w-full h-full object-cover object-right-top" />
              </div>
            </section>

            {/* Quick Stats Row — overlapping hero with negative margin */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
              {quickStats.map((stat, i) => {
                const isActive = activeFilter === stat.label;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveFilter(stat.label);
                      const target = document.getElementById("content-section");
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`bg-white rounded-[16px] p-3 md:p-4 border ${isActive ? 'border-purple-500 ring-2 ring-purple-500/10 shadow-md' : 'border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'} flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer group`}
                  >
                    <div className={`w-[44px] h-[44px] ${isActive ? 'bg-purple-600 text-white' : stat.color} rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5`}>
                      {React.cloneElement(stat.icon, { className: isActive ? 'text-white' : stat.icon.props.className })}
                    </div>
                    <div>
                      <h4 className={`text-[13px] font-bold leading-tight transition-colors ${isActive ? 'text-purple-700' : 'text-[#1e1b4b] group-hover:text-purple-600'}`}>{stat.label}</h4>
                      <p className={`text-[11px] font-medium mt-0.5 ${isActive ? 'text-purple-600/80' : 'text-slate-500'}`}>{stat.value}</p>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>

          {/* Content Section */}
          <div id="content-section" className="pt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeFilter === 'Explore Tools' && <ExploreToolsComponent />}
                {activeFilter === 'Take Challenges' && <QuizComponent />}
                {(activeFilter === 'Learn & Prompt Academy' || activeFilter === 'Learn Concepts' || activeFilter === 'Prompt Academy') && <LearnAndPromptAcademyComponent />}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>

      {/* Video Content Modal */}
      <AnimatePresence>
        {selectedItem && selectedItem.type === 'video' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex p-4 sm:p-6 overflow-y-auto"
          >
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[24px] overflow-hidden shadow-2xl z-10 flex flex-col m-auto h-auto"
            >
              <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Play size={20} className="fill-current" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight pr-8">{selectedItem.title}</h2>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><Clock size={14} /> {selectedItem.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-blue-600">{selectedItem.level}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-colors"
                >
                  <XCircle size={20} />
                </button>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="w-full aspect-video bg-slate-900 relative group">
                  {selectedItem.youtubeUrl ? (
                    <iframe
                      src={selectedItem.youtubeUrl}
                      title={selectedItem.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <>
                      <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 cursor-pointer hover:scale-110 hover:bg-blue-600 transition-all">
                          <Play className="ml-1.5 w-8 h-8 fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                        <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-blue-500 rounded-full" />
                        </div>
                        <span className="text-xs text-white font-medium font-mono text-shadow">01:23 / {selectedItem.duration}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-blue-500" /> Lesson Summary
                  </h3>
                  <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed">
                    <p>{selectedItem.content}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AiIntelligenceDashboard;
