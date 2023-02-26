import {
  require_pipeline
} from "/build/_shared/chunk-O55YOBDW.js";
import {
  require_session
} from "/build/_shared/chunk-3Q6GZENC.js";
import {
  Form,
  require_jsx_dev_runtime,
  require_react,
  useActionData,
  useParams
} from "/build/_shared/chunk-RLA37IRW.js";
import {
  __toESM
} from "/build/_shared/chunk-4IYZMDEG.js";

// app/routes/pipelines/$pipelineId/$add_table.tsx
var React = __toESM(require_react());
var import_session = __toESM(require_session());
var import_pipeline = __toESM(require_pipeline());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function AddTableToPipelinePage() {
  const actionData = useActionData();
  const nameRef = React.useRef(null);
  const bodyRef = React.useRef(null);
  const params = useParams();
  const table = params.add_table;
  const pipelineId = params.pipelineId;
  React.useEffect(() => {
    var _a;
    (_a = document.getElementById("open_button")) == null ? void 0 : _a.click();
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", id: "open_button", className: "hidden transition duration-150\n            ease-in-out", "data-bs-toggle": "modal", "data-bs-target": "#exampleModal", children: "Add table" }, void 0, false, {
      fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
      lineNumber: 48,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "div",
      {
        className: "modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto",
        id: "exampleModal",
        tabIndex: -1,
        "aria-labelledby": "exampleModalLabel",
        "aria-hidden": "true",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "modal-dialog relative w-auto pointer-events-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "div",
          {
            className: "modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  className: "modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "text-xl font-medium leading-normal text-gray-800", id: "exampleModalLabel", children: "Add a dataset" }, void 0, false, {
                      fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                      lineNumber: 60,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "button",
                      {
                        type: "button",
                        className: "btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline",
                        "data-bs-dismiss": "modal",
                        "aria-label": "Close"
                      },
                      void 0,
                      false,
                      {
                        fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                        lineNumber: 61,
                        columnNumber: 19
                      },
                      this
                    )
                  ]
                },
                void 0,
                true,
                {
                  fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                  lineNumber: 58,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "modal-body relative p-4", children: [
                "Add ",
                table,
                " to the pipeline?"
              ] }, void 0, true, {
                fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                lineNumber: 65,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "input",
                  {
                    value: table,
                    name: "table",
                    type: "hidden"
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                    lineNumber: 70,
                    columnNumber: 23
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { value: pipelineId, name: "pipelineId", type: "hidden" }, void 0, false, {
                  fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                  lineNumber: 75,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "button", className: "px-6\n                        py-2.5\n                        bg-purple-600\n                        text-white\n                        font-medium\n                        text-xs\n                        leading-tight\n                        uppercase\n                        rounded\n                        shadow-md\n                        hover:bg-purple-700 hover:shadow-lg\n                        focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0\n                        active:bg-purple-800 active:shadow-lg\n                        transition\n                        duration-150\n                        ease-in-out", "data-bs-dismiss": "modal", children: "Cancel" }, void 0, false, {
                  fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                  lineNumber: 76,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "px-6 py-2.5 bg-blue-600 text-white font-medium text-xs\n                        leading-tight\n                        uppercase\n                        rounded\n                        shadow-md\n                        hover:bg-blue-700 hover:shadow-lg\n                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0\n                        active:bg-blue-800 active:shadow-lg\n                        transition\n                        duration-150\n                        ease-in-out\n                        ml-1", children: "Yes" }, void 0, false, {
                  fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                  lineNumber: 93,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                lineNumber: 69,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                lineNumber: 68,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
            lineNumber: 56,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
          lineNumber: 55,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
        lineNumber: 53,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
    lineNumber: 47,
    columnNumber: 5
  }, this);
}
export {
  AddTableToPipelinePage as default
};
//# sourceMappingURL=/build/routes/pipelines/$pipelineId/$add_table-DSZQEZEP.js.map
