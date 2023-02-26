import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  require_jsx_dev_runtime
} from "/build/_shared/chunk-RLA37IRW.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-4IYZMDEG.js";

// empty-module:./session.server
var require_session = __commonJS({
  "empty-module:./session.server"(exports, module) {
    module.exports = {};
  }
});

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-RWU2LP2A.css";

// app/styles/styles.css
var styles_default = "/build/_assets/styles-AJ2FH7MH.css";

// node_modules/ag-grid-community/styles/ag-grid.css
var ag_grid_default = "/build/_assets/ag-grid-E2G6NEET.css";

// node_modules/ag-grid-community/styles/ag-theme-alpine.css
var ag_theme_alpine_default = "/build/_assets/ag-theme-alpine-43I5VNFF.css";

// app/root.tsx
var import_session = __toESM(require_session());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var links = () => {
  return [
    { rel: "stylesheet", href: tailwind_default },
    { rel: "stylesheet", href: styles_default },
    { rel: "stylesheet", href: ag_grid_default },
    { rel: "stylesheet", href: ag_theme_alpine_default },
    { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" }
  ];
};
var meta = () => ({
  charset: "utf-8",
  title: "Pipelinr",
  viewport: "width=device-width,initial-scale=1"
});
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 44,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 43,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { className: "h-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 48,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 49,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 50,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 51,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 47,
      columnNumber: 5
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}
export {
  App as default,
  links,
  meta
};
//# sourceMappingURL=/build/root-5WF7CRLX.js.map
