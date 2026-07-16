import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {   
  ArrowLeft, ArrowRight, BookOpen, Clock,
  Brain, Lightbulb, Cpu, Trophy, CheckCircle2,
  Play, GraduationCap, XCircle,
  MessageSquare, Sparkles, Palette, Bot, Volume2, Globe,
  WandSparkles, ChevronRight, Copy, Mic, MicOff, HelpCircle, Award, Gamepad2,
  Eye, Shield, Star, Check, Plus, RotateCcw
, Feather, Music, Scale, Image, Calculator, Shapes , PanelLeftClose , PanelLeftOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const toolsCategories = [
  { id: 'All', label: 'All Tools' },
  { id: 'Indian AI', label: 'Indian Tools' },
  { id: 'Writing', label: 'Writing' },
  { id: 'Image', label: 'Image' },
  { id: 'Voice', label: 'Voice' },
  { id: 'Learning', label: 'Learning' },
  { id: 'Productivity', label: 'Productivity' }
];

const toolsDataList = [
  { name: 'Sarvam AI', tag: 'Indic Voice & AI', desc: 'India’s foundational AI platform specialized in Indian languages, voice AI, and localized generative models.', icon: <WandSparkles size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Voice'] },
  { name: 'BharatGPT', tag: 'Multilingual AI', desc: 'India’s indigenous conversational AI assistant supporting 14+ Indian languages with voice and text capabilities.', icon: <MessageSquare size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Writing', 'Learning'] },
  { name: 'ChatGPT', tag: 'Writing Assistant', desc: 'AI chatbot that helps answer questions, write content, and explain ideas.', icon: <MessageSquare size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Writing', 'Learning', 'Productivity'] },
  { name: 'Google Gemini', tag: 'Learning Assistant', desc: 'AI assistant by Google that helps with writing, learning, and exploring ideas.', icon: <Sparkles size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Writing', 'Learning', 'Productivity'] },
  { name: 'Krutrim AI', tag: 'Indic LLM Platform', desc: 'India’s AI platform building multilingual foundational models and generative AI for Indian contexts.', icon: <Sparkles size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Writing', 'Learning'] },
  { name: 'Bhashini AI', tag: 'Indic Translation', desc: 'National AI platform breaking language barriers with speech-to-speech and text translation across Indian languages.', icon: <Globe size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Voice', 'Productivity'] },
  { name: 'Canva AI', tag: 'Image Creator', desc: 'AI design tool that helps create posters, presentations, and images easily.', icon: <Palette size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Image', 'Productivity'] },
  { name: 'Midjourney', tag: 'AI Image Generator', desc: 'Leading AI art generator that creates stunning, realistic images from descriptive prompts.', icon: <Palette size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Image'] },
  { name: 'Stable Diffusion', tag: 'Open Image Model', desc: 'Powerful open-source image generation model that allows precise control over style, composition, and details.', icon: <Palette size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Image', 'Productivity'] },
  { name: 'Hanooman AI', tag: 'Indic Multilingual LLM', desc: 'India’s multilingual AI platform built for regional languages, supporting translation, text generation, and speech in 22+ languages.', icon: <MessageSquare size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Writing', 'Learning'] },
  { name: 'Project Indus', tag: 'Hindi & Dialect LLM', desc: 'A foundational Indian language model built specifically for Hindi and Indian regional dialects to democratize AI.', icon: <Brain size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Learning'] },
  { name: 'QuillBot', tag: 'Writing Helper', desc: 'AI writing tool that helps paraphrase, summarize, and improve your writing.', icon: <Bot size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Writing', 'Productivity'] },
  { name: 'CoRover.ai', tag: 'Conversational AI', desc: 'India’s conversational AI platform powering major public systems like IRCTC’s AskDISHA and AskSarkar chatbots.', icon: <Bot size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Productivity'] },
  { name: 'KissanAI', tag: 'Agri AI Assistant', desc: 'Multilingual AI voice and text assistant providing real-time agricultural advice and farming guidance in regional languages.', icon: <Bot size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI', 'Learning'] },
  { name: 'ElevenLabs', tag: 'Voice AI', desc: 'AI voice tool that converts text into natural-sounding speech.', icon: <Volume2 size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Voice', 'Productivity'] },
  { name: 'Airavat AI', tag: 'AI Infrastructure', desc: 'India’s cloud-based AI supercomputing infrastructure designed to train foundation models and process Indic language datasets.', icon: <Cpu size={22} />, color: 'bg-purple-50 text-purple-600', iconBg: 'bg-purple-100 text-purple-600', categories: ['Indian AI'] },
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
    title: "How to Give Best Prompts",
    concept: "Prompting Basics",
    learn: {
      title: "The Magic Prompt Formula",
      subtitle: "Learn the secret 3-step formula to talk to AI!",
      description: "Talking to AI is like giving instructions to a super-smart robot. If you just say 'help me', it gets confused! Use this systematic magic formula:\n\n**1. Role**: Who should the AI pretend to be? (Example: 'Act as a funny science teacher')\n**2. Task**: What do you want it to do? (Example: 'Explain gravity')\n**3. Details**: What are the rules? (Example: 'Use a maximum of 3 sentences')\n\n**Important Rules:**\n- Be the Boss: Give clear and direct orders.\n- Add Rules: Tell it exactly how long or short the answer should be.\n- Give Examples: Show the AI exactly what you want the output to look like.",
      tips: []
    },
    quest: {
      characterName: "Timetable Helper",
      characterImage: "",
      characterMsg: "I want to ask the AI to help me plan a study timetable for my class 7 exams. If I just say 'make a study plan', it gives a generic, useless schedule. Help me make a clear prompt!",
      targetType: "Script Generator",
      boringPrompt: "make a study plan",
      boringOutputText: "Here is a study plan:\nMorning: Study.\nAfternoon: Study.\nEvening: Study.\nNight: Sleep.",
      superOutputText: "### Class 7 Study Timetable\n- **Role**: Friendly school counselor study guide.\n- **Subject Focus**: Mathematics and Science preparation.\n- **Daily Schedule**:\n  - **4:00 PM - 5:00 PM**: Mathematics practice (formulas & exercises).\n  - **5:00 PM - 5:30 PM**: Fun activity / tea break.\n  - **5:30 PM - 6:30 PM**: Science revision (diagrams & definitions).\n- **Secret Tip**: Take a 5-minute stretch break every 25 minutes!",
      badge: "Master Planner",
      ingredients: [
        { id: "l1_role", label: "Role Power-up", text: "Act as a friendly class 7 tutor,", type: "role", desc: "Tells the AI to be a class 7 tutor." },
        { id: "l1_subject", label: "Subject Power-up", text: "create a daily after-school study timetable for preparing science and math,", type: "detail", desc: "Specifies the subject and time." },
        { id: "l1_details", label: "Detail Power-up", text: "assuming I have 2 hours of study time from 4 PM to 6 PM,", type: "background", desc: "Adds constraints." },
        { id: "l1_finish", label: "Style Power-up", text: "formatted as a clear bulleted list with fun study tips.", type: "style", desc: "Specifies the layout style." }
      ]
    }
  },
  {
    id: 2,
    title: "Solve Math Equations",
    concept: "Mathematics",
    learn: {
      title: "Step-by-Step Math Tutor",
      subtitle: "Ask the AI to explain the logic instead of just giving the answer!",
      description: "If you ask an AI 'what is 2x + 5 = 15?', it will just say 'x = 5'. This doesn't help you learn! Instead, ask it to become a tutor.\n\n**Systematic Example:**\n**[Bad Prompt]**: 'Solve 2x + 5 = 15'\n**[Super Prompt]**: 'Act as a patient math teacher. Solve 2x + 5 = 15 step-by-step. Explain the rule for each step, and verify the final answer at the end.'\n\n**Important Rules:**\n- Ask for Steps: Always include 'Solve this step-by-step'.\n- Ask for the Rules: Tell it to explain the 'why' behind the math.\n- Verify: Ask it to verify the answer by plugging it back into the equation.",
      tips: []
    },
    quest: {
      characterName: "Algebra Wizard",
      characterImage: "",
      characterMsg: "I am stuck on this algebra equation: '3x - 7 = 14'. I want the AI to explain how to solve it step-by-step so I can do it myself next time.",
      targetType: "Script Generator",
      boringPrompt: "solve 3x-7=14",
      boringOutputText: "x = 7",
      superOutputText: "### Solving 3x - 7 = 14 Step-by-Step\n- **Goal**: Find the value of variable 'x'.\n- **Step 1 (Add 7 to both sides)**: To isolate the term with x, add 7 to both sides of the equation.\n  - 3x - 7 + 7 = 14 + 7\n  - 3x = 21\n- **Step 2 (Divide both sides by 3)**: To find x, divide both sides by 3.\n  - 3x / 3 = 21 / 3\n  - x = 7\n- **Verification**: Substitute x = 7 back into the original equation:\n  - 3(7) - 7 = 21 - 7 = 14. This is correct!",
      badge: "Math Genius",
      ingredients: [
        { id: "l2_role", label: "Role Power-up", text: "Act as a patient math teacher,", type: "role", desc: "Tells the AI to be a math teacher." },
        { id: "l2_subject", label: "Subject Power-up", text: "solve the linear equation 3x - 7 = 14 step-by-step,", type: "detail", desc: "Defines the equation to solve." },
        { id: "l2_details", label: "Detail Power-up", text: "explaining the balance rule (doing the same operation on both sides),", type: "background", desc: "Asks for mathematical rules." },
        { id: "l2_finish", label: "Style Power-up", text: "showing the calculation steps clearly and verifying the final answer.", type: "style", desc: "Specifies the output format." }
      ]
    }
  },
  {
    id: 3,
    title: "Notice Writing (Formal)",
    concept: "Formal School Notice",
    learn: {
      title: "The Formal Notice Master",
      subtitle: "Learn the exact layout for writing a professional school notice!",
      description: "Notices are highly **FORMAL**. You must never use casual words like 'Hey' or 'Cool'. A school notice must follow a strict box format.\n\n**Systematic Layout Rules:**\n1. **School Name**: Top center.\n2. **The Word 'NOTICE'**: Right below it, in capital letters.\n3. **Date & Heading**: When and What.\n4. **Body**: Very short (under 50 words).\n5. **Sign-off**: Your name and designation (e.g., 'Head Boy').\n\n**Example Prompt**: 'Act as a Head Girl. Write a formal 50-word school notice about a lost watch following the standard CBSE box format.'\n\n**Important Rules:**\n- Specify the Tone: Always ask for a 'highly formal and respectful tone'.\n- Enforce the Layout: Command the AI to include the 'Date, Heading, and Signature'.\n- Keep it Strict: Set a hard limit of 'maximum 50 words'.",
      tips: []
    },
    quest: {
      characterName: "Notice Editor",
      characterImage: "",
      characterMsg: "As the School Head Boy, I need to write a formal notice for the school notice board about a Lost Water Bottle found in the playground. Help me format it correctly!",
      targetType: "Script Generator",
      boringPrompt: "write lost bottle notice",
      boringOutputText: "I found a bottle on the playground. It is blue. If it is yours, come and take it from me. Thanks.",
      superOutputText: "### NOTICE\n**BIHAR PUBLIC SCHOOL, PATNA**\n\n**Date**: 13th July, 2026\n\n**Subject**: Found: Blue Sports Water Bottle\n\nThis is to inform all students that a blue metal sports water bottle was found in the school playground during the lunch break yesterday. The owner can claim it from the school office after providing proof of ownership.\n\n**Ankit Kumar**\nHead Boy",
      badge: "Star Editor",
      ingredients: [
        { id: "l3_role", label: "Role Power-up", text: "Act as the School Head Boy,", type: "role", desc: "Tells the AI your formal school role." },
        { id: "l3_subject", label: "Subject Power-up", text: "write a formal school notice about a lost blue sports water bottle found in the playground,", type: "detail", desc: "Specifies the official topic." },
        { id: "l3_details", label: "Detail Power-up", text: "using the standard formal school format with Date, Subject, and Designation,", type: "background", desc: "Defines strict formatting guidelines." },
        { id: "l3_finish", label: "Style Power-up", text: "keeping the word count strictly under 50 words in a respectful tone.", type: "style", desc: "Specifies word limits and tone." }
      ]
    }
  },
  {
    id: 4,
    title: "Email & Letters (Informal)",
    concept: "Informal Communication",
    learn: {
      title: "Fun Emails to Friends!",
      subtitle: "How to tell AI to write casual, friendly, and exciting letters!",
      description: "Unlike notices, **INFORMAL** letters and emails (to friends or family) are fun, relaxed, and full of emotion! You don't need a strict box format, but you do need the right vibe.\n\n**Systematic Rules for Informal Prompts:**\n1. **Greeting**: Use words like 'Dear Rohan' or 'Hi Uncle!'.\n2. **Tone**: Tell the AI to use a 'warm, enthusiastic, and friendly tone'.\n3. **Content**: It can be longer, chatty, and include personal feelings or jokes!\n\n**Example Prompt**: 'Act as my funny best friend. Write an informal email inviting me to a weekend movie marathon. Use a very excited tone!'\n\n**Important Rules:**\n- Set the Emotion: Use words like 'excited', 'nostalgic', or 'funny' in your prompt.\n- Casual Sign-off: Ask it to end with 'Lots of love' or 'Catch you later!'.",
      tips: []
    },
    quest: {
      characterName: "Party Planner",
      characterImage: "",
      characterMsg: "I want to send an informal, exciting email to invite my best friend Rahul to my space-themed birthday party! I want it to sound super fun and friendly.",
      targetType: "Script Generator",
      boringPrompt: "write birthday invite to rahul",
      boringOutputText: "Subject: Birthday.\nHi Rahul, come to my birthday on Sunday. We will cut cake. Bye.",
      superOutputText: "### Subject: You're invited to the ultimate SPACE PARTY!\n\nHey Rahul! \n\nHope you're having an awesome week! Guess what? I am throwing a massive Space-Themed Birthday Party this Sunday and you are the VIP guest!\n\nWe are going to have zero-gravity games, a rocket-shaped cake, and tons of pizza! Bring your best astronaut energy.\n\nLet me know if you can make it, I really want you there!\n\nLots of love and rocket fuel,\n**Your Best Friend**",
      badge: "Email Pro",
      ingredients: [
        { id: "l4_role", label: "Role Power-up", text: "Act as an excited best friend,", type: "role", desc: "Sets a fun and friendly role." },
        { id: "l4_subject", label: "Subject Power-up", text: "write an informal email inviting my friend Rahul to a space-themed birthday party,", type: "detail", desc: "Explains the fun event." },
        { id: "l4_details", label: "Detail Power-up", text: "using a warm, enthusiastic, and chatty tone,", type: "background", desc: "Ensures casual politeness." },
        { id: "l4_finish", label: "Style Power-up", text: "including fun space terms and ending with 'Lots of love'.", type: "style", desc: "Adds specific style elements." }
      ]
    }
  },
  {
    id: 5,
    title: "Essay Writing",
    concept: "Structured Essays",
    learn: {
      title: "Story & Essay Builder",
      subtitle: "Tell the AI exactly how to organize your paragraphs!",
      description: "A bad prompt like 'write an essay about lions' gives you a giant, boring wall of text that puts everyone to sleep.\n\nTo write an amazing essay, be an architect! Tell the AI exactly how to build it:\n\n**Systematic Blueprint:**\n1. **Title**: 'Start with a catchy headline.'\n2. **Structure**: 'Write exactly 3 paragraphs.'\n3. **Content Map**: 'Paragraph 1 is the Introduction. Paragraph 2 is about Family Life. Paragraph 3 is the Conclusion.'\n\nThis guarantees a beautifully structured essay every single time!\n\n**Important Rules:**\n- Tell the AI the layout: Demand subheadings for each section.\n- Set a length limit: Give a strict limit like '100 words per paragraph'.\n- Define the audience: 'Write this so a 10-year-old can understand it.'",
      tips: []
    },
    quest: {
      characterName: "Creative Author",
      characterImage: "",
      characterMsg: "I want to write a short essay about lions for my class. My boring prompt 'write an essay about lions' is just too long and messy. Can you help me prompt the AI to write a structured, 3-paragraph essay with a catchy title?",
      targetType: "Script Generator",
      boringPrompt: "write an essay about lions",
      boringOutputText: "Lions are big cats. They live in Africa. They are called the king of the jungle. They hunt in groups called prides. They eat meat. They sleep a lot.",
      superOutputText: "### The Majestic Kings of the Savannah\n\n**Introduction**: Lions are powerful big cats that live in the grassy savannahs of Africa. They are famous for their golden fur, loud roars, and strong bodies, earning them the title 'King of the Jungle'.\n\n**Family Life**: Unlike other cats, lions live in large family groups called prides. The female lionesses do most of the hunting and work together to protect their cute cubs.\n\n**Conclusion**: Lions are essential protectors of their environment. By keeping the animal population in balance, they help keep the savannah healthy and beautiful for everyone.",
      badge: "Master Essayist",
      ingredients: [
        { id: "l5_role", label: "Role Power-up", text: "Act as a creative children's encyclopedia writer,", type: "role", desc: "Sets a creative writer role." },
        { id: "l5_subject", label: "Subject Power-up", text: "write an informative article about the life of African lions,", type: "detail", desc: "Sets the animal topic." },
        { id: "l5_details", label: "Detail Power-up", text: "structured with a title and exactly three paragraphs (Introduction, Body, Conclusion),", type: "background", desc: "Specifies paragraph structure." },
        { id: "l5_finish", label: "Style Power-up", text: "using an engaging and educational tone suitable for a school project.", type: "style", desc: "Selects tone." }
      ]
    }
  },
  {
    id: 6,
    title: "Comprehension Helper",
    concept: "Reading Comprehension",
    learn: {
      title: "Understand Any Difficult Text",
      subtitle: "Ask the AI to break down difficult text and create practice quizzes!",
      description: "Ever read a paragraph in English class and thought, 'What does this even mean?!' AI can be your personal translator!\n\nInstead of just asking 'explain this', use a **Systematic Learning Prompt**:\n\n1. **Summarize**: 'Extract the 3 most important facts from this story.'\n2. **Vocabulary**: 'Find 2 difficult words in the text and explain their meaning using simple examples.'\n3. **Test Me**: 'Generate a multiple-choice question to test if I understood it.'\n\n**Important Rules:**\n- Ask for Bullet Points: It makes summaries much easier to read.\n- Demand Simplicity: Tell the AI to 'explain it like I am 12 years old'.\n- Self-Test: The best way to learn is by taking a mini-quiz at the end!",
      tips: []
    },
    quest: {
      characterName: "Literary Guide",
      characterImage: "",
      characterMsg: "I have this short passage about the Invention of the Printing Press. I want the AI to help me summarize it and quiz me so I can study for my comprehension exam.",
      targetType: "Script Generator",
      boringPrompt: "explain this printing press paragraph",
      boringOutputText: "The printing press was invented by Johannes Gutenberg in the 15th century. It made books cheaper and allowed people to read more.",
      superOutputText: "### Printing Press Comprehension Guide\n- **Key Summary Points**:\n  1. Johannes Gutenberg invented the printing press in Germany around 1440.\n  2. It allowed books to be mass-produced, making them affordable for common people.\n  3. It started a reading revolution, spreading knowledge and education quickly.\n- **Vocabulary Builder**:\n  - Mass-produced: Made in large quantities using machines (like making 1000 books instead of copying 1 by hand).\n  - Revolution: A huge change in the way people live or work.\n- **Quick Quiz**:\n  - Q: Who invented the printing press?\n  - A: Johannes Gutenberg",
      badge: "Text Explorer",
      ingredients: [
        { id: "l6_role", label: "Role Power-up", text: "Act as an English comprehension tutor,", type: "role", desc: "Tells the AI to act as a tutor." },
        { id: "l6_subject", label: "Subject Power-up", text: "analyze the passage about the printing press and extract 3 main facts,", type: "detail", desc: "Defines the text to analyze." },
        { id: "l6_details", label: "Detail Power-up", text: "list and define any 2 difficult words in simple student-friendly terms,", type: "background", desc: "Asks for vocabulary help." },
        { id: "l6_finish", label: "Style Power-up", text: "generate a 1-question check quiz with answer key at the bottom.", type: "style", desc: "Requests a quick self-test." }
      ]
    }
  },
  {
    id: 7,
    title: "Science: Photosynthesis",
    concept: "Science Concepts",
    learn: {
      title: "Explain Science with Metaphors",
      subtitle: "Learn complex science by comparing it to everyday fun things!",
      description: "Science can have hard, scary words like 'chlorophyll' or 'stomata'. A boring prompt gives a boring textbook definition.\n\nTo make science fun, use **Metaphors** (comparisons)! Ask the AI to compare a confusing science topic to something you already understand.\n\n**Systematic Example:**\n**[Bad]**: 'Explain photosynthesis.'\n**[Super]**: 'Explain photosynthesis by comparing the plant to a Chef cooking in a kitchen. Explain what the ingredients (sun, water, CO2) are, and what the final dish is!'\n\n**Important Rules:**\n- Use Metaphors: Compare atoms to LEGOs, or blood cells to delivery trucks.\n- Simple Words: Ask the AI to explain terms in language a 6th grader can understand.\n- Visuals: Ask it to describe what a diagram of the process would look like.",
      tips: []
    },
    quest: {
      characterName: "Science Tutor",
      characterImage: "",
      characterMsg: "I need to learn Photosynthesis for my science test tomorrow, but the textbook definition is too confusing. Help me prompt the AI to explain it like a cooking recipe!",
      targetType: "Script Generator",
      boringPrompt: "what is photosynthesis",
      boringOutputText: "Photosynthesis is the process by which green plants use sunlight, carbon dioxide, and water to synthesize nutrients.",
      superOutputText: "### Plant Kitchen: The Photosynthesis Recipe\n- **The Metaphor**: The Leaf is a mini kitchen, and the Plant is a Chef!\n- **The Ingredients**:\n  1. **Sunlight**: The stove or heat source (captured by chlorophyll, the chef's solar panels).\n  2. **Water**: Drawn from the roots (like water from the tap).\n  3. **Carbon Dioxide**: Sucked in from the air through tiny leaf pores (like fresh air from the kitchen window).\n- **The Dish**: Glucose (sugar food) and fresh Oxygen (released into the air for us!).",
      badge: "Junior Scientist",
      ingredients: [
        { id: "l7_role", label: "Role Power-up", text: "Act as a friendly middle school science teacher,", type: "role", desc: "Sets a teaching role." },
        { id: "l7_subject", label: "Subject Power-up", text: "explain the process of photosynthesis using a cooking metaphor,", type: "detail", desc: "Defines the metaphor type." },
        { id: "l7_details", label: "Detail Power-up", text: "explaining the roles of chlorophyll, water, carbon dioxide, and oxygen,", type: "background", desc: "Includes terms." },
        { id: "l7_finish", label: "Style Power-up", text: "using a simple, exciting tone with bullet points.", type: "style", desc: "Formats as list." }
      ]
    }
  },
  {
    id: 8,
    title: "Science: Water Cycle",
    concept: "Science Concepts",
    learn: {
      title: "Learn Through Storytelling",
      subtitle: "Turn boring science stages into an epic adventure story!",
      description: "The water cycle has four major parts: Evaporation, Condensation, Precipitation, and Collection. Memorizing them is boring!\n\nInstead, ask the AI to write an **Adventure Story**.\n\n**Systematic Trick:**\nWhen you read a story about a little water droplet named 'Dewey' going on a wild skydive, your brain remembers the facts 10x better! Combine facts with fiction to create the perfect study notes.\n\n**Important Rules:**\n- Story Method: Ask the AI to explain a cycle by telling a story about a fun character.\n- Force Vocabulary: Command the AI: 'You MUST include these exact scientific words...'\n- Summary: Ask for a quick 1-sentence recap at the very end.",
      tips: []
    },
    quest: {
      characterName: "Nature Explorer",
      characterImage: "",
      characterMsg: "I need to remember the 4 stages of the water cycle for my science exam. Let's make a prompt that tells the adventure of a water droplet!",
      targetType: "Script Generator",
      boringPrompt: "what are the stages of the water cycle",
      boringOutputText: "The stages of the water cycle are evaporation, condensation, precipitation, and run-off.",
      superOutputText: "### Dewey's Grand Water Cycle Adventure\n- **Stage 1: Evaporation (The Lift)**: Dewey the water droplet lies in a warm lake. The hot sun shines down, heating him up until he turns into invisible water vapor and floats high into the sky!\n- **Stage 2: Condensation (The Cloud)**: High up, the air is cold. Dewey cools down, turns back into a water droplet, and clings to his friends to form a soft, white cloud.\n- **Stage 3: Precipitation (The Dive)**: The cloud gets heavy. Dewey and his friends drop down as cool, refreshing rain!\n- **Stage 4: Collection (Home)**: Dewey lands on the soil and flows into a river, ready to start the journey again.",
      badge: "Eco Warrior",
      ingredients: [
        { id: "l8_role", label: "Role Power-up", text: "Act as a creative science storyteller,", type: "role", desc: "Tells the AI to be a storyteller." },
        { id: "l8_subject", label: "Subject Power-up", text: "explain the water cycle through a short story about a water droplet,", type: "detail", desc: "Sets story subject." },
        { id: "l8_details", label: "Detail Power-up", text: "clearly highlighting evaporation, condensation, and precipitation,", type: "background", desc: "Demands cycle terminology." },
        { id: "l8_finish", label: "Style Power-up", text: "written in a fun, educational narrative style for kids.", type: "style", desc: "Selects storytelling tone." }
      ]
    }
  },
  {
    id: 9,
    title: "Image Generation",
    concept: "AI Art Creation",
    learn: {
      title: "Be an AI Art Director",
      subtitle: "Describe colors, style, and lighting to generate masterpieces!",
      description: "When using AI image generators, a simple prompt like 'a turtle' will give you a plain, boring photograph.\n\nTo make a masterpiece, you must act like a Hollywood Art Director! Build your prompt systematically:\n\n1. **The Subject**: What is the main thing? (A turtle flying in space)\n2. **The Medium/Style**: How is it drawn? (3D Pixar animation, or glowing neon chalk?)\n3. **The Lighting**: Where is the light coming from? (Cinematic lighting, warm sunset, glowing edges)\n\n**Important Rules:**\n- Specify the Art Style: Use terms like '8-bit pixel art', 'watercolor', or 'cyberpunk'.\n- Describe the Lighting: Lighting changes everything! Try 'golden hour' or 'neon glow'.\n- Add fine details: Describe the character's clothing, expressions, and surroundings.",
      tips: []
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
        { id: "l9_role", label: "Medium Power-up", text: "A glowing neon chalk illustration drawn on a dark slate blackboard,", type: "role", desc: "Sets the specific art medium." },
        { id: "l9_subject", label: "Subject Power-up", text: "showing a magical sea turtle swimming through the cosmos,", type: "detail", desc: "Describes the turtle subject." },
        { id: "l9_details", label: "Detail Power-up", text: "with its shell made of shimmering violet star constellations,", type: "background", desc: "Adds galactic details to the shell." },
        { id: "l9_finish", label: "Texture Power-up", text: "creating bright glowing edges and dusty chalk textures.", type: "style", desc: "Adds glowing borders and textures." }
      ]
    }
  },
  {
    id: 10,
    title: "Story Writing (Narrative)",
    concept: "Creative Writing",
    learn: {
      title: "The Master Storyteller",
      subtitle: "Prompt AI to write a thrilling story with characters and plot twists!",
      description: "Writing a story is like directing a movie. If you just say 'write a story about a dog', the AI will write something very boring.\n\n**Systematic Blueprint:**\n1. **Setting**: Where does it happen? (e.g., A haunted forest in 2050).\n2. **Characters**: Who is the hero? (e.g., Max, a robot dog).\n3. **Conflict**: What is the problem? (e.g., He lost his battery).\n4. **Resolution**: How does it end? (e.g., He uses solar power to save the day).\n\n**Important Rules:**\n- Set the Tone: Tell the AI if it should be scary, funny, or mysterious.\n- Add Dialogue: Command the AI to include conversations between characters.",
      tips: []
    },
    quest: {
      characterName: "Story Weaver",
      characterImage: "",
      characterMsg: "I need to write a suspenseful short story for my English assignment about a lost treasure in a jungle. Help me prompt the AI to make it exciting!",
      targetType: "Script Generator",
      boringPrompt: "write a story about jungle treasure",
      boringOutputText: "Once upon a time, there was a jungle. A boy went inside. He found a treasure box. He was very happy and went home.",
      superOutputText: "### The Secret of the Emerald Vine\n\nThe Amazon jungle was thick with fog as Leo hacked through the vines. He was exhausted, but the map in his hands glowed faintly in the dark. \n\nSuddenly, he heard a low growl from the bushes. 'Who goes there?' Leo shouted, his heart pounding. \n\nFrom the shadows emerged a giant golden jaguar, guarding the entrance to the ancient Emerald Temple. Using his quick wits, Leo offered the jaguar his shiny compass. The beast sniffed it, purred, and let him pass, revealing a room filled with glowing green gems!",
      badge: "Master Novelist",
      ingredients: [
        { id: "l10_role", label: "Role Power-up", text: "Act as a suspenseful mystery author,", type: "role", desc: "Sets the author persona." },
        { id: "l10_subject", label: "Subject Power-up", text: "write a short story about an explorer named Leo finding treasure in the jungle,", type: "detail", desc: "Sets the plot and character." },
        { id: "l10_details", label: "Detail Power-up", text: "including a conflict with a wild animal and a clever resolution,", type: "background", desc: "Adds the problem and solution." },
        { id: "l10_finish", label: "Style Power-up", text: "using descriptive words and at least one line of dialogue.", type: "style", desc: "Forces dialogue and adjectives." }
      ]
    }
  },
  {
    id: 11,
    title: "Poem Writing",
    concept: "Creative Writing",
    learn: {
      title: "The Poetry Generator",
      subtitle: "Command AI to rhyme and use rhythm perfectly!",
      description: "Poems need rhythm, rhyming words, and deep meanings. A plain prompt gives a plain poem.\n\n**Systematic Blueprint:**\n1. **Topic & Theme**: What is the poem about? (e.g., A rainy day and feeling cozy).\n2. **Structure**: How many stanzas (paragraphs)? (e.g., 3 stanzas).\n3. **Rhyme Scheme**: AABB (every two lines rhyme) or ABAB (alternate lines rhyme).\n\n**Important Rules:**\n- Specify the Rhyme: Always tell the AI the exact rhyme scheme you want.\n- Metaphors: Ask the AI to compare things (e.g., 'compare the rain to a dancer').",
      tips: []
    },
    quest: {
      characterName: "Poetry Bard",
      characterImage: "",
      characterMsg: "I want to write a beautiful 2-stanza poem about the Moon for my school magazine. Let's make it rhyme perfectly!",
      targetType: "Script Generator",
      boringPrompt: "write a poem about the moon",
      boringOutputText: "The moon is very bright.\nIt comes out in the night.\nIt is up in the sky.\nWay up high.",
      superOutputText: "### The Silver Watcher\n\nA silver coin tossed in the night,\nIt bathes the world in gentle light.\nIt watches while the children sleep,\nAnd guards the secrets in the deep.\n\nThough clouds may try to hide its face,\nIt glides along with silent grace.\nA lonely traveler in the dark,\nLeaving a glowing, peaceful mark.",
      badge: "Master Poet",
      ingredients: [
        { id: "l11_role", label: "Role Power-up", text: "Act as an award-winning poet,", type: "role", desc: "Sets the poetic role." },
        { id: "l11_subject", label: "Subject Power-up", text: "write a poem about the moon watching over the sleeping world,", type: "detail", desc: "Sets the theme." },
        { id: "l11_details", label: "Detail Power-up", text: "structured in exactly 2 stanzas using an AABB rhyme scheme,", type: "background", desc: "Forces exact poem structure." },
        { id: "l11_finish", label: "Style Power-up", text: "using gentle and peaceful vocabulary.", type: "style", desc: "Sets the mood." }
      ]
    }
  },
  {
    id: 12,
    title: "Argumentative Composition",
    concept: "Debate & Essays",
    learn: {
      title: "The Great Debater",
      subtitle: "Learn to build strong arguments and counter-arguments!",
      description: "In an argumentative essay, you must pick a side and defend it with logic. If you just ask AI to 'write about homework', it will just ramble.\n\n**Systematic Blueprint:**\n1. **Stance**: Tell the AI exactly which side to take (e.g., 'Homework should be banned').\n2. **Arguments**: Ask for 3 strong logical points.\n3. **Counter-Argument**: Acknowledge the other side (e.g., 'Some say homework helps practice, BUT...').\n4. **Conclusion**: End with a powerful closing statement.\n\n**Important Rules:**\n- Use Transition Words: Tell AI to use words like 'Firstly', 'However', and 'In conclusion'.\n- Stay Formal: Arguments should sound logical, not emotional.",
      tips: []
    },
    quest: {
      characterName: "Debate Captain",
      characterImage: "",
      characterMsg: "I have a debate tomorrow. My topic is 'Junk Food should be banned in school canteens'. Help me prompt the AI to write a solid argumentative essay!",
      targetType: "Script Generator",
      boringPrompt: "write an essay on banning junk food",
      boringOutputText: "Junk food is bad. It makes you sick. Schools should not sell it. Students should eat apples instead. That is why it should be banned.",
      superOutputText: "### The Case Against Junk Food in Schools\n\n**Introduction**: School is a place for holistic development, which includes both mental and physical health. Therefore, junk food must be strictly banned in school canteens.\n\n**Key Arguments**: \nFirstly, junk food is highly processed and causes lethargy, reducing a student's ability to focus in class. Secondly, daily consumption leads to severe long-term health issues like obesity. \n\n**Counter-Argument**: Some argue that students should have the freedom to choose their food. However, children are often too young to make healthy choices when tempted by sugar.\n\n**Conclusion**: By replacing junk food with nutritious options, schools can actively protect the health and focus of their students.",
      badge: "Master Debater",
      ingredients: [
        { id: "l12_role", label: "Role Power-up", text: "Act as an expert debate captain,", type: "role", desc: "Sets a strong debating tone." },
        { id: "l12_subject", label: "Subject Power-up", text: "write an argumentative essay arguing that junk food should be banned in schools,", type: "detail", desc: "Sets the exact stance." },
        { id: "l12_details", label: "Detail Power-up", text: "including an introduction, 2 strong arguments, and 1 counter-argument,", type: "background", desc: "Defines the debate layout." },
        { id: "l12_finish", label: "Style Power-up", text: "using formal transition words like 'Firstly' and 'However'.", type: "style", desc: "Forces professional language." }
      ]
    }
  },
  {
    id: 13,
    title: "Descriptive Writing",
    concept: "Creative Writing",
    learn: {
      title: "Paint with Words",
      subtitle: "Use the 5 senses to describe a scene vividly!",
      description: "Descriptive writing is all about making the reader feel like they are inside the story. \n\n**Systematic Blueprint:**\nInstead of saying 'The market was crowded', you must use **Sensory Details**:\n1. **Sight**: What do you see? (Bright red apples, flashing neon signs).\n2. **Sound**: What do you hear? (Honking horns, shouting vendors).\n3. **Smell**: What do you smell? (Freshly baked bread, exhaust fumes).\n\n**Important Rules:**\n- Force Sensory Details: Explicitly command the AI: 'Describe what I can hear, see, and smell.'\n- Use Adjectives: Ask it to use strong, descriptive adjectives.",
      tips: []
    },
    quest: {
      characterName: "Word Painter",
      characterImage: "",
      characterMsg: "I need to describe a 'Busy Train Station' for my English composition. Make sure the prompt tells the AI to use lots of sensory details!",
      targetType: "Script Generator",
      boringPrompt: "describe a busy train station",
      boringOutputText: "The train station was very busy. Many people were walking around. Trains were coming and going. It was loud.",
      superOutputText: "### The Bustling Station\n\nStepping into the central train station felt like entering a massive, swirling tornado of life. \n\n**Sight**: A sea of passengers rushed past, dragging heavy, scuffed suitcases over the polished marble floors. Bright yellow departure boards flashed rapidly above the crowds.\n**Sound**: The air vibrated with the screeching of metal brakes as trains pulled in, mixing with the muffled voice of the announcer echoing through the speakers.\n**Smell**: A distinct scent filled the air—a mix of metallic train oil and the sweet aroma of hot coffee from the corner bakery.",
      badge: "Sensory Writer",
      ingredients: [
        { id: "l13_role", label: "Role Power-up", text: "Act as a descriptive novelist,", type: "role", desc: "Sets the writer persona." },
        { id: "l13_subject", label: "Subject Power-up", text: "describe a busy central train station during rush hour,", type: "detail", desc: "Sets the exact scene." },
        { id: "l13_details", label: "Detail Power-up", text: "focusing specifically on sensory details of sight, sound, and smell,", type: "background", desc: "Forces sensory usage." },
        { id: "l13_finish", label: "Style Power-up", text: "using rich adjectives and categorizing the senses clearly.", type: "style", desc: "Organizes the output." }
      ]
    }
  },
  {
    id: 14,
    title: "Picture Composition",
    concept: "Creative Writing",
    learn: {
      title: "The Scene Detective",
      subtitle: "Learn to describe an image and build a story around it!",
      description: "In picture composition, you are given an image and asked to write a story about it. Since AI can't always 'see' your exam paper, you must become its eyes!\n\n**Systematic Blueprint:**\n1. **Describe the Image**: Tell the AI exactly what is in the picture. (e.g., 'A boy holding a broken kite under a tree').\n2. **Background**: Ask the AI to guess what happened before the picture.\n3. **Future**: Ask the AI to guess what happens after the picture.\n\n**Important Rules:**\n- Be highly detailed when describing the picture to the AI.\n- Ask for a 'beginning, middle, and end' to make it a complete story.",
      tips: []
    },
    quest: {
      characterName: "Visual Detective",
      characterImage: "",
      characterMsg: "I have a picture of a little girl offering an umbrella to a stray dog in the rain. Let's describe it to the AI and have it write a touching composition!",
      targetType: "Script Generator",
      boringPrompt: "write a story about a girl giving umbrella to dog",
      boringOutputText: "A girl saw a dog in the rain. She gave it her umbrella. The dog was happy. They became friends.",
      superOutputText: "### A Friend in the Storm\n\n**The Scene**: Heavy rain poured down, turning the street into a muddy river. A small girl in a bright yellow raincoat held her umbrella over a shivering stray puppy.\n\n**Before**: The puppy had been wandering for hours, frightened by the loud thunder, trying to find a dry spot under a bench.\n\n**After**: The girl gently scooped up the cold puppy and wrapped him in her scarf. She carried him all the way home, knowing she had just found her new best friend.",
      badge: "Master Observer",
      ingredients: [
        { id: "l14_role", label: "Role Power-up", text: "Act as an observant creative writer,", type: "role", desc: "Sets the writer persona." },
        { id: "l14_subject", label: "Subject Power-up", text: "write a picture composition about an image of a girl offering her umbrella to a stray dog in heavy rain,", type: "detail", desc: "Explains the picture to the AI." },
        { id: "l14_details", label: "Detail Power-up", text: "describing the scene, what happened before, and what happens next,", type: "background", desc: "Forces the timeline." },
        { id: "l14_finish", label: "Style Power-up", text: "using emotional language and bold headers for sections.", type: "style", desc: "Organizes the output." }
      ]
    }
  },
  {
    id: 15,
    title: "Math: Word Problems",
    concept: "Mathematics",
    learn: {
      title: "The Problem Cracker",
      subtitle: "Break down confusing word problems into simple facts!",
      description: "Word problems in math can be tricky because there is too much text. AI can help you decode them!\n\n**Systematic Blueprint:**\nInstead of just asking for the answer, command the AI to dissect the problem:\n1. **Given Facts**: What numbers do we already know?\n2. **The Goal**: What exactly do we need to find?\n3. **The Formula**: Which formula should we use?\n4. **Step-by-Step Solution**: Show the working.\n\n**Important Rules:**\n- Never just ask for the answer. Ask for the 'Given Facts' and 'Formula' first!",
      tips: []
    },
    quest: {
      characterName: "Math Detective",
      characterImage: "",
      characterMsg: "I have a tough word problem: 'A train travels 300km in 4 hours. What is its speed in km/h?'. Let's ask the AI to break it down perfectly.",
      targetType: "Script Generator",
      boringPrompt: "solve: train travels 300km in 4 hours what is speed",
      boringOutputText: "Speed = 75 km/h",
      superOutputText: "### Word Problem Breakdown\n\n- **Given Facts**:\n  - Distance traveled = 300 km\n  - Time taken = 4 hours\n- **The Goal**:\n  - Find the Speed in km/h.\n- **The Formula**:\n  - Speed = Distance / Time\n- **Step-by-Step Solution**:\n  1. Substitute the values: Speed = 300 / 4\n  2. Perform the division: 300 / 4 = 75\n- **Final Answer**: The speed of the train is 75 km/h.",
      badge: "Word Problem Ace",
      ingredients: [
        { id: "l15_role", label: "Role Power-up", text: "Act as a logical math tutor,", type: "role", desc: "Sets a teaching role." },
        { id: "l15_subject", label: "Subject Power-up", text: "solve the word problem: A train travels 300km in 4 hours, what is its speed?", type: "detail", desc: "Provides the exact math problem." },
        { id: "l15_details", label: "Detail Power-up", text: "breaking it down into Given Facts, The Goal, and The Formula,", type: "background", desc: "Forces the breakdown structure." },
        { id: "l15_finish", label: "Style Power-up", text: "showing the step-by-step working before giving the final answer.", type: "style", desc: "Demands the full working." }
      ]
    }
  },
  {
    id: 16,
    title: "Math: Geometry Proofs",
    concept: "Mathematics",
    learn: {
      title: "The Geometry Guide",
      subtitle: "Use AI to understand confusing theorems and shapes!",
      description: "Geometry proofs can be very confusing. AI can explain them using simple logic and real-world examples.\n\n**Systematic Blueprint:**\nWhen struggling with a theorem (like Pythagoras or Properties of Triangles):\n1. **Simple Definition**: Ask the AI to explain the theorem in one simple sentence.\n2. **Real World Example**: Ask how this is used in real life (like building a house).\n3. **Step-by-Step Proof**: Ask it to prove a simple example.\n\n**Important Rules:**\n- Always ask for a real-world application so your brain remembers it better!",
      tips: []
    },
    quest: {
      characterName: "Shape Master",
      characterImage: "",
      characterMsg: "I don't understand the Pythagorean Theorem. Let's prompt the AI to explain it simply with a real-world example!",
      targetType: "Script Generator",
      boringPrompt: "explain pythagoras theorem",
      boringOutputText: "In a right-angled triangle, the square of the hypotenuse side is equal to the sum of squares of the other two sides. a2 + b2 = c2.",
      superOutputText: "### The Pythagorean Theorem\n\n- **Simple Definition**: If you have a triangle with one 90-degree angle, multiplying the two shorter sides by themselves and adding them together will always equal the longest side multiplied by itself (a2 + b2 = c2).\n- **Real-World Example**: Imagine a ladder leaning against a wall. The wall and the ground make a 90-degree angle. If you know the height of the wall and distance on the ground, Pythagoras tells you exactly how long the ladder is!\n- **Proof Example**:\n  - Side a = 3, Side b = 4\n  - 3 squared + 4 squared = 9 + 16 = 25\n  - Since c squared = 25, Side c (the longest side) must be 5!",
      badge: "Geometry Genius",
      ingredients: [
        { id: "l16_role", label: "Role Power-up", text: "Act as a fun geometry teacher,", type: "role", desc: "Sets a fun teaching role." },
        { id: "l16_subject", label: "Subject Power-up", text: "explain the Pythagorean Theorem in one simple sentence,", type: "detail", desc: "Asks for simple definition." },
        { id: "l16_details", label: "Detail Power-up", text: "providing a real-world example of how it is used (like a ladder),", type: "background", desc: "Adds real-world context." },
        { id: "l16_finish", label: "Style Power-up", text: "and showing a basic number proof with clear bullet points.", type: "style", desc: "Demands formatted proof." }
      ]
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
        {isAwesome ? "✨" : "😴"}
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
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="space-y-3 text-left font-body">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;

        // Header: ### Title
        if (trimmed.startsWith('###')) {
          return (
            <h4 key={idx} className="text-base sm:text-lg font-black text-purple-900 border-b border-purple-100 pb-1.5 font-display mt-2">
              {trimmed.replace('###', '').trim()}
            </h4>
          );
        }

        // List item starting with - or 
        if (trimmed.startsWith('-') || trimmed.startsWith(' ')) {
          const content = trimmed.replace(/^[-]\s/, '');
          return (
            <div key={idx} className="flex gap-2.5 items-start pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                {renderFormattedSpan(content)}
              </p>
            </div>
          );
        }

        // Normal paragraph or title block
        return (
          <p key={idx} className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
            {renderFormattedSpan(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

const renderFormattedSpan = (textStr) => {
  if (!textStr) return "";
  // Simple bold parser for **text**
  const parts = textStr.split('**');
  return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-extrabold text-slate-900 bg-purple-50 px-1 rounded">{part}</strong> : part);
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
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(true);
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

  const renderDynamicProgressiveOutput = () => {
    if (selectedIngredients.length === 0 || selectedIngredients.length === 4) return null;

    const allIngredients = activeLesson.quest.ingredients;
    const hasRole = selectedIngredients.find(i => i.id === allIngredients[0].id);
    const hasSubject = selectedIngredients.find(i => i.id === allIngredients[1].id);
    const hasDetail = selectedIngredients.find(i => i.id === allIngredients[2].id);
    const hasStyle = selectedIngredients.find(i => i.id === allIngredients[3].id);

    let outputText = "";
    let missingFeedback = [];

    if (!hasRole) missingFeedback.push("Robotic Tone (Missing Role)");
    if (!hasSubject) missingFeedback.push("No Topic (Missing Subject)");
    if (!hasDetail) missingFeedback.push("Very Brief (Missing Details)");
    if (!hasStyle) missingFeedback.push("Hard to Read (Missing Style)");

    if (activeLesson.quest.targetType === "Image Creator") {
      if (!hasSubject) {
        outputText = "Error: Cannot generate image. Please provide a Subject to draw!";
      } else {
        outputText = "Generating Image... [Result is very plain and lacks artistic direction. Add more rules!]";
      }
      
      return (
        <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 mt-2 w-full">
           <div className="w-6 h-6 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm">
              <Lightbulb size={14} />
           </div>
           <div className="bg-white border border-amber-200 text-slate-700 text-sm p-3.5 rounded-2xl rounded-tl-sm shadow-sm w-full">
              <span className="font-bold block mb-1 text-amber-500">
                 {selectedIngredients.length === 1 ? 'Incomplete Prompt ⚠️' : selectedIngredients.length === 2 ? 'Getting Closer 💡' : 'Almost Perfect ✨'}
              </span>
              <p className="mb-3 text-xs sm:text-sm text-slate-500">
                 I analyzed your prompt. Here is the generated result and why it is failing:
              </p>
              <div className="mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-inner">
                 <div className="flex gap-2 flex-wrap mb-3">
                    {missingFeedback.map((fb, i) => (
                      <span key={i} className="text-[10px] font-black uppercase bg-rose-50 text-rose-600 px-2 py-1 rounded-md border border-rose-100">{fb}</span>
                    ))}
                 </div>
                 {hasSubject ? (
                    <img src={activeLesson.quest.boringOutputImage || "/images/ai/flat_turtle.png"} className="rounded-lg w-full border border-slate-200 opacity-90 shadow-sm" alt="Boring Result" />
                 ) : (
                    <div className="text-xs text-rose-500 italic font-mono bg-rose-50 p-2 rounded-md border border-rose-100">{outputText}</div>
                 )}
              </div>
           </div>
        </div>
      );
    }

    // Text output logic
    if (!hasSubject) {
       outputText = "I am ready to write... but I don't know what the topic is yet! Please give me a subject.";
    } else {
       outputText = activeLesson.quest.boringOutputText || "This is a very generic and boring response because the prompt lacks specific details.";
       if (hasRole) {
          outputText = "Hello! " + outputText;
       }
       if (hasDetail) {
          outputText += " [I tried to add some details but I am struggling without all the rules...]";
       }
       if (hasStyle) {
          outputText = "• " + outputText.replace(/\n/g, "\n• ");
       }
    }

    return (
        <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 mt-2 w-full">
           <div className="w-6 h-6 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm">
              <Lightbulb size={14} />
           </div>
           <div className="bg-white border border-amber-200 text-slate-700 text-sm p-3.5 rounded-2xl rounded-tl-sm shadow-sm w-full">
              <span className="font-bold block mb-1 text-amber-500">
                 {selectedIngredients.length === 1 ? 'Incomplete Prompt ⚠️' : selectedIngredients.length === 2 ? 'Getting Closer 💡' : 'Almost Perfect ✨'}
              </span>
              <p className="mb-3 text-xs sm:text-sm text-slate-500">
                 I analyzed your prompt. Here is the generated result and why it is failing:
              </p>
              <div className="mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-inner">
                 <div className="flex gap-2 flex-wrap mb-3">
                    {missingFeedback.map((fb, i) => (
                      <span key={i} className="text-[10px] font-black uppercase bg-rose-50 text-rose-600 px-2 py-1 rounded-md border border-rose-100">{fb}</span>
                    ))}
                 </div>
                 <div className="text-xs sm:text-sm text-slate-600 font-medium italic border-l-2 border-slate-300 pl-3 py-1 whitespace-pre-line">
                    "{outputText}"
                 </div>
              </div>
           </div>
        </div>
    );
  };


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
            Master the art of asking AI and unlock magical results through {lessonsData.length} Learn Prompting!
          </p>
        </div>
      </div>



      {/* Main double column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Syllabus Navigator */}
        {isSyllabusOpen && (
        <div className="lg:col-span-3 space-y-3 max-h-[620px] overflow-y-auto pr-1 prompt-academy-scrollbar" data-lenis-prevent>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-[11px] sm:text-xs font-black text-slate-400 uppercase tracking-widest font-display">
              Syllabus 
            </h3>
            <button onClick={() => setIsSyllabusOpen(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-lg transition-colors shadow-sm" title="Close Syllabus">
              <PanelLeftClose size={14} />
            </button>
          </div>
          {lessonsData.map((lesson, idx) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isActive = activeLessonIdx === idx;
            const isLocked = false;

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
                  <div className="w-10 h-10 rounded-xl bg-purple-50/50 flex items-center justify-center shrink-0 shadow-sm border border-purple-100 text-purple-600">
                    {(() => {
                      const size = 20;
                      switch (lesson.id) {
                        case 1: return <Lightbulb size={size} />;
                        case 2: return <Brain size={size} />;
                        case 3: return <BookOpen size={size} />;
                        case 4: return <MessageSquare size={size} />;
                        case 5: return <BookOpen size={size} />;
                        case 6: return <BookOpen size={size} />;
                        case 7: return <Cpu size={size} />;
                        case 8: return <Globe size={size} />;
                        case 9: return <Palette size={size} />;
                        case 10: return <Feather size={size} />;
                        case 11: return <Music size={size} />;
                        case 12: return <Scale size={size} />;
                        case 13: return <Eye size={size} />;
                        case 14: return <Image size={size} />;
                        case 15: return <Calculator size={size} />;
                        case 16: return <Shapes size={size} />;
                        default: return <WandSparkles size={size} />;
                      }
                    })()}
                  </div>
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
                
              </button>
            );
          })}
        </div>
        )}

        {/* Right column: Active lesson content area */}
        <div className={`${isSyllabusOpen ? 'lg:col-span-9' : 'lg:col-span-12'} bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-500 ease-in-out flex flex-col min-h-[500px]`}>
          {/* Sub-tab Navigation */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 items-center">
            {!isSyllabusOpen && (
              <div className="px-3 sm:px-4 py-1.5 border-r border-slate-200/60">
                 <button onClick={() => setIsSyllabusOpen(true)} className="shrink-0 text-slate-400 hover:text-purple-600 bg-white hover:bg-purple-50 p-2 rounded-lg transition-all border border-slate-200 hover:border-purple-200 shadow-sm flex items-center justify-center" title="Open Syllabus">
                    <PanelLeftOpen size={18} />
                 </button>
              </div>
            )}
            {[
              { id: "learn", label: "Learn", icon: <BookOpen size={16} /> },
              { id: "quest", label: "Practice", icon: <Trophy size={16} /> }
            ].map(tab => {
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3.5 text-center transition-all cursor-pointer border-b-2 outline-none flex items-center justify-center gap-2 ${isTabActive
                    ? "border-purple-500 bg-white text-purple-600 font-black"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                >
                  {tab.icon}
                  <span className="text-sm sm:text-base font-black font-display">{tab.label}</span>
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

                  <div className="bg-gradient-to-br from-purple-50/80 to-purple-50/40 border border-purple-100 rounded-2xl p-6 shadow-sm min-h-[200px]">
                    {renderProfessionalTextOutput(activeLesson.learn.description, activeLesson.id)}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setActiveTab("quest")}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl text-xs sm:text-sm font-black font-display transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1"
                    >
                      Let's Practice! <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PRACTICE STEP */}
              {activeTab === 'quest' && (
                <motion.div
                  key={`quest-${activeLesson.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                    {/* LEFT: Combination Builder */}
                    <div className="flex-1 flex flex-col w-full bg-slate-50/50 rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
                      <div className="shrink-0 mb-4">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-display mb-1">Prompt Builder</h3>
                        <p className="text-sm font-semibold text-slate-500">Click the power-ups to combine rules. Watch the AI respond instantly!</p>
                      </div>
                      
                      <div className="flex flex-col gap-3 overflow-y-auto pr-2 prompt-academy-scrollbar max-h-[380px] sm:max-h-[420px]" data-lenis-prevent>
                        {activeLesson.quest.ingredients.map((ing) => {
                          const isSelected = isIngredientSelected(ing.id);
                          return (
                            <button
                              key={ing.id}
                              onClick={() => toggleIngredient(ing)}
                              className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer shrink-0 ${isSelected
                                ? 'border-purple-500 bg-purple-50 shadow-sm'
                                : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/30 shadow-sm'
                                }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5 ${isSelected ? 'bg-purple-500 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                                  <Trophy size={16} />
                                </div>
                                <div className="min-w-0">
                                  <span className={`text-xs font-black uppercase tracking-wider block mb-0.5 font-display ${isSelected ? 'text-purple-600' : 'text-slate-600'}`}>
                                    {ing.label}
                                  </span>
                                  <span className="text-xs font-semibold text-slate-500 leading-snug block">
                                    {ing.desc}
                                  </span>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* RIGHT: Live AI Chat Preview */}
                    <div className="w-full lg:w-[400px] xl:w-[500px] 2xl:w-[550px] flex flex-col h-[500px] bg-white border border-slate-200 shadow-xl rounded-2xl overflow-hidden shrink-0">
                      <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-3">
                         <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                            <Bot size={18} />
                         </div>
                         <div>
                            <span className="text-xs font-black uppercase text-slate-700 font-display block leading-tight">AI Assistant</span>
                            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 mt-0.5"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Online</span>
                         </div>
                      </div>
                      
                      <div className="p-5 grow flex flex-col gap-4 overflow-y-auto bg-slate-50/50 ai-chat-scrollbar" data-lenis-prevent>
                         {/* Default AI Greeting */}
                         <div className="flex gap-3">
                            <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0 mt-1"><Bot size={14} /></div>
                            <div className="bg-white border border-slate-200 text-slate-700 text-sm p-3 rounded-2xl rounded-tl-sm shadow-sm">
                               Hello! I am ready to generate something awesome. Build your prompt on the left to begin!
                            </div>
                         </div>
                         
                         {/* User Message (Shows selected ingredients) */}
                         {selectedIngredients.length > 0 && (
                           <div className="flex gap-3 justify-end mt-2 animate-in slide-in-from-right-4 duration-300">
                              <div className="bg-purple-600 text-white text-sm p-3 rounded-2xl rounded-tr-sm shadow-sm font-mono max-w-[85%] text-right">
                                 {getLivePromptText()}
                              </div>
                           </div>
                         )}

                         {/* AI Dynamic Response */}
                         {renderDynamicProgressiveOutput()}
                         {selectedIngredients.length === 4 && (
                           <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 mt-2">
                              <div className="w-6 h-6 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-1"><Check size={14} /></div>
                              <div className="bg-white border border-emerald-200 text-slate-700 text-sm p-4 rounded-2xl rounded-tl-sm shadow-sm w-full relative">
                                 <span className="font-black text-emerald-500 uppercase tracking-wider text-[10px] block mb-2 font-display">Perfect Prompt Output</span>
                                 <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                                    {activeLesson.quest.targetType === "Image Creator" ? (
                                      <div className="rounded-xl overflow-hidden shadow-sm border border-emerald-200/50">
                                        <img src={activeLesson.quest.superOutputImage} alt="Generated AI Masterpiece" className="w-full h-auto object-cover" />
                                        <div className="p-2 bg-slate-900 text-center">
                                          <span className="text-[10px] text-emerald-400 font-mono tracking-wider font-black">AI Image Successfully Generated</span>
                                        </div>
                                      </div>
                                    ) : (
                                      renderProfessionalTextOutput(activeLesson.quest.superOutputText, activeLesson.id)
                                    )}
                                 </div>
                              </div>
                           </div>
                         )}
                      </div>

                      {selectedIngredients.length === 4 && (
                         <div className="p-4 bg-white border-t border-slate-100 animate-in slide-in-from-bottom-4">
                            <button onClick={() => {
                               completeLesson(activeLesson.id);
                               if (activeLessonIdx < lessonsData.length - 1) {
                                  selectLesson(activeLessonIdx + 1);
                               } else {
                                  alert("Congratulations! You completed all lessons!");
                               }
                            }} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-black font-display text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2">
                               Complete Lesson & Next <ArrowRight size={16} />
                            </button>
                         </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};


const LearnConceptsComponent = () => {
  const [activeConceptTab, setActiveConceptTab] = useState('basics'); // 'basics', 'superpowers', 'learning'

  return (
    <div className="space-y-8 font-body max-w-7xl mx-auto pb-16">
      {/* Sub-navigation for AI Concepts */}
      <div className="flex flex-wrap items-center gap-2 pb-4">
              {[
                { id: 'basics', label: '1. What is AI?', icon: Sparkles },
                { id: 'superpowers', label: '2. What AI Can Do', icon: Eye },
                { id: 'learning', label: '3. How AI Learns & Safety', icon: Brain },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveConceptTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider font-display flex items-center gap-2 transition-all cursor-pointer ${activeConceptTab === tab.id
                    ? 'bg-white text-purple-400 shadow-sm border border-purple-100 scale-[1.02]'
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/30'
                    }`}
                >
                  <tab.icon size={16} className={activeConceptTab === tab.id ? 'text-purple-600 animate-pulse' : 'opacity-70'} />
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
                        <div className="space-y-3.5 text-sm sm:text-base text-slate-650 font-medium leading-relaxed max-w-xl text-left">
                          <p>
                            Imagine a computer that can learn to play chess, recognize your pet’s face, or even write a funny poem, without a human coding the rules step-by-step. That is <strong className="text-indigo-600 font-bold">Artificial Intelligence (AI)</strong>!
                          </p>
                          <p>
                            Normally, computers act like calculators—they only do exactly what we tell them to do using pre-written instructions. But AI acts more like a <strong className="text-purple-650 font-bold">curious student</strong>. It learns by studying thousands of examples (called <strong>Data</strong>), finding patterns on its own, and getting smarter over time!
                          </p>
                          <p>
                            Just like how you learn to identify a mango by seeing it, smelling it, and tasting it a few times, an AI learns to identify a cat, a song, or a word by training on millions of pictures, audio clips, or sentences.
                          </p>
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
                        <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 p-5 rounded-3xl shadow-md border border-indigo-50 flex flex-col items-center justify-center gap-2.5 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
                          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><Eye size={24} /></div>
                          <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Vision</span>
                        </div>
                        <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 p-5 rounded-3xl shadow-md border border-indigo-50 flex flex-col items-center justify-center gap-2.5 transform translate-y-4 rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300">
                          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center"><MessageSquare size={24} /></div>
                          <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Chat</span>
                        </div>
                        <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 p-5 rounded-3xl shadow-md border border-indigo-50 flex flex-col items-center justify-center gap-2.5 transform -translate-y-2 -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300">
                          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center"><Palette size={24} /></div>
                          <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Create</span>
                        </div>
                        <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 p-5 rounded-3xl shadow-md border border-indigo-50 flex flex-col items-center justify-center gap-2.5 transform translate-y-6 rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300">
                          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><Brain size={24} /></div>
                          <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Learn</span>
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
                          Capabilities
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                          4 Core Capabilities of AI
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 font-semibold">
                        How AI understands, sees, predicts, and creates
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Power 1 */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-purple-300 hover:shadow-lg transition-all text-left flex flex-col justify-between group">
                        <div className="space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-inner">
                            <Eye size={24} />
                          </div>
                          <h4 className="text-base font-black text-slate-900 font-display group-hover:text-purple-600 transition-colors">
                            Computer Vision
                          </h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            AI analyzes pixels in images and videos to recognize objects, read handwriting, and identify face patterns.
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2 py-1 rounded-md uppercase font-mono tracking-wider">
                            Google Lens &amp; FaceID
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
                            Natural Language (NLP)
                          </h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            AI understands spoken words, translates sentences between languages, and answers questions like an assistant.
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2 py-1 rounded-md uppercase font-mono tracking-wider">
                            Translate &amp; Siri
                          </span>
                        </div>
                      </div>

                      {/* Power 3 */}
                      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-purple-300 hover:shadow-lg transition-all text-left flex flex-col justify-between group">
                        <div className="space-y-3">
                          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-black group-hover:scale-110 transition-transform shadow-inner">
                            <Brain size={24} />
                          </div>
                          <h4 className="text-base font-black text-slate-900 font-display group-hover:text-purple-600 transition-colors">
                            Smart Predictions
                          </h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            AI studies trends and large datasets to recommend your next video, estimate traffic, or predict weather changes.
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2 py-1 rounded-md uppercase font-mono tracking-wider">
                            Maps &amp; Recommendations
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
                            Creative Generation
                          </h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            AI writes letters, creates digital artwork, or builds slide presentations based on your text instructions.
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-purple-600 bg-purple-50 px-2 py-1 rounded-md uppercase font-mono tracking-wider">
                            ChatGPT &amp; Midjourney
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
                    <div className="lg:col-span-6 bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between text-left">
                      <div>
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-wider font-display block mb-1">
                          Safety First
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 font-display mb-4">
                          4 Smart Rules of Using AI
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="mb-1 text-indigo-600"><Shield size={20} /></div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 font-display">Keep Secrets Secret</h4>
                            <p className="text-[11px] text-slate-600 font-medium mt-0.5">Never share passwords, real addresses, or phone numbers with AI.</p>
                          </div>

                          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="mb-1 text-indigo-600"><CheckCircle2 size={20} /></div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 font-display">Double-Check Facts</h4>
                            <p className="text-[11px] text-slate-600 font-medium mt-0.5">AI can make silly mistakes. Verify important facts with a textbook or teacher.</p>
                          </div>

                          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="mb-1 text-indigo-600"><Brain size={20} /></div>
                            <h4 className="text-xs sm:text-sm font-black text-slate-900 font-display">Learn, Don't Copy</h4>
                            <p className="text-[11px] text-slate-600 font-medium mt-0.5">Let AI explain how to solve homework instead of just copying the answer.</p>
                          </div>

                          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="mb-1 text-indigo-600"><Star size={20} /></div>
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
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === quizQuestions[currentQ].correct) {
      setScore(prev => prev + 100);
    }
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  const getOptionStyle = (idx) => {
    if (!isAnswered) return selectedOption === idx
      ? 'bg-purple-50 border-purple-500 text-purple-750'
      : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50/50';
    if (idx === quizQuestions[currentQ].correct) return 'bg-emerald-50 border-emerald-500 text-emerald-800';
    if (idx === selectedOption) return 'bg-rose-50 border-rose-500 text-rose-800';
    return 'bg-slate-50 border-slate-100 text-slate-450';
  };

  const getLabelBg = (idx) => {
    if (!isAnswered) return selectedOption === idx ? 'bg-purple-650 text-white' : 'bg-slate-100 text-slate-500';
    if (idx === quizQuestions[currentQ].correct) return 'bg-emerald-500 text-white';
    if (idx === selectedOption) return 'bg-rose-500 text-white';
    return 'bg-slate-200 text-slate-400';
  };

  const q = quizQuestions[currentQ];
  const progress = ((currentQ + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100;
  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="w-full flex justify-center py-8 mb-16 relative rounded-2xl overflow-hidden border border-slate-100">
      {/* Background Image with translucent overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/images/ai/challenge.png" alt="Quiz Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-purple-950/15 backdrop-blur-[2px]" />
      </div>

      <div className="w-full max-w-[450px] shrink-0 transition-all duration-300 relative z-10 px-4">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div key="active-quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full">
              <div className="bg-blue-50/70 backdrop-blur-xl rounded-[20px] p-5 sm:p-6 border border-blue-200/40 shadow-[0_8px_30px_rgba(30,41,59,0.06)]">
                
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 flex-row text-left">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-650 flex items-center justify-center shadow-inner">
                      <Brain size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Question {currentQ + 1}/{quizQuestions.length}</h3>
                      <p className="text-[10px] font-bold text-slate-400">AI Knowledge Test</p>
                    </div>
                  </div>
                  <div className="bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-200/60 text-center">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Score</span>
                    <span className="text-sm font-black text-purple-600 leading-none">{score}</span>
                  </div>
                </div>

                <div className="w-full h-1 bg-slate-100 rounded-full mb-5 overflow-hidden">
                  <motion.div animate={{ width: `${progress}%` }} className="h-full bg-purple-600 rounded-full" />
                </div>

                <h2 className="text-[15px] font-bold text-slate-900 leading-snug mb-5 text-left">
                  {q.question}
                </h2>

                <div className="space-y-2.5">
                  {q.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswered}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer font-bold ${getOptionStyle(idx)}`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 transition-all shadow-sm ${getLabelBg(idx)}`}>
                        {isAnswered && idx === q.correct ? <CheckCircle2 size={14} /> 
                          : isAnswered && idx === selectedOption && idx !== q.correct ? <XCircle size={14} />
                          : optionLabels[idx]}
                      </span>
                      <span className="text-[13px] font-semibold flex-1 leading-snug">{opt}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between min-h-[38px]">
                  {isAnswered ? (
                    <span className={`text-xs font-bold ${
                      selectedOption === q.correct ? 'text-emerald-600' 
                      : selectedOption === null ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {selectedOption === q.correct ? '🎉 Correct!' : selectedOption === null ? "Time is up!" : '❌ Wrong answer'}
                    </span>
                  ) : <div />}

                  {isAnswered && (
                    <button onClick={handleNext}
                      className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-purple-200 active:scale-95 cursor-pointer"
                    >
                      {currentQ < quizQuestions.length - 1 ? 'Next' : 'Results'} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="quiz-results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
              <div className="bg-blue-50/70 backdrop-blur-xl rounded-[20px] p-6 sm:p-8 border border-blue-200/40 shadow-[0_8px_30px_rgba(30,41,59,0.06)] text-center">
                <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Trophy size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Challenge Completed!</h2>
                <p className="text-xs text-slate-500 mb-6 font-medium">You've successfully finished the AI Knowledge Challenge.</p>

                <div className="bg-slate-50/80 rounded-[16px] p-5 mb-6 border border-slate-200/60 inline-block min-w-[180px]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Score</span>
                  <span className="text-3xl font-black text-purple-600">{score}</span>
                  <span className="text-[10px] font-bold text-slate-400 block mt-1">out of {quizQuestions.length * 100}</span>
                </div>

                <div className="flex justify-center">
                  <button onClick={handleRestart} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-purple-200 active:scale-95 cursor-pointer">
                    Play Again
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const AiIntelligenceDashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Learn Concepts');
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
    { label: 'Learn Concepts', value: 'Quick Lessons', icon: <BookOpen className="text-purple-600" />, color: 'bg-purple-50' },
    { label: 'Prompt Academy', value: 'Learn Prompting', icon: <WandSparkles className="text-purple-600" />, color: 'bg-purple-50' },
    { label: 'Explore Tools', value: 'AI Tools', icon: <Cpu className="text-purple-600" />, color: 'bg-purple-50' }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
        onClick={() => navigate("/#missions-grid")}
        className="absolute top-[96px] md:top-[112px] left-[24px] md:left-[48px] z-50 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-green-600 hover:shadow-lg transition-all border border-slate-100 group"
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
                  Your hub to master AI concepts, learn prompt engineering, and explore smart tools.
                </p>
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
                {activeFilter === 'Learn Concepts' && (
                  <LearnConceptsComponent />
                )}
                {activeFilter === 'Prompt Academy' && (
                  <div className="max-w-7xl mx-auto px-4 md:px-0">
                    <PromptAcademyComponent />
                  </div>
                )}
                {activeFilter === 'Explore Tools' && (
                  <div className="max-w-7xl mx-auto">
                    <ExploreToolsComponent />
                  </div>
                )}
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
