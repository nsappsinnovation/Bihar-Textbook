import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Tag, Share2 } from "lucide-react";
import eventsData from "../data/events.json";

const EventDetails = () => {
    const { eventSlug } = useParams();
    const navigate = useNavigate();
    const event = eventsData.find((e) => e.id === eventSlug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [eventSlug]);

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Event Not Found</h2>
                <p className="text-slate-600 mb-8">The event you are looking for does not exist or has been moved.</p>
                <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-blue-100 italic">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-8 left-8 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20"
                >
                    <ArrowLeft size={24} />
                </button>

                {/* Hero Content */}
                <div className="absolute bottom-12 left-8 md:left-16 lg:left-24 right-8 max-w-4xl text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-4 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                            {event.tag}
                        </span>
                        <div className="h-px w-12 bg-white/30" />
                        <span className="text-white/80 text-sm font-medium">Flagship Program</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
                        {event.title}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Main Text */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Program Overview</h2>
                    <p className="text-xl text-slate-600 leading-relaxed font-medium mb-8">
                        {event.description}
                    </p>

                    <div className="space-y-8">
                        {event.objectives && (
                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 tracking-tight">Program Focus & Objectives</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {event.objectives.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-600 text-[15px] font-medium leading-normal italic">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={event.impact_image || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"}
                                alt="Impact"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-blue-900/10" />
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <div className="sticky top-24 p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Program Info</h3>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Launch Year</p>
                                    <p className="text-sm font-bold text-slate-800 tracking-tight italic">{event.year || "Ongoing Initiative"}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Target Region</p>
                                    <p className="text-sm font-bold text-slate-800 tracking-tight italic">{event.region || "Across Bihar"}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                    <Tag size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Primary Beneficiaries</p>
                                    <p className="text-sm font-bold text-slate-800 tracking-tight italic mt-1">{event.beneficiaries || "Students & Teachers"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-100">
                            <button className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold text-sm tracking-widest uppercase hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-slate-900/20 italic">
                                Get Updates <Share2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
