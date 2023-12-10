import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import OpenAI from "openai";
import fetchTopArticlesInCategory from "./chatgptapi.server";
import generateImages from "./generateImage.server"

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const data = await fetchTopArticlesInCategory("finance", 6);
  let data_left = data?.slice(0, 3);
  let data_right = data?.slice(3);
  return { data_left, data_right };
}


export default function Index() {
  const data: any = useLoaderData();

  return (
    <main className="bg-[#c79d7a] border-solid rounded-lg mx-16">
      <div className="flex space-x-4 place-content-evenly decoration-white">
        <div className="w-1/3 -skew-x-[12deg] bg-[#d8bba3]">
          <ul className="mx-8 mt-8 list-disc">
            {data.data_left && data.data_left.length > 0 && data.data_left.map((article: any, index: number) => (
              <li className={`mb-4 animated-once fadeInUp`} key={article.id}
                style={{ animationDelay: `${(index + 1) * 0.25}s` }}
              >
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
          </div>
        </div>


        <div className="w-1/3 -skew-x-[12deg] bg-[#e9d5c4]">
          <ul className="mt-8 mx-8 list-disc">
            {data.data_right && data.data_right.length > 0 && data.data_right.map((article: any, index: number) => (
              <li className={`mb-4 animated-once fadeInUp`}
                key={article.id}
                style={{ animationDelay: `${(index + 1) * 0.25}s` }}
              >
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
    </main>
  )
}
