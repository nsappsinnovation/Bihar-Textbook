import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/* The people who built the site. Static credit content, so it lives here rather
   than coming from directoryService the way the employee directory does.
   Photos are in public/images/developers/. */
const founder = {
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
    technologies: "Figma, Framer",
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

// On large screens the first row holds 4 profiles and the row after it holds 5, all the same width
const FIRST_ROW = 4;

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

/* The founder, set on his own above the team: minimal and quiet */
function FounderCard({ name, role, image, linkedin, t }) {
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2);
  // Photos can be transparent cut-outs, so the initials show only when there is no photo (or it fails)
  const [photoFailed, setPhotoFailed] = React.useState(false);
  const showPhoto = image && !photoFailed;

  return (
    <section className="mb-14 md:mb-20 flex flex-col items-center text-center">
      {/* Portrait with a single hairline ring */}
      <div className="rounded-full p-1 ring-1 ring-[#124d9c]/25">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[#eef3fb]">
          {showPhoto ? (
            <img
              src={image}
              alt=""
              onError={() => setPhotoFailed(true)}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-2xl sm:text-3xl font-bold text-[#124d9c]/70">{initials}</span>
          )}
        </div>
      </div>

      <p className="mt-5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.32em] text-[#124d9c]/70">
        {t("developer.founderBadge", "Founder")}
      </p>
      <h2 className="mt-1.5 text-xl sm:text-[22px] font-bold tracking-tight text-[#0b2b4f]">{name}</h2>
      <p className="mt-0.5 text-[13px] sm:text-sm font-medium text-slate-500">{role}</p>

      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-slate-400 hover:text-[#124d9c] transition-colors"
          aria-label={`${name} on LinkedIn`}
        >
          <LinkedInIcon className="w-[18px] h-[18px]" />
        </a>
      )}

      {/* Hairline separating the founder from the team */}
      <span aria-hidden className="mt-10 md:mt-14 h-px w-16 bg-slate-300" />
    </section>
  );
}

function TeamGroup({ title, people, startIndex = 0 }) {
  return (
    <section className="mb-16 md:mb-24">
      <h2 className="text-center text-[16px] md:text-[20px] font-extrabold tracking-tight text-[#0b2b4f] mb-8 md:mb-12">
        {title}
      </h2>

      {/* Rows of equal-width profiles: 4 in the first row (centred), 5 in the rows after.
          Below lg every row simply wraps two per row. */}
      <div className="flex flex-col gap-y-12 sm:gap-y-16">
        {[people.slice(0, FIRST_ROW), people.slice(FIRST_ROW)].filter((row) => row.length).map((row, r) => (
          <div key={r} className="flex flex-wrap justify-center gap-x-5 gap-y-12 sm:gap-x-8 sm:gap-y-16">
            {row.map((member, i) => (
              <div
                key={member.name}
                className="basis-[calc(50%-0.625rem)] sm:basis-[calc(50%-1rem)] lg:basis-[calc(20%-1.6rem)]"
              >
                <TeamCard {...member} accent={ACCENTS[(startIndex + (r ? FIRST_ROW : 0) + i) % ACCENTS.length]} />
              </div>
            ))}
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
              {t("developer.taglineStart", "Imagine, Build,")}{" "}
              <span className="text-[#60a5fa]">{t("developer.taglineEnd", "Become")}</span>
            </h1>

            <p className="text-[14px] md:text-[17px] text-blue-100/90 leading-relaxed font-medium">
              {t("developer.intro", "NS Apps Innovations, a startup recognised by the Government of Bihar, builds with React.js, Node.js and Flutter. Across more than 28 projects — among them ASPIRE and the Samadhan apps — the team has used technology to make governance and learning work better for people.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 md:py-20">
        <FounderCard {...founder} t={t} />
        <TeamGroup title={t("developer.teamMembers", "Team Members")} people={team} />
      </div>
    </div>
  );
};

export default Developer;
