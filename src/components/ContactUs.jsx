import React from "react";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";

const ContactUs = () => {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-[#0a0f1f] py-24 text-center overflow-hidden">
        {/* subtle dotted texture */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2a2f4f_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* soft indigo gradients (NO blur, NO fade) */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(99,102,241,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(300deg,rgba(30,64,175,0.25),transparent_65%)]" />

        {/* content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Contact Us
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
            Get in touch with us today and let us help you with any questions or
            inquiries you may have.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* LEFT SIDE */}
            <div className="lg:w-1/2">
              <div className="inline-block px-3 py-1 bg-indigo-50 rounded-full mb-6 border border-indigo-100">
                <span className="text-indigo-600 font-bold tracking-widest uppercase text-[10px]">
                  Get in Touch
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a] leading-tight mb-6">
                Have Questions? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
                  Let's Connect.
                </span>
              </h2>

              <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-md">
                We are here to help you with any inquiries or support. Reach out
                to us and we'll respond as soon as we can.
              </p>

              <div className="space-y-8">
                <InfoItem icon={<FiMapPin />} title="Visit Us">
                  Bihar State Text Book Publishing Corporation Ltd.
                  <br />
                  Budh Marg, Patna - 800001
                </InfoItem>

                <InfoItem icon={<FiMail />} title="Email Us">
                  textbookmd@gmail.com
                </InfoItem>

                <a href="tel:+916122221975" className="no-underline">
                  <InfoItem icon={<FiPhone />} title="Call Us">
                    <span className="cursor-pointer hover:text-indigo-600 transition-colors">
                      +91 612 222 1975
                    </span>
                  </InfoItem>
                </a>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.15)]">
                <h3 className="text-2xl font-bold text-[#0f172a] mb-6">
                  Send a Message
                </h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Your Name" placeholder="John Doe" />
                    <Input
                      label="Email Address"
                      placeholder="john@example.com"
                    />
                  </div>

                  <Input label="Subject" placeholder="How can we help?" />
                  <Textarea />

                  <button className="w-full py-4 rounded-xl font-bold text-white bg-[#1f2550] border border-indigo-500/40 shadow-lg shadow-indigo-400/40 transition-all duration-300 hover:bg-[#1f2550] hover:shadow-indigo-800/60 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ">
                    <FiSend className="text-lg" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;

/* ================= HELPER COMPONENTS ================= */

const InfoItem = ({ icon, title, children }) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-indigo-600">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold text-[#0f172a] mb-1">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{children}</p>
    </div>
  </div>
);

const Input = ({ label, placeholder }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    <input
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700"
    />
  </div>
);

const Textarea = () => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
      Message
    </label>
    <textarea
      rows="4"
      placeholder="Write your message here..."
      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 resize-none"
    />
  </div>
);
