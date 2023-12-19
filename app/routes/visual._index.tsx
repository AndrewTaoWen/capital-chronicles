import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  return 0;
}


export default function visualIndex() {
  const data: any = useLoaderData();

  return (
    <div className="font-bold	text-xl	mx-16 mt-8 mb-16 bg-[#f7e7da] border-solid rounded-lg flex items-center justify-center "
      style={{ height: 'calc(100% - 4rem)' }}>
      Click on something on the left to get started!
    </div>
  )
}
