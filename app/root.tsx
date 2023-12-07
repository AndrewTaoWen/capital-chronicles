import { cssBundleHref } from "@remix-run/css-bundle";
import { json, redirect, type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useHref,
  useLoaderData,
} from "@remix-run/react";
import "@fontsource/raleway/400.css"; // Weight 400.

import styles from './styles/tailwind.css'
import fetchTopArticlesInCategory from "./routes/articles/chatgptapi.server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const action = async () => {
  return redirect(`/home`);
};


export async function loader(request: string) {
  const prompt = 'Your prompt for ChatGPT here';
  const chatGptResponse = await fetchTopArticlesInCategory(prompt);
  return json({ chatGptResponse });
}


export default function App() {
  const articles = useLoaderData();
  const [page, setPage] = useState("home");

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <div className="font-raleway mx-16 mt-16 mb-8 border border-solid rounded-lg bg-[#f7e7da]">
        <div className="flex justify-center ml-8 mt-8 overflow-hidden">
          <span className="text-6xl font-bold my-4 block text-[#c79d7a]">Capital Chronicles</span>
        </div>
        <nav className="text-center mt-4">
          <Link to="/" className="mx-2 px-4 py-2 bg-[#c79d7a] text-white rounded font-bold">Home</Link>
          <Link to="/visual" className="mx-2 px-4 py-2 bg-[#c79d7a] text-white rounded font-bold">Visual</Link>
        </nav>
      </div>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
      <div className="font-raleway mx-16 border-solid border-[#d8bba3] rounded-lg bg-[#d2ad8e] mb-4">
        <div className="flex justify-start ml-8 mt-8 overflow-hidden">
          <div className="text-2xl my-4 block">
            <span className="font-bold italic text-black">Capital Chronicles </span>
            <span className="normal-case">by </span>
            <span className="font-thin text-white">Andrew & Jonathan Wen</span>
          </div>
        </div>
        <div className="flex items-center ml-16">
          <FontAwesomeIcon className="h-4 w-4" icon={faEnvelope} />
          <span className="ml-2">Andrew Wen :</span>
          <a className="ml-2 font-semibold group decoration-blue-50 transition duration-300" href="mailto:a3wen@uwaterloo.ca">
            a3wen@uwaterloo.ca
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
          </a>
        </div>
        <div className="flex items-center ml-16 mb-4">
          <FontAwesomeIcon className="h-4 w-4" icon={faEnvelope} />
          <span className="ml-2">Jonathan Wen :</span>
          <a className="ml-2 font-semibold group decoration-blue-50 transition duration-300" href="mailto:boywen.study@gmail.com">
            boywen.study@gmail.com
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[#fff]"></span>
          </a>
        </div>
        <div className="h-4"></div>
      </div>
    </html>
  );
}
