// Soft tint, accent colour and activity label per programme, keyed by link
export const LOOK = {
  "/vr-dashboard": { tint: "#e8f1ff", accent: "#1d5bd8", kindKey: "kindVr", kind: "Step inside" },
  "/audio-library-dashboard": { tint: "#f2edff", accent: "#6a4fd3", kindKey: "kindAudio", kind: "Listen" },
  "/sign-learn": { tint: "#e6f6f1", accent: "#0f8a6a", kindKey: "kindSign", kind: "Sign along" },
  "/ling": { tint: "#eef8ee", accent: "#1f7a4d", kindKey: "kindLing", kind: "Speak" },
  "/ai-intelligence-dashboard": { tint: "#f1edff", accent: "#5b3fd6", kindKey: "kindAi", kind: "Ask" },
  "/cyber-security-dashboard": { tint: "#e8f8ef", accent: "#11875a", kindKey: "kindCyber", kind: "Stay safe" },
  "/heritage-dashboard": { tint: "#fff4e4", accent: "#a8590b", kindKey: "kindHeritage", kind: "Explore" },
  "/life-skills": { tint: "#fdeef3", accent: "#c0265a", kindKey: "kindSkills", kind: "Play" },
};
export const FALLBACK = { tint: "#e9f1fc", accent: "#124d9c", kindKey: "kindOther", kind: "Discover" };
