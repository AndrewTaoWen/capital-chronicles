import { Link, NavLink, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import fetchTopArticlesInCategory from "./chatgptapi.server";
import ArticlesContext from './context';
import generateImages from "./generateImage.server";
import { useEffect, useState } from "react";

const image_placeholder = {
    created: 1702245926,
    data: [
      { // placeholder
        url: -1      
    }
    ]
}

export async function loader() {
    let articles = await fetchTopArticlesInCategory("finance", 5);

    for (let i = 0; i < articles.length; i++) {
        const prompt = articles[i].title + articles[i].description;
        const img = await generateImages(prompt, 1);
        if (img.status === 429) {
            articles[i].image = image_placeholder
        } else {
            articles[i].image = img;
        }
    }

    return articles;
}

export default function visual() {

    let articles = useLoaderData();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (articles) {
            setIsLoading(false);
        }
    }, [articles]);



    return (
        <>
            {isLoading ? (
                <div className="loader flex flex-col items-center justify-center">Loading...
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> // Add your custom loading animation here
            ) : (
                <ArticlesContext.Provider value={articles}>
                    <div className="font-raleway mx-16 my-4 bg-[#d8bba3] border-solid rounded-lg flex">
                        <div className="w-1/2">
                            <ul className="my-8 mx-8 list-none">
                                {articles && articles.length > 0 && articles.map((article, index) => (
                                    <li
                                        className={`my-4 mx-4 border-solid rounded-lg bg-[#f7e7da] animated-once fadeInUp hover:bg-[#fff]`}
                                        style={{ animationDelay: `${(index + 1) * 0.15}s` }}
                                        key={article.id} // Unique key for each list item
                                    >
                                        <div className="my-1 mx-1 font-bold">
                                            <NavLink to={`/visual/${index}`}>
                                                {article.title}
                                            </NavLink>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-1/2">
                            <Outlet />
                        </div>
                    </div>
                </ArticlesContext.Provider>
            )}
        </>
    )
}