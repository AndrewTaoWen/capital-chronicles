import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import OpenAI from "openai";
import fetchTopArticlesInCategory from "./chatgptapi.server";
import generateImages from "./generateImage.server"
import { useEffect, useState } from "react";

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const data = await fetchTopArticlesInCategory("finance", 6);

  let prompt = "Help me generate a slanted logo for my finance blog, capital chronicles";

  const img = await generateImages(prompt, 1);

  let data_left = data?.slice(0, 3);
  let data_right = data?.slice(3);
  return { data_left, data_right, img };
}


export default function Index() {
  const data: any = useLoaderData();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  
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
            {data.img.data ? (
              <>
                <img className="max-w-full max-h-full mb-2" src={data.img.data[0].url} alt="Article Image" />
                <h1 className="font-bold">AI Generated Logo (Powered by DALL-E)</h1>
              </>
            ) : (
              <h1 className="font-bold">Currently, image generation quota has been exceeded, please check back again later.</h1>
            )}
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
