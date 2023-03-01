import Link from "next/link";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
  Square3Stack3DIcon as PipelineIcon
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import NavLink from "@/components/shared/NavLink";
import Layout from "@/components/layout/index";
import { useSession } from "next-auth/react";
import AuthenticationRequired from "@/components/shared/AuthenticationRequired";
import { type Pipeline } from "@prisma/client";

export default function PipelinesLayout({ children, pipelines }: { children: ReactNode, pipelines: Pipeline[] }) {
  const { status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <AuthenticationRequired />;

  const inactiveClasses = "flex text-gray-700 hover:bg-gray-100";
  const activeClasses = "flex bg-gray-200 text-gray-900";

  return (
    <Layout>
      <div className="w-full px-6">
        <nav className="flex px-6 py-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li>
              <div className="flex items-center">
                <Link href="."
                      className="text-sm font-medium text-gray-500 hover:text-blue-600">Pipelines</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 mr-1 md:mr-2 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button
                      className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                      Select pipeline {/* fixme: show the name of the current pipeline if viewing a pipeline */}
                      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      className="absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {pipelines.map((pipeline) => (
                          <NavLink
                            key={pipeline.id}
                            href={`/pipelines/${pipeline.id}`}
                            className={(isActive) => isActive ? activeClasses : inactiveClasses}
                          >
                            <Menu.Item as="div" className="flex w-full px-4 py-2 text-sm">
                              <PipelineIcon className="w-4 h-4 mt-0.5 mr-2" />
                              {pipeline.name}
                            </Menu.Item>
                          </NavLink>
                        ))}
                        <NavLink
                          href="/pipelines/new" exact={true}
                          className={(isActive) => isActive ? activeClasses : inactiveClasses}
                        >
                          <Menu.Item as="div" className="flex w-full px-4 py-2 text-sm">
                            <PlusIcon className="w-4 h-4 mt-0.5 mr-2" />
                            New pipeline
                          </Menu.Item>
                        </NavLink>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          </ol>
        </nav>

        <main className="flex flex-col h-full">
          <div className="flex-1 px-6 py-4">
            {children}
          </div>
        </main>
      </div>
    </Layout>
  );
}