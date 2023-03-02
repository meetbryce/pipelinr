import { useRouter } from "next/router";
import Link from "next/link";
import { type LinkProps } from "next/dist/client/link";
import React from "react";

type ClassNameFunction = (isActive: boolean) => string;
type NavLinkProps = LinkProps & { exact?: boolean; children: React.ReactNode; className: string | ClassNameFunction };

/**
 * Superset component for Link that provides convenient helpers for styling active links.
 * Passing a function to classNames will be called with isActive bool & the return value used as classNames.
 * Passing a string to classNames will append `active` class where appropriate.
 * @param exact Should path matching be partial (default) or exact
 * @param className If string, 'active' will be appended where appropriate.
 *  If function, isActive bool passed to provided function with returned value used as className
 */
export default function NavLink({ href, exact = false, className = "", children, ...props }: NavLinkProps) {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href as string);

  if (typeof className === "function") {
    // className function was passed, so we'll call it and override the className prop
    className = className(isActive);
  } else if (isActive) {
    // className string was passed, so we'll append "active" as needed
    className += " active";
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}
