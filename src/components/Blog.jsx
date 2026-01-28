import React, { useState } from 'react';
import SearchBar from './SearchBar';
import BlogPost from './BlogPost';
import { searchArticles } from '../services/wikipedia';

function Blog() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        setSearched(true);
        try {
            const data = await searchArticles(query);
            setResults(data);
        } catch (err) {
            setError('Failed to fetch results. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <header className="pt-6
            pb-10 px-4 text-center">
               
              
                  <h2 className="text-3xl md:text-4xl font-semibold 
                  ">
       
        <span className="bg-gradient-to-r  text-indigo-900
    transition-all duration-300
      ">Discover New Blogs
      </span>
      </h2>
             
                <p
                 className="
                 m-2
                 text-md
                  text-slate-600 max-w-2xl mx-auto mb-10"
                  >
                    Explore a vast library of knowledge generated from Wikipedia.
                    Search for any topic and read curated blog-style summaries.
                </p>

                <SearchBar onSearch={handleSearch} isLoading={loading} />
            </header>

            <main className="max-w-7xl mx-auto px-4 pb-24">
                {error && (
                    <div className="text-center p-4 mb-8 bg-red-50 text-red-600 rounded-lg border border-red-100 max-w-md mx-auto">
                        {error}
                    </div>
                )}

             
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-96 bg-white rounded-2xl shadow-sm border border-slate-200">
                                <div className="h-48 bg-slate-200 rounded-t-2xl"></div>
                                <div className="p-6">
                                    <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {results.map((result) => (
                            <BlogPost
                                key={result.pageid}
                                title={result.title}
                                snippet={result.snippet}
                                timestamp={result.timestamp}
                                pageid={result.pageid}
                            />
                        ))}
                    </div>
                )}

                {searched && !loading && results.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-slate-500">No results found. Try a different topic.</p>
                    </div>
                )}
            </main>

           
        </div>
    );
}

export default Blog;
