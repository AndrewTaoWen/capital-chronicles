import { Link, NavLink, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import React, { useContext, useEffect, useState } from 'react';
import ArticlesContext from './context';


export async function loader({ request }) {
    const url = request.url;
    return url.split("/")[4];
}

export default function visual() {

    const articles = useContext(ArticlesContext);
    let id = useLoaderData();
    let article = articles[id];

    return (
        <>
            <h1>second component {id}</h1>
            <a className="font-semibold group decoration-blue-50 transition duration-300 text-white" href={article.url}>{article.title}
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
            </a>
            <p className="decoration-white">{article.description}</p>
        </>

    )
}