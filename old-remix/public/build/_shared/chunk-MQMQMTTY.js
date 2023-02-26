import {
  require_react,
  useMatches
} from "/build/_shared/chunk-IYXZEBXU.js";
import {
  __toESM
} from "/build/_shared/chunk-4IYZMDEG.js";

// app/utils.ts
var import_react2 = __toESM(require_react());
function useMatchesData(id) {
  const matchingRoutes = useMatches();
  const route = (0, import_react2.useMemo)(
    () => matchingRoutes.find((route2) => route2.id === id),
    [matchingRoutes, id]
  );
  return route == null ? void 0 : route.data;
}
function isUser(user) {
  return user && typeof user === "object" && typeof user.email === "string";
}
function useOptionalUser() {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return void 0;
  }
  return data.user;
}
function useUser() {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
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
    this.id = id;
    this.name = name;
    this.tables = tables;
    this.operations = operations;
    this.sort_col = sort_col;
    this.sort_desc = sort_desc;
    this._query = "";
    this.db_config = db_config;
    this.db_config["db_host"] = this.db_config["db_host"].replace("localhost", "127.0.0.1");
  }
  get query() {
    return this._query;
  }
  getTableList() {
    if (this.tables && this.tables.length > 0) {
      return this.tables.split(",");
    } else {
      return [];
    }
  }
  getDbAuthHeaders() {
    let headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(this.db_config["db_user"] + ":" + this.db_config["db_password"]));
    return headers;
  }
  getServerUrl() {
    let tables = this.getTableList();
    if (tables.length > 0) {
      let sort = "";
      if (this.sort_col) {
        sort = " ORDER BY " + this.sort_col;
        if (this.sort_desc) {
          sort += " DESC";
        }
      }
      let query = "SELECT * from tenant_default." + tables[0].replace(".", "____") + sort + " LIMIT 1000 FORMAT JSON";
      this._query = query;
      return new URL(`http://${this.db_config["db_host"]}?query=${encodeURIComponent(query)}`);
    } else {
      return null;
    }
  }
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export {
  useOptionalUser,
  useUser,
  ClientPipeline,
  classNames
};
//# sourceMappingURL=/build/_shared/chunk-MQMQMTTY.js.map
