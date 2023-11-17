import { redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import OpenAI from "openai";
const openai = new OpenAI();
import axios from 'axios';

const BING_API_KEY = process.env.BING_API_KEY;

async function summarizeArticlesContent(description) {
    const summary = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        max_tokens: 2048,
        prompt: `Summarize the following information in one concise sentence without repeating any details: ${description}`
    });
    console.log(summary.choices[0].text);
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
            const articles = await Promise.all(response.data.value.map(async (article) => {
                const description = article.description || '';
                const sum_description = await summarizeArticlesContent(description);
                // console.log(sum_description)

                return {
                    id: article.id,
                    title: article.name,
                    url: article.url,
                    description: sum_description,
                    publishedAt: article.datePublished,
                    provider: article.provider.map(providerDetails => ({
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
    const articles = fetchTopArticles();
    return articles;
}


export default function tldr() {

    const articles = useLoaderData();

    return (
        <>
            <div className="font-raleway mx-16 mt-16 border-solid rounded-lg bg-[#f7e7da]">
                <div className="flex justify-center ml-8 mt-8 overflow-hidden">
                    <span className="text-6xl font-bold	my-4 reveal-animation block text-[#c79d7a] text-outline">Today's TLDR</span>
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
                </div>
            </div>
            <div className="w-1/3 -skew-x-[12deg] bg-[#d8bba3]">
                <ul className="mx-8 mt-8 list-disc">
                    {articles && articles.length > 0 && articles.map((article, index) => (
                        <li className={`mb-4 animated-once fadeInUp delay-${index + 1}`} key={article.id}>
                            <a className="font-semibold group decoration-blue-50 transition duration-300 text-white" href={article.link}>{article.title}
                                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
                            </a>
                            <p className="decoration-white">{article.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>

    )
}