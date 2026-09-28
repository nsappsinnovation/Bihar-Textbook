import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/* The people who built the site. Static credit content, so it lives here rather
   than coming from directoryService the way the employee directory does.
   Photos are in public/images/developers/. */
const founder = {
  name: "Nishant Shekhar",
  role: "Founder, NS Apps Innovations",
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
    name: "Pranav Kumar",
    role: "Frontend Developer",
    image: "/images/developers/pranavkumar9.webp",
    linkedin: "https://www.linkedin.com/in/pranav-kumar-27723a295/",
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
    name: "Mansi Meha",
    role: "Frontend Developer",
    image: "/images/developers/mansimeha9.webp",
    linkedin: "https://www.linkedin.com/in/mansi-meha-2438283a0/",
    technologies: "React.js, Node, Express",
  },
  {
    name: "Akash Kumar",
    role: "Frontend Developer",
    image: "/images/developers/akashkumar9.webp",
    linkedin: "https://www.linkedin.com/in/akash-kumar-a58a3b2a9/",
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

/* Brand tints for the avatar disc, cycled by index so a row keeps some rhythm.
   They also stand in for the photo wherever it fails to load. */
const ACCENTS = ["#dbe6f6", "#d7e6fb", "#e3edfd", "#cddffa"];

function TeamCard({ name, role, image, accent, linkedin, technologies }) {
  return (
    <div className="group flex flex-col items-center text-center px-1">
      {/* Circular portrait on a tinted disc */}
      <div
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0"
        style={{ backgroundColor: accent }}
      >
        {/* No photo: initials on the tinted disc (no stand-in image is requested) */}
        <span className="absolute inset-0 grid place-items-center text-xl sm:text-2xl font-extrabold text-[#124d9c]/70">
          {name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
        </span>
        {image && (
        <img
          loading="lazy"
          decoding="async"
          src={image}
          /* the name sits directly below, so the photo is decorative to a
             screen reader — and an empty alt keeps a failed load from painting
             the name across the disc */
          alt=""
          onError={(e) => { e.currentTarget.style.display = "none"; }}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        )}
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

const LinkedInIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

/* The founder, featured on his own above the team */
function FounderCard({ name, role, image, linkedin, t }) {
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2);
  return (
    <section className="mb-16 md:mb-24 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-white px-6 pt-10 pb-8 text-center border border-[#124d9c]/10 shadow-[0_24px_60px_-24px_rgba(18,77,156,0.45)]"
      >
        {/* Soft brand glow behind the portrait */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#124d9c]/[0.08] to-transparent" />
        <div aria-hidden className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#60a5fa]/20 blur-3xl" />

        {/* Portrait with a gradient ring */}
        <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-br from-[#124d9c] via-[#3b82f6] to-[#0b2b4f] shadow-lg shadow-[#124d9c]/25">
          <div className="w-full h-full rounded-full bg-white p-1">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#e3edfd]">
            <span className="absolute inset-0 grid place-items-center text-4xl sm:text-5xl font-black text-[#124d9c]">{initials}</span>
            {image && (
              <img
                src={image}
                alt=""
                onError={(e) => { e.currentTarget.style.display = "none"; }}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            )}
          </div>
          </div>
        </div>

        <span className="relative mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#124d9c] px-3.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-white">
          {t("developer.founderBadge", "Founder")}
        </span>

        <h2 className="relative mt-3 text-2xl sm:text-3xl font-black tracking-tight text-[#0b2b4f]">{name}</h2>
        <p className="relative mt-1 text-sm sm:text-base font-semibold text-[#124d9c]">{role}</p>

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-[#124d9c]/20 bg-[#124d9c]/[0.04] px-5 py-2.5 text-sm font-bold text-[#124d9c] transition hover:bg-[#124d9c] hover:text-white"
          >
            <LinkedInIcon className="w-4 h-4" />
            {t("developer.connectLinkedIn", "Connect on LinkedIn")}
          </a>
        )}
      </motion.div>
    </section>
  );
}

function TeamGroup({ title, people, startIndex = 0 }) {
  return (
    <section className="mb-16 md:mb-24">
      <h2 className="text-center text-[16px] md:text-[20px] font-extrabold tracking-tight text-[#0b2b4f] mb-8 md:mb-12">
        {title}
      </h2>

      {/* a wrapping flex row rather than a grid, so a group that does not fill
          the last row stays centred instead of hanging on the left */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-12 sm:gap-x-8 sm:gap-y-16">
        {people.map((member, i) => (
          <div
            key={member.name}
            className="basis-[calc(50%-0.625rem)] sm:basis-[calc(50%-1rem)] lg:basis-[calc(25%-1.5rem)]"
          >
            <TeamCard {...member} accent={ACCENTS[(startIndex + i) % ACCENTS.length]} />
          </div>
        ))}
      </div>
    </section>
  );
}

const Developer = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      {/* ================= HERO ================= */}
      <section className="relative pt-16 pb-24 md:pt-20 md:pb-28 px-6 text-center overflow-hidden bg-gradient-to-br from-[#0b2b4f] to-[#124d9c]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3b82f6] rounded-full blur-[100px] opacity-30" />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-blue-200 text-[11px] md:text-sm font-bold tracking-[0.15em] uppercase mb-5 backdrop-blur-sm">
              {t("developer.badge", "About the creators")}
            </span>

            <h1 className="text-[30px] md:text-[52px] font-display font-black tracking-tight leading-[1.1] text-white mb-5">
              {t("developer.titleLine1", "A Startup Product")} <br />
              <span className="text-[#60a5fa]">{t("developer.titleLine2", "Born in Bihar")}</span>
            </h1>

            <p className="text-[14px] md:text-[17px] text-blue-100/90 leading-relaxed font-medium">
              {t("developer.intro", "NS Apps Innovations, a startup recognised by the Government of Bihar, builds with React.js, Node.js and Flutter. Across more than 28 projects — among them ASPIRE and the Samadhan apps — the team has used technology to make governance and learning work better for people.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 md:py-20">
        <FounderCard {...founder} t={t} />
        <TeamGroup title={t("developer.teamMembers", "Team Members")} people={team} />
      </div>
    </div>
  );
};

export default Developer;
