import {
  classNames
} from "/build/_shared/chunk-PMDIGT5R.js";
import {
  Form,
  Link,
  NavLink,
  require_jsx_dev_runtime
} from "/build/_shared/chunk-RLA37IRW.js";
import {
  __toESM
} from "/build/_shared/chunk-4IYZMDEG.js";

// app/components/Navigation.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function Navigation({ user }) {
  const navigationItems = [
    { name: "Pipelines", href: "/pipelines" },
    { name: "Playground", href: "/playground" },
    { name: "Connections", href: "/connections" }
  ];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", { className: "flex items-center justify-between bg-slate-800 px-6 py-4 text-white", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-xl font-bold", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: ".", children: "Unify" }, void 0, false, {
      fileName: "app/components/Navigation.tsx",
      lineNumber: 17,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/components/Navigation.tsx",
      lineNumber: 16,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/components/Navigation.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "flex md:space-x-3", children: navigationItems.map(
      (item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "h-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        NavLink,
        {
          to: item.href,
          className: ({ isActive }) => classNames(isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "px-3 py-2 rounded-md text-sm font-medium"),
          children: item.name
        },
        void 0,
        false,
        {
          fileName: "app/components/Navigation.tsx",
          lineNumber: 23,
          columnNumber: 13
        },
        this
      ) }, item.href, false, {
        fileName: "app/components/Navigation.tsx",
        lineNumber: 22,
        columnNumber: 11
      }, this)
    ) }, void 0, false, {
      fileName: "app/components/Navigation.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "text-sm", disabled: true, children: user.email }, void 0, false, {
        fileName: "app/components/Navigation.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { action: "/logout", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "rounded bg-slate-600 py-2 px-4 text-blue-100 text-sm hover:bg-blue-500 active:bg-blue-600",
          children: "Logout"
        },
        void 0,
        false,
        {
          fileName: "app/components/Navigation.tsx",
          lineNumber: 31,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "app/components/Navigation.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/Navigation.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Navigation.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}

export {
  Navigation
};
//# sourceMappingURL=/build/_shared/chunk-PWSHOSZL.js.map
