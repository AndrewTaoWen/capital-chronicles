import { Link, NavLink, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import React, { useContext, useEffect, useState } from 'react';
import ArticlesContext from './context';
import generateImages from "./generateImage.server";


export async function loader({ request }) {
    const url = request.url;
    const id = url.split("/")[4]
    return id;
}

export default function visual() {

    const [image, setImage] = useState(false);
    const articles = useContext(ArticlesContext);
    let id = useLoaderData();
    let article = articles[id];
    
    useEffect(() => {
        if (article.images.data[0].url !== -1) {
            setImage(true);
        }
    }, [article])

    return (
        <>
            <div className="font-raleway mx-16 my-4 bg-[#f7e7da] border-solid rounded-lg flex flex-col items-center justify-center "
                style={{ height: 'calc(100% - 4rem)' }}>
                <div className="mx-2">
                    <a className="font-semibold group decoration-blue-50 transition duration-300 text-white text-xl" href={article.url}>
                        {article.title}
                        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
                    </a>
                    <p>{article.description}</p>
                </div>
                {image ? (<img src={article.images.data[0].url}></img>) : (<h1>Currently, image generation quota has been exceeded, please check back again later.</h1>)}
            </div>

        </>

    )
}