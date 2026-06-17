import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Clock, 
  Brain, Lightbulb, Cpu, Trophy, CheckCircle2, 
  Play, GraduationCap, XCircle,
  MessageSquare, Sparkles, Palette, Bot, Volume2, Globe,
  WandSparkles, ChevronRight, Copy, Mic, MicOff, HelpCircle, Award,
  Eye, Gamepad2, ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const toolsCategories = [
  { id: 'All', label: 'All Tools'},
  { id: 'Writing', label: 'Writing' },
  { id: 'Image', label: 'Image' },
  { id: 'Voice', label: 'Voice' },
  { id: 'Learning', label: 'Learning'},
  { id: 'Productivity', label: 'Productivity' }
];

const toolsDataList = [
  { name: 'ChatGPT', tag: 'Writing Assistant', desc: 'AI chatbot that helps answer questions, write content, and explain ideas.', icon: <MessageSquare size={22} />, color: 'bg-slate-100 text-indigo-900', iconBg: 'bg-slate-200 text-indigo-900', categories: ['Writing', 'Learning'] },
  { name: 'Google Gemini', tag: 'Learning Assistant', desc: 'AI assistant by Google that helps with writing, learning, and exploring ideas.', icon: <Sparkles size={22} />, color: 'bg-slate-100 text-indigo-900', iconBg: 'bg-slate-200 text-indigo-900', categories: ['Writing', 'Learning', 'Productivity'] },
  { name: 'Canva AI', tag: 'Image Creator', desc: 'AI design tool that helps create posters, presentations, and images easily.', icon: <Palette size={22} />, color: 'bg-slate-100 text-indigo-900', iconBg: 'bg-slate-200 text-indigo-900', categories: ['Image', 'Productivity'] },
  { name: 'QuillBot', tag: 'Writing Helper', desc: 'AI writing tool that helps paraphrase, summarize, and improve your writing.', icon: <Bot size={22} />, color: 'bg-slate-100 text-indigo-900', iconBg: 'bg-slate-200 text-indigo-900', categories: ['Writing'] },
  { name: 'ElevenLabs', tag: 'Voice AI', desc: 'AI voice tool that converts text into natural-sounding speech.', icon: <Volume2 size={22} />, color: 'bg-slate-100 text-indigo-900', iconBg: 'bg-slate-200 text-indigo-900', categories: ['Voice'] },
  { name: 'DeepL', tag: 'Translation', desc: 'AI tool that helps translate text more accurately and naturally.', icon: <Globe size={22} />, color: 'bg-slate-100 text-indigo-900', iconBg: 'bg-slate-200 text-indigo-900', categories: ['Writing', 'Productivity'] }
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
    id:1, 
    title:"The Magic Mask", 
    icon: <Bot className="w-5 h-5 text-indigo-900" />, 
    concept:"System Roles", 
    learn: {
      title:"What is a Role? (The Magic Mask)", 
      subtitle:"Give the AI a job, character, or helper persona!", 
      description:"Imagine the AI is a magical actor that can wear any mask you give it! If you just say 'write a story', it writes a standard, boring story. But if you say 'Act as a silly dragon chef', it will write using dragon growls and funny baking puns! Always tell the AI WHO it should pretend to be before you ask it a question.", 
      tips: [
        "Start your prompt with: 'Act as a [role]...' (like 'Act as a space captain...').", 
        "Common Roles: Math Tutor, Creative Artist, History Time-Traveler, Coding Robot."
      ]
    }, 
    quest: {
      characterName:"Space Cadet Milo", 
      characterImage:"/images/ai/milo_space_guide.png", 
      characterMsg:"Help me make a cool astronaut avatar. My boring prompt was just 'a cat in space'. Can you help me select the power-ups to write a Super Prompt?", 
      targetType:"Image Creator", 
      boringPrompt:"a cat in space", 
      boringOutputImage:"/images/ai/flat_cat.png", 
      superOutputImage:"/images/ai/cosmic_kitten.png", 
      badge:"Cosmic Artist", 
      ingredients: [
         {
          id:"l1_role", 
          label:"Role Power-up", 
          text:"Act as a 3D digital concept artist,", 
          type:"role", 
          desc:"Tells the AI what mask to wear."
        }, 
         {
          id:"l1_subject", 
          label:"Subject Power-up", 
          text:"draw a cute orange kitten wearing a glass astronaut helmet,", 
          type:"detail", 
          desc:"Describes the main character."
        }, 
         {
          id:"l1_bg", 
          label:"Background Power-up", 
          text:"floating inside a colorful nebula with purple stars,", 
          type:"background", 
          desc:"Sets a creative background."
        }, 
         {
          id:"l1_style", 
          label:"Style Power-up", 
          text:"using hyper-detailed textures and warm cinematic lighting.", 
          type:"style", 
          desc:"Specifies style, lighting, and resolution."
        }
      ]
    }, 
    sandbox: {
      category:"image", 
      title:"Roleplay Sandbox", 
      inputs: [
         {
          key:"role", 
          label:"Select a Role", 
          type:"select", 
          options: [
            "Disney Cartoonist", 
            "Scientific Illustrator", 
            "Retro Pixel Artist", 
            "Fantasy Painter"
          ]
        }, 
         {
          key:"subject", 
          label:"Subject Description", 
          type:"text", 
          placeholder:"e.g., a friendly baby dinosaur"
        }
      ], 
      template:t=>`Act as a ${t.role||"[role]"}, create a beautiful drawing of ${t.subject||"[subject]"}.`
    }, 
    battle: {
      scenario:"You want the AI to write a fantasy story. Which prompt gets the most creative output?", 
      options: [
         {
          text:"write a fantasy story", 
          isCorrect:!1, 
          feedback:"Too generic! The AI will write a basic, random story."
        }, 
         {
          text:"Act as a mysterious medieval wizard storyteller. Write an enchanting story about a hidden fairy fountain, using old-fashioned words and magical metaphors.", 
          isCorrect:!0, 
          feedback:"Exactly! Giving the AI a specific wizard persona dictates its writing style and vocabulary."
        }
      ], 
      explanation:"Giving the AI a specific 'Role' or 'Mask' (like a medieval wizard) makes its voice and styling much more unique."
    }
  }, 
   {
    id:2, 
    title:"Detail Detective", 
    icon: <Lightbulb className="w-5 h-5 text-indigo-900" />, 
    concept:"Adding Specifics", 
    learn: {
      title:"Be a Detail Detective!", 
      subtitle:"Tell the AI exactly what you see in your mind!", 
      description:"The AI cannot read your mind! If you ask it to 'draw a house', it doesn't know if you want a cozy wood cabin, a spooky castle, or a modern villa. Be a detective! Give the AI clues: color, material, age, surroundings, and weather.", 
      tips: [
        "Include the 4 Ws: Who (character), What (action), Where (location), When (time/weather).", 
        "Instead of 'a dog', say 'a tiny brown puppy wearing yellow rain boots playing in a mud puddle'."
      ]
    }, 
    quest: {
      characterName:"Inspector Bones", 
      characterImage:"/images/ai/barnaby_chef_dragon.png", 
      characterMsg:"I'm trying to draw a picture of a suspect's hiding cabin. My boring prompt 'a wooden house in the woods' is way too plain! Can you help me add clues like the house's color, materials, the weather, and what is surrounding it?", 
      targetType:"Image Creator", 
      boringPrompt:"a wooden house in the woods", 
      boringOutputImage:"/images/ai/flat_house.png", 
      superOutputImage:"/images/ai/detective_cabin.png", 
      badge:"Master Detective", 
      ingredients: [
         {
          id:"l2_subject", 
          label:"Material Power-up", 
          text:"A weathered log cabin made of dark redwood,", 
          type:"role", 
          desc:"Sets the cabin's material and color."
        }, 
         {
          id:"l2_weather", 
          label:"Weather Power-up", 
          text:"shrouded in spooky morning fog with soft sunlight rays,", 
          type:"detail", 
          desc:"Adds weather and lighting details."
        }, 
         {
          id:"l2_surroundings", 
          label:"Surroundings Power-up", 
          text:"tucked behind towering ancient pine trees next to a bubbling blue creek,", 
          type:"background", 
          desc:"Specifies what surrounds the house."
        }, 
         {
          id:"l2_vibe", 
          label:"Vibe Power-up", 
          text:"giving it a mysterious, age-old vibe.", 
          type:"style", 
          desc:"Adds the mood and age of the cabin."
        }
      ]
    }, 
    sandbox: {
      category:"text", 
      title:"Detail Builder", 
      inputs: [
         {
          key:"subject", 
          label:"Main Subject", 
          type:"text", 
          placeholder:"e.g., a small brown puppy"
        }, 
         {
          key:"details", 
          label:"Specific Details", 
          type:"text", 
          placeholder:"e.g., wearing yellow boots, chasing a butterfly"
        }, 
         {
          key:"setting", 
          label:"Setting / Location", 
          type:"text", 
          placeholder:"e.g., in a sunny park filled with sunflowers"
        }
      ], 
      template:t=>`A highly detailed picture of ${t.subject||"[subject]"}, ${t.details||"[details]"}, located ${t.setting||"[setting]"}.`
    }, 
    battle: {
      scenario:"You want a picture of a futuristic classroom. Which prompt gives the AI the best details?", 
      options: [
         {
          text:"draw a future school classroom with robots", 
          isCorrect:!1, 
          feedback:"A bit vague. The AI has to guess what the classroom looks like and what the robots are doing."
        }, 
         {
          text:"A high-tech school classroom in the year 2090. Students are sitting at glowing holographic desks while a friendly metallic robot teacher explains solar systems using floating 3D planets.", 
          isCorrect:!0, 
          feedback:"Perfect! You specified the year, the glowing desks, the robot's action, and the floating 3D planets."
        }
      ], 
      explanation:"Adding specific actions (robot teacher explaining solar systems) and objects (glowing holographic desks) makes the scene much clearer."
    }
  }, 
   {
    id:3, 
    title:"The Border Guard", 
    icon: <CheckCircle2 className="w-5 h-5 text-indigo-900" />, 
    concept:"Rules & Constraints", 
    learn: {
      title:"Hire a Border Guard! (Rules & Boundaries)", 
      subtitle:"Tell the AI exactly what NOT to do!", 
      description:"Sometimes the AI writes way too much or talks about ingredients you don't have. You can place a 'Border Guard' at the gates by giving the AI strict rules. Tell it exactly how long the answer should be, what format to use, or what words it is forbidden from using!", 
      tips: [
        "Length Rules: 'Keep it under 50 words' or 'Write exactly 3 sentences'.", 
        "Negative Rules: 'Do not use the word chocolate' or 'Solve without using oven/heat'."
      ]
    }, 
    quest: {
      characterName:"Agent Pip", 
      characterImage:"/images/ai/zorblax_alien.png", 
      characterMsg:"I need to describe a sweet apple to my headquarters without using the forbidden words 'red', 'fruit', or 'apple'! Also, keep it to exactly two sentences!", 
      targetType:"Script Generator", 
      boringPrompt:"describe a red apple", 
      boringOutputText:"An apple is a sweet red fruit that grows on trees.", 
      superOutputText:"This round, crisp snack grows on branches and is perfect for baking sweet pies. Its skin can be green, yellow, or deep crimson, protecting the sweet white flesh inside.", 
      badge:"Stealth Agent", 
      ingredients: [
         {
          id:"l3_task", 
          label:"Task Power-up", 
          text:"Describe a popular crunchy orchard snack,", 
          type:"role", 
          desc:"Tells the AI what to describe."
        }, 
         {
          id:"l3_forbidden", 
          label:"Forbidden Power-up", 
          text:"without using the words 'red', 'fruit', or 'apple',", 
          type:"detail", 
          desc:"Tells the AI what words are banned."
        }, 
         {
          id:"l3_limit", 
          label:"Limit Power-up", 
          text:"limiting your response to exactly two sentences,", 
          type:"background", 
          desc:"Restricts the output length."
        }, 
         {
          id:"l3_casing", 
          label:"Capital Power-up", 
          text:"and capitalizing the words 'sphere' and 'crimson'.", 
          type:"style", 
          desc:"Specifies a formatting constraint."
        }
      ]
    }, 
    sandbox: {
      category:"text", 
      title:"Constraint Sandbox", 
      inputs: [
         {
          key:"task", 
          label:"What to write", 
          type:"text", 
          placeholder:"e.g., a review of a new toy space blaster"
        }, 
         {
          key:"limit", 
          label:"Length Rule", 
          type:"select", 
          options: [
            "Exactly 2 sentences", 
            "Under 100 words", 
            "Exactly 3 bullet points"
          ]
        }, 
         {
          key:"forbidden", 
          label:"Forbidden Words (optional)", 
          type:"text", 
          placeholder:"e.g., do not use the word 'good' or 'nice'"
        }
      ], 
      template:t=> {
        const e=t.forbidden?` Do not use the words: ${t.forbidden}.`:"";
        return`Write a ${t.task||"[task]"}. Rule: Keep the output ${t.limit?t.limit.toLowerCase():"under 100 words"}.${e}`
      }
    }, 
    battle: {
      scenario:"You want a list of 5 easy breakfasts, but you have no stove. Which prompt guarantees you get what you need?", 
      options: [
         {
          text:"Give me 5 quick and healthy breakfast ideas that require absolutely no cooking or stove. Keep each idea under 2 sentences.", 
          isCorrect:!0, 
          feedback:"Spot on! You defined the count (5), the constraint (no cooking/stove), and the length rule (under 2 sentences)."
        }, 
         {
          text:"tell me 5 things i can eat for breakfast", 
          isCorrect:!1, 
          feedback:"This might list pancakes, eggs, or bacon, which require cooking on a stove!"
        }
      ], 
      explanation:"Constraints like 'no cooking or stove' prevent the AI from giving you answers you cannot use."
    }
  }, 
   {
    id:4, 
    title:"Art School", 
    icon: <Palette className="w-5 h-5 text-indigo-900" />, 
    concept:"Styles & Mediums", 
    learn: {
      title:"Be an Art Director! (Styles & Mediums)", 
      subtitle:"Command the exact art style of your images!", 
      description:"By default, image generators create generic drawings or standard photos. You can change this by specifying the art style or medium. Do you want a 3D Pixar-style cartoon? A retro 8-bit video game layout? A hand-drawn pencil sketch? A beautiful watercolor painting? Let the AI know the medium!", 
      tips: [
        "Style tags: 'Pixar 3D style', 'Retro 8-bit pixel art', 'Pencil sketch', 'Watercolor'.", 
        "Add textures: 'made of shiny modeling clay' or 'glowing neon chalk drawing'."
      ]
    }, 
    quest: {
      characterName:"Penny the Chameleon", 
      characterImage:"/images/ai/chameleon.png", 
      characterMsg:"I want a picture of a space turtle, but in a cool art medium: a glowing neon chalk illustration on a dark blackboard! Help me choose the style power-ups!", 
      targetType:"Image Creator", 
      boringPrompt:"a turtle in space", 
      boringOutputImage:"/images/ai/flat_turtle.png", 
      superOutputImage:"/images/ai/neon_turtle.png", 
      badge:"Blackboard Artist", 
      ingredients: [
         {
          id:"l4_style", 
          label:"Medium Power-up", 
          text:"A glowing neon chalk illustration drawn on a dark slate blackboard,", 
          type:"role", 
          desc:"Sets the specific art medium."
        }, 
         {
          id:"l4_subject", 
          label:"Subject Power-up", 
          text:"showing a magical sea turtle swimming through the cosmos,", 
          type:"detail", 
          desc:"Describes the turtle subject."
        }, 
         {
          id:"l4_details", 
          label:"Detail Power-up", 
          text:"with its shell made of shimmering violet star constellations,", 
          type:"background", 
          desc:"Adds galactic details to the shell."
        }, 
         {
          id:"l4_finish", 
          label:"Texture Power-up", 
          text:"creating bright glowing edges and dusty chalk textures.", 
          type:"style", 
          desc:"Adds glowing borders and textures."
        }
      ]
    }, 
    sandbox: {
      category:"image", 
      title:"Art Style Sandbox", 
      inputs: [
         {
          key:"subject", 
          label:"Subject", 
          type:"text", 
          placeholder:"e.g., a happy flying turtle"
        }, 
         {
          key:"style", 
          label:"Art Style", 
          type:"select", 
          options: [
            "Pixar 3D Animation", 
            "8-Bit Retro Pixel Art", 
            "Delicate Watercolor Painting", 
            "Glow-in-the-dark Neon Cyberpunk", 
            "Hand-drawn Pencil Sketch"
          ]
        }
      ], 
      template:t=>`Create an image of ${t.subject||"[subject]"} rendered in a ${t.style||"Pixar 3D"} style.`
    }, 
    battle: {
      scenario:"You want a picture of a cute baby panda that looks like an old retro video game. Which prompt works best?", 
      options: [
         {
          text:"draw a baby panda in an old game style", 
          isCorrect:!1, 
          feedback:"A bit vague. The AI might make a simple drawing instead of actual retro pixel grids."
        }, 
         {
          text:"A cute baby panda eating a bamboo stick, retro 8-bit pixel art style, game boy color aesthetic, blocky pixel grids.", 
          isCorrect:!0, 
          feedback:"Excellent! You specified '8-bit pixel art style', 'game boy color aesthetic', and 'blocky pixel grids'."
        }
      ], 
      explanation:"Using specific style keywords (like '8-bit pixel art' and 'blocky grids') tells the generator exactly how to style the pixels."
    }
  }, 
   {
    id:5, 
    title:"Lighting Wizard", 
    icon: <Sparkles className="w-5 h-5 text-indigo-900" />, 
    concept:"Vibe & Lighting", 
    learn: {
      title:"Control the Light and Vibe!", 
      subtitle:"Use lighting to set a magical mood!", 
      description:"Just like in movies, lighting changes the whole mood—making it look cozy, scary, futuristic, or warm. If you don't mention lighting, the AI will use flat, boring light. Try adding descriptions like 'warm golden hour sunset light' or 'glowing neon lights with deep shadows'.", 
      tips: [
        "Lighting types: 'Sunset golden hour' (warm glow), 'Bioluminescent glow' (sci-fi plants), 'Stage spotlight' (dramatic).", 
        "Describe shadows: 'long sunset shadows' or 'mysterious moonlight reflections'."
      ]
    }, 
    quest: {
      characterName:"Flick the Firefly", 
      characterImage:"/images/ai/firefly.png", 
      characterMsg:"Glow with me! I want to show a forest floor at night, but we need magical lights! Help me add glowing mushroom light, soft moonlight beams, and dramatic shadows.", 
      targetType:"Image Creator", 
      boringPrompt:"mushrooms in a forest at night", 
      boringOutputImage:"/images/ai/flat_mushrooms.png", 
      superOutputImage:"/images/ai/bioluminescent_mushrooms.png", 
      badge:"Lighting Expert", 
      ingredients: [
         {
          id:"l5_light1", 
          label:"Light Power-up", 
          text:"A dense forest floor illuminated by giant bioluminescent blue mushrooms,", 
          type:"role", 
          desc:"Sets the primary glowing light source."
        }, 
         {
          id:"l5_light2", 
          label:"Moonlight Power-up", 
          text:"with silver moonlight beams filtering down through the dark tree canopy,", 
          type:"detail", 
          desc:"Adds ambient light filtering through trees."
        }, 
         {
          id:"l5_shadow", 
          label:"Shadow Power-up", 
          text:"casting long, dramatic shadows across the damp green moss,", 
          type:"background", 
          desc:"Specifies shadow details for depth."
        }, 
         {
          id:"l5_vibe", 
          label:"Vibe Power-up", 
          text:"creating a magical, glowing fairy-tale atmosphere at midnight.", 
          type:"style", 
          desc:"Defines the midnight mood."
        }
      ]
    }, 
    sandbox: {
      category:"image", 
      title:"Lighting Sandbox", 
      inputs: [
         {
          key:"subject", 
          label:"Subject", 
          type:"text", 
          placeholder:"e.g., a sleeping wizard cat"
        }, 
         {
          key:"lighting", 
          label:"Lighting Style", 
          type:"select", 
          options: [
            "Sunset Golden Hour", 
            "Glowing Bioluminescent Glow", 
            "Dramatic Stage Spotlights", 
            "Soft Moonlight Reflections"
          ]
        }
      ], 
      template:t=>`A beautiful digital artwork of ${t.subject||"[subject]"}, illuminated with ${t.lighting||"Sunset Golden Hour"} lighting.`
    }, 
    battle: {
      scenario:"Which prompt will generate a warm, cozy picture of a cat sleeping in a bedroom?", 
      options: [
         {
          text:"A fluffy cat sleeping curled up on a soft bed, warm golden hour sunset light streaming through the window, creating long shadows and a cozy amber glow.", 
          isCorrect:!0, 
          feedback:"Wonderful! 'Warm golden hour sunset light' and 'cozy amber glow' define the exact mood."
        }, 
         {
          text:"cat sleeping in bedroom, drawing", 
          isCorrect:!1, 
          feedback:"This will give a flat, simple drawing with neutral, boring office-style lighting."
        }
      ], 
      explanation:"Specifying light direction (light streaming through the window) and light colors (amber glow, golden hour) sets a warm emotional vibe."
    }
  }, 
   {
    id:6, 
    title:"Voice Vibe", 
    icon: <Volume2 className="w-5 h-5 text-indigo-900" />, 
    concept:"Tone & Emotion", 
    learn: {
      title:"Change the Voice! (Tone & Emotion)", 
      subtitle:"Choose the emotional energy of your text!", 
      description:"AI can sound super dry and formal, like a boring instruction manual. You can change this by putting a 'voice changer helmet' on the AI! Tell it what tone to use: Do you want it to sound extremely excited, spooky and whispery, or like a jolly pirate captain?", 
      tips: [
        "Tone keywords: 'in a high-energy excited voice', 'with a mysterious spooky tone', 'using funny pirate slang'.", 
        "Example: 'Explain gravity in a silly pirate voice using pirate puns'."
      ]
    }, 
    quest: {
      characterName:"Coach Brody", 
      characterImage:"/images/ai/coach.png", 
      characterMsg:"Listen up, team! I want to explain how to clean a messy bedroom, but make it sound like a high-energy sports game broadcast! Help me choose the tone power-ups!", 
      targetType:"Story Writer", 
      boringPrompt:"tell me how to clean a room", 
      boringOutputText:"First, pick up your clothes. Make your bed. Sweep.", 
      superOutputText:"Welcome to the bedroom championship! The athlete grabs the dirty laundry—HE THROWS IT! It's a perfect landing in the hamper basket! AMAZING! Now he slides toward the bed, pulls the sheets—BOOM! A flawless bed fold! The crowd goes wild! Can he sweep the dust before the buzzer sounds? Yes! Victory is ours!", 
      badge:"Star Broadcaster", 
      ingredients: [
         {
          id:"l6_role", 
          label:"Role Power-up", 
          text:"Act as an energetic sports commentator broadcasting live,", 
          type:"role", 
          desc:"Sets the announcer role."
        }, 
         {
          id:"l6_subject", 
          label:"Subject Power-up", 
          text:"describe a kid cleaning a messy bedroom in real-time,", 
          type:"detail", 
          desc:"Defines the room cleaning task."
        }, 
         {
          id:"l6_tone", 
          label:"Tone Power-up", 
          text:"using sports slangs like 'championship fold' and 'buzzer sounds',", 
          type:"background", 
          desc:"Adds the action-packed sports commentary style."
        }, 
         {
          id:"l6_finish", 
          label:"Format Power-up", 
          text:"using exclamation marks for excitement and keeping it under 80 words.", 
          type:"style", 
          desc:"Restricts length and specifies grammar style."
        }
      ]
    }, 
    sandbox: {
      category:"text", 
      title:"Tone & Voice Sandbox", 
      inputs: [
         {
          key:"subject", 
          label:"Topic to write", 
          type:"text", 
          placeholder:"e.g., why you should eat broccoli"
        }, 
         {
          key:"tone", 
          label:"Tone Voice", 
          type:"select", 
          options: [
            "Silly Pirate slang", 
            "Excited sports commentator", 
            "Spooky ghost voice", 
            "Wise old wizard"
          ]
        }
      ], 
      template:t=>`Write a short paragraph about ${t.subject||"[topic]"}. Tone: Write in a ${t.tone||"Silly Pirate"} voice.`
    }, 
    battle: {
      scenario:"You want a description of a solar eclipse that sounds super exciting and dramatic.", 
      options: [
         {
          text:"Write an exciting and highly dramatic paragraph about a solar eclipse, as if it is an epic battle between the sun and the moon in a superhero comic book.", 
          isCorrect:!0, 
          feedback:"Incredible! This gives the AI a powerful metaphor (battle between sun and moon) and a specific high-drama tone."
        }, 
         {
          text:"tell me what a solar eclipse is, make it sound good", 
          isCorrect:!1, 
          feedback:"Too generic. The AI will write a basic science textbook definition."
        }
      ], 
      explanation:"Giving the AI a dramatic setting (superhero comic book battle) pushes it to write with high energy and exciting adjectives."
    }
  }, 
   {
    id:7, 
    title:"Master Builder", 
    icon: <BookOpen className="w-5 h-5 text-indigo-900" />, 
    concept:"Output Formats", 
    learn: {
      title:"Build with Formats!", 
      subtitle:"Ask the AI to organize its answers into tables or lists!", 
      description:"You don't have to read long walls of text! You can ask the AI to output its answers in clean, organized shapes. You can ask for a Markdown Table with column headers, a numbered list, a screenwriting dialogue script, or even a computer code block.", 
      tips: [
        "Table prompts: 'Organize this into a 3-column table with headers: [A], [B], [C]'.", 
        "List prompts: 'Output as a clean bulleted list' or 'Use a Q&A format'."
      ]
    }, 
    quest: {
      characterName:"Daisy the Dino", 
      characterImage:"/images/ai/dino.png", 
      characterMsg:"I have messy notes about dinosaur defenses. Can you prompt the AI to organize T-Rex, Stegosaurus, and Triceratops details into a clean 3-column table?", 
      targetType:"Story Writer", 
      boringPrompt:"dinosaur sizes", 
      boringOutputText:"T-Rex was 12 meters long. Stegosaurus was 9 meters long. Triceratops was 8 meters long.", 
      superOutputText:`| Dinosaur Name | Diet Type | Fun Fact |
| :--- | :--- | :--- |
| T-Rex | Carnivore (Meat) | Had teeth the size of bananas! |
| Triceratops | Herbivore (Plants) | Had 3 massive horns to protect itself! |
| Velociraptor | Carnivore (Meat) | Was feathered and as fast as a cheetah! |`, 
      badge:"Data Organizer", 
      ingredients: [
         {
          id:"l7_role", 
          label:"Role Power-up", 
          text:"Act as a tidy database organizer robot,", 
          type:"role", 
          desc:"Tells AI to play a database compiler."
        }, 
         {
          id:"l7_subject", 
          label:"Subject Power-up", 
          text:"list the diet and a fun fact for T-Rex, Triceratops, and Velociraptor,", 
          type:"detail", 
          desc:"Specifies the dinosaur subjects."
        }, 
         {
          id:"l7_format", 
          label:"Format Power-up", 
          text:"organizing the data into a Markdown table,", 
          type:"background", 
          desc:"Specifies a table layout."
        }, 
         {
          id:"l7_headers", 
          label:"Column Power-up", 
          text:"with columns for 'Dinosaur Name', 'Diet Type', and 'Fun Fact'.", 
          type:"style", 
          desc:"Specifies the exact table headers."
        }
      ]
    }, 
    sandbox: {
      category:"text", 
      title:"Format Sandbox", 
      inputs: [
         {
          key:"subject", 
          label:"Topic / Items", 
          type:"text", 
          placeholder:"e.g., three major planets in our solar system"
        }, 
         {
          key:"format", 
          label:"Output Structure", 
          type:"select", 
          options: [
            "A 2-column Markdown Table", 
            "A numbered list", 
            "A dialogue between two friends", 
            "A code block code sample"
          ]
        }
      ], 
      template:t=>`List details about ${t.subject||"[topic]"}. Format the output as ${t.format||"a table"}.`
    }, 
    battle: {
      scenario:"You want a list of three countries, their capital cities, and their main languages. Which prompt guarantees a clean, easy-to-read layout?", 
      options: [
         {
          text:"list 3 countries, capitals, and languages in a 3-column table with headers: Country, Capital City, Primary Language.", 
          isCorrect:!0, 
          feedback:"Awesome! Tables are the cleanest format for multi-column comparison data."
        }, 
         {
          text:"tell me the capitals and languages of 3 countries", 
          isCorrect:!1, 
          feedback:"This will output a big wall of text that is hard to scan quickly."
        }
      ], 
      explanation:"Specifying a table format with exact headers forces the AI to output structured data instead of paragraphs."
    }
  }, 
   {
    id:8, 
    title:"Show and Tell", 
    icon: <Copy className="w-5 h-5 text-indigo-900" />, 
    concept:"Few-Shot Prompting", 
    learn: {
      title:"Play the Copycat Game! (Few-Shot)", 
      subtitle:"Show the AI examples of the pattern you want!", 
      description:"Sometimes explaining a rule is hard, so it is much easier to just show the AI a few examples! This is called 'Few-Shot Prompting'. You show it: 'Input: [Example] -> Output: [Example]'. After seeing 1 or 2 examples, the AI copycat will follow your pattern perfectly!", 
      tips: [
        "Use this structure: 'Follow the pattern. Input: happy -> Output: sad. Input: big -> Output: small. Now solve: Input: wet -> Output:'"
      ]
    }, 
    quest: {
      characterName:"Oliver the Owl", 
      characterImage:"/images/ai/owl.png", 
      characterMsg:"I want to teach the AI a secret animal sound translator. I want it to translate English words into animal sounds. Let's show it examples!", 
      targetType:"Story Writer", 
      boringPrompt:"translate hello to animal sounds", 
      boringOutputText:"A dog says woof. A cat says meow.", 
      superOutputText:`Input: Hello -> Output: Woof-Woof! (Happy tail wags!)
Input: Goodbye -> Output: Hiss-Purr... (Sleepy nap time.)
Input: I'm hungry -> Output: Squeak-Squeak! (Searching for cheese!)`, 
      badge:"Pattern Master", 
      ingredients: [
         {
          id:"l8_instruction", 
          label:"Rule Power-up", 
          text:"Follow this exact translation pattern for conversion,", 
          type:"role", 
          desc:"Tells the AI to follow the pattern."
        }, 
         {
          id:"l8_examples", 
          label:"Example Power-up", 
          text:"using examples: (Input: Hello -> Output: Woof-Woof!), (Input: Goodbye -> Output: Hiss-Purr...),", 
          type:"detail", 
          desc:"Provides the pattern examples."
        }, 
         {
          id:"l8_target", 
          label:"Target Power-up", 
          text:"now translate the word 'I'm hungry',", 
          type:"background", 
          desc:"Provides the target word."
        }, 
         {
          id:"l8_format", 
          label:"Format Power-up", 
          text:"following the exact syntax of the output with an action in parentheses.", 
          type:"style", 
          desc:"Ensures formatting consistency."
        }
      ]
    }, 
    sandbox: {
      category:"text", 
      title:"Few-Shot Sandbox", 
      inputs: [
         {
          key:"in1", 
          label:"Example Input 1", 
          type:"text", 
          placeholder:"e.g., unhappy"
        }, 
         {
          key:"out1", 
          label:"Example Output 1", 
          type:"text", 
          placeholder:"e.g., happy"
        }, 
         {
          key:"target", 
          label:"Actual Input", 
          type:"text", 
          placeholder:"e.g., unfriendly"
        }
      ], 
      template:t=>`You are an antonym solver. Follow the examples exactly:
Example 1: Input: ${t.in1||"unhappy"} -> Output: ${t.out1||"happy"}
Now solve: Input: ${t.target||"unfriendly"} -> Output:`
    }, 
    battle: {
      scenario:"You want the AI to translate internet slang to polite English. Which prompt uses Few-Shot prompting to teach the AI the format?", 
      options: [
         {
          text:"translate slang to polite words. example: 'no cap' -> 'honestly'. example: 'sheesh' -> 'amazing'. now translate: 'goated' ->", 
          isCorrect:!0, 
          feedback:"Perfect! You provided two examples of the input-output pattern, making the task clear."
        }, 
         {
          text:"translate internet slang like 'goated' into polite english", 
          isCorrect:!1, 
          feedback:"While this works, the AI might write a long explanation instead of just returning the simple translation."
        }
      ], 
      explanation:"Few-shot prompting shows the exact layout you want, ensuring the AI replies with just the answer without extra chitchat."
    }
  }, 
   {
    id:9, 
    title:"Brain Gym", 
    icon: <Brain className="w-5 h-5 text-indigo-900" />, 
    concept:"Chain of Thought", 
    learn: {
      title:"Slow Down the Brain! (Chain of Thought)", 
      subtitle:"Force the AI to think step-by-step!", 
      description:"AI is super fast, but it often rushes and makes silly calculation mistakes in math or riddles. You can give it a 'brain workout' by telling it: 'Let's think step-by-step'. This forces the AI to write down its logic steps first, catch its own mistakes, and get the correct answer!", 
      tips: [
        "Use the magic words: 'Let's think step-by-step and write down each reasoning step first.'", 
        "Prompt: 'Explain your logic line-by-line before writing the final short answer.'"
      ]
    }, 
    quest: {
      characterName:"Dr. Einstein the Owl", 
      characterImage:"/images/ai/owl.png", 
      characterMsg:"I have a tricky riddle: 'I have 3 apples. I give 1 to a friend. My friend gives me 2 back. How many do I have?' If you just ask AI, it might get confused. Let's make it think step-by-step!", 
      targetType:"Story Writer", 
      boringPrompt:"how many apples do i have", 
      boringOutputText:"You have 4 apples.", 
      superOutputText:`Let's calculate this step-by-step:
1. Starting state: You have 3 apples.
2. Action: You give 1 apple to a friend. (3 - 1 = 2 apples left in your hand).
3. Action: Your friend gives you 2 apples back. (2 + 2 = 4 apples in your hand).
Conclusion: You now have 4 apples!`, 
      badge:"Logic Scientist", 
      ingredients: [
         {
          id:"l9_role", 
          label:"Role Power-up", 
          text:"Act as a patient mathematics professor owl,", 
          type:"role", 
          desc:"Tells AI to play a patient math professor."
        }, 
         {
          id:"l9_subject", 
          label:"Question Power-up", 
          text:"solve this riddle: 'I have 3 apples. I give 1 to a friend. My friend gives me 2 back',", 
          type:"detail", 
          desc:"Provides the puzzle details."
        }, 
         {
          id:"l9_logic", 
          label:"Logic Power-up", 
          text:"let's think step-by-step and write down each math step,", 
          type:"background", 
          desc:"Triggers Chain of Thought reasoning."
        }, 
         {
          id:"l9_conclusion", 
          label:"Answer Power-up", 
          text:"and put the final count in a clear conclusion line.", 
          type:"style", 
          desc:"Directs how to present the final answer."
        }
      ]
    }, 
    sandbox: {
      category:"text", 
      title:"Brain Gym Sandbox", 
      inputs: [
         {
          key:"puzzle", 
          label:"Puzzle / Riddle", 
          type:"text", 
          placeholder:"e.g., if a clock strikes 3 times in 3 seconds, how long to strike 6?"
        }
      ], 
      template:t=>`Solve this puzzle: "${t.puzzle||"[puzzle]"}"? Rule: Let's think step-by-step. Break down your reasoning first, and then state the final answer at the very end.`
    }, 
    battle: {
      scenario:"You want the AI to solve a hard math word problem. Which prompt gets the most accurate answer?", 
      options: [
         {
          text:"Solve this math problem. Break down your calculations step-by-step, showing all addition and subtraction lines before giving the final answer.", 
          isCorrect:!0, 
          feedback:"Awesome! Chain of Thought helps the AI calculate sub-steps accurately."
        }, 
         {
          text:"what is the answer to this math problem: [insert problem]", 
          isCorrect:!1, 
          feedback:"The AI might calculate the math in one step and output a wrong number."
        }
      ], 
      explanation:"Forcing the AI to print out its math steps prevents it from making errors in its internal thinking process."
    }
  }, 
   {
    id:10, 
    title:"Ultimate Spell", 
    icon: <WandSparkles className="w-5 h-5 text-indigo-900" />, 
    concept:"Combining Everything", 
    learn: {
      title:"Cast the Ultimate Spell!", 
      subtitle:"Blend all prompt ingredients into a Master Prompt!", 
      description:"Congratulations! You have learned all 9 prompt secrets. Now, it is time to combine them to cast the Ultimate Spell! A Master Prompt combines: Role (who) + Subject (what) + Specific Details + Art Style + Lighting + Constraints (limits) + Format. This gives you high-quality magic results!", 
      tips: [
        "Ultimate Formula: Role + Subject + Details + Style + Lighting + Constraints + Format.", 
        "Try to include at least 4 different power-ups in every prompt you write!"
      ]
    }, 
    quest: {
      characterName:"Gamemaster Vance", 
      characterImage:"/images/ai/gamer.png", 
      characterMsg:"Welcome to the final battle! We need to draft a complete text adventure role-playing game. Help me construct a Master Prompt combining a role, specific settings, and format rules!", 
      targetType:"Story Writer", 
      boringPrompt:"make a text game", 
      boringOutputText:"You are in a forest. Go north or south. What do you do?", 
      superOutputText:`Act as a retro text adventure gamemaster. You are hosting a text-based RPG game called 'Cosmic Cave'.

[Setting]: You are standing inside a cave illuminated by blue glowing crystals. There is a wooden door to the north.

[Format]: Output a description under 80 words, followed by a bulleted list of 3 choices (A, B, C).

What do you do?`, 
      badge:"Prompt Grandmaster", 
      ingredients: [
         {
          id:"l10_role", 
          label:"Role Power-up", 
          text:"Act as a retro text adventure gamemaster,", 
          type:"role", 
          desc:"Sets the game narrator role."
        }, 
         {
          id:"l10_subject", 
          label:"Topic Power-up", 
          text:"write the opening room scene for a sci-fi RPG called 'Cosmic Cave',", 
          type:"detail", 
          desc:"Defines the game name and starting room."
        }, 
         {
          id:"l10_style", 
          label:"Style Power-up", 
          text:"with details about glowing blue crystals and a wooden door,", 
          type:"background", 
          desc:"Adds aesthetic details."
        }, 
         {
          id:"l10_format", 
          label:"Format Power-up", 
          text:"keeping description under 80 words, followed by 3 choices (A, B, C).", 
          type:"style", 
          desc:"Sets the length limits and choice formats."
        }
      ]
    }, 
    sandbox: {
      category:"text", 
      title:"Master Sandbox Formula", 
      inputs: [
         {
          key:"role", 
          label:"Role", 
          type:"text", 
          placeholder:"e.g., an expert sci-fi author"
        }, 
         {
          key:"subject", 
          label:"Subject / Task", 
          type:"text", 
          placeholder:"e.g., write a story about a time traveler"
        }, 
         {
          key:"style", 
          label:"Details & Style", 
          type:"text", 
          placeholder:"e.g., humorous tone, retro futuristic vibe"
        }, 
         {
          key:"format", 
          label:"Format & Limits", 
          type:"text", 
          placeholder:"e.g., under 100 words, in 3 bullet points"
        }
      ], 
      template:t=>`Act as a ${t.role||"[role]"}. Write about ${t.subject||"[subject]"}, using ${t.style||"[style]"}. Rule: Format the output as ${t.format||"[format]"}.`
    }, 
    battle: {
      scenario:"You want the AI to write a high-quality blog post. Which prompt combines the most Prompt Academy power-ups?", 
      options: [
         {
          text:"Act as a professional tech journalist. Write an informative blog post about clean energy, focusing on solar panels and batteries, in an optimistic tone, keeping it under 200 words, structured with 3 clear bullet points.", 
          isCorrect:!0, 
          feedback:"Brilliant! This contains Role (tech journalist), Subject (clean energy), Specifics (solar/batteries), Tone (optimistic), Constraint (under 200 words), and Format (3 bullet points)."
        }, 
         {
          text:"write a short article about solar energy and batteries, make it interesting", 
          isCorrect:!1, 
          feedback:"This lacks a role, doesn't specify a tone, and has no format rules. The AI will write a generic article."
        }
      ], 
      explanation:"Combining all elements gives the AI complete instructions, leaving no room for poor guesses or generic outputs."
    }
  }
];


