var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let callbackName = (0, import_isbot.default)(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
        fileName: "app/entry.server.tsx",
        lineNumber: 24,
        columnNumber: 7
      }, this),
      {
        [callbackName]: () => {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          ), pipe(body);
        },
        onShellError: (err) => {
          reject(err);
        },
        onError: (error) => {
          didError = !0, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_node3 = require("@remix-run/node"), import_react2 = require("@remix-run/react");

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-RWU2LP2A.css";

// app/styles/styles.css
var styles_default = "/build/_assets/styles-AJ2FH7MH.css";

// node_modules/ag-grid-community/styles/ag-grid.css
var ag_grid_default = "/build/_assets/ag-grid-E2G6NEET.css";

// node_modules/ag-grid-community/styles/ag-theme-alpine.css
var ag_theme_alpine_default = "/build/_assets/ag-theme-alpine-43I5VNFF.css";

// app/session.server.ts
var import_node2 = require("@remix-run/node"), import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/models/user.server.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// app/db.server.ts
var import_client = require("@prisma/client"), prisma;
global.__db__ || (global.__db__ = new import_client.PrismaClient()), prisma = global.__db__, prisma.$connect();

// app/models/user.server.ts
async function getUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}
async function getUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}
async function createUser(email, password) {
  let hashedPassword = await import_bcryptjs.default.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword
        }
      }
    }
  });
}
async function verifyLogin(email, password) {
  let userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: !0
    }
  });
  if (!userWithPassword || !userWithPassword.password || !await import_bcryptjs.default.compare(
    password,
    userWithPassword.password.hash
  ))
    return null;
  let { password: _password, ...userWithoutPassword } = userWithPassword;
  return userWithoutPassword;
}

