import React from 'react';

const Card = ({ participant }) => {
    const { name, title, description, role, image, accentColor } = participant;

    // Fallback image handler could be added, but relying on src for now
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col items-center p-6 border border-gray-100 group hover:border-blue-200">
            <div className="relative mb-4">
                <div className={`absolute inset-0 rounded-full blur-md opacity-40 ${accentColor}`}></div>
                <img
                    src={image}
                    alt={name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm relative z-10"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random` }}
                />
                <div className={`absolute bottom-0 right-0 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${accentColor} z-20`}>
                    {role[0]}
                </div>
            </div>

            <div className={`text-xs font-semibold tracking-wide uppercase py-1 px-3 rounded-full mb-3 bg-opacity-10 ${accentColor.replace('bg-', 'text-').replace('600', '700')} ${accentColor.replace('bg-', 'bg-')}`}>
                {role}
            </div>

            <h3 className="text-xl font-bold text-gray-800 text-center mb-1 group-hover:text-blue-600 transition-colors">{name}</h3>
            <p className="text-sm text-blue-600 font-medium text-center mb-3">{title}</p>
            <p className="text-gray-500 text-sm text-center leading-relaxed">{description}</p>
        </div>
    );
};

export default Card;
