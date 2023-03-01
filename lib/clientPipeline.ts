import { type UnifyDbConfig } from "@/lib/utils";

export class ClientPipeline {
  private _query: string;
  private _activeTableIndex: number;
  public id: string;
  public name: string;
  public tables: string;
  public operations: [];
  public db_config: UnifyDbConfig;
  public sort_col?: string;
  public sort_desc?: number;

  constructor(
    params: { id: string, name: string, tables: string, operations: [], db_config: { db_backend: string; db_host: string; db_user: string; db_password: string }, sort_col?: string, sort_desc?: number }
  ) {
    this.sort_desc = params.sort_desc;
    this.sort_col = params.sort_col;
    this.db_config = params.db_config;
    this.operations = params.operations;
    this.tables = params.tables;
    this.name = params.name;
    this.id = params.id;
    this.id = params.id;
    this.name = params.name;
    this.tables = params.tables;
    this.operations = params.operations;
    this.sort_col = params.sort_col;
    this.sort_desc = params.sort_desc;
    this._query = "";
    this.db_config = params.db_config; //'http://127.0.0.1:8123/'; //?query=SELECT%20%2A%20from%20tenant_default.github____org_repos%20FORMAT%20JSON''
    this.db_config["db_host"] = this.db_config["db_host"].replace("localhost", "127.0.0.1");
    this._activeTableIndex = 0;
  }

  get query(): string {
    return this._query;
  }

  set activeTableIndex(index: number) {
    // todo: check index < this.getTableList.length
    this._activeTableIndex = index;
  }

  get activeTableIndex() {
    return this._activeTableIndex;
  }

  getTableList() {
    if (this.tables && this.tables.length > 0) {
      return this.tables.split(",");
    } else {
      return [];
    }
  }

  get dbAuthHeaders() {
    return {
      Authorization: `Basic ${btoa(this.db_config["db_user"] + ":" + this.db_config["db_password"])}`
    };
  }

  get serverUrl(): string | null {
    const tables = this.getTableList();
    if (tables.length > 0) {
      let sort = "";
      if (this.sort_col) {
        sort = ` ORDER BY ${this.sort_col}`;
        if (this.sort_desc) {
          sort += " DESC";
        }
      }
      const query = `SELECT *
                     FROM tenant_default.${tables[0].replace(".", "____")} ${sort} LIMIT 1000 FORMAT JSON`;
      this._query = query;
      return `http://${this.db_config["db_host"]}?query=${encodeURIComponent(query)}`;
    } else {
      return null;
    }
  }
}