const BoringVsSuperPromptImage = ({ imageUrl, altText, isAwesome }) => {
  if (imageUrl) {
    return (
      <img 
        src={imageUrl} 
        alt={altText} 
        className={`max-h-full max-w-full object-contain rounded-lg shadow-md ${isAwesome ? "" : "filter grayscale-[30%]"}`} 
      />
    );
  }
  return (
    <div className={`w-full h-full min-h-[160px] rounded-xl flex flex-col items-center justify-center p-6 text-center transition-all ${
      isAwesome 
        ? 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-800 text-white shadow-lg' 
        : 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 shadow-inner'
    }`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-md ${
        isAwesome ? 'bg-white/20 animate-pulse text-white' : 'bg-slate-100/60 text-slate-500'
      }`}>
        {isAwesome ? <Sparkles className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
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
  if (lesson.id === 1) {
    return (
      <img 
        src="/images/ai/milo_space_guide.png" 
        className="w-full h-full object-cover rounded-full" 
        alt="Milo" 
      />
    );
  }
  if (lesson.id === 2) {
    return (
      <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center shadow-inner">
        <HelpCircle className="w-8 h-8 text-white" />
      </div>
    );
  }
  if (lesson.id === 3) {
    return (
      <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-inner">
        <HelpCircle className="w-8 h-8 text-white" />
      </div>
    );
  }
  const gradients = [
    "",
    "",
    "",
    "",
    "from-indigo-400 to-indigo-600",
    "from-slate-400 to-slate-600",
    "from-indigo-500 to-indigo-700",
    "from-slate-500 to-slate-700",
    "from-indigo-400 to-indigo-600",
    "from-slate-400 to-slate-600",
    "from-indigo-500 to-indigo-700"
  ];
  const getIcon = (id) => {
    switch (id) {
      case 4: return <Palette className="w-8 h-8 text-white" />;
      case 5: return <Lightbulb className="w-8 h-8 text-white" />;
      case 6: return <Volume2 className="w-8 h-8 text-white" />;
      case 7: return <Bot className="w-8 h-8 text-white" />;
      case 8: return <MessageSquare className="w-8 h-8 text-white" />;
      case 9: return <Brain className="w-8 h-8 text-white" />;
      default: return <WandSparkles className="w-8 h-8 text-white" />;
    }
  };
  return (
    <div className={`w-full h-full rounded-full bg-gradient-to-br ${gradients[lesson.id] || "from-indigo-500 to-indigo-700"} flex items-center justify-center shadow-inner`}>
      {getIcon(lesson.id)}
    </div>
  );
};

const renderProfessionalTextOutput = (text, lessonId) => {
  // Lesson 6: Sports commentator live feed
  if (lessonId === 6) {
    const phrases = [
      "Welcome to the bedroom championship!",
      "The athlete grabs the dirty laundry—HE THROWS IT!",
      "It's a perfect landing in the hamper basket! AMAZING!",
      "Now he slides toward the bed, pulls the sheets—BOOM!",
      "A flawless bed fold! The crowd goes wild!",
      "Can he sweep the dust before the buzzer sounds? Yes!",
      "Victory is ours!"
    ];
    return (
      <div className="w-full text-left space-y-2 font-body">
        <div className="flex items-center justify-between border-b border-indigo-100 pb-1.5 mb-2 bg-indigo-50/50 px-2 py-1 rounded">
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase text-indigo-900 tracking-wider font-display">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            Live Commentary Broadcast
          </span>
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest font-display">
            Channel 1
          </span>
        </div>
        <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
          {phrases.map((phrase, idx) => (
            <div key={idx} className="flex gap-2 text-xs">
              <span className="text-indigo-500 font-bold shrink-0 font-mono text-[10px] select-none">
                [{idx === 0 ? "START" : `00:${idx * 8}`}]
              </span>
              <p className="font-extrabold text-slate-800 leading-tight">
                {phrase}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Lesson 7: Markdown Table
  if (lessonId === 7) {
    if (text.includes('|')) {
      const lines = text.split('\n');
      const tableLines = lines.filter(line => line.trim() && line.includes('|') && !line.includes(':---') && !line.includes('---:'));
      if (tableLines.length >= 2) {
        const headers = tableLines[0].split('|').map(x => x.trim()).filter(x => x);
        const rows = tableLines.slice(1).map(line => line.split('|').map(x => x.trim()).filter(x => x));
        
        return (
          <div className="overflow-x-auto w-full rounded-lg border border-indigo-100 bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-[11px] sm:text-xs font-body">
              <thead>
                <tr className="bg-indigo-900 text-white border-b border-indigo-950">
                  {headers.map((h, i) => (
                    <th key={i} className="px-3 py-2 font-black tracking-wide uppercase font-display">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-slate-100 last:border-none hover:bg-slate-50 transition-colors">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-3 py-2 font-bold text-slate-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }
  }

  // Lesson 8: Few-Shot Input/Output translator
  if (lessonId === 8) {
    const lines = text.split('\n').filter(line => line.trim());
    const parseLine = (line) => {
      const parts = line.split('->');
      if (parts.length === 2) {
        const inputPart = parts[0].replace('Input:', '').trim();
        const outputPart = parts[1].replace('Output:', '').trim();
        return { input: inputPart, output: outputPart };
      }
      return null;
    };
    
    const parsedRows = lines.map(parseLine).filter(x => x);
    if (parsedRows.length > 0) {
      return (
        <div className="space-y-1.5 w-full text-left font-body">
          {parsedRows.map((row, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-md p-2 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold">
                <span className="bg-slate-200/80 px-1 py-0.5 rounded font-black font-display uppercase tracking-wider text-[8px] leading-none shrink-0">
                  Input
                </span>
                <span className="font-mono text-slate-700 font-extrabold truncate">"{row.input}"</span>
              </div>
              <div className="flex items-start gap-1.5 text-xs text-indigo-950 font-extrabold">
                <span className="bg-indigo-950 text-white px-1 py-0.5 rounded font-black font-display uppercase tracking-wider text-[8px] leading-none shrink-0 mt-0.5">
                  Output
                </span>
                <span className="leading-tight">{row.output}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  // Lesson 9: Chain-of-Thought Step-by-Step
  if (lessonId === 9) {
    const lines = text.split('\n').filter(line => line.trim());
    const steps = [];
    let intro = "";
    let conclusion = "";

    lines.forEach(line => {
      const match = line.match(/^(\d+)\.\s*(.*)/);
      if (match) {
        steps.push({ num: match[1], text: match[2] });
      } else if (line.toLowerCase().startsWith('conclusion:')) {
        conclusion = line.replace(/conclusion:/i, '').trim();
      } else if (line.toLowerCase().startsWith("let's")) {
        intro = line;
      } else {
        if (!intro) {
          intro = line;
        } else {
          intro += " " + line;
        }
      }
    });

    if (steps.length > 0) {
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
                <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-indigo-900 text-white flex items-center justify-center text-xs font-black shadow-sm font-display">
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
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm shrink-0 animate-pulse">
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
  }

  // Lesson 10: Combining Everything RPG Prompt
  if (lessonId === 10) {
    const lines = text.split('\n').filter(line => line.trim());
    let role = "";
    let setting = "";
    let format = "";
    let question = "";

    lines.forEach(line => {
      if (line.toLowerCase().startsWith('act as') || line.toLowerCase().startsWith('you are hosting')) {
        role = line;
      } else if (line.startsWith('[Setting]:')) {
        setting = line.replace('[Setting]:', '').trim();
      } else if (line.startsWith('[Format]:')) {
        format = line.replace('[Format]:', '').trim();
      } else if (line.toLowerCase().includes('what do you do?')) {
        question = line;
      }
    });

    if (role || setting || format || question) {
      return (
        <div className="w-full text-left space-y-3 font-body">
          {role && (
            <div className="bg-gradient-to-r from-indigo-800 to-indigo-950 text-white rounded-lg p-3 shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-widest text-indigo-200 block mb-0.5 font-display">
                Role & Persona
              </span>
              <p className="text-xs sm:text-sm font-black leading-tight">
                {role}
              </p>
            </div>
          )}
          {setting && (
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1 font-display">
                Adventure Setting
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-normal">
                {setting}
              </p>
            </div>
          )}
          {format && (
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block mb-1 font-display">
                Format Rules
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-700 leading-normal">
                {format}
              </p>
            </div>
          )}
          {question && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 text-center border-dashed">
              <p className="text-xs sm:text-sm font-black text-indigo-800 animate-pulse">
                {question}
              </p>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm text-indigo-950 font-extrabold leading-relaxed">
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
    1: { role: "Disney Cartoonist", subject: "" },
    2: { subject: "", details: "", setting: "" },
    3: { task: "", limit: "Exactly 2 sentences", forbidden: "" },
    4: { subject: "", style: "Pixar 3D Animation" },
    5: { subject: "", lighting: "Sunset Golden Hour" },
    6: { subject: "", tone: "Silly Pirate slang" },
    7: { subject: "", format: "A 2-column Markdown Table" },
    8: { in1: "", out1: "", target: "" },
    9: { puzzle: "" },
    10: { role: "", subject: "", style: "", limit: "" }
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
    setIsQuestCasting(true);
    setCastingStep(0);
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
    "🔮 Analysing prompt keywords...",
    "✨ Mixing roleplay attributes...",
    "🧬 Injecting detailed descriptions...",
    "🤖 Simulating magical AI output..."
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
            className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getBadgeTypeColor(ing.type)}`}
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
        alert("🎉 Congratulations! You have completed all 10 lessons of the AI Prompt Academy and unlocked the Prompt Grandmaster rank! 👑");
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
    <div className="bg-white rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 md:p-8 font-body">
      {/* Academy Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-display flex items-center gap-2">
            <WandSparkles className="text-indigo-600 animate-pulse" /> AI Prompt Academy
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-bold mt-0.5">
            Master the art of asking AI and unlock magical results!
          </p>
        </div>
        <div className="flex items-center gap-2.5 bg-indigo-50/40 px-5 py-2.5 rounded-lg border border-indigo-100/80 shadow-sm">
          <Award className="text-indigo-600" size={24} />
          <div>
            <span className="text-[10px] sm:text-xs font-black uppercase text-indigo-600 tracking-wider block leading-none font-display">
              XP Points
            </span>
            <span className="text-lg md:text-xl font-black text-indigo-800 leading-none">
              {xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar Row */}
      <div className="bg-slate-50 rounded-xl p-4 sm:p-5 mb-6 border border-slate-100/80 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="flex-1 w-full">
          <div className="flex justify-between text-xs sm:text-sm font-black uppercase tracking-wider text-slate-500 mb-2 font-display">
            <span>Course Progress</span>
            <span className="text-indigo-800">
              {completedLessons.length} / 10 Lessons Done ({Math.round(progressPercentage)}%)
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-md overflow-hidden">
            <motion.div
              animate={{ width: `${progressPercentage}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700"
            />
          </div>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2 text-center shrink-0">
          <span className="text-[10px] sm:text-xs font-black text-indigo-700 uppercase tracking-widest block mb-0.5 font-display">
            Title Rank
          </span>
          <span className="text-sm sm:text-base font-black text-indigo-950 font-display">
            {completedLessons.length === 10
              ? "Prompt Grandmaster"
              : completedLessons.length >= 6
              ? "Prompt Knight"
              : completedLessons.length >= 3
              ? "Prompt Adept"
              : "Prompt Apprentice"}
          </span>
        </div>
      </div>

      {/* Main double column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Syllabus Navigator */}
        <div className="lg:col-span-4 space-y-3 max-h-[620px] overflow-y-auto pr-1 prompt-academy-scrollbar" data-lenis-prevent>
          <h3 className="text-xs sm:text-sm font-black text-slate-500 uppercase tracking-wider mb-2 px-1 font-display">
            Syllabus Directory
          </h3>
          {lessonsData.map((lesson, idx) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isActive = activeLessonIdx === idx;
            const isLocked = lesson.id > 1 && !completedLessons.includes(lesson.id - 1) && !isActive;

            let cardStyle = "border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50/50 text-slate-600";
            if (isActive) {
              cardStyle = "border-indigo-500 bg-indigo-50/30 text-indigo-950 shadow-sm ring-1 ring-indigo-500/20";
            } else if (isLocked) {
              cardStyle = "border-slate-50 bg-slate-50/40 text-slate-400 opacity-60 cursor-not-allowed";
            }

            return (
              <button
                key={lesson.id}
                disabled={isLocked}
                onClick={() => selectLesson(idx)}
                className={`w-full flex items-center justify-between gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${cardStyle}`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-indigo-900 shrink-0">
                    {lesson.icon}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wide block leading-none mb-1.5 font-display">
                      Lesson {lesson.id}
                    </span>
                    <h4 className="text-sm sm:text-base font-black font-display truncate leading-tight">
                      {lesson.title}
                    </h4>
                    <span className="text-xs font-semibold text-slate-500 opacity-80 block truncate">
                      {lesson.concept}
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  {isCompleted ? (
                    <span className="text-[10px] sm:text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-display">
                      ✓ Completed
                    </span>
                  ) : isActive ? (
                    <span className="text-[10px] sm:text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded animate-pulse font-display">
                      ⚡ Active
                    </span>
                  ) : isLocked ? (
                    <span className="text-[10px] sm:text-xs font-black text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-display">
                      🔒 Locked
                    </span>
                  ) : (
                    <span className="text-[10px] sm:text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded font-display">
                      🔓 Open
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right column: Active lesson content area */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Active Lesson Header Banner */}
          <div className="bg-gradient-to-r from-indigo-800 to-indigo-950 p-5 text-white flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-indigo-100 bg-white/10 px-3 py-1 rounded mb-1.5 inline-block font-display">
                Level {activeLesson.id}: {activeLesson.concept}
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display">
                {activeLesson.title}
              </h3>
            </div>
            <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 shadow-sm">
              {activeLesson.icon}
            </span>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {[
              { id: "learn", label: "Learn", subtitle: "Concept" },
              { id: "quest", label: "Quest", subtitle: "Help Hero" },
              { id: "sandbox", label: "Sandbox", subtitle: "Playground" },
              { id: "battle", label: "Battle", subtitle: "Final Test" }
            ].map(tab => {
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3.5 text-center transition-all cursor-pointer border-b-2 outline-none flex flex-col items-center justify-center ${
                    isTabActive
                      ? "border-indigo-600 bg-white text-indigo-700 font-black"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span className="text-sm sm:text-base font-black font-display">{tab.label}</span>
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
                      <p className="text-xs sm:text-sm text-indigo-600 font-black font-display">
                        {activeLesson.learn.subtitle}
                      </p>
                    </div>
                    <button
                      onClick={handleSpeak}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-95 shrink-0 ${
                        isSpeaking
                          ? "bg-indigo-600 border-indigo-600 text-white animate-pulse"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-indigo-100"
                      }`}
                      title={isSpeaking ? "Mute Speech" : "Listen with Voice"}
                    >
                      {isSpeaking ? (
                        <>
                          <MicOff size={16} />
                          <span className="text-xs font-black font-display hidden sm:inline">Stop</span>
                        </>
                      ) : (
                        <>
                          <Mic size={16} />
                          <span className="text-xs font-black font-display hidden sm:inline">Listen</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
                    {activeLesson.learn.description}
                  </p>

                  <div className="bg-indigo-50/40 border border-indigo-100/70 rounded-xl p-5">
                    <span className="text-xs sm:text-sm font-black text-indigo-600 uppercase tracking-wider block mb-2.5 font-display">
                      💡 Prompt Master Tips
                    </span>
                    <ul className="space-y-2 text-sm text-slate-700 font-bold list-disc pl-5 leading-normal">
                      {activeLesson.learn.tips.map((tip, tIdx) => (
                        <li key={tIdx}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setActiveTab("quest")}
                      className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-lg text-xs sm:text-sm font-black font-display transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1"
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
                    <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center p-8 text-center rounded-xl">
                      <div className="relative w-24 h-24 mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                        <div className="absolute inset-2 bg-indigo-50 rounded-full flex items-center justify-center">
                          <WandSparkles className="text-indigo-600 animate-bounce" size={28} />
                        </div>
                      </div>
                      <h3 className="text-base font-black text-slate-800 font-display mb-1">
                        Casting Spell...
                      </h3>
                      <p className="text-sm font-black text-indigo-600 animate-pulse font-display">
                        {castingTexts[castingStep]}
                      </p>
                    </div>
                  )}

                  {questCleared[activeLesson.id] ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Boring Output */}
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex flex-col justify-between">
                          <div>
                            <span className="text-xs sm:text-sm font-black text-slate-500 uppercase font-display block mb-1">
                              Boring Prompt Result
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-400 block mb-3 font-mono">
                              "{activeLesson.quest.boringPrompt}"
                            </span>
                          </div>
                          <div className="bg-white rounded-lg overflow-hidden min-h-[180px] flex items-center justify-center p-3 border border-slate-100">
                            {activeLesson.quest.boringOutputImage ? (
                              <BoringVsSuperPromptImage
                                imageUrl={activeLesson.quest.boringOutputImage}
                                altText="Boring output"
                                isAwesome={false}
                              />
                            ) : (
                              <div className="w-full bg-slate-50/50 p-4 rounded-lg font-mono text-xs sm:text-sm text-slate-500 border border-slate-100 leading-relaxed select-none">
                                {activeLesson.quest.boringOutputText}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Awesome Super Output */}
                        <div className="bg-indigo-50/10 border border-indigo-100/80 rounded-xl p-5 flex flex-col justify-between relative shadow-sm">
                          <span className="absolute top-2.5 right-2.5 bg-indigo-600 text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded uppercase tracking-wider font-display animate-bounce">
                            Awesome
                          </span>
                          <div>
                            <span className="text-xs sm:text-sm font-black text-indigo-600 uppercase font-display block mb-1">
                              Magic Super Prompt Result
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-700 block mb-3 max-h-16 overflow-y-auto leading-relaxed font-mono">
                              "{getLivePromptText()}"
                            </span>
                          </div>
                          <div className="bg-gradient-to-br from-indigo-50/20 to-slate-50/20 rounded-lg overflow-hidden min-h-[180px] flex items-center justify-center p-3 border border-indigo-100/50">
                            {activeLesson.quest.superOutputImage ? (
                              <BoringVsSuperPromptImage
                                imageUrl={activeLesson.quest.superOutputImage}
                                altText="Awesome output"
                                isAwesome={true}
                              />
                            ) : (
                              <div className="w-full bg-white p-4 rounded-lg border border-indigo-100 shadow-sm max-h-[160px] overflow-y-auto" data-lenis-prevent>
                                {renderProfessionalTextOutput(activeLesson.quest.superOutputText, activeLesson.id)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quest cleared card */}
                      <div className="bg-gradient-to-r from-indigo-800 to-indigo-950 rounded-xl p-5 text-white text-center flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-left">
                          <h4 className="text-base sm:text-lg font-black font-display flex items-center gap-1.5 justify-center sm:justify-start">
                            Quest Cleared!
                          </h4>
                          <p className="text-xs sm:text-sm text-indigo-100 font-bold">
                            Badge Unlocked:{" "}
                            <span className="bg-white/10 px-2 py-0.5 rounded font-black text-white font-display">
                              {activeLesson.quest.badge}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs sm:text-sm font-black bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 font-display">
                            +50 XP awarded
                          </span>
                          <button
                            onClick={() => setActiveTab("sandbox")}
                            className="bg-white text-indigo-700 hover:bg-slate-50 px-5 py-2 rounded-lg text-xs sm:text-sm font-black font-display shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-0.5"
                          >
                            Go to Sandbox <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Character bubble */}
                      <div className="md:col-span-5 bg-slate-50 border border-slate-100 p-5 rounded-xl text-center flex flex-col items-center">
                        <div className="w-24 h-24 bg-white rounded-xl border border-indigo-100 shadow-sm p-1.5 mb-3.5 shrink-0 overflow-hidden">
                          {getCharacterImage(activeLesson)}
                        </div>
                        <h4 className="text-sm sm:text-base font-black text-slate-800 font-display">
                          {activeLesson.quest.characterName}
                        </h4>
                        <span className="text-[10px] sm:text-xs font-black text-indigo-600 uppercase tracking-widest block mb-3 font-display">
                          Quest Guide
                        </span>
                        <div className="bg-white border border-slate-100/80 p-3.5 rounded-lg shadow-inner text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed text-left relative">
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-slate-100/80 rotate-45" />
                          "{activeLesson.quest.characterMsg}"
                        </div>
                      </div>

                      {/* Ingredients selection */}
                      <div className="md:col-span-7 space-y-4">
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-800 font-display flex items-center gap-1.5">
                            <WandSparkles size={16} className="text-indigo-600" /> Assemble Ingredients
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                            Select all 4 power-ups to write the ultimate prompt.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {activeLesson.quest.ingredients.map(ing => {
                            const isSelected = isIngredientSelected(ing.id);
                            return (
                              <button
                                key={ing.id}
                                onClick={() => toggleIngredient(ing)}
                                className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${getIngredientColorClass(
                                  ing.type,
                                  isSelected
                                )}`}
                              >
                                <div className="flex items-center justify-between mb-1.5 leading-none">
                                  <span className="text-xs sm:text-sm font-black font-display uppercase tracking-wide leading-none">
                                    {ing.label}
                                  </span>
                                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                                    isSelected 
                                      ? "bg-emerald-500 text-white" 
                                      : "border border-slate-300 text-slate-300 bg-white"
                                  }`}>
                                    {isSelected ? "✓" : "+"}
                                  </span>
                                </div>
                                <p className="text-xs sm:text-sm font-bold opacity-95 leading-normal mb-1.5 font-mono">
                                  "{ing.text}"
                                </p>
                                <span className="text-[10px] sm:text-xs font-semibold block opacity-85 leading-normal">
                                  {ing.desc}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Bottom live prompt preview and cast button */}
                      <div className="md:col-span-12 space-y-3 pt-3 border-t border-slate-100">
                        <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
                          <span className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-wider block mb-1.5 font-display">
                            Live Prompt spell composition
                          </span>
                          <div className="bg-white border border-slate-100 p-4 rounded-lg min-h-[60px] flex items-center leading-relaxed text-xs sm:text-sm font-mono text-indigo-700 font-extrabold shadow-inner">
                            {renderLivePromptBadges()}
                          </div>
                        </div>
                        <button
                          onClick={handleCastSpell}
                          disabled={selectedIngredients.length < activeLesson.quest.ingredients.length}
                          className={`w-full py-3.5 rounded-lg text-sm sm:text-base font-black font-display transition-all ${
                            selectedIngredients.length === activeLesson.quest.ingredients.length
                              ? "bg-gradient-to-r from-indigo-800 to-indigo-950 hover:from-indigo-950 hover:to-indigo-900 text-white shadow-md cursor-pointer"
                              : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          Cast Prompt Spell!
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* SANDBOX STEP */}
              {activeTab === 'sandbox' && (
                <motion.div
                  key={`sandbox-${activeLesson.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-800 font-display mb-1">
                      {activeLesson.sandbox.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                      Customize the dynamic fields to construct a custom prompt spell.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Input customizers */}
                    <div className="md:col-span-5 bg-slate-50 border border-slate-100 p-5 rounded-xl space-y-4">
                      {activeLesson.sandbox.inputs.map(inp => {
                        const val = sandboxInputs[activeLesson.id]?.[inp.key] || "";
                        return (
                          <div key={inp.key}>
                            <label className="text-xs sm:text-sm font-black text-slate-600 uppercase font-display tracking-wider block mb-1.5">
                              {inp.label}
                            </label>
                            {inp.type === "select" ? (
                              <select
                                value={val}
                                onChange={(e) => handleSandboxInputChange(inp.key, e.target.value)}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-xs sm:text-sm font-semibold bg-white text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all cursor-pointer"
                              >
                                {inp.options.map(opt => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                placeholder={inp.placeholder}
                                value={val}
                                onChange={(e) => handleSandboxInputChange(inp.key, e.target.value)}
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-xs sm:text-sm font-semibold bg-white text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Result composition */}
                    <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex-1">
                        <span className="text-[10px] sm:text-xs font-black text-slate-500 uppercase font-display tracking-wider block mb-2">
                          Live Generated Prompt Formula
                        </span>
                        <div className="bg-white border border-slate-100 p-4 rounded-lg text-xs sm:text-sm text-slate-700 font-mono leading-relaxed min-h-[100px] max-h-[160px] overflow-y-auto break-words select-all" data-lenis-prevent>
                          {getSandboxPromptText()}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={handleCopySandboxSpell}
                          className="flex-1 py-3 bg-gradient-to-r from-indigo-800 to-indigo-950 hover:from-indigo-900 hover:to-indigo-950 text-white rounded-lg text-xs sm:text-sm font-black font-display transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          {isCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                          {isCopied ? "Copied Spell!" : "Copy to Clipboard"}
                        </button>
                        <a
                          href="https://chat.openai.com"
                          target="_blank"
                          rel="noreferrer"
                          className="py-3 px-5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg text-xs sm:text-sm font-black font-display transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          Try in ChatGPT
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setActiveTab("battle")}
                      className="px-5 py-2.5 bg-gradient-to-r from-indigo-850 to-indigo-950 hover:from-indigo-900 hover:to-indigo-950 text-white rounded-lg text-xs sm:text-sm font-black font-display transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1"
                    >
                      Go to Battle Test! <ArrowRight size={16} />
                    </button>
                  </div>
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
                    <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                      Pick the prompt that uses all guidelines to defeat the Boring Text Monster!
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 shadow-inner">
                    <h4 className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                      {activeLesson.battle.scenario}
                    </h4>
                  </div>

                  <div className="space-y-3.5">
                    {activeLesson.battle.options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      let optionStyle = "bg-white border-slate-200 text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/15";
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
                          className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-250 cursor-pointer font-semibold ${optionStyle}`}
                        >
                          <span className={`w-7 h-7 rounded-md flex items-center justify-center text-xs sm:text-sm font-black shrink-0 transition-all shadow-sm ${
                            battleAnswered && option.isCorrect
                              ? "bg-emerald-500 text-white"
                              : battleAnswered && isSelected && !option.isCorrect
                              ? "bg-rose-500 text-white"
                              : isSelected
                              ? "bg-indigo-900 text-white"
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
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-indigo-50/40 border border-indigo-100 rounded-xl p-5 mt-3"
                    >
                      <span className="text-xs sm:text-sm font-black text-indigo-700 uppercase tracking-wider flex items-center gap-1 mb-1.5 font-display">
                        <HelpCircle size={14} /> Prompt Master Logic Explanation
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 font-bold leading-relaxed">
                        {activeLesson.battle.explanation}
                      </p>
                    </motion.div>
                  )}

                  {battleAnswered && (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleCompleteBattle}
                        className="px-5 py-2.5 bg-gradient-to-r from-indigo-850 to-indigo-950 hover:from-indigo-900 hover:to-indigo-950 text-white rounded-lg text-xs sm:text-sm font-black font-display transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1"
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
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-900 text-white shadow-md shadow-indigo-150'
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
          <div key={tool.name} className="p-5 rounded-[20px] border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-lg transition-all group cursor-pointer relative">
           
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl ${tool.iconBg}`}>
                {tool.icon}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">{tool.name}</h4>
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
    if (idx === quizQuestions[currentQ].correct) setScore(prev => prev + 10);
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
    setCurrentQ(0); setSelectedOption(null); setIsAnswered(false);
    setScore(0); setShowResult(false);
  };

  const getOptionStyle = (idx) => {
    if (!isAnswered) return selectedOption === idx 
      ? 'bg-indigo-50 border-indigo-500 text-indigo-950' 
      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50';
    if (idx === quizQuestions[currentQ].correct) return 'bg-emerald-50 border-emerald-500 text-emerald-700';
    if (idx === selectedOption) return 'bg-rose-50 border-rose-500 text-rose-700';
    return 'bg-slate-50 border-slate-100 text-slate-400';
  };

  const getLabelBg = (idx) => {
    if (!isAnswered) return selectedOption === idx ? 'bg-indigo-900 text-white' : 'bg-slate-100 text-slate-500';
    if (idx === quizQuestions[currentQ].correct) return 'bg-emerald-500 text-white';
    if (idx === selectedOption) return 'bg-rose-500 text-white';
    return 'bg-slate-200 text-slate-400';
  };

  const q = quizQuestions[currentQ];
  const progress = ((currentQ + (isAnswered ? 1 : 0)) / quizQuestions.length) * 100;

  return (
    <div className="w-full flex justify-center py-8 relative rounded-[24px] overflow-hidden border border-slate-100">
      {/* Background Image with translucent overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/images/ai/challenge.png" alt="Quiz Background" className="w-full h-full object-cover opacity-100" />
        
      </div>

      <div className="w-full max-w-[450px] shrink-0 transition-all duration-300 relative z-10 px-4">
        <AnimatePresence mode="wait">
          {!showResult && (
            <motion.div key="active-quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full">
              <div className="bg-white/20 backdrop-blur-xl rounded-[20px] p-5 sm:p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-900 flex items-center justify-center shadow-inner">
                      <Brain size={16} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white">Question {currentQ + 1}/{quizQuestions.length}</h3>
                      <p className="text-[10px] font-bold text-white/80">AI Knowledge Test</p>
                    </div>
                  </div>
                  <div className="bg-slate-50/80 px-3 py-1.5 rounded-lg border border-slate-200/60 text-center">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Score</span>
                    <span className="text-sm font-black text-indigo-950 leading-none">{score}</span>
                  </div>
                </div>

                <div className="w-full h-1 bg-slate-100 rounded-full mb-5 overflow-hidden">
                  <motion.div animate={{ width: `${progress}%` }} className="h-full bg-indigo-900 rounded-full" />
                </div>

                <h2 className="text-[15px] font-bold text-white leading-snug mb-5">
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
                      {selectedOption === q.correct ? 'Correct!' : selectedOption === null ? "Time is up!" : 'Wrong answer'}
                    </span>
                  ) : <div />}

                  {isAnswered && (
                    <button onClick={handleNext}
                      className="flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-indigo-850 to-indigo-950 hover:from-indigo-900 hover:to-indigo-950 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-indigo-150 active:scale-95"
                    >
                      {currentQ < quizQuestions.length - 1 ? 'Next' : 'Results'} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {showResult && (
            <motion.div key="quiz-results" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
              <div className="bg-white/20 backdrop-blur-xl rounded-[20px] p-6 sm:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] text-center">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-900 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <Trophy size={32} />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">Challenge Completed!</h2>
                <p className="text-xs text-white/80 mb-6 font-medium">You've successfully finished the AI Knowledge Challenge.</p>

                <div className="bg-slate-50/80 rounded-[16px] p-5 mb-6 border border-slate-200/60 inline-block min-w-[180px]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Score</span>
                  <span className="text-3xl font-black text-indigo-950">{score}</span>
                  <span className="text-[10px] font-bold text-slate-400 block mt-1">out of {quizQuestions.length * 10}</span>
                </div>

                <div className="flex justify-center">
                  <button onClick={handleRestart} className="px-6 py-2.5 bg-gradient-to-r from-indigo-850 to-indigo-950 hover:from-indigo-900 hover:to-indigo-950 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-indigo-150 active:scale-95">
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
    { label: 'Learn Concepts', value: 'Step by step', icon: <Lightbulb className="text-indigo-900" />, color: 'bg-slate-100' },
    { label: 'Prompt Academy', value: 'Prompt Hero!', icon: <WandSparkles className="text-indigo-900" />, color: 'bg-slate-100' },
    { label: 'Explore Tools', value: 'AI powered', icon: <Cpu className="text-indigo-900" />, color: 'bg-slate-100' },
    { label: 'Take Challenges', value: 'Test skills', icon: <Trophy className="text-indigo-900" />, color: 'bg-slate-100' }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex font-sans text-slate-900 overflow-x-hidden">
      <button
        onClick={() => navigate("/ai-intelligence")}
        className="fixed top-3 left-3 md:top-5 md:left-5 z-50 w-9 h-9 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400 hover:text-indigo-900 hover:shadow-lg transition-all border border-slate-100 group"
      >
        <ArrowLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      {/* Main Content */}
      <main className="flex-1 min-h-screen pb-4 overflow-y-auto">
        <div className="px-4 sm:px-6 md:px-12 2xl:px-20 space-y-6 md:space-y-8 pt-4 2xl:max-w-[1600px] 2xl:mx-auto">

          {/* Top Promotional Banner */}
          <div className="bg-gradient-to-r from-indigo-850 to-indigo-950 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-white/10 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-120 transition-transform duration-700 pointer-events-none" />
            <div className="flex items-center gap-3 relative z-10 text-left">
              <span className="text-2xl shrink-0"><WandSparkles className="text-indigo-200" /></span>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base font-display">Learn How to Use AI in Efficient Ways!</h4>
                <p className="text-xs text-indigo-200 font-bold">Unlock the secrets of Prompt Academy to get 10x better results from AI sidekicks.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveFilter('Prompt Academy');
                const target = document.getElementById("content-section");
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-white text-indigo-950 hover:bg-slate-100 rounded-xl text-xs sm:text-sm font-black font-display shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0 relative z-10"
            >
              Start Prompt Academy!
            </button>
          </div>

          {/* Hero & Stats Section */}
          <div className="relative">
            {/* Hero Section */}
            <section className="bg-white rounded-[16px] md:rounded-[24px] overflow-hidden relative border border-slate-100 flex items-center min-h-[200px] sm:min-h-[260px] md:min-h-[300px] 2xl:min-h-[380px] pb-4 md:pb-6">
              <div className="relative z-10 p-5 sm:p-8 md:p-10 lg:w-1/2 space-y-3 md:space-y-4">
                 <h1 className="text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] 2xl:text-[52px] font-extrabold leading-[1.05] tracking-tight text-[#1e293b]">
                    Build. Learn. &amp; <br /> Think Smarter with <br />
                    <span className="text-indigo-900 font-extrabold">AI Intelligence</span>
                 </h1>
                 <p className="text-slate-500 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium leading-relaxed max-w-sm">
                   Your AI-powered learning hub for skills and knowledge.
                 </p>
                 
                 <div className="pt-2">
                   <button 
                     onClick={() => {
                        const target = document.getElementById("content-section");
                        if(target) target.scrollIntoView({ behavior: 'smooth' });
                     }}
                      className="px-5 py-2.5 sm:px-6 sm:py-3 bg-indigo-900 text-white rounded-full font-bold text-[12px] sm:text-[14px] flex items-center gap-2 hover:bg-indigo-950 transition-colors w-max shadow-sm shadow-indigo-150"
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
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 relative z-20 -mt-8 px-4 md:px-12">
              {quickStats.map((stat, i) => {
                const isActive = activeFilter === stat.label;
                return (
                  <div 
                    key={i} 
                    onClick={() => {
                      setActiveFilter(stat.label);
                      const target = document.getElementById("content-section");
                      if(target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`bg-white rounded-[16px] p-3 md:p-4 border ${isActive ? 'border-indigo-500 ring-2 ring-indigo-500/10 shadow-md' : 'border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'} flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow cursor-pointer group`}
                  >
                     <div className={`w-[44px] h-[44px] ${isActive ? 'bg-indigo-900 text-white' : stat.color} rounded-[12px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform [&>svg]:w-5 [&>svg]:h-5`}>
                        {React.cloneElement(stat.icon, { className: isActive ? 'text-white' : stat.icon.props.className })}
                     </div>
                     <div>
                        <h4 className={`text-[13px] font-bold leading-tight transition-colors ${isActive ? 'text-indigo-900' : 'text-[#1e1b4b] group-hover:text-indigo-900'}`}>{stat.label}</h4>
                        <p className={`text-[11px] font-medium mt-0.5 ${isActive ? 'text-indigo-750/80' : 'text-slate-500'}`}>{stat.value}</p>
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
                {activeFilter === 'Prompt Academy' && <PromptAcademyComponent />}
                {activeFilter === 'Learn Concepts' && (
                  <div className="space-y-8 max-w-5xl mx-auto font-body">
                    {/* Top Hero Card: What is AI? */}
                    <div className="bg-gradient-to-r from-indigo-850 to-indigo-950 rounded-[24px] p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-indigo-900/20">
                      <div className="absolute right-4 bottom-4 text-8xl opacity-15 select-none pointer-events-none">
                        <Brain size={96} className="text-indigo-200 opacity-20" />
                      </div>
                      <div className="relative z-10 space-y-3">
                        <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider font-display border border-white/10">
                          AI for Kids
                        </span>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-display leading-tight">
                          What is Artificial Intelligence (AI)?
                        </h2>
                        <p className="text-sm sm:text-base text-blue-50 font-medium leading-relaxed max-w-2xl">
                          Imagine your computer got a brain! Normally, computers are like super obedient recipe books—they only do exactly what you tell them. But an <strong>AI</strong> is like a <strong>smart computer assistant</strong>! It can learn by looking at pictures, listening to your voice, and guessing what to do next!
                        </p>
                      </div>
                    </div>

                    {/* Top Prominent CTA button inside Learn Concepts */}
                    <div className="bg-gradient-to-r from-indigo-50/20 to-slate-50 border border-indigo-100 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 text-left">
                        <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-900 shrink-0"><WandSparkles size={16} /></span>
                        <div>
                          <h4 className="text-sm sm:text-base font-black text-slate-800 font-display">
                            Want to become an AI prompt magician?
                          </h4>
                          <p className="text-xs text-slate-500 font-semibold leading-normal">
                            Learn how to command AI to draw pictures and write stories in efficient ways!
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveFilter('Prompt Academy');
                          const target = document.getElementById("content-section");
                          if (target) target.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-5 py-2.5 bg-gradient-to-r from-indigo-850 to-indigo-950 hover:from-indigo-900 hover:to-indigo-950 text-white rounded-xl font-bold font-display text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
                      >
                        Click to learn how to use AI in efficient ways!
                      </button>
                    </div>

                    {/* Sub-tab Navigation for Learn Concepts */}
                    <div className="flex flex-wrap bg-slate-100/60 border border-slate-200/50 rounded-2xl p-1.5 gap-1 shadow-inner">
                      {[
                        { id: 'meet', label: 'Meet Robo' },
                        { id: 'superpowers', label: 'AI Superpowers' },
                        { id: 'works', label: 'How AI Learns' },
                        { id: 'rules', label: 'Smart Rules' }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setLearnSubTab(tab.id)}
                          className={`flex-1 min-w-[120px] py-3 text-center rounded-xl font-bold font-display transition-all cursor-pointer text-xs sm:text-sm ${
                            learnSubTab === tab.id
                              ? 'bg-white text-indigo-700 shadow-md ring-1 ring-slate-200'
                              : 'text-slate-500 hover:bg-white/50 hover:text-slate-800'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Sub-tab Content Area */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 sm:p-8 min-h-[300px]">
                      <AnimatePresence mode="wait">
                        {learnSubTab === 'meet' && (
                          <motion.div
                            key="meet"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                          >
                            <div className="lg:col-span-7 space-y-4 text-left">
                              <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider font-display inline-block">
                                Welcome Friend
                              </span>
                              <h3 className="text-xl sm:text-2xl font-black text-[#1e1b4b] font-display">
                                Meet Your AI Sidekick!
                              </h3>
                              <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
                                Imagine your computer got a brain! Normally, computer programs are like super obedient recipe books—they only do exactly what the programmer wrote, step-by-step.
                              </p>
                              <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
                                But an <strong>Artificial Intelligence (AI)</strong> is like a <strong>smart computer assistant</strong>! It doesn't just copy. It can learn by looking at pictures, listening to your voice, and guessing what to do next!
                              </p>
                              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3 mt-4">
                                <span className="text-xl shrink-0"><Lightbulb className="text-indigo-900" size={20} /></span>
                                <p className="text-xs sm:text-sm text-slate-500 font-bold leading-normal">
                                  <strong>Did you know?</strong> AI isn't a physical robot in a factory. It is a set of smart rules and math running inside computer chips all over the world!
                                </p>
                              </div>
                            </div>
                            <div className="lg:col-span-5 flex justify-center">
                              <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-4 shadow-md flex items-center justify-center relative overflow-hidden group">
                                <motion.img
                                  src="/images/ai/cute_ai_robot.png"
                                  alt="Cute AI Robot"
                                  className="w-full h-full object-contain relative z-10"
                                  animate={{ y: [0, -10, 0] }}
                                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                />
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {learnSubTab === 'superpowers' && (
                          <motion.div
                            key="superpowers"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                          >
                            <div className="text-center max-w-2xl mx-auto space-y-2">
                              <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider font-display inline-block">
                                Magical Abilities
                              </span>
                              <h3 className="text-xl sm:text-2xl font-black text-[#1e1b4b] font-display">
                                What can AI do? (Its Superpowers!)
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                                Just like superheroes have special gear, AI has 4 amazing skills that let it understand the world around us.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              {/* Card 1 */}
                              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-indigo-200 transition-all hover:shadow-md flex items-start gap-4">
                                <span className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center shrink-0"><Eye size={20} /></span>
                                <div className="text-left space-y-1">
                                  <h4 className="text-base font-black text-slate-900 font-display">
                                    Computer Vision (AI Eyes)
                                  </h4>
                                  <p className="text-xs text-slate-500 font-bold leading-normal">
                                    AI looks at the pixels in photos or video feeds to recognize shapes, colors, and faces.
                                  </p>
                                  <p className="text-[11px] text-indigo-900 font-extrabold font-mono pt-1">
                                    Example: FaceID on phones & Self-driving cars.
                                  </p>
                                </div>
                              </div>

                              {/* Card 2 */}
                              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-indigo-200 transition-all hover:shadow-md flex items-start gap-4">
                                <span className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center shrink-0"><MessageSquare size={20} /></span>
                                <div className="text-left space-y-1">
                                  <h4 className="text-base font-black text-slate-900 font-display">
                                    Talking Chatbots (AI Speech)
                                  </h4>
                                  <p className="text-xs text-slate-500 font-bold leading-normal">
                                    AI uses Natural Language Processing to read sentences, translate languages, and talk to you.
                                  </p>
                                  <p className="text-[11px] text-indigo-900 font-extrabold font-mono pt-1">
                                    Example: Siri, Alexa, Google Gemini & ChatGPT.
                                  </p>
                                </div>
                              </div>

                              {/* Card 3 */}
                              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-indigo-200 transition-all hover:shadow-md flex items-start gap-4">
                                <span className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center shrink-0"><Brain size={20} /></span>
                                <div className="text-left space-y-1">
                                  <h4 className="text-base font-black text-slate-900 font-display">
                                    Pattern Finder (AI Brain)
                                  </h4>
                                  <p className="text-xs text-slate-500 font-bold leading-normal">
                                    AI reads huge tables of data to search for trends and predict what happens next.
                                  </p>
                                  <p className="text-[11px] text-indigo-900 font-extrabold font-mono pt-1">
                                    Example: YouTube recommending videos & Weather predictions.
                                  </p>
                                </div>
                              </div>

                              {/* Card 4 */}
                              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-indigo-200 transition-all hover:shadow-md flex items-start gap-4">
                                <span className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center shrink-0"><Palette size={20} /></span>
                                <div className="text-left space-y-1">
                                  <h4 className="text-base font-black text-slate-900 font-display">
                                    Generative AI (AI Artist)
                                  </h4>
                                  <p className="text-xs text-slate-500 font-bold leading-normal">
                                    AI learns styles from millions of drawings to build completely new images and stories from prompts.
                                  </p>
                                  <p className="text-[11px] text-indigo-900 font-extrabold font-mono pt-1">
                                    Example: Creating funny cartoon avatars & generating stories.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-indigo-50/20 to-slate-50 rounded-3xl p-5 flex flex-col md:flex-row items-center gap-6 border border-indigo-100/30">
                              <div className="md:w-1/3 flex justify-center">
                                <img
                                  src="/images/ai/ai_superpowers.png"
                                  alt="AI Superpowers Illustration"
                                  className="max-h-48 object-contain rounded-xl"
                               />
                              </div>
                              <div className="md:w-2/3 text-left space-y-2">
                                <h4 className="text-sm sm:text-base font-black text-indigo-950 font-display">
                                  AI is Your Creative Sidekick!
                                </h4>
                                <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">
                                  You don't need to be a coding genius to use AI's superpowers. By learning how to give it clean descriptions, you can use these powers to co-create beautiful illustrations, solve tough math riddles, or design customized learning plans!
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {learnSubTab === 'works' && (
                          <motion.div
                            key="works"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                          >
                            <div className="text-center max-w-2xl mx-auto space-y-2">
                              <span className="bg-indigo-50 border border-indigo-100 text-indigo-750 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider font-display inline-block">
                                Training Timeline
                              </span>
                              <h3 className="text-xl sm:text-2xl font-black text-[#1e1b4b] font-display">
                                How Does AI Get So Smart?
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                                Just like a human student, AI goes to a digital school! Here are the 3 steps:
                              </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                              <div className="lg:col-span-5 flex justify-center order-last lg:order-first">
                                <div className="bg-gradient-to-br from-slate-100 to-indigo-50 rounded-3xl p-4 border border-indigo-100 flex items-center justify-center">
                                  <img
                                    src="/images/ai/ai_learning_dragon.png"
                                    alt="AI learning process illustration"
                                    className="max-h-64 sm:max-h-80 object-contain rounded-2xl"
                                  />
                                </div>
                              </div>
                              <div className="lg:col-span-7 space-y-5">
                                {/* Step 1 */}
                                <div className="flex items-start gap-4">
                                  <div className="w-8 h-8 rounded-full bg-indigo-900 text-white flex items-center justify-center text-sm font-black font-display shrink-0 shadow-sm">
                                    1
                                  </div>
                                  <div className="text-left">
                                    <h4 className="text-base font-black text-slate-900 font-display">
                                      The Giant Picture Book (Data)
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-normal">
                                      We show the AI computer program thousands or millions of examples—like photos of cats, trees, and numbers—until it recognizes what they are.
                                    </p>
                                  </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex items-start gap-4">
                                  <div className="w-8 h-8 rounded-full bg-indigo-900 text-white flex items-center justify-center text-sm font-black font-display shrink-0 shadow-sm">
                                    2
                                  </div>
                                  <div className="text-left">
                                    <h4 className="text-base font-black text-slate-900 font-display">
                                      The Guessing Game (Training)
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-normal">
                                      AI learns by guessing. If it guesses a cat is a dog, we say "Nope, try again!" It adjusts its virtual brain connections and tries again. Soon, it gets a perfect score!
                                    </p>
                                  </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex items-start gap-4">
                                  <div className="w-8 h-8 rounded-full bg-indigo-900 text-white flex items-center justify-center text-sm font-black font-display shrink-0 shadow-sm">
                                    3
                                  </div>
                                  <div className="text-left">
                                    <h4 className="text-base font-black text-slate-900 font-display">
                                      Spotting Secret Clues (Prediction)
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-normal">
                                      AI works like a detective. It notes clues—like cat pointy ears vs red apples—to tell them apart automatically without help!
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {learnSubTab === 'rules' && (
                          <motion.div
                            key="rules"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                          >
                            <div className="text-center max-w-2xl mx-auto space-y-2">
                              <span className="bg-indigo-50 border border-indigo-100 text-indigo-750 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider font-display inline-block">
                                Be Safe & Smart
                              </span>
                              <h3 className="text-xl sm:text-2xl font-black text-[#1e1b4b] font-display">
                                The Smart Rules of using AI!
                              </h3>
                              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                                AI is a super helpful friend, but we must use it safely and responsibly!
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                              {/* Rule 1 */}
                              <div className="bg-indigo-50/20 border border-indigo-100/50 rounded-2xl p-5 space-y-2 shadow-sm">
                                <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-900 shrink-0"><ShieldCheck size={16} /></span>
                                <h4 className="text-base font-black text-slate-900 font-display">
                                  Keep Secrets Secret
                                </h4>
                                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                                  Never share your real name, address, phone number, or passwords with an AI chatbot. Treat it like a friendly stranger in public!
                                </p>
                              </div>

                              {/* Rule 2 */}
                              <div className="bg-indigo-50/20 border border-indigo-100/50 rounded-2xl p-5 space-y-2 shadow-sm">
                                <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-900 shrink-0"><HelpCircle size={16} /></span>
                                <h4 className="text-base font-black text-slate-900 font-display">
                                  Double Check the Facts
                                </h4>
                                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                                  AI can sometimes make up silly answers (this is called a "hallucination"). Always double-check important details with a textbook, teacher, or parent!
                                </p>
                              </div>

                              {/* Rule 3 */}
                              <div className="bg-indigo-50/20 border border-indigo-100/50 rounded-2xl p-5 space-y-2 shadow-sm">
                                <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-900 shrink-0"><Brain size={16} /></span>
                                <h4 className="text-base font-black text-slate-900 font-display">
                                  Use Your Own Brain
                                </h4>
                                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                                  AI can explain hard homework concepts, but let it explain *how* to get the answer instead of copying it blindly. That's how you get smart!
                                </p>
                              </div>

                              {/* Rule 4 */}
                              <div className="bg-indigo-50/20 border border-indigo-100/50 rounded-2xl p-5 space-y-2 shadow-sm">
                                <span className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-900 shrink-0"><Palette size={16} /></span>
                                <h4 className="text-base font-black text-slate-900 font-display">
                                  Be Creative & Kind
                                </h4>
                                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                                  Use AI for positive ideas—like brainstorming fairytale stories, learning coding blocks, or creating beautiful art projects!
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Metaphor of Games Card */}
                    <div className="bg-slate-50 border border-slate-100 rounded-[20px] p-5 sm:p-6 flex flex-col md:flex-row items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-900 shrink-0">
                        <Gamepad2 size={24} />
                      </div>
                      <div className="space-y-1 text-left">
                        <h4 className="text-sm sm:text-base font-black text-slate-800 font-display">
                          Have you played with AI Games before?
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-relaxed">
                          You might have already played with AI! Have you ever tried <strong>Quick, Draw!</strong> (where AI guesses your doodles in real-time) or <strong>Akinator</strong> (the virtual genie who guesses who you're thinking of)? Those are powered by AI brains!
                        </p>
                      </div>
                    </div>
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
                  <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-900 flex items-center justify-center">
                    <Play size={20} className="fill-current" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight pr-8">{selectedItem.title}</h2>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mt-1">
                      <span className="flex items-center gap-1"><Clock size={14} /> {selectedItem.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-indigo-900">{selectedItem.level}</span>
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
                        <div className="w-16 h-16 rounded-full bg-indigo-900/90 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 cursor-pointer hover:scale-110 hover:bg-indigo-950 transition-all">
                          <Play className="ml-1.5 w-8 h-8 fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
                        <div className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-indigo-900 rounded-full" />
                        </div>
                        <span className="text-xs text-white font-medium font-mono text-shadow">01:23 / {selectedItem.duration}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <BookOpen size={20} className="text-indigo-900" /> Lesson Summary
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
