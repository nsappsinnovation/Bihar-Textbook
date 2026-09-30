import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/* The people who built the site. Static credit content, so it lives here rather
   than coming from directoryService the way the employee directory does.
   Photos are in public/images/developers/. */
const founder = {
  isFounder: true,
  name: "Nishant Shekhar",
  role: "Founder, NS Apps Innovations",
  image: "/images/developers/nishantShekhar9.webp",
  linkedin: "https://www.linkedin.com/in/nishantshekhar28/",
};

const team = [
  {
    name: "Manish Kumar",
    role: "Team Lead",
    image: "/images/developers/manishkumar9.webp",
    linkedin: "https://www.linkedin.com/in/manish-kumar-b158b4252/",
    technologies: "React.js, Tailwind, GitHub",
  },
  {
    name: "Anushka Nandan",
    role: "Frontend Developer",
    image: "/images/developers/anushkanandan9.webp",
    linkedin: "https://www.linkedin.com/in/anushkanandan57/",
    technologies: "React.js, Tailwind, CSS",
  },
  {
    name: "Aditya Kumar",
    role: "DevOps Engineer",
    image: "/images/developers/adityakumar9.webp",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-780709320/",
    technologies: "CI/CD, Optimisation",
  },
  {
    name: "Pranav Kumar",
    role: "Frontend Developer",
    image: "/images/developers/pranavkumar9.webp",
    linkedin: "https://www.linkedin.com/in/pranav-kumar-27723a295/",
    technologies: "React.js, Tailwind, CSS",
  },
  {
    name: "Pooja Singh",
    role: "Content Designer",
    image: "/images/developers/poojasingh9.webp",
    linkedin: "https://www.linkedin.com/in/pooja-singh-40b448150/",
    technologies: "Content Writing, Feature Design",
  },
  {
    name: "Yuvika Singh",
    role: "Frontend Developer",
    image: "/images/developers/yuvikasingh9.webp",
    linkedin: "https://www.linkedin.com/in/yuvika-singh14/",
    technologies: "React.js, CSS",
  },
  {
    name: "Akash Kumar",
    role: "Frontend Developer",
    image: "/images/developers/akashkumar9.webp",
    linkedin: "https://www.linkedin.com/in/akash-kumar-a58a3b2a9/",
    technologies: "React.js, Node, Express",
  },
  {
    name: "Mansi Meha",
    role: "Frontend Developer",
    image: "/images/developers/mansimeha9.webp",
    linkedin: "https://www.linkedin.com/in/mansi-meha-2438283a0/",
    technologies: "React.js, Node, Express",
  },
  {
    name: "Aman Kumar",
    role: "Backend Engineer",
    image: "/images/developers/amankumar9.webp",
    linkedin: "https://www.linkedin.com/in/amankumar49/",
    technologies: "React.js, Node, Express, CI/CD",
  },
];

// Everyone in one "Team Members" section, the founder first
// Rows, top to bottom: the founder alone, then 4, then 5 (the reference layout)
const byName = Object.fromEntries(team.map((member) => [member.name, member]));
const rows = [
  [founder],
  ["Manish Kumar", "Anushka Nandan", "Aditya Kumar", "Pranav Kumar"].map((name) => byName[name]),
  ["Aman Kumar", "Pooja Singh", "Akash Kumar", "Mansi Meha", "Yuvika Singh"].map((name) => byName[name]),
];


/* Brand tints for the avatar disc, cycled by index so a row keeps some rhythm.
   They also stand in for the photo wherever it fails to load. */
const ACCENTS = ["#dbe6f6", "#d7e6fb", "#e3edfd", "#cddffa"];

function TeamCard({ name, role, image, accent, linkedin, technologies, isFounder }) {
  // Photos can be transparent cut-outs, so the initials show only when there is no photo (or it fails)
  const [photoFailed, setPhotoFailed] = React.useState(false);
  const showPhoto = image && !photoFailed;

  return (
    <div className="group flex flex-col items-center text-center px-1">
      {/* Circular portrait on a tinted disc; the founder's alone has a fine hairline ring */}
      <div className="rounded-full">
        <div
          className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 ${
            isFounder ? "ring-1 ring-[#124d9c]/40 ring-offset-[3px] ring-offset-[#fcfcfd]" : ""
          }`}
          style={{ backgroundColor: accent }}
        >
          {showPhoto ? (
            <img
              loading="lazy"
              decoding="async"
              src={image}
              /* the name sits directly below, so the photo is decorative to a screen reader */
              alt=""
              onError={() => setPhotoFailed(true)}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-xl sm:text-2xl font-extrabold text-[#124d9c]/70">
              {name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-4 text-[14px] sm:text-[16px] lg:text-[17px] font-extrabold tracking-tight text-[#0b2b4f] leading-snug">
        {name}
      </h3>

      <p className="mt-0.5 text-[12px] sm:text-[14px] font-semibold text-[#124d9c] leading-snug">
        {role}
      </p>

      {technologies && (
        <p className="mt-2 text-[11px] sm:text-[13px] font-medium text-slate-500 leading-relaxed max-w-[15rem]">
          {technologies}
        </p>
      )}

      {linkedin && (
        <div className="flex items-center justify-center gap-3 mt-3">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-[#124d9c] transition-colors"
            aria-label={`${name} on LinkedIn`}
          >
            <svg className="w-[18px] h-[18px] sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

/* The team in rows (founder first); every profile has the same width.
   Large screens: each row as given, centred. Below: two profiles per line. */
function TeamRows({ rows }) {
  let index = 0;
  return (
    <div className="flex flex-col gap-y-14 md:gap-y-20">
      {rows.map((row, r) => (
        <div key={r} className="flex flex-wrap justify-center gap-x-5 gap-y-12 sm:gap-x-8 sm:gap-y-16">
          {row.map((member) => {
            const accent = ACCENTS[index++ % ACCENTS.length];
            return (
              <div
                key={member.name}
                className="basis-[calc(50%-0.625rem)] sm:basis-[calc(50%-1rem)] lg:basis-[calc(20%-1.6rem)]"
              >
                <TeamCard {...member} accent={accent} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

const Developer = () => {
  const { t } = useTranslation();

  return (
    // clip-path keeps the fixed background inside this page (it never shows over the navbar or footer)
    <div className="relative isolate min-h-screen bg-white font-sans [clip-path:inset(0)]">
      {/* The team page background (public/images/developers/team-bg.png, used exactly as supplied),
          fixed to the screen area below the navbar while the page scrolls over it */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 top-[81px] -z-10 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: "url('/images/developers/team-bg.png')" }}
      />

      {/* ================= HERO ================= */}
      <section className="relative z-10 pt-14 pb-6 md:pt-20 md:pb-10 px-6 text-center">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[17px] md:text-[20px] font-bold uppercase text-[#2e3065]">
            {t("developer.eyebrow", "NS Apps Innovations")}
          </p>

          <h1 className="mt-1 text-[34px] md:text-[48px] font-extrabold tracking-tight leading-tight text-[#2e3065]">
            {t("developer.title", "Developer's Team")}
          </h1>

          {/* Tagline: Sora bold, tight tracking, "Become" in a brand-blue gradient */}
          <p className="mt-2 font-sora font-bold text-[20px] md:text-[26px] leading-snug tracking-[-0.02em] text-[#0b2b4f]">
            {t("developer.taglineStart", "Imagine, Build,")}{" "}
            <span className="bg-gradient-to-r from-[#124d9c] via-[#2563eb] to-[#4f7cf0] bg-clip-text text-transparent">
              {t("developer.taglineEnd", "Become")}
            </span>
          </p>

          <p className="mt-5 max-w-4xl mx-auto text-[13px] md:text-[14.5px] text-gray-700 leading-relaxed font-normal">
            {t("developer.intro", "NS Apps Innovations is a technology startup recognised by the Government of Bihar under Startup Bihar. The team designs and builds web and mobile applications with React.js, Node.js and Flutter, turning public services into simple digital experiences for citizens and departments. With more than 28 projects delivered, including ASPIRE and the Samadhan apps, it uses technology to make governance and learning more accessible and efficient. This website for the Bihar State Textbook Publishing Corporation Ltd. was designed and built by the team below.")}
          </p>
        </motion.div>
      </section>

      {/* ================= TEAM ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-10 pb-20 md:pt-16 md:pb-28">
        <TeamRows rows={rows} />
      </div>
    </div>
  );
};

export default Developer;