// app/session.server.ts
(0, import_tiny_invariant.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
}), USER_SESSION_KEY = "userId";
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  return (await getSession(request)).get(USER_SESSION_KEY);
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (userId === void 0)
    return null;
  let user = await getUserById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  let userId = await getUserId(request);
  if (!userId) {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node2.redirect)(`/login?${searchParams}`);
  }
  return userId;
}
async function createUserSession({
  request,
  userId,
  remember,
  redirectTo
}) {
  let session = await getSession(request);
  return session.set(USER_SESSION_KEY, userId), (0, import_node2.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? 60 * 60 * 24 * 7 : void 0
      })
    }
  });
}
async function logout(request) {
  let session = await getSession(request);
  return (0, import_node2.redirect)("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}

// app/root.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), links = () => [
  { rel: "stylesheet", href: tailwind_default },
  { rel: "stylesheet", href: styles_default },
  { rel: "stylesheet", href: ag_grid_default },
  { rel: "stylesheet", href: ag_theme_alpine_default },
  { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" }
], meta = () => ({
  charset: "utf-8",
  title: "Pipelinr",
  viewport: "width=device-width,initial-scale=1"
});
async function loader({ request }) {
  return (0, import_node3.json)({
    user: await getUser(request)
  });
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", className: "h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 44,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 7
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 43,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { className: "h-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 48,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 49,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 50,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 51,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 47,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}

// app/routes/connections.tsx
var connections_exports = {};
__export(connections_exports, {
  default: () => ConnectionsPage
});

// app/components/Navigation.tsx
var import_react5 = require("@remix-run/react");

// app/utils.ts
var import_react3 = require("@remix-run/react"), import_react4 = require("react"), DEFAULT_REDIRECT = "/";
function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  return !to || typeof to != "string" || !to.startsWith("/") || to.startsWith("//") ? defaultRedirect : to;
}
function useMatchesData(id) {
  let matchingRoutes = (0, import_react3.useMatches)(), route = (0, import_react4.useMemo)(
    () => matchingRoutes.find((route2) => route2.id === id),
    [matchingRoutes, id]
  );
  return route == null ? void 0 : route.data;
}
function isUser(user) {
  return user && typeof user == "object" && typeof user.email == "string";
}
function useOptionalUser() {
  let data = useMatchesData("root");
  if (!(!data || !isUser(data.user)))
    return data.user;
}
function useUser() {
  let maybeUser = useOptionalUser();
  if (!maybeUser)
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  return maybeUser;
}
function validateEmail(email) {
  return typeof email == "string" && email.length > 3 && email.includes("@");
}
function unifyServer() {
  return process.env.UNIFY_HOST || "http://127.0.0.1:5000";
}
var ClientPipeline = class {
  constructor(id, name, tables, operations, db_config, sort_col, sort_desc) {
    this.id = id;
    this.name = name;
    this.tables = tables;
    this.operations = operations;
    this.db_config = db_config;
    this.sort_col = sort_col;
    this.sort_desc = sort_desc;
    this.id = id, this.name = name, this.tables = tables, this.operations = operations, this.sort_col = sort_col, this.sort_desc = sort_desc, this._query = "", this.db_config = db_config, this.db_config.db_host = this.db_config.db_host.replace("localhost", "127.0.0.1");
  }
  get query() {
    return this._query;
  }
  getTableList() {
    return this.tables && this.tables.length > 0 ? this.tables.split(",") : [];
  }
  getDbAuthHeaders() {
    let headers = new Headers();
    return headers.set("Authorization", "Basic " + btoa(this.db_config.db_user + ":" + this.db_config.db_password)), headers;
  }
  getServerUrl() {
    let tables = this.getTableList();
    if (tables.length > 0) {
      let sort = "";
      this.sort_col && (sort = " ORDER BY " + this.sort_col, this.sort_desc && (sort += " DESC"));
      let query = "SELECT * from tenant_default." + tables[0].replace(".", "____") + sort + " LIMIT 1000 FORMAT JSON";
      return this._query = query, new URL(`http://${this.db_config.db_host}?query=${encodeURIComponent(query)}`);
    } else
      return null;
  }
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// app/components/Navigation.tsx
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime");
function Navigation({ user }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("header", { className: "flex items-center justify-between bg-slate-800 px-6 py-4 text-white", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { className: "text-xl font-bold", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react5.Link, { to: ".", children: "Unify" }, void 0, !1, {
      fileName: "app/components/Navigation.tsx",
      lineNumber: 17,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/components/Navigation.tsx",
      lineNumber: 16,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/components/Navigation.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("ul", { className: "flex md:space-x-3", children: [
      { name: "Pipelines", href: "/pipelines" },
      { name: "Playground", href: "/playground" },
      { name: "Connections", href: "/connections" }
    ].map(
      (item) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("li", { className: "h-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        import_react5.NavLink,
        {
          to: item.href,
          className: ({ isActive }) => classNames(isActive ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "px-3 py-2 rounded-md text-sm font-medium"),
          children: item.name
        },
        void 0,
        !1,
        {
          fileName: "app/components/Navigation.tsx",
          lineNumber: 23,
          columnNumber: 13
        },
        this
      ) }, item.href, !1, {
        fileName: "app/components/Navigation.tsx",
        lineNumber: 22,
        columnNumber: 11
      }, this)
    ) }, void 0, !1, {
      fileName: "app/components/Navigation.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "flex space-x-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { className: "text-sm", disabled: !0, children: user.email }, void 0, !1, {
        fileName: "app/components/Navigation.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react5.Form, { action: "/logout", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "rounded bg-slate-600 py-2 px-4 text-blue-100 text-sm hover:bg-blue-500 active:bg-blue-600",
          children: "Logout"
        },
        void 0,
        !1,
        {
          fileName: "app/components/Navigation.tsx",
          lineNumber: 31,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/Navigation.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Navigation.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Navigation.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}

// app/routes/connections.tsx
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function ConnectionsPage() {
  let user = useUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex h-screen flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Navigation, { user }, void 0, !1, {
      fileName: "app/routes/connections.tsx",
      lineNumber: 10,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("main", { className: "flex flex-col h-full bg-white", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", { children: "Existing connections go here" }, void 0, !1, {
        fileName: "app/routes/connections.tsx",
        lineNumber: 12,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("hr", {}, void 0, !1, {
        fileName: "app/routes/connections.tsx",
        lineNumber: 13,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", { children: "Available connections go here" }, void 0, !1, {
        fileName: "app/routes/connections.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/connections.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/connections.tsx",
    lineNumber: 9,
    columnNumber: 5
  }, this);
}

// app/routes/healthcheck.tsx
var healthcheck_exports = {};
__export(healthcheck_exports, {
  loader: () => loader2
});
async function loader2({ request }) {
  let host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  try {
    let url = new URL("/", `http://${host}`);
    return await Promise.all([
      prisma.user.count(),
      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok)
          return Promise.reject(r);
      })
    ]), new Response("OK");
  } catch (error) {
    return console.log("healthcheck \u274C", { error }), new Response("ERROR", { status: 500 });
  }
}

// app/routes/playground.tsx
var playground_exports = {};
__export(playground_exports, {
  action: () => action,
  default: () => PlaygroundPage
});
var import_react6 = require("react"), import_react7 = __toESM(require("@monaco-editor/react")), import_react8 = require("@remix-run/react");
var import_outline = require("@heroicons/react/24/outline");

// app/models/playground.server.ts
async function runPlaygroundQuery(query) {
  let q = `${query} FORMAT JSON`;
  return (await fetch(`http://127.0.0.1:8123/v1/?query=${encodeURIComponent(q)}`)).json();
}

// app/components/SmartTable.tsx
var import_ag_grid_enterprise = require("ag-grid-enterprise"), import_ag_grid_react = require("ag-grid-react"), import_jsx_dev_runtime5 = require("react/jsx-dev-runtime");
function SmartTable({
  entity,
  columnDefs,
  rowData,
  reloadData
}) {
  let defaultColDef = {
    sortable: !0,
    resizable: !0
  }, handleColSort = (event, entity2) => {
    if (console.log(event), !event.column)
      return;
    let dir = event.column.getSort(), desc = 0, sort_col = event.column.getColId(), reload = !1;
    return dir == null && entity2.sort_col != null ? (entity2.sort_col = "", console.log("removing sort from ", sort_col), !1) : (dir == "desc" && (desc = 1), entity2.sort_col != sort_col && (entity2.sort_col = sort_col, reload = !0), entity2.sort_desc != desc && (entity2.sort_desc = desc, reload = !0), reload && (console.log("new sort ", sort_col, " desc:", desc), setTimeout(reloadData, 0)), !1);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "ag-theme-alpine h-full", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
    import_ag_grid_react.AgGridReact,
    {
      rowData,
      columnDefs,
      defaultColDef,
      onGridColumnsChanged: (params) => {
        let columns = params.columnApi.getColumns();
        !columns || columns.map((column) => {
          column.addEventListener("sortChanged", (event) => handleColSort(event, entity));
        });
      }
    },
    void 0,
    !1,
    {
      fileName: "app/components/SmartTable.tsx",
      lineNumber: 64,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/SmartTable.tsx",
    lineNumber: 62,
    columnNumber: 5
  }, this);
}

// app/routes/playground.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime");
async function action({ request }) {
  let userId = await requireUserId(request), query = (await request.formData()).get("query"), result = await runPlaygroundQuery(query), comparator = () => 0, rowData, columnDefs;
  if (result.data.length > 0) {
    let cols = [];
    Object.keys(result.data[0]).map((col) => {
      cols.push({ field: col, comparator });
    }), columnDefs = cols, rowData = result.data;
  }
  return { result, rowData, columnDefs };
}
function PlaygroundPage() {
  let user = useUser(), editorRef = (0, import_react6.useRef)(null), editorOptions = {
    fontSize: 15,
    fontLigatures: !0,
    minimap: { enabled: !1 }
  }, submit = (0, import_react8.useSubmit)(), actionData = (0, import_react8.useActionData)();
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  function handleSubmit(event) {
    var _a;
    event.preventDefault();
    let query = (_a = editorRef == null ? void 0 : editorRef.current) == null ? void 0 : _a.getValue();
    if (!query)
      return;
    let $form = event.currentTarget, formData = new FormData($form);
    formData.set("query", query), submit(formData, { method: "post" });
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex h-screen flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Navigation, { user }, void 0, !1, {
      fileName: "app/routes/playground.tsx",
      lineNumber: 75,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("main", { className: "flex flex-col h-full bg-white p-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "-mx-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        import_react7.default,
        {
          height: "50vh",
          defaultLanguage: "sql",
          defaultValue: `-- Write your Unify SQL query here
select id, number, title, base_repo_name from tenant_default.github____org_pulls limit 1`,
          onMount: handleEditorDidMount,
          options: editorOptions
        },
        void 0,
        !1,
        {
          fileName: "app/routes/playground.tsx",
          lineNumber: 78,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/playground.tsx",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "absolute inset-0 flex items-center", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "w-full border-t border-gray-300" }, void 0, !1, {
          fileName: "app/routes/playground.tsx",
          lineNumber: 90,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/playground.tsx",
          lineNumber: 89,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "relative flex justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react8.Form, { onSubmit: handleSubmit, method: "post", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("input", { type: "hidden", name: "query" }, void 0, !1, {
            fileName: "app/routes/playground.tsx",
            lineNumber: 94,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
            "button",
            {
              type: "submit",
              className: "group inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-green-50 hover:text-green-800 hover:border-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition duration-50 ease-in-out",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
                  import_outline.PlayIcon,
                  {
                    className: "-ml-1.5 mr-1 h-5 w-5 text-gray-400 group-hover:text-green-800",
                    "aria-hidden": "true"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/playground.tsx",
                    lineNumber: 99,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { children: "Run Query" }, void 0, !1, {
                  fileName: "app/routes/playground.tsx",
                  lineNumber: 101,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/playground.tsx",
              lineNumber: 95,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/playground.tsx",
          lineNumber: 93,
          columnNumber: 13
        }, this) }, void 0, !1, {
          fileName: "app/routes/playground.tsx",
          lineNumber: 92,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/playground.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "mt-4 h-full", children: actionData && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
        SmartTable,
        {
          entity: {},
          reloadData: () => console.log("reloading..."),
          columnDefs: actionData.columnDefs,
          rowData: actionData.rowData
        },
        void 0,
        !1,
        {
          fileName: "app/routes/playground.tsx",
          lineNumber: 107,
          columnNumber: 26
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/playground.tsx",
        lineNumber: 106,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/playground.tsx",
      lineNumber: 76,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/playground.tsx",
    lineNumber: 74,
    columnNumber: 5
  }, this);
}

// app/routes/pipelines.tsx
var pipelines_exports = {};
__export(pipelines_exports, {
  default: () => PipelinesPage,
  loader: () => loader3
});
var import_node4 = require("@remix-run/node"), import_react9 = require("@remix-run/react"), import_outline2 = require("@heroicons/react/24/outline");

// app/models/pipeline.server.ts
function getPipeline({
  id,
  userId
}) {
  return prisma.pipeline.findFirst({
    select: { id: !0, name: !0, tables: !0, operations: !0 },
    where: { id, userId }
  });
}
function getPipelineListItems({ userId }) {
  return prisma.pipeline.findMany({
    where: { userId },
    select: { id: !0, name: !0 },
    orderBy: { updatedAt: "desc" }
  });
}
function createPipeline({
  name,
  userId
}) {
  return prisma.pipeline.create({
    data: {
      name,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });
}
async function addTableToPipeline({
  id,
  table,
  userId
}) {
  let pipeline = await prisma.pipeline.findFirst({
    where: { id, userId }
  }), tablist = [];
  if (pipeline && (pipeline.tables && pipeline.tables.length > 0 && (tablist = pipeline.tables.split(",")), tablist.indexOf(table) == -1))
    return tablist.push(table), pipeline.tables = tablist.join(","), prisma.pipeline.update({
      where: { id },
      data: { tables: pipeline.tables }
    });
}
function deletePipeline({
  id,
  userId
}) {
  return prisma.pipeline.deleteMany({
    where: { id, userId }
  });
}

// app/routes/pipelines.tsx
var import_react10 = require("react"), import_react11 = require("@headlessui/react");
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime");
typeof document < "u" && import("tw-elements");
async function loader3({ request }) {
  let userId = await requireUserId(request), pipelineListItems = await getPipelineListItems({ userId });
  return (0, import_node4.json)({ pipelineListItems });
}
function PipelinesPage() {
  let data = (0, import_react9.useLoaderData)(), { pipelineListItems } = data, user = useUser(), inactiveClasses = "flex text-gray-700 hover:bg-gray-100", activeClasses = "flex bg-gray-200 text-gray-900";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex h-screen flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(Navigation, { user }, void 0, !1, {
      fileName: "app/routes/pipelines.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("nav", { className: "flex px-6 py-4", "aria-label": "Breadcrumb", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("ol", { className: "inline-flex items-center space-x-1 md:space-x-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        import_react9.Link,
        {
          to: ".",
          className: "text-sm font-medium text-gray-500 hover:text-blue-600",
          children: "Pipelines"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/pipelines.tsx",
          lineNumber: 46,
          columnNumber: 15
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 45,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 44,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_outline2.ChevronRightIcon, { className: "h-5 w-5 mr-1 md:mr-2 flex-shrink-0 text-gray-400", "aria-hidden": "true" }, void 0, !1, {
          fileName: "app/routes/pipelines.tsx",
          lineNumber: 52,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react11.Menu, { as: "div", className: "relative inline-block text-left", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
            import_react11.Menu.Button,
            {
              className: "inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100",
              children: [
                "Select pipeline ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_outline2.ChevronDownIcon, { className: "-mr-1 ml-2 h-5 w-5", "aria-hidden": "true" }, void 0, !1, {
                  fileName: "app/routes/pipelines.tsx",
                  lineNumber: 58,
                  columnNumber: 21
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/pipelines.tsx",
              lineNumber: 55,
              columnNumber: 19
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/pipelines.tsx",
            lineNumber: 54,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
            import_react11.Transition,
            {
              as: import_react10.Fragment,
              enter: "transition ease-out duration-100",
              enterFrom: "transform opacity-0 scale-95",
              enterTo: "transform opacity-100 scale-100",
              leave: "transition ease-in duration-75",
              leaveFrom: "transform opacity-100 scale-100",
              leaveTo: "transform opacity-0 scale-95",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
                import_react11.Menu.Items,
                {
                  className: "absolute left-0 z-10 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "py-1", children: [
                    pipelineListItems.map((pipeline) => /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
                      import_react9.NavLink,
                      {
                        to: `/pipelines/${pipeline.id}`,
                        className: ({ isActive }) => isActive ? activeClasses : inactiveClasses,
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react11.Menu.Item, { as: "div", className: "flex w-full px-4 py-2 text-sm", children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_outline2.Square3Stack3DIcon, { className: "w-4 h-4 mt-0.5 mr-2" }, void 0, !1, {
                            fileName: "app/routes/pipelines.tsx",
                            lineNumber: 81,
                            columnNumber: 29
                          }, this),
                          pipeline.name
                        ] }, void 0, !0, {
                          fileName: "app/routes/pipelines.tsx",
                          lineNumber: 80,
                          columnNumber: 27
                        }, this)
                      },
                      pipeline.id,
                      !1,
                      {
                        fileName: "app/routes/pipelines.tsx",
                        lineNumber: 75,
                        columnNumber: 25
                      },
                      this
                    )),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
                      import_react9.NavLink,
                      {
                        to: "/pipelines/new",
                        end: !0,
                        className: ({ isActive }) => isActive ? activeClasses : inactiveClasses,
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react11.Menu.Item, { as: "div", className: "flex w-full px-4 py-2 text-sm", children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_outline2.PlusIcon, { className: "w-4 h-4 mt-0.5 mr-2" }, void 0, !1, {
                            fileName: "app/routes/pipelines.tsx",
                            lineNumber: 91,
                            columnNumber: 27
                          }, this),
                          "New pipeline"
                        ] }, void 0, !0, {
                          fileName: "app/routes/pipelines.tsx",
                          lineNumber: 90,
                          columnNumber: 25
                        }, this)
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/pipelines.tsx",
                        lineNumber: 86,
                        columnNumber: 23
                      },
                      this
                    )
                  ] }, void 0, !0, {
                    fileName: "app/routes/pipelines.tsx",
                    lineNumber: 73,
                    columnNumber: 21
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/pipelines.tsx",
                  lineNumber: 71,
                  columnNumber: 19
                },
                this
              )
            },
            void 0,
            !1,
            {
              fileName: "app/routes/pipelines.tsx",
              lineNumber: 62,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/pipelines.tsx",
          lineNumber: 53,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 51,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 50,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/pipelines.tsx",
      lineNumber: 43,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/pipelines.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("main", { className: "flex flex-col h-full bg-white", children: [
      pipelineListItems.length === 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex px-6 space-x-1 md:space-x-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
        import_react9.Link,
        {
          to: "new",
          className: "relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_outline2.Square3Stack3DIcon, { className: "mx-auto h-10 w-10 text-gray-400" }, void 0, !1, {
              fileName: "app/routes/pipelines.tsx",
              lineNumber: 111,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { className: "mt-2 font-medium text-gray-900", children: "Create a new Pipeline" }, void 0, !1, {
              fileName: "app/routes/pipelines.tsx",
              lineNumber: 112,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/pipelines.tsx",
          lineNumber: 107,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 106,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "flex-1 px-6 py-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react9.Outlet, { context: { pipelineListItems } }, void 0, !1, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/pipelines.tsx",
        lineNumber: 117,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/pipelines.tsx",
      lineNumber: 104,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/pipelines.tsx",
    lineNumber: 39,
    columnNumber: 5
  }, this);
}

// app/routes/pipelines/$pipelineId.tsx
var pipelineId_exports = {};
__export(pipelineId_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  action: () => action2,
  default: () => PipelineDetailsPage,
  loader: () => loader4
});
var import_node5 = require("@remix-run/node"), import_react12 = require("@remix-run/react"), import_tiny_invariant2 = __toESM(require("tiny-invariant")), React = __toESM(require("react"));
var import_jsx_dev_runtime8 = require("react/jsx-dev-runtime");
async function loader4({ request, params }) {
  let userId = await requireUserId(request);
  (0, import_tiny_invariant2.default)(params.pipelineId, "pipelineId not found");
  let pipeline = await getPipeline({ userId, id: params.pipelineId });
  if (!pipeline)
    throw new Response("Not Found", { status: 404 });
  let unifyDbConfig = await (await fetch(unifyServer() + "/v1/dbconf")).json();
  console.log(unifyDbConfig);
  let schemas = [];
  try {
    let api_res = await fetch(unifyServer() + "/v1/schemas?deep=1");
    if (api_res.ok)
      schemas = await api_res.json();
    else
      throw Error("Unify fetch failed");
  } catch (error) {
    console.log(error), schemas = [{ schema: error.message, tables: [] }];
  }
  return (0, import_node5.json)({ pipeline, schemas, unifyDbConfig });
}
async function action2({ request, params }) {
  let userId = await requireUserId(request);
  return (0, import_tiny_invariant2.default)(params.pipelineId, "pipelineId not found"), await deletePipeline({ userId, id: params.pipelineId }), (0, import_node5.redirect)("/pipelines");
}
function PipelineDetailsPage() {
  let revalidator = (0, import_react12.useRevalidator)(), data = (0, import_react12.useLoaderData)(), [rowData, setRowData] = React.useState([]), pipeline = new ClientPipeline(
    data.pipeline.id,
    data.pipeline.name,
    data.pipeline.tables,
    [],
    data.unifyDbConfig,
    void 0,
    0
  ), [columnDefs, setColumnDefs] = React.useState([
    { field: "id" },
    { field: "node_id" },
    { field: "name" }
  ]), reloadData = () => {
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
        }), setColumnDefs(cols), setRowData(res.data);
      }
    }
  };
  return React.useEffect(() => {
    reloadData();
  }, [pipeline.getServerUrl()]), /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "flex flex-row h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "pr-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h2", { className: "font-medium", children: "Datasets" }, void 0, !1, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 100,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("hr", { className: "mt-1 mb-2" }, void 0, !1, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 101,
        columnNumber: 9
      }, this),
      data.schemas.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "p-2", children: "No schemas defined yet" }, void 0, !1, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 103,
        columnNumber: 11
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("table", { className: "table-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("tbody", { children: data.schemas.map((schema) => schema.tables.map((table) => {
        let qual = schema.schema + "." + table;
        return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("tr", { className: "p-2 even:bg-slate-50", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("td", { className: "pl-2 py-2", children: schema.schema }, void 0, !1, {
            fileName: "app/routes/pipelines/$pipelineId.tsx",
            lineNumber: 113,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("td", { className: "px-2 py-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_react12.Link, { to: qual, className: "text-blue-500", children: table }, void 0, !1, {
            fileName: "app/routes/pipelines/$pipelineId.tsx",
            lineNumber: 114,
            columnNumber: 49
          }, this) }, void 0, !1, {
            fileName: "app/routes/pipelines/$pipelineId.tsx",
            lineNumber: 114,
            columnNumber: 21
          }, this)
        ] }, qual, !0, {
          fileName: "app/routes/pipelines/$pipelineId.tsx",
          lineNumber: 112,
          columnNumber: 19
        }, this);
      })) }, void 0, !1, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 106,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 105,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/pipelines/$pipelineId.tsx",
      lineNumber: 99,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "overflow-auto w-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "pb-3 -ml-2 -mt-2 flex flex-wrap items-baseline", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("h3", { className: "ml-2 mt-2 text-lg font-medium leading-6 text-gray-900", children: data.pipeline.name }, void 0, !1, {
          fileName: "app/routes/pipelines/$pipelineId.tsx",
          lineNumber: 126,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("p", { className: "ml-2 mt-1 truncate text-sm text-gray-500", children: [
          "Tables: ",
          data.pipeline.tables
        ] }, void 0, !0, {
          fileName: "app/routes/pipelines/$pipelineId.tsx",
          lineNumber: 127,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 125,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { className: "w-auto h-[calc(100vh-260px)]", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
        SmartTable,
        {
          entity: pipeline,
          columnDefs,
          rowData,
          reloadData
        },
        void 0,
        !1,
        {
          fileName: "app/routes/pipelines/$pipelineId.tsx",
          lineNumber: 130,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 129,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_react12.Form, { method: "post", className: "my-4 text-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "rounded bg-red-600 text-sm py-2 px-4 text-white hover:bg-red-700 focus:bg-red-400",
          children: "Delete"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/pipelines/$pipelineId.tsx",
          lineNumber: 138,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/pipelines/$pipelineId.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/pipelines/$pipelineId.tsx",
      lineNumber: 124,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_react12.Outlet, {}, void 0, !1, {
      fileName: "app/routes/pipelines/$pipelineId.tsx",
      lineNumber: 147,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/pipelines/$pipelineId.tsx",
      lineNumber: 146,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/pipelines/$pipelineId.tsx",
    lineNumber: 98,
    columnNumber: 5
  }, this);
}
function ErrorBoundary({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { children: [
    "An unexpected error occurred: ",
    error.message
  ] }, void 0, !0, {
    fileName: "app/routes/pipelines/$pipelineId.tsx",
    lineNumber: 156,
    columnNumber: 10
  }, this);
}
function CatchBoundary() {
  let caught = (0, import_react12.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", { children: "Pipeline not found" }, void 0, !1, {
      fileName: "app/routes/pipelines/$pipelineId.tsx",
      lineNumber: 163,
      columnNumber: 12
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/pipelines/$pipelineId/$add_table.tsx
var add_table_exports = {};
__export(add_table_exports, {
  action: () => action3,
  default: () => AddTableToPipelinePage
});
var import_node6 = require("@remix-run/node"), import_react13 = require("@remix-run/react"), React2 = __toESM(require("react"));
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime");
async function action3({ request }) {
  let userId = await requireUserId(request), formData = await request.formData(), table = formData.get("table"), pipelineId = formData.get("pipelineId");
  if (typeof table != "string" || table.length === 0)
    return (0, import_node6.json)(
      { errors: { name: "table is required" } },
      { status: 400 }
    );
  if (typeof pipelineId != "string" || pipelineId.length === 0)
    return (0, import_node6.json)(
      { errors: { name: "pipelineId is required" } },
      { status: 400 }
    );
  let pipeline = await addTableToPipeline({ id: pipelineId, table, userId });
  return (0, import_node6.redirect)(`/pipelines/${pipelineId}`);
}
function AddTableToPipelinePage() {
  let actionData = (0, import_react13.useActionData)(), nameRef = React2.useRef(null), bodyRef = React2.useRef(null), params = (0, import_react13.useParams)(), table = params.add_table, pipelineId = params.pipelineId;
  return React2.useEffect(() => {
    var _a;
    (_a = document.getElementById("open_button")) == null || _a.click();
  }), /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("button", { type: "button", id: "open_button", className: `hidden transition duration-150
            ease-in-out`, "data-bs-toggle": "modal", "data-bs-target": "#exampleModal", children: "Add table" }, void 0, !1, {
      fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
      lineNumber: 48,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
      "div",
      {
        className: "modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto",
        id: "exampleModal",
        tabIndex: -1,
        "aria-labelledby": "exampleModalLabel",
        "aria-hidden": "true",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "modal-dialog relative w-auto pointer-events-none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          "div",
          {
            className: "modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                "div",
                {
                  className: "modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h5", { className: "text-xl font-medium leading-normal text-gray-800", id: "exampleModalLabel", children: "Add a dataset" }, void 0, !1, {
                      fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                      lineNumber: 60,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                      "button",
                      {
                        type: "button",
                        className: "btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline",
                        "data-bs-dismiss": "modal",
                        "aria-label": "Close"
                      },
                      void 0,
                      !1,
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
                !0,
                {
                  fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                  lineNumber: 58,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "modal-body relative p-4", children: [
                "Add ",
                table,
                " to the pipeline?"
              ] }, void 0, !0, {
                fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                lineNumber: 65,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_react13.Form, { method: "post", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                  "input",
                  {
                    value: table,
                    name: "table",
                    type: "hidden"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                    lineNumber: 70,
                    columnNumber: 23
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("input", { value: pipelineId, name: "pipelineId", type: "hidden" }, void 0, !1, {
                  fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                  lineNumber: 75,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("button", { type: "button", className: `px-6
                        py-2.5
                        bg-purple-600
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-purple-700 hover:shadow-lg
                        focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-purple-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out`, "data-bs-dismiss": "modal", children: "Cancel" }, void 0, !1, {
                  fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                  lineNumber: 76,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("button", { type: "submit", className: `px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-blue-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out
                        ml-1`, children: "Yes" }, void 0, !1, {
                  fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                  lineNumber: 93,
                  columnNumber: 23
                }, this)
              ] }, void 0, !0, {
                fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                lineNumber: 69,
                columnNumber: 19
              }, this) }, void 0, !1, {
                fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
                lineNumber: 68,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
            lineNumber: 56,
            columnNumber: 13
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
          lineNumber: 55,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
        lineNumber: 53,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/pipelines/$pipelineId/$add_table.tsx",
    lineNumber: 47,
    columnNumber: 5
  }, this);
}

// app/routes/pipelines/index.tsx
var pipelines_exports2 = {};
__export(pipelines_exports2, {
  default: () => PipelineIndexPage
});
var import_react14 = require("@remix-run/react"), import_outline3 = require("@heroicons/react/24/outline"), import_react_router_dom = require("react-router-dom"), import_jsx_dev_runtime10 = require("react/jsx-dev-runtime");
function PipelineIndexPage() {
  let { pipelineListItems } = (0, import_react_router_dom.useOutletContext)();
  console.log({ pipelineListItems });
  let pipelines = [1, 2, 3, 4];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("ul", { role: "list", className: "my-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4", children: pipelineListItems.map((pipeline) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_react14.Link, { to: `./${pipeline.id}`, className: `col-span-1 flex rounded-md border border-gray-200 shadow-sm transition duration-150
            ease-in-out hover:shadow-md hover:border-gray-300`, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex-shrink-0 flex items-center justify-center w-16 rounded-l-md", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_outline3.Square3Stack3DIcon, { className: "mx-auto h-7 w-7 text-gray-300" }, void 0, !1, {
        fileName: "app/routes/pipelines/index.tsx",
        lineNumber: 20,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/routes/pipelines/index.tsx",
        lineNumber: 19,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex flex-1 items-center justify-between truncate rounded-r-md bg-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex-1 truncate px-4 py-3 pl-0 text-sm", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "font-medium text-gray-900", children: pipeline.name }, void 0, !1, {
          fileName: "app/routes/pipelines/index.tsx",
          lineNumber: 24,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-gray-500", children: "?? Tables" }, void 0, !1, {
          fileName: "app/routes/pipelines/index.tsx",
          lineNumber: 25,
          columnNumber: 19
        }, this),
        " "
      ] }, void 0, !0, {
        fileName: "app/routes/pipelines/index.tsx",
        lineNumber: 23,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/routes/pipelines/index.tsx",
        lineNumber: 22,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/pipelines/index.tsx",
      lineNumber: 17,
      columnNumber: 13
    }, this) }, pipeline.id, !1, {
      fileName: "app/routes/pipelines/index.tsx",
      lineNumber: 16,
      columnNumber: 11
    }, this)) }, void 0, !1, {
      fileName: "app/routes/pipelines/index.tsx",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "text-center mt-10", children: [
      "Select a pipeline above, or",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_react14.Link, { to: "new", className: "text-blue-500 underline hover:text-blue-800", children: "create a new pipeline." }, void 0, !1, {
        fileName: "app/routes/pipelines/index.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/pipelines/index.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/pipelines/index.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}

// app/routes/pipelines/new.tsx
var new_exports = {};
__export(new_exports, {
  action: () => action4,
  default: () => NewPipelinePage
});
var import_node7 = require("@remix-run/node"), import_react15 = require("@remix-run/react"), React3 = __toESM(require("react"));
var import_outline4 = require("@heroicons/react/24/outline"), import_jsx_dev_runtime11 = require("react/jsx-dev-runtime");
async function action4({ request }) {
  let userId = await requireUserId(request), name = (await request.formData()).get("name");
  if (typeof name != "string" || name.length === 0)
    return (0, import_node7.json)(
      { errors: { name: "name is required" } },
      { status: 400 }
    );
  let pipeline = await createPipeline({ name, userId });
  return (0, import_node7.redirect)(`/pipelines/${pipeline.id}`);
}
function NewPipelinePage() {
  var _a, _b, _c, _d;
  let actionData = (0, import_react15.useActionData)(), nameRef = React3.useRef(null);
  React3.useEffect(() => {
    var _a2, _b2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.name && ((_b2 = nameRef.current) == null || _b2.focus());
  }, [actionData]);
  let inputColorClasses = (_a = actionData == null ? void 0 : actionData.errors) != null && _a.name ? "border-red-300 focus:border-red-500 focus:ring-red-500 focus-visible:outline-red-500 placeholder-red-400" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
    import_react15.Form,
    {
      method: "post",
      className: "mx-auto max-w-xl mt-10",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "text-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_outline4.Square3Stack3DIcon, { className: "mx-auto h-10 w-10 text-gray-400" }, void 0, !1, {
              fileName: "app/routes/pipelines/new.tsx",
              lineNumber: 49,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("h2", { className: "mt-1 text-lg font-medium text-gray-900", children: "Create new pipeline" }, void 0, !1, {
              fileName: "app/routes/pipelines/new.tsx",
              lineNumber: 50,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", { className: "mt-1 text-sm text-gray-500", children: "Pipelines allow you to merge, filter, and aggregate data for easy reuse in the future." }, void 0, !1, {
              fileName: "app/routes/pipelines/new.tsx",
              lineNumber: 51,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/pipelines/new.tsx",
            lineNumber: 48,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "mt-6 flex", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("label", { htmlFor: "name", className: "sr-only", children: "Pipeline name" }, void 0, !1, {
              fileName: "app/routes/pipelines/new.tsx",
              lineNumber: 56,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
              "input",
              {
                ref: nameRef,
                name: "name",
                className: "block w-full px-3 rounded border shadow-sm sm:text-sm " + inputColorClasses,
                placeholder: "Enter a name for your pipeline",
                "aria-invalid": (_b = actionData == null ? void 0 : actionData.errors) != null && _b.name ? !0 : void 0,
                "aria-errormessage": (_c = actionData == null ? void 0 : actionData.errors) != null && _c.name ? "name-error" : void 0
              },
              void 0,
              !1,
              {
                fileName: "app/routes/pipelines/new.tsx",
                lineNumber: 59,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
              "button",
              {
                type: "submit",
                className: `ml-4 flex-shrink-0 rounded border border-transparent bg-blue-600 px-4 py-2
            text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:ring-offset-2`,
                children: "Create Pipeline"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/pipelines/new.tsx",
                lineNumber: 69,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/pipelines/new.tsx",
            lineNumber: 55,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/pipelines/new.tsx",
          lineNumber: 47,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { children: ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.name) && /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", { className: "mt-2 text-sm text-red-600", id: "name-error", children: actionData.errors.name[0].toUpperCase() + actionData.errors.name.slice(1) }, void 0, !1, {
          fileName: "app/routes/pipelines/new.tsx",
          lineNumber: 82,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/routes/pipelines/new.tsx",
          lineNumber: 80,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/pipelines/new.tsx",
      lineNumber: 43,
      columnNumber: 5
    },
    this
  );
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action5,
  loader: () => loader5
});
var import_node8 = require("@remix-run/node");
async function action5({ request }) {
  return logout(request);
}
async function loader5() {
  return (0, import_node8.redirect)("/");
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index
});
var import_react16 = require("@remix-run/react");

// app/images/unify_hero.png
var unify_hero_default = "/build/_assets/unify_hero-ARDKAME6.png";

// app/routes/index.tsx
var import_jsx_dev_runtime12 = require("react/jsx-dev-runtime");
function Index() {
  let user = useOptionalUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("main", { className: "relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "relative sm:pb-16 sm:pt-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "relative shadow-xl sm:overflow-hidden sm:rounded-2xl", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
        "img",
        {
          className: "h-full w-full object-cover",
          src: unify_hero_default,
          alt: "Dall-E Unify Hero"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 15,
          columnNumber: 15
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 20,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 14,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h1", { className: "text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("span", { className: "block uppercase text-yellow-500 drop-shadow-md", children: "Unify Dashboard" }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 24,
        columnNumber: 17
      }, this) }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 23,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center", children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
        import_react16.Link,
        {
          to: "/pipelines",
          className: "flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8",
          children: [
            "View Pipelines for ",
            user.email
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 30,
          columnNumber: 19
        },
        this
      ) : /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          import_react16.Link,
          {
            to: "/join",
            className: "flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8",
            children: "Sign up"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.tsx",
            lineNumber: 38,
            columnNumber: 21
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          import_react16.Link,
          {
            to: "/login",
            className: "flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600",
            children: "Log In"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.tsx",
            lineNumber: 44,
            columnNumber: 21
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/index.tsx",
        lineNumber: 37,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 28,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 22,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/index.tsx",
    lineNumber: 13,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 12,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 11,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action6,
  default: () => LoginPage,
  loader: () => loader6,
  meta: () => meta2
});
var import_node9 = require("@remix-run/node"), import_react17 = require("@remix-run/react"), React4 = __toESM(require("react"));
var import_jsx_dev_runtime13 = require("react/jsx-dev-runtime");
async function loader6({ request }) {
  return await getUserId(request) ? (0, import_node9.redirect)("/") : (0, import_node9.json)({});
}
async function action6({ request }) {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = safeRedirect(formData.get("redirectTo"), "/notes"), remember = formData.get("remember");
  if (!validateEmail(email))
    return (0, import_node9.json)(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  if (typeof password != "string" || password.length === 0)
    return (0, import_node9.json)(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  if (password.length < 8)
    return (0, import_node9.json)(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  let user = await verifyLogin(email, password);
  return user ? createUserSession({
    request,
    userId: user.id,
    remember: remember === "on",
    redirectTo
  }) : (0, import_node9.json)(
    { errors: { email: "Invalid email or password", password: null } },
    { status: 400 }
  );
}
var meta2 = () => ({
  title: "Login"
});
function LoginPage() {
  var _a, _b, _c, _d;
  let [searchParams] = (0, import_react17.useSearchParams)(), redirectTo = searchParams.get("redirectTo") || "/notes", actionData = (0, import_react17.useActionData)(), emailRef = React4.useRef(null), passwordRef = React4.useRef(null);
  return React4.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.email ? (_b2 = emailRef.current) == null || _b2.focus() : (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.password && ((_d2 = passwordRef.current) == null || _d2.focus());
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_react17.Form, { method: "post", className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
        "label",
        {
          htmlFor: "email",
          className: "block text-sm font-medium text-gray-700",
          children: "Email address"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 87,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          "input",
          {
            ref: emailRef,
            id: "email",
            required: !0,
            autoFocus: !0,
            name: "email",
            type: "email",
            autoComplete: "email",
            "aria-invalid": (_a = actionData == null ? void 0 : actionData.errors) != null && _a.email ? !0 : void 0,
            "aria-describedby": "email-error",
            className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 94,
            columnNumber: 15
          },
          this
        ),
        ((_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email) && /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "pt-1 text-red-700", id: "email-error", children: actionData.errors.email }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 107,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 93,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 86,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
        "label",
        {
          htmlFor: "password",
          className: "block text-sm font-medium text-gray-700",
          children: "Password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 115,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          "input",
          {
            id: "password",
            ref: passwordRef,
            name: "password",
            type: "password",
            autoComplete: "current-password",
            "aria-invalid": (_c = actionData == null ? void 0 : actionData.errors) != null && _c.password ? !0 : void 0,
            "aria-describedby": "password-error",
            className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 122,
            columnNumber: 15
          },
          this
        ),
        ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "pt-1 text-red-700", id: "password-error", children: actionData.errors.password }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 133,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 121,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 114,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 140,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Log in"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/login.tsx",
        lineNumber: 141,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          "input",
          {
            id: "remember",
            name: "remember",
            type: "checkbox",
            className: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 149,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          "label",
          {
            htmlFor: "remember",
            className: "ml-2 block text-sm text-gray-900",
            children: "Remember me"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 155,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 148,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "text-center text-sm text-gray-500", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          import_react17.Link,
          {
            className: "text-blue-500 underline",
            to: {
              pathname: "/join",
              search: searchParams.toString()
            },
            children: "Sign up"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 164,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 162,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 147,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 85,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 84,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 83,
    columnNumber: 5
  }, this);
}

// app/routes/notes.tsx
var notes_exports = {};
__export(notes_exports, {
  default: () => NotesPage,
  loader: () => loader7
});
var import_node10 = require("@remix-run/node"), import_react18 = require("@remix-run/react");

// app/models/note.server.ts
function getNote({
  id,
  userId
}) {
  return prisma.note.findFirst({
    select: { id: !0, body: !0, title: !0 },
    where: { id, userId }
  });
}
function getNoteListItems({ userId }) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: !0, title: !0 },
    orderBy: { updatedAt: "desc" }
  });
}
function createNote({
  body,
  title,
  userId
}) {
  return prisma.note.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });
}
function deleteNote({
  id,
  userId
}) {
  return prisma.note.deleteMany({
    where: { id, userId }
  });
}

// app/routes/notes.tsx
var import_jsx_dev_runtime14 = require("react/jsx-dev-runtime");
async function loader7({ request }) {
  let userId = await requireUserId(request), noteListItems = await getNoteListItems({ userId });
  return (0, import_node10.json)({ noteListItems });
}
function NotesPage() {
  let data = (0, import_react18.useLoaderData)(), user = useUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "flex h-full min-h-screen flex-col", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("header", { className: "flex items-center justify-between bg-slate-800 p-4 text-white", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("h1", { className: "text-3xl font-bold", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react18.Link, { to: ".", children: "Notes" }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 23,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("p", { children: user.email }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react18.Form, { action: "/logout", method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
        "button",
        {
          type: "submit",
          className: "rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600",
          children: "Logout"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/notes.tsx",
          lineNumber: 27,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("main", { className: "flex h-full bg-white", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "h-full w-80 border-r bg-gray-50", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react18.Link, { to: "new", className: "block p-4 text-xl text-blue-500", children: "+ New Note" }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 38,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("hr", {}, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 42,
          columnNumber: 11
        }, this),
        data.noteListItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("p", { className: "p-4", children: "No notes yet" }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 45,
          columnNumber: 13
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("ol", { children: data.noteListItems.map((note) => /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
          import_react18.NavLink,
          {
            className: ({ isActive }) => `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`,
            to: note.id,
            children: [
              "\u{1F4DD} ",
              note.title
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/notes.tsx",
            lineNumber: 50,
            columnNumber: 19
          },
          this
        ) }, note.id, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 49,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 47,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 37,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "flex-1 p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react18.Outlet, {}, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 65,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 64,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}

// app/routes/notes/$noteId.tsx
var noteId_exports = {};
__export(noteId_exports, {
  CatchBoundary: () => CatchBoundary2,
  ErrorBoundary: () => ErrorBoundary2,
  action: () => action7,
  default: () => NoteDetailsPage,
  loader: () => loader8
});
var import_node11 = require("@remix-run/node"), import_react19 = require("@remix-run/react"), import_tiny_invariant3 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime15 = require("react/jsx-dev-runtime");
async function loader8({ request, params }) {
  let userId = await requireUserId(request);
  (0, import_tiny_invariant3.default)(params.noteId, "noteId not found");
  let note = await getNote({ userId, id: params.noteId });
  if (!note)
    throw new Response("Not Found", { status: 404 });
  return (0, import_node11.json)({ note });
}
async function action7({ request, params }) {
  let userId = await requireUserId(request);
  return (0, import_tiny_invariant3.default)(params.noteId, "noteId not found"), await deleteNote({ userId, id: params.noteId }), (0, import_node11.redirect)("/notes");
}
function NoteDetailsPage() {
  let data = (0, import_react19.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("h3", { className: "text-2xl font-bold", children: data.note.title }, void 0, !1, {
      fileName: "app/routes/notes/$noteId.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("p", { className: "py-6", children: data.note.body }, void 0, !1, {
      fileName: "app/routes/notes/$noteId.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("hr", { className: "my-4" }, void 0, !1, {
      fileName: "app/routes/notes/$noteId.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_react19.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Delete"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/notes/$noteId.tsx",
        lineNumber: 38,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/notes/$noteId.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes/$noteId.tsx",
    lineNumber: 33,
    columnNumber: 5
  }, this);
}
function ErrorBoundary2({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: [
    "An unexpected error occurred: ",
    error.message
  ] }, void 0, !0, {
    fileName: "app/routes/notes/$noteId.tsx",
    lineNumber: 52,
    columnNumber: 10
  }, this);
}
function CatchBoundary2() {
  let caught = (0, import_react19.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { children: "Note not found" }, void 0, !1, {
      fileName: "app/routes/notes/$noteId.tsx",
      lineNumber: 59,
      columnNumber: 12
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/notes/index.tsx
var notes_exports2 = {};
__export(notes_exports2, {
  default: () => NoteIndexPage
});
var import_react20 = require("@remix-run/react"), import_jsx_dev_runtime16 = require("react/jsx-dev-runtime");
function NoteIndexPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { children: [
    "No note selected. Select a note on the left, or",
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_react20.Link, { to: "new", className: "text-blue-500 underline", children: "create a new note." }, void 0, !1, {
      fileName: "app/routes/notes/index.tsx",
      lineNumber: 7,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes/index.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}

// app/routes/notes/new.tsx
var new_exports2 = {};
__export(new_exports2, {
  action: () => action8,
  default: () => NewNotePage
});
var import_node12 = require("@remix-run/node"), import_react21 = require("@remix-run/react"), React5 = __toESM(require("react"));
var import_jsx_dev_runtime17 = require("react/jsx-dev-runtime");
async function action8({ request }) {
  let userId = await requireUserId(request), formData = await request.formData(), title = formData.get("title"), body = formData.get("body");
  if (typeof title != "string" || title.length === 0)
    return (0, import_node12.json)(
      { errors: { title: "Title is required", body: null } },
      { status: 400 }
    );
  if (typeof body != "string" || body.length === 0)
    return (0, import_node12.json)(
      { errors: { title: null, body: "Body is required" } },
      { status: 400 }
    );
  let note = await createNote({ title, body, userId });
  return (0, import_node12.redirect)(`/notes/${note.id}`);
}
function NewNotePage() {
  var _a, _b, _c, _d, _e, _f;
  let actionData = (0, import_react21.useActionData)(), titleRef = React5.useRef(null), bodyRef = React5.useRef(null);
  return React5.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.title ? (_b2 = titleRef.current) == null || _b2.focus() : (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.body && ((_d2 = bodyRef.current) == null || _d2.focus());
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
    import_react21.Form,
    {
      method: "post",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("label", { className: "flex w-full flex-col gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", { children: "Title: " }, void 0, !1, {
              fileName: "app/routes/notes/new.tsx",
              lineNumber: 60,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
              "input",
              {
                ref: titleRef,
                name: "title",
                className: "flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose",
                "aria-invalid": (_a = actionData == null ? void 0 : actionData.errors) != null && _a.title ? !0 : void 0,
                "aria-errormessage": (_b = actionData == null ? void 0 : actionData.errors) != null && _b.title ? "title-error" : void 0
              },
              void 0,
              !1,
              {
                fileName: "app/routes/notes/new.tsx",
                lineNumber: 61,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/notes/new.tsx",
            lineNumber: 59,
            columnNumber: 9
          }, this),
          ((_c = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _c.title) && /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "pt-1 text-red-700", id: "title-error", children: actionData.errors.title }, void 0, !1, {
            fileName: "app/routes/notes/new.tsx",
            lineNumber: 72,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/notes/new.tsx",
          lineNumber: 58,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("label", { className: "flex w-full flex-col gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", { children: "Body: " }, void 0, !1, {
              fileName: "app/routes/notes/new.tsx",
              lineNumber: 80,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
              "textarea",
              {
                ref: bodyRef,
                name: "body",
                rows: 8,
                className: "w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6",
                "aria-invalid": (_d = actionData == null ? void 0 : actionData.errors) != null && _d.body ? !0 : void 0,
                "aria-errormessage": (_e = actionData == null ? void 0 : actionData.errors) != null && _e.body ? "body-error" : void 0
              },
              void 0,
              !1,
              {
                fileName: "app/routes/notes/new.tsx",
                lineNumber: 81,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/notes/new.tsx",
            lineNumber: 79,
            columnNumber: 9
          }, this),
          ((_f = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _f.body) && /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "pt-1 text-red-700", id: "body-error", children: actionData.errors.body }, void 0, !1, {
            fileName: "app/routes/notes/new.tsx",
            lineNumber: 93,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/notes/new.tsx",
          lineNumber: 78,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", { className: "text-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
          "button",
          {
            type: "submit",
            className: "rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
            children: "Save"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/notes/new.tsx",
            lineNumber: 100,
            columnNumber: 9
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/notes/new.tsx",
          lineNumber: 99,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/notes/new.tsx",
      lineNumber: 49,
      columnNumber: 5
    },
    this
  );
}

// app/routes/join.tsx
var join_exports = {};
__export(join_exports, {
  action: () => action9,
  default: () => Join,
  loader: () => loader9,
  meta: () => meta3
});
var import_node13 = require("@remix-run/node"), import_react22 = require("@remix-run/react"), React6 = __toESM(require("react"));
var import_jsx_dev_runtime18 = require("react/jsx-dev-runtime");
async function loader9({ request }) {
  return await getUserId(request) ? (0, import_node13.redirect)("/") : (0, import_node13.json)({});
}
async function action9({ request }) {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  if (!validateEmail(email))
    return (0, import_node13.json)(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  if (typeof password != "string" || password.length === 0)
    return (0, import_node13.json)(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  if (password.length < 8)
    return (0, import_node13.json)(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  if (await getUserByEmail(email))
    return (0, import_node13.json)(
      {
        errors: {
          email: "A user already exists with this email",
          password: null
        }
      },
      { status: 400 }
    );
  let user = await createUser(email, password);
  return createUserSession({
    request,
    userId: user.id,
    remember: !1,
    redirectTo
  });
}
var meta3 = () => ({
  title: "Sign Up"
});
function Join() {
  var _a, _b, _c, _d;
  let [searchParams] = (0, import_react22.useSearchParams)(), redirectTo = searchParams.get("redirectTo") ?? void 0, actionData = (0, import_react22.useActionData)(), emailRef = React6.useRef(null), passwordRef = React6.useRef(null);
  return React6.useEffect(() => {
    var _a2, _b2, _c2, _d2;
    (_a2 = actionData == null ? void 0 : actionData.errors) != null && _a2.email ? (_b2 = emailRef.current) == null || _b2.focus() : (_c2 = actionData == null ? void 0 : actionData.errors) != null && _c2.password && ((_d2 = passwordRef.current) == null || _d2.focus());
  }, [actionData]), /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(import_react22.Form, { method: "post", className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
        "label",
        {
          htmlFor: "email",
          className: "block text-sm font-medium text-gray-700",
          children: "Email address"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 93,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
          "input",
          {
            ref: emailRef,
            id: "email",
            required: !0,
            autoFocus: !0,
            name: "email",
            type: "email",
            autoComplete: "email",
            "aria-invalid": (_a = actionData == null ? void 0 : actionData.errors) != null && _a.email ? !0 : void 0,
            "aria-describedby": "email-error",
            className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 100,
            columnNumber: 15
          },
          this
        ),
        ((_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.email) && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "pt-1 text-red-700", id: "email-error", children: actionData.errors.email }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 113,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 99,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 92,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
        "label",
        {
          htmlFor: "password",
          className: "block text-sm font-medium text-gray-700",
          children: "Password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 121,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "mt-1", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
          "input",
          {
            id: "password",
            ref: passwordRef,
            name: "password",
            type: "password",
            autoComplete: "new-password",
            "aria-invalid": (_c = actionData == null ? void 0 : actionData.errors) != null && _c.password ? !0 : void 0,
            "aria-describedby": "password-error",
            className: "w-full rounded border border-gray-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 128,
            columnNumber: 15
          },
          this
        ),
        ((_d = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _d.password) && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "pt-1 text-red-700", id: "password-error", children: actionData.errors.password }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 139,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 127,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 120,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 146,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
      "button",
      {
        type: "submit",
        className: "w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400",
        children: "Create Account"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/join.tsx",
        lineNumber: 147,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "text-center text-sm text-gray-500", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
        import_react22.Link,
        {
          className: "text-blue-500 underline",
          to: {
            pathname: "/login",
            search: searchParams.toString()
          },
          children: "Log in"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 156,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 154,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 153,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/join.tsx",
    lineNumber: 91,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 90,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 89,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "9612ec12", entry: { module: "/build/entry.client-4QS2HB4B.js", imports: ["/build/_shared/chunk-NDSEZY7R.js", "/build/_shared/chunk-RLA37IRW.js", "/build/_shared/chunk-4IYZMDEG.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-5WF7CRLX.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/connections": { id: "routes/connections", parentId: "root", path: "connections", index: void 0, caseSensitive: void 0, module: "/build/routes/connections-N3EYTMMZ.js", imports: ["/build/_shared/chunk-PWSHOSZL.js", "/build/_shared/chunk-PMDIGT5R.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/healthcheck": { id: "routes/healthcheck", parentId: "root", path: "healthcheck", index: void 0, caseSensitive: void 0, module: "/build/routes/healthcheck-KRZXUUE5.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-M3TNKQM2.js", imports: ["/build/_shared/chunk-PMDIGT5R.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/join": { id: "routes/join", parentId: "root", path: "join", index: void 0, caseSensitive: void 0, module: "/build/routes/join-5JRM2BGJ.js", imports: ["/build/_shared/chunk-MALRODWZ.js", "/build/_shared/chunk-PMDIGT5R.js", "/build/_shared/chunk-3Q6GZENC.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-FMS6EP7M.js", imports: ["/build/_shared/chunk-MALRODWZ.js", "/build/_shared/chunk-PMDIGT5R.js", "/build/_shared/chunk-3Q6GZENC.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-MSMHPIMB.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes": { id: "routes/notes", parentId: "root", path: "notes", index: void 0, caseSensitive: void 0, module: "/build/routes/notes-E6S7YC2P.js", imports: ["/build/_shared/chunk-YTEA2WOS.js", "/build/_shared/chunk-PMDIGT5R.js", "/build/_shared/chunk-3Q6GZENC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes/$noteId": { id: "routes/notes/$noteId", parentId: "routes/notes", path: ":noteId", index: void 0, caseSensitive: void 0, module: "/build/routes/notes/$noteId-3BKMMVN6.js", imports: ["/build/_shared/chunk-AUYLHJJM.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/notes/index": { id: "routes/notes/index", parentId: "routes/notes", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/notes/index-BVJIXRN2.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/notes/new": { id: "routes/notes/new", parentId: "routes/notes", path: "new", index: void 0, caseSensitive: void 0, module: "/build/routes/notes/new-MQ34MXKK.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/pipelines": { id: "routes/pipelines", parentId: "root", path: "pipelines", index: void 0, caseSensitive: void 0, module: "/build/routes/pipelines-KN62OT5M.js", imports: ["/build/_shared/chunk-A6IMWZZS.js", "/build/_shared/chunk-PWSHOSZL.js", "/build/_shared/chunk-PMDIGT5R.js", "/build/_shared/chunk-O55YOBDW.js", "/build/_shared/chunk-3Q6GZENC.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/pipelines/$pipelineId": { id: "routes/pipelines/$pipelineId", parentId: "routes/pipelines", path: ":pipelineId", index: void 0, caseSensitive: void 0, module: "/build/routes/pipelines/$pipelineId-XFDAOCUE.js", imports: ["/build/_shared/chunk-AUYLHJJM.js", "/build/_shared/chunk-IWBMQWI4.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/pipelines/$pipelineId/$add_table": { id: "routes/pipelines/$pipelineId/$add_table", parentId: "routes/pipelines/$pipelineId", path: ":add_table", index: void 0, caseSensitive: void 0, module: "/build/routes/pipelines/$pipelineId/$add_table-DSZQEZEP.js", imports: ["/build/_shared/chunk-O55YOBDW.js", "/build/_shared/chunk-3Q6GZENC.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/pipelines/index": { id: "routes/pipelines/index", parentId: "routes/pipelines", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/pipelines/index-DTLTBRBL.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/pipelines/new": { id: "routes/pipelines/new", parentId: "routes/pipelines", path: "new", index: void 0, caseSensitive: void 0, module: "/build/routes/pipelines/new-GURV7UP2.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/playground": { id: "routes/playground", parentId: "root", path: "playground", index: void 0, caseSensitive: void 0, module: "/build/routes/playground-WZC6UMEA.js", imports: ["/build/_shared/chunk-A6IMWZZS.js", "/build/_shared/chunk-PWSHOSZL.js", "/build/_shared/chunk-IWBMQWI4.js", "/build/_shared/chunk-PMDIGT5R.js", "/build/_shared/chunk-3Q6GZENC.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, url: "/build/manifest-9612EC12.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_vanillaExtract: !1, v2_errorBoundary: !1, v2_meta: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/connections": {
    id: "routes/connections",
    parentId: "root",
    path: "connections",
    index: void 0,
    caseSensitive: void 0,
    module: connections_exports
  },
  "routes/healthcheck": {
    id: "routes/healthcheck",
    parentId: "root",
    path: "healthcheck",
    index: void 0,
    caseSensitive: void 0,
    module: healthcheck_exports
  },
  "routes/playground": {
    id: "routes/playground",
    parentId: "root",
    path: "playground",
    index: void 0,
    caseSensitive: void 0,
    module: playground_exports
  },
  "routes/pipelines": {
    id: "routes/pipelines",
    parentId: "root",
    path: "pipelines",
    index: void 0,
    caseSensitive: void 0,
    module: pipelines_exports
  },
  "routes/pipelines/$pipelineId": {
    id: "routes/pipelines/$pipelineId",
    parentId: "routes/pipelines",
    path: ":pipelineId",
    index: void 0,
    caseSensitive: void 0,
    module: pipelineId_exports
  },
  "routes/pipelines/$pipelineId/$add_table": {
    id: "routes/pipelines/$pipelineId/$add_table",
    parentId: "routes/pipelines/$pipelineId",
    path: ":add_table",
    index: void 0,
    caseSensitive: void 0,
    module: add_table_exports
  },
  "routes/pipelines/index": {
    id: "routes/pipelines/index",
    parentId: "routes/pipelines",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: pipelines_exports2
  },
  "routes/pipelines/new": {
    id: "routes/pipelines/new",
    parentId: "routes/pipelines",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/notes": {
    id: "routes/notes",
    parentId: "root",
    path: "notes",
    index: void 0,
    caseSensitive: void 0,
    module: notes_exports
  },
  "routes/notes/$noteId": {
    id: "routes/notes/$noteId",
    parentId: "routes/notes",
    path: ":noteId",
    index: void 0,
    caseSensitive: void 0,
    module: noteId_exports
  },
  "routes/notes/index": {
    id: "routes/notes/index",
    parentId: "routes/notes",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: notes_exports2
  },
  "routes/notes/new": {
    id: "routes/notes/new",
    parentId: "routes/notes",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports2
  },
  "routes/join": {
    id: "routes/join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    module: join_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
