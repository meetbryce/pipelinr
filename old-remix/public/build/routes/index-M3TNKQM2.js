import {
  useOptionalUser
} from "/build/_shared/chunk-PMDIGT5R.js";
import {
  Link,
  require_jsx_dev_runtime
} from "/build/_shared/chunk-RLA37IRW.js";
import {
  __toESM
} from "/build/_shared/chunk-4IYZMDEG.js";

// app/images/unify_hero.png
var unify_hero_default = "/build/_assets/unify_hero-ARDKAME6.png";

// app/routes/index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function Index() {
  const user = useOptionalUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative sm:pb-16 sm:pt-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative shadow-xl sm:overflow-hidden sm:rounded-2xl", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "img",
        {
          className: "h-full w-full object-cover",
          src: unify_hero_default,
          alt: "Dall-E Unify Hero"
        },
        void 0,
        false,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 15,
          columnNumber: 15
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" }, void 0, false, {
        fileName: "app/routes/index.tsx",
        lineNumber: 20,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/index.tsx",
      lineNumber: 14,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "block uppercase text-yellow-500 drop-shadow-md", children: "Unify Dashboard" }, void 0, false, {
        fileName: "app/routes/index.tsx",
        lineNumber: 24,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/index.tsx",
        lineNumber: 23,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center", children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        Link,
        {
          to: "/pipelines",
          className: "flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8",
          children: [
            "View Pipelines for ",
            user.email
          ]
        },
        void 0,
        true,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 30,
          columnNumber: 19
        },
        this
      ) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Link,
          {
            to: "/join",
            className: "flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8",
            children: "Sign up"
          },
          void 0,
          false,
          {
            fileName: "app/routes/index.tsx",
            lineNumber: 38,
            columnNumber: 21
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Link,
          {
            to: "/login",
            className: "flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600",
            children: "Log In"
          },
          void 0,
          false,
          {
            fileName: "app/routes/index.tsx",
            lineNumber: 44,
            columnNumber: 21
          },
          this
        )
      ] }, void 0, true, {
        fileName: "app/routes/index.tsx",
        lineNumber: 37,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/routes/index.tsx",
        lineNumber: 28,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/index.tsx",
      lineNumber: 22,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/index.tsx",
    lineNumber: 13,
    columnNumber: 11
  }, this) }, void 0, false, {
    fileName: "app/routes/index.tsx",
    lineNumber: 12,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/routes/index.tsx",
    lineNumber: 11,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/index.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/index-M3TNKQM2.js.map
