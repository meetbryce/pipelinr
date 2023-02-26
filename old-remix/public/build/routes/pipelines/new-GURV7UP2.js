import {
  require_outline
} from "/build/_shared/chunk-A6IMWZZS.js";
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
  useActionData
} from "/build/_shared/chunk-RLA37IRW.js";
import {
  __toESM
} from "/build/_shared/chunk-4IYZMDEG.js";

// app/routes/pipelines/new.tsx
var React = __toESM(require_react());
var import_pipeline = __toESM(require_pipeline());
var import_session = __toESM(require_session());
var import_outline = __toESM(require_outline());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function NewPipelinePage() {
  var _a, _b, _c, _d;
  const actionData = useActionData();
  const nameRef = React.useRef(null);
  React.useEffect(() => {
    var _a2, _b2;
    if ((_a2 = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a2.name) {
      (_b2 = nameRef.current) == null ? void 0 : _b2.focus();
    }
  }, [actionData]);
  const inputColorClasses = ((_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.name) ? "border-red-300 focus:border-red-500 focus:ring-red-500 focus-visible:outline-red-500 placeholder-red-400" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    Form,
    {
      method: "post",
      className: "mx-auto max-w-xl mt-10",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_outline.Square3Stack3DIcon, { className: "mx-auto h-10 w-10 text-gray-400" }, void 0, false, {
              fileName: "app/routes/pipelines/new.tsx",
              lineNumber: 49,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "mt-1 text-lg font-medium text-gray-900", children: "Create new pipeline" }, void 0, false, {
              fileName: "app/routes/pipelines/new.tsx",
              lineNumber: 50,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-1 text-sm text-gray-500", children: "Pipelines allow you to merge, filter, and aggregate data for easy reuse in the future." }, void 0, false, {
              fileName: "app/routes/pipelines/new.tsx",
              lineNumber: 51,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/pipelines/new.tsx",
            lineNumber: 48,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-6 flex", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "name", className: "sr-only", children: "Pipeline name" }, void 0, false, {
              fileName: "app/routes/pipelines/new.tsx",
              lineNumber: 56,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "input",
              {
                ref: nameRef,
                name: "name",
                className: "block w-full px-3 rounded border shadow-sm sm:text-sm " + inputColorClasses,
                placeholder: "Enter a name for your pipeline",
                "aria-invalid": ((_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.name) ? true : void 0,
                "aria-errormessage": ((_c = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _c.name) ? "name-error" : void 0
              },
              void 0,
              false,
              {
                fileName: "app/routes/pipelines/new.tsx",
                lineNumber: 59,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "button",
              {
                type: "submit",
                className: "ml-4 flex-shrink-0 rounded border border-transparent bg-blue-600 px-4 py-2\n            text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2\n            focus:ring-blue-500 focus:ring-offset-2",
                children: "Create Pipeline"
              },
              void 0,
              false,
              {
                fileName: "app/routes/pipelines/new.tsx",
                lineNumber: 69,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "app/routes/pipelines/new.tsx",
            lineNumber: 55,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/pipelines/new.tsx",
          lineNumber: 47,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.name) && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2 text-sm text-red-600", id: "name-error", children: actionData.errors.name[0].toUpperCase() + actionData.errors.name.slice(1) }, void 0, false, {
          fileName: "app/routes/pipelines/new.tsx",
          lineNumber: 82,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "app/routes/pipelines/new.tsx",
          lineNumber: 80,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "app/routes/pipelines/new.tsx",
      lineNumber: 43,
      columnNumber: 5
    },
    this
  );
}
export {
  NewPipelinePage as default
};
//# sourceMappingURL=/build/routes/pipelines/new-GURV7UP2.js.map
