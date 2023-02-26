import {
  require_outline
} from "/build/_shared/chunk-A6IMWZZS.js";
import {
  Link,
  init_dist,
  require_jsx_dev_runtime,
  useOutletContext
} from "/build/_shared/chunk-RLA37IRW.js";
import {
  __toESM
} from "/build/_shared/chunk-4IYZMDEG.js";

// app/routes/pipelines/index.tsx
var import_outline = __toESM(require_outline());
init_dist();
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function PipelineIndexPage() {
  const { pipelineListItems } = useOutletContext();
  console.log({ pipelineListItems });
  const pipelines = [1, 2, 3, 4];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { role: "list", className: "my-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4", children: pipelineListItems.map((pipeline) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `./${pipeline.id}`, className: "col-span-1 flex rounded-md border border-gray-200 shadow-sm transition duration-150\n            ease-in-out hover:shadow-md hover:border-gray-300", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-shrink-0 flex items-center justify-center w-16 rounded-l-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_outline.Square3Stack3DIcon, { className: "mx-auto h-7 w-7 text-gray-300" }, void 0, false, {
        fileName: "app/routes/pipelines/index.tsx",
        lineNumber: 20,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/pipelines/index.tsx",
        lineNumber: 19,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-1 items-center justify-between truncate rounded-r-md bg-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 truncate px-4 py-3 pl-0 text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "font-medium text-gray-900", children: pipeline.name }, void 0, false, {
          fileName: "app/routes/pipelines/index.tsx",
          lineNumber: 24,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-gray-500", children: "?? Tables" }, void 0, false, {
          fileName: "app/routes/pipelines/index.tsx",
          lineNumber: 25,
          columnNumber: 19
        }, this),
        " "
      ] }, void 0, true, {
        fileName: "app/routes/pipelines/index.tsx",
        lineNumber: 23,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/pipelines/index.tsx",
        lineNumber: 22,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/pipelines/index.tsx",
      lineNumber: 17,
      columnNumber: 13
    }, this) }, pipeline.id, false, {
      fileName: "app/routes/pipelines/index.tsx",
      lineNumber: 16,
      columnNumber: 11
    }, this)) }, void 0, false, {
      fileName: "app/routes/pipelines/index.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-center mt-10", children: [
      "Select a pipeline above, or",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "new", className: "text-blue-500 underline hover:text-blue-800", children: "create a new pipeline." }, void 0, false, {
        fileName: "app/routes/pipelines/index.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/pipelines/index.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/pipelines/index.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}
export {
  PipelineIndexPage as default
};
//# sourceMappingURL=/build/routes/pipelines/index-DTLTBRBL.js.map
