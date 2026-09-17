import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getArticleExtract } from '../../services/wikipedia';

const BlogPost = ({ title, pageid, snippet, timestamp }) => {
    const { t, i18n } = useTranslation();
    const [details, setDetails] = useState({ extract: '', thumbnail: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        getArticleExtract(pageid, i18n.language).then(data => {
            if (isMounted) {
                setDetails(data);
                setLoading(false);
            }
        });
        return () => { isMounted = false; };
    }, [pageid, i18n.language]);

    const dateLocale = i18n.language === 'hi' ? 'hi-IN' : 'en-US';
    const date = new Date(timestamp).toLocaleDateString(dateLocale, {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const wikiLang = i18n.language === 'hi' ? 'hi' : 'en';

    const ArticleCard = ({ details, title, snippet, pageid }) => {
        return (
            <article className="bg-[#F3F4F8] rounded-3xl overflow-hidden flex flex-col h-full group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(51,47,130,0.35)]">

                {/* IMAGE TOP */}
                <div className="mt-4 relative max-w-[1400px] mx-auto px-4">
                    <div className="overflow-hidden">

                        <div className="relative h-[210px] rounded-2xl overflow-hidden">
                            {details?.thumbnail ? (
                                <img loading="lazy" decoding="async"
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
                                href={`https://${wikiLang}.wikipedia.org/?curid=${pageid}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                            >
                                {t("gyanKendraPage.viewDetails")} →
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
