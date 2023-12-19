import { redirect } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import "@fontsource/raleway/400.css"; // Weight 400.

import styles from './styles/tailwind.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import GlobalLoader from "./routes/loading";

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const action = async () => {
  return redirect(`/home`);
};


export default function App() {
  const articles = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

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
        {isLoading ? (
          <div className={`flex justify-center items-center h-96`}>
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </>
        )}
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
