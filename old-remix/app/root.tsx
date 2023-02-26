import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import stylesUrl from "./styles/styles.css";
import agGridCSS from "ag-grid-community/styles/ag-grid.css";
import agGridThemeCSS from "ag-grid-community/styles/ag-theme-alpine.css";

import { getUser } from "./session.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl },
          { rel: "stylesheet", href: stylesUrl },
          { rel: "stylesheet", href: agGridCSS },
          { rel: "stylesheet", href: agGridThemeCSS },
          { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" }
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Pipelinr",
  viewport: "width=device-width,initial-scale=1"
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request)
  });
}

export default function App() {
  return (
    <html lang="en" className="h-full">
    <head>
      <Meta />
      <Links />
    </head>
    <body className="h-full">
    <Outlet />
    <ScrollRestoration />
    <Scripts />
    <LiveReload />
    </body>
    </html>
  );
}