import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/* The people who built the site. Static credit content, so it lives here rather
   than coming from directoryService the way the employee directory does. */
const teamLead = [
  {
    name: "Nishant Shekhar",
    role: "Founder, NS Apps Innovations",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFUD3EMJW-SMQ/profile-displayphoto-shrink_800_800/B4DZR_Z.U3HkAg-/0/1737304303571?e=1756339200&v=beta&t=8hP8IgMBOmmkcwGtdACuWoSxnXgkgFZSlmS6AnHFYIc",
    linkedin: "https://www.linkedin.com/in/nishantshekhar28/",
    technologies: "React, Node.js, Prisma, AWS",
  },
];

const teamHeads = [
  {
    name: "Amit Kumar Verma",
    role: "Frontend Developer",
    image: "https://media.licdn.com/dms/image/v2/D5603AQHQTREGjm6ZAA/profile-displayphoto-shrink_800_800/B56ZSmkK1qHQAc-/0/1737961290080?e=1743638400&v=beta&t=O5TVqp4NyTesLiLhHc6gLbryEYfAILbI5w589Lkmip0",
    linkedin: "https://www.linkedin.com/in/amit-kumar-verma-50b236266/",
    technologies: "React.js, Tailwind CSS",
  },
  {
    name: "Pratush Sinha",
    role: "Backend Developer",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFPUBM0kfxCiQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1683793618979?e=1741824000&v=beta&t=dIlHrKeILM-IQt_TZCv7NvZH-vgmj-Q6LQ3wu8FSp3M",
    linkedin: "https://www.linkedin.com/in/ps613/",
    technologies: "Node.js, Prisma, MySql",
  },
  {
    name: "Abhishek Anand",
    role: "React Developer",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHgdEA3WVAhNQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1692214950711?e=1741824000&v=beta&t=be2Z8_hBGBwZXdsw04PNePEMU8gEhw2NQdlJ2nbtksw",
    linkedin: "https://www.linkedin.com/in/abhishek-anand-094799251/",
    technologies: "React.js, Tailwind CSS, Node.js",
  },
  {
    name: "Aditya Kumar",
    role: "React Developer",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGnU48IpbDc5A/profile-displayphoto-shrink_800_800/B4EZSroiAxHoAg-/0/1738046317285?e=1743638400&v=beta&t=uMhHI7ZUI2pzRiIHNj3EGP17AxqLieHmoCaLur-9Oc0",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-780709320/",
    technologies: "React.js, Tailwind CSS",
  },
  {
    name: "Yuvika Kumari",
    role: "Frontend Developer",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQGYzOZRw7Rb_w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1704482269132?e=1741824000&v=beta&t=ZsiD16JWJfiHKGQOVnhHYwGMbt9qSlGK80Vd9D1nRwY",
    linkedin: "https://www.linkedin.com/in/yuvika-singh14/",
    technologies: "React.js, Tailwind CSS",
  },
];

const teamMembers = [
  {
    name: "Priyanshu Shankar",
    role: "QA Specialist",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFXF8LraML_hw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714559521498?e=1741824000&v=beta&t=l2GYDKqEuBuPcp2sKXbaQBYn1FRV2x44Ph5T2BZ2N5s",
    linkedin: "https://www.linkedin.com/in/priyanshu-shankar-067831256/",
    technologies: "Test Automation, Bug Tracking",
  },
  {
    name: "Abhinav Kumar",
    role: "QA Specialist",
    image: "https://firebasestorage.googleapis.com/v0/b/gatishaktibihar.firebasestorage.app/o/startup_bihar%2FWhatsApp%20Image%202024-12-09%20at%2015.42.22.jpeg?alt=media&token=dbcda014-652b-4951-8331-fa7f923aee37",
    linkedin: "https://www.linkedin.com/in/abhinab-kumar-546753279/",
    technologies: "Manual Testing, Bug Tracking",
  },
];

/* Brand blues in place of the multi-colour accents, cycled by index so a row
   of cards still has some rhythm. */
const ACCENTS = ["#0b2b4f", "#124d9c", "#1e63d6", "#3b82f6"];

function TeamCard({ name, role, image, accent, linkedin, technologies }) {
  return (
    <div className="group flex flex-col">
      {/* Portrait block: the accent square shows through wherever the photo does not */}
      <div className="relative w-full aspect-square overflow-hidden rounded-[14px] sm:rounded-[18px]">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" style={{ backgroundColor: accent }} />
        <img
          loading="lazy"
          decoding="async"
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col mt-3 sm:mt-4">
        <h3 className="text-[15px] sm:text-[18px] lg:text-[20px] font-extrabold tracking-tight text-[#0b2b4f] leading-snug">
          {name}
        </h3>

        <div className="flex items-start justify-between gap-2 mt-1.5">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 leading-relaxed">
            {role}
          </p>
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-slate-400 hover:text-[#124d9c] transition-colors"
              aria-label={`${name} on LinkedIn`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}
        </div>

        {technologies && (
          <p className="text-[10px] sm:text-[11px] font-medium text-slate-400 mt-1.5 leading-relaxed">
            {technologies}
          </p>
        )}
      </div>
    </div>
  );
}

function TeamGroup({ title, people, startIndex = 0 }) {
  return (
    <section className="mb-14 md:mb-20">
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <h2 className="text-[18px] md:text-[24px] font-extrabold tracking-tight text-[#0b2b4f] shrink-0">{title}</h2>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
        {people.map((member, i) => (
          <TeamCard key={member.name} {...member} accent={ACCENTS[(startIndex + i) % ACCENTS.length]} />
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
        <TeamGroup title={t("developer.teamLead", "Team Lead")} people={teamLead} startIndex={0} />
        <TeamGroup title={t("developer.teamHeads", "Team Heads")} people={teamHeads} startIndex={1} />
        <TeamGroup title={t("developer.teamMembers", "Team Members")} people={teamMembers} startIndex={2} />
      </div>
    </div>
  );
};

export default Developer;
