import { Outlet } from "@remix-run/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    return (
        <>
            <div className="relative min-h-screen">
                {/* <iframe
                    className="absolute top-0 left-0 w-full h-full z-[-1]"
                    src="https://player.vimeo.com/video/880918809?autoplay=1&muted=1&loop=1&autopause=0&player_id=0&app_id=58479"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="cc bg"
                    frameBorder="0"
                    webkitallowfullscreen
                    mozallowfullscreen
                ></iframe> */}

                <div className="z-10">
                    <div className="font-raleway mx-16 mt-16 border-solid rounded-lg bg-[#f7e7da]">
                        <div className="flex justify-center ml-8 mt-8 overflow-hidden">
                            <span className="text-6xl font-bold	my-4 reveal-animation block text-[#c79d7a] text-outline">Capital Chronicles</span>
                        </div>
                        <Outlet />
                    </div>
                    <div className="font-raleway mx-16 border-solid border-[#d8bba3] rounded-lg bg-[#d2ad8e] mb-4">
                        <div className="flex justify-center ml-8 mt-8 overflow-hidden">
                            <div className="text-2xl my-4 block reveal-animation">
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
                </div>
            </div>
        </>
    )
}