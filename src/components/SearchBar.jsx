import React, { useState, useEffect, useRef } from 'react';
// Mock getSuggestions since wikipedia.js was removed
const getSuggestions = async (term) => [];

const typingPhrases = [
    "About Solar System",
    "Prime Minister of India",
    "Chief Minister of Bihar"
];

const SearchBar = ({ onSearch, isLoading }) => {
    const [term, setTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);
    const isSelection = useRef(false);
    const inputRef = useRef(null); // only added ref

    /* =========================
       Typing Animation (No styling changes)
    ========================== */
    useEffect(() => {
        let timeoutId;
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isActive = true;

        const type = () => {
            if (!isActive || !inputRef.current) return;

            const currentPhrase = typingPhrases[phraseIndex];

            if (!isDeleting) {
                inputRef.current.placeholder =
                    currentPhrase.slice(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentPhrase.length) {
                    timeoutId = setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, 1500);
                    return;
                }
            } else {
                inputRef.current.placeholder =
                    currentPhrase.slice(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex =
                        (phraseIndex + 1) % typingPhrases.length;
                }
            }

            timeoutId = setTimeout(type, isDeleting ? 80 : 120);
        };

        type();

        const stopAnimation = () => {
            isActive = false;
            clearTimeout(timeoutId);
            if (inputRef.current) {
                inputRef.current.placeholder = "Search for interesting topics...";
            }
        };

        inputRef.current?.addEventListener("focus", stopAnimation);

        return () => {
            isActive = false;
            clearTimeout(timeoutId);
            inputRef.current?.removeEventListener("focus", stopAnimation);
        };
    }, []);

    // Debounce effect for fetching suggestions
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (isSelection.current) {
                isSelection.current = false;
                return;
            }

            if (term.trim().length > 0) {
                const results = await getSuggestions(term);
                setSuggestions(results);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [term]);

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuggestions(false);
        if (term.trim()) {
            onSearch(term);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        isSelection.current = true;
        setTerm(suggestion);
        setSuggestions([]);
        setShowSuggestions(false);
        onSearch(suggestion);
    };

    return (
        <div ref={wrapperRef} className="w-full max-w-3xl mx-auto mb-12 relative">
            <form onSubmit={handleSubmit} className="relative group z-10">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    ref={inputRef}
                    type="search"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onFocus={() => {
                        if (suggestions.length > 0) setShowSuggestions(true);
                    }}
                    className={`block w-full p-5 pl-12 text-sm text-gray-900 border border-gray-200 bg-white shadow-sm transition-all duration-300 outline-none hover:shadow-md ${
                        showSuggestions && suggestions.length > 0
                            ? 'rounded-t-3xl rounded-b-none border-b-0'
                            : 'rounded-full'
                    }`}
                    placeholder="Search for interesting topics..."
                    required
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="text-white bg-indigo-500  absolute right-2.5 bottom-2.5 font-medium rounded-full text-sm px-6 py-2.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95"
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-20 w-full bg-white/95 backdrop-blur-md border border-gray-100 border-t-0 rounded-b-3xl shadow-xl animate-fadeIn origin-top overflow-hidden">
                    <ul className="py-2">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-6 py-3.5 cursor-pointer hover:bg-gray-100 rounded-r-2xl  transition-all duration-200 text-slate-700 flex items-center gap-4 group"
                            >
                                <div className="p-2 bg-slate-100 rounded-full group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-500 transition-colors duration-200">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <span className="text-[15px] font-medium group-hover:text-indigo-900">{suggestion}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;