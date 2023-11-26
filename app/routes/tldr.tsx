import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import OpenAI from "openai";
const openai = new OpenAI();
import axios from 'axios';
import { useState } from "react";

const BING_API_KEY = process.env.BING_API_KEY;

async function completeContent(description: string) {
    const summary = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        max_tokens: 2048,
        prompt: `This is a framented description sentence for a news article: ${description},
                please give just a completed sentence, thank you.`
    });
    return summary.choices[0].text;
}

async function fetchTopArticles(count = 5) {
    const API_ENDPOINT = `https://api.bing.microsoft.com/v7.0/news?count=${count}&mkt=en-US`;
    try {
        const response = await axios.get(API_ENDPOINT, {
            headers: {
                'Ocp-Apim-Subscription-Key': BING_API_KEY
            }
        });

        if (response.data && response.data.value && response.data.value.length > 0) {
            // Use Promise.all to wait for all promises to resolve
            const articles = await Promise.all(response.data.value.map(async (article: any) => {
                const description = article.description || '';
                const sum_description = await completeContent(description);
                console.log(sum_description)

                return {
                    id: article.id,
                    title: article.name,
                    url: article.url,
                    description: sum_description,
                    publishedAt: article.datePublished,
                    provider: article.provider.map((providerDetails: any) => ({
                        name: providerDetails.name,
                        image: providerDetails.image?.thumbnail?.contentUrl || ''
                    }))
                };
            }));
            // console.log(articles)
            return articles;
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}


export async function loader() {
    const articles = fetchTopArticles(10);
    return articles;
}


export default function tldr() {

    const [selectedArticleId, setSelectedArticleId] = useState(null);

    const handleClick = (id: any) => {
        setSelectedArticleId(id);
    };

    let articles: any[] = useLoaderData();
    const firstHalf: any[] = articles.slice(0, 5);
    const secondHalf: any[] = articles.slice(6, 11);

    return (
        <>
            <div className="font-raleway mx-16 mt-16 border-solid rounded-lg bg-[#f7e7da]">
                <div className="flex justify-center ml-8 mt-8 overflow-hidden">
                    <span className="text-6xl font-bold	my-4 reveal-animation block text-[#c79d7a] text-outline">Today's TLDR</span>
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
                </div>
            </div>
            <div className="mx-16 my-4 bg-[#d8bba3] border-solid rounded-lg flex">
                <div className="w-1/2">
                    <ul className="my-8 mx-8 list-none">
                        {firstHalf && firstHalf.length > 0 && firstHalf.map((article, index) => (
                            <li
                                className={`my-4 mx-4 border-solid rounded-lg bg-[#f7e7da] animated-once fadeInUp delay-${index + 1}`}
                                key={article.id} // Unique key for each list item
                                onClick={() => handleClick(article.id)}
                            >
                                <div className="my-1 mx-1">
                                    <a className="font-semibold group decoration-blue-50 transition duration-300 text-white" href={article.url}>{article.title}
                                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
                                    </a>
                                    <p className="decoration-white">{article.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-1/2">
                    <ul className="my-8 mx-8 list-none">
                        {secondHalf && secondHalf.length > 0 && secondHalf.map((article, index) => (
                            <li
                                className={`my-4 mx-4 border-solid rounded-lg bg-[#f7e7da] animated-once fadeInUp delay-${index + 1}`}
                                key={article.id} // Unique key for each list item
                                onClick={() => handleClick(article.id)}
                            >
                                <div className="my-1 mx-1">
                                    <a className="font-semibold group decoration-blue-50 transition duration-300 text-white" href={article.url}>{article.title}
                                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
                                    </a>
                                    <p className="decoration-white">{article.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button
                className=""
                onClick={() => (console.log("home"))}
            >
                Go Home
            </button>
        </>

    )
}