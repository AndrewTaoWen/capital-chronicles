import { Links, Outlet, useLoaderData } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno
import axios from 'axios';
import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import useWindowDimensions from "./window_dimensions";
import OpenAI from "openai";
const openai = new OpenAI();

const API_KEY = process.env.BING_API_KEY;

async function completeContent(description : string) {
    // console.log(description)
    const summary = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        max_tokens: 2048,
        prompt: `This is a framented sentence: ${description},
                please give just the completed the sentence, thank you.`
    });
    console.log(summary.choices[0].text)
    // console.log(summary.choices[0].text);
    return summary.choices[0].text;
}

async function fetchTopThreeArticlesInCategory(category) {
    const API_ENDPOINT = `https://api.bing.microsoft.com/v7.0/news/search?q=${category}&count=3&mkt=en-US`;


    try {
        const response = await axios.get(API_ENDPOINT, {
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
            }
        });

        if (response.data && response.data.value && response.data.value.length > 0) {
            return Promise.all(response.data.value.map(async (article) => {
                const completedDescription = await completeContent(article.description);
                return {
                    id: article.id,
                    title: article.name,
                    link: article.url,
                    description: completedDescription,
                    provider: article.provider
                };
            }));
            
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

export async function loader() {
    const fi = await fetchTopThreeArticlesInCategory("finance");
    const ai = await fetchTopThreeArticlesInCategory("artificial intelligence");
    return { fi, ai };
}


export default function HomeIndex() {
    const data = useLoaderData();


    return (
        <main className="bg-[#c79d7a] border-solid rounded-bl-lg rounded-br-lg">
            <div className="flex space-x-4 place-content-evenly decoration-white">
                <div className="w-1/3 -skew-x-[12deg] bg-[#d8bba3]">
                    <ul className="mx-8 mt-8 list-disc">
                        {data.fi && data.fi.length > 0 && data.fi.map((article, index) => (
                            <li className={`mb-4 animated-once fadeInUp delay-${index + 1}`} key={article.id}>
                                <a className="font-semibold group decoration-blue-50 transition duration-300 text-white" href={article.link}>{article.title}
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
                                </a>
                                <p className="decoration-white">{article.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="w-1/6 -skew-x-[12deg] flex flex-col justify-center items-center">
                    <div className="text-center">
                        <a className="font-semibold group decoration-blue-50 transition duration-300 text-white slide-in-left text-5xl" href="/tldr">
                            Today's
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
                        </a>
                        <a className="font-semibold group decoration-blue-50 transition duration-300 text-white slide-in-right text-5xl" href="/tldr">
                            tldr
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
                        </a>
                    </div>

                    <div className="text-center mt-6">
                        <a className="font-semibold group decoration-blue-50 transition duration-300 text-white slide-in-left text-5xl" href="/tldr">
                            Your local stories!
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
                        </a>
                    </div>
                </div>


                <div className="w-1/3 -skew-x-[12deg] bg-[#e9d5c4]">
                    <ul className="mt-8 mx-8 list-disc">
                        {data.ai && data.ai.length > 0 && data.ai.map((article, index) => (
                            <li className={`mb-4 animated-once fadeInUp delay-${index + 1}`} key={article.id}>
                                <a className="font-semibold group decoration-blue-50 transition duration-300 text-white" href={article.link}>{article.title}
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
                                </a>
                                <p className="decoration-white">{article.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <body>
            </body>
            <Outlet />
        </main>
    )
}
