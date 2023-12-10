import { Link, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import OpenAI from "openai";
const openai = new OpenAI();
import axios from 'axios';
import { useEffect, useState } from "react";
import fetchTopArticlesInCategory from "./chatgptapi.server";

const BING_API_KEY = process.env.BING_API_KEY;

export async function loader() {
    const articles = fetchTopArticlesInCategory("finance", 10);
    return articles;
}


export default function visual() {


    let articles: any[] = useLoaderData();

    return (
        <>
            <div className="mx-16 my-4 bg-[#d8bba3] border-solid rounded-lg flex">
                <div className="w-1/2">
                    <ul className="my-8 mx-8 list-none">
                        {articles && articles.length > 0 && articles.map((article, index) => (
                            <li
                                className={`my-4 mx-4 border-solid rounded-lg bg-[#f7e7da] animated-once fadeInUp`}
                                style={{animationDelay: `${(index + 1) * 0.25}s`}}
                                key={article.id} // Unique key for each list item
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
                    
                </div>
            </div>
        </>

    )
}