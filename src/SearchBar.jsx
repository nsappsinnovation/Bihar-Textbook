import React, { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.trim()) {
            onSearch(term);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="search"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="block w-full p-5 pl-12 text-sm text-gray-900 border border-gray-200 rounded-full bg-white shadow-sm  transition-all duration-300 outline-none hover:shadow-md"
                    placeholder="Search for interesting topics..."
                    required
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className=
                    "text-white bg-gradient-to-r from-indigo-500 to-orange-400 absolute right-2.5 bottom-2.5  font-medium rounded-full text-sm px-6 py-2.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95"
                > 
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
