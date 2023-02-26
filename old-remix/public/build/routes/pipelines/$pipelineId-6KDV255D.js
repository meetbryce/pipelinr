import "/build/_shared/chunk-AUYLHJJM.js";
import {
  SmartTable
} from "/build/_shared/chunk-OWQNKGS2.js";
import "/build/_shared/chunk-7UEP7WOP.js";
import {
  ClientPipeline
} from "/build/_shared/chunk-MQMQMTTY.js";
import {
  require_pipeline
} from "/build/_shared/chunk-O55YOBDW.js";
import {
  require_session
} from "/build/_shared/chunk-3Q6GZENC.js";
import {
  Form,
  Link,
  Outlet,
  require_jsx_dev_runtime,
  require_react,
  useCatch,
  useLoaderData,
  useRevalidator
} from "/build/_shared/chunk-IYXZEBXU.js";
import {
  __toESM
} from "/build/_shared/chunk-4IYZMDEG.js";

// app/routes/pipelines/$pipelineId.tsx
var React = __toESM(require_react());
var import_pipeline = __toESM(require_pipeline());
var import_session = __toESM(require_session());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function PipelineDetailsPage() {
  let revalidator = useRevalidator();
  const data = useLoaderData();
  let [rowData, setRowData] = React.useState([]);
  const pipeline = new ClientPipeline(
    data.pipeline.id,
    data.pipeline.name,
    data.pipeline.tables,
    [],
    data.unifyDbConfig,
    void 0,
    0
  );
  let [columnDefs, setColumnDefs] = React.useState([
    { field: "id" },
    { field: "node_id" },
    { field: "name" }
  ]);
  const reloadData = () => {
    let url = pipeline.getServerUrl();
    if (!url)
      return;
    fetch(url, {
      method: "GET",
      headers: pipeline.getDbAuthHeaders()
    }).then((response) => response.json()).then(processResponse);
    function processResponse(res) {
      let comparator = () => 0;
      if (res.data.length > 0) {
        let cols = [];
        Object.keys(res.data[0]).map((col) => {
          cols.push({ field: col, comparator });
        });
        setColumnDefs(cols);
        setRowData(res.data);
      }
    }
  };
  React.useEffect(() => {
    reloadData();
  }, [pipeline.getServerUrl()]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-row h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pr-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "font-medium", children: "Datasets" }, void 0, false, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 100,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", { className: "mt-1 mb-2" }, void 0, false, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 101,
        columnNumber: 9
      }, this),
      data.schemas.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "p-2", children: "No schemas defined yet" }, void 0, false, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 103,
        columnNumber: 11
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "table-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: data.schemas.map((schema) => schema.tables.map((table) => {
        const qual = schema.schema + "." + table;
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { className: "p-2 even:bg-slate-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "pl-2 py-2", children: schema.schema }, void 0, false, {
            fileName: "app/routes/pipelines/$pipelineId.tsx",
            lineNumber: 113,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { className: "px-2 py-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: qual, className: "text-blue-500", children: table }, void 0, false, {
            fileName: "app/routes/pipelines/$pipelineId.tsx",
            lineNumber: 114,
            columnNumber: 49
          }, this) }, void 0, false, {
            fileName: "app/routes/pipelines/$pipelineId.tsx",
            lineNumber: 114,
            columnNumber: 21
          }, this)
        ] }, qual, true, {
          fileName: "app/routes/pipelines/$pipelineId.tsx",
          lineNumber: 112,
          columnNumber: 19
        }, this);
      })) }, void 0, false, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 106,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 105,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/pipelines/$pipelineId.tsx",
      lineNumber: 99,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "overflow-auto w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pb-3 -ml-2 -mt-2 flex flex-wrap items-baseline", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "ml-2 mt-2 text-lg font-medium leading-6 text-gray-900", children: data.pipeline.name }, void 0, false, {
          fileName: "app/routes/pipelines/$pipelineId.tsx",
          lineNumber: 126,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "ml-2 mt-1 truncate text-sm text-gray-500", children: [
          "Tables: ",
          data.pipeline.tables
        ] }, void 0, true, {
          fileName: "app/routes/pipelines/$pipelineId.tsx",
          lineNumber: 127,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 125,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-auto h-[calc(100vh-260px)]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        SmartTable,
        {
          entity: pipeline,
          columnDefs,
          rowData,
          reloadData
        },
        void 0,
        false,
        {
          fileName: "app/routes/pipelines/$pipelineId.tsx",
          lineNumber: 130,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 129,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "my-4 text-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "rounded bg-red-600 text-sm py-2 px-4 text-white hover:bg-red-700 focus:bg-red-400",
          children: "Delete"
        },
        void 0,
        false,
        {
          fileName: "app/routes/pipelines/$pipelineId.tsx",
          lineNumber: 138,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/pipelines/$pipelineId.tsx",
      lineNumber: 124,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
      fileName: "app/routes/pipelines/$pipelineId.tsx",
      lineNumber: 147,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/pipelines/$pipelineId.tsx",
      lineNumber: 146,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/pipelines/$pipelineId.tsx",
    lineNumber: 98,
    columnNumber: 5
  }, this);
}
function ErrorBoundary({ error }) {
  console.error(error);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    "An unexpected error occurred: ",
    error.message
  ] }, void 0, true, {
    fileName: "app/routes/pipelines/$pipelineId.tsx",
    lineNumber: 156,
    columnNumber: 10
  }, this);
}
function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: "Pipeline not found" }, void 0, false, {
      fileName: "app/routes/pipelines/$pipelineId.tsx",
      lineNumber: 163,
      columnNumber: 12
    }, this);
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
export {
  CatchBoundary,
  ErrorBoundary,
  PipelineDetailsPage as default
};
//# sourceMappingURL=/build/routes/pipelines/$pipelineId-6KDV255D.js.map
