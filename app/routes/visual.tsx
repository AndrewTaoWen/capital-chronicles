import { Link, NavLink, Outlet, useLoaderData, useNavigate } from "@remix-run/react";
import fetchTopArticlesInCategory from "./chatgptapi.server";
import ArticlesContext from './context';

export async function loader() {
    const articles = fetchTopArticlesInCategory("finance", 10);
    return articles;
}

export default function visual() {


    let articles = useLoaderData();

    return (
        <>
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

        </>

    )
}