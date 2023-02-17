import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { User } from "~/models/user.server";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): User {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export class ClientPipeline {
  get query(): string {
    return this._query;
  }
  private readonly _host: string;
  private _query: string;
  constructor(
    public id: string,
    public name: string,
    public tables: string,
    public operations: string[],
    public sort_col?: string,
    public sort_desc?: number
  ) {
    this.id = id;
    this.name = name;
    this.tables = tables;
    this.operations = operations;
    this.sort_col = sort_col;
    this.sort_desc = sort_desc;
    this._host = 'http://127.0.0.1:8123/'; //?query=SELECT%20%2A%20from%20tenant_default.github____org_repos%20FORMAT%20JSON''
    this._query = '';
  }

  getTableList() {
    if (this.tables && this.tables.length > 0) {
      return this.tables.split(",");
    } else {
      return [];
    }
  }

  getServerUrl() {
    let tables = this.getTableList();
    if (tables.length > 0) {
      let sort = "";
      if (this.sort_col) {
        sort = " ORDER BY " + this.sort_col;
        if (this.sort_desc) {
          sort += " DESC";
        }
      }
      let query: string = 'SELECT * from tenant_default.' + tables[0].replace('.','____') + sort + ' LIMIT 1000 FORMAT JSON';
      this._query = query;
      return new URL(`${this._host}?query=${encodeURIComponent(query)}`);
    } else {
      return null;
    }
  }
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}