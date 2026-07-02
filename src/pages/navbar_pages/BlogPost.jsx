import React, { useEffect, useState } from 'react';
import { getArticleExtract } from '../../services/wikipedia';

const BlogPost = ({ title, pageid, snippet, timestamp }) => {
    const [details, setDetails] = useState({ extract: '', thumbnail: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        getArticleExtract(pageid).then(data => {
            if (isMounted) {
                setDetails(data);
                setLoading(false);
            }
        });
        return () => { isMounted = false; };
    }, [pageid]);

    const date = new Date(timestamp).toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    // Clean snippet HTML (it contains <span class="searchmatch">)
    const createMarkup = (html) => {
        return { __html: html + '...' };
    };

   const ArticleCard = ({ details, title, snippet, pageid }) => {
  return (
    <article className="bg-[#F3F4F8] rounded-3xl overflow-hidden flex flex-col h-full group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(51,47,130,0.35)]">

      {/* IMAGE TOP */}
    <div className="mt-4 relative max-w-[1400px] mx-auto px-4">
          <div className="overflow-hidden">
          
      <div className=" relative h-[210px] rounded-2xl overflow-hidden">
        {details?.thumbnail ? (
          <img
            src={details.thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-4xl text-gray-400 font-bold">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        <div
          className="text-sm text-gray-600 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: snippet }}
        />

        {/* LINK */}
        <a
          href={`https://en.wikipedia.org/?curid=${pageid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          View Details →
        </a>
      </div>
      </div>
      </div>
    </article>
    
  );
};
return (
    <ArticleCard
      details={details}
      title={title}
      snippet={snippet}
      pageid={pageid}
    />
  );

    
};

export default BlogPost;
