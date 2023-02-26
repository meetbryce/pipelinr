// AG GRID
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import type { ColumnEvent, GridColumnsChangedEvent } from "ag-grid-community";
import * as React from "react";
import type { Column } from "ag-grid-community/dist/lib/entities/column";


export default function SmartTable(
  {
    entity, // e.g. for pipeline views, the entity is Pipeline
    columnDefs,
    rowData,
    reloadData
  }: { entity: any, columnDefs: any, rowData: any, reloadData: any }
) { // fixme: non any types

  const defaultColDef = {
    sortable: true,
    resizable: true
  };

  const handleColSort = (event: ColumnEvent, entity: any) => { // todo: no "any"
    console.log(event);
    if (!event.column) return;
    let dir = event.column.getSort();
    let desc: number = 0;
    let sort_col = event.column.getColId();
    let reload = false;
    if (dir == null && entity.sort_col != null) {
      entity.sort_col = "";
      console.log("removing sort from ", sort_col);
      return false;
    }
    if (dir == "desc") {
      desc = 1;
    }
    if (entity.sort_col != sort_col) {
      entity.sort_col = sort_col;
      reload = true;
    }
    if (entity.sort_desc != desc) {
      entity.sort_desc = desc;
      reload = true;
    }
    if (reload) {
      console.log("new sort ", sort_col, " desc:", desc);
      setTimeout(reloadData, 0);
    }
    return false;
  };

  const onGridReady = (params: GridColumnsChangedEvent) => {
    let columns: Column[] | null = params.columnApi.getColumns();
    if (!columns) return;
    columns.map(column => {
      column.addEventListener("sortChanged", (event: ColumnEvent) => handleColSort(event, entity));
    });
  };

  return (
    <div className="ag-theme-alpine h-full">
      {/* todo: user inter and leverage font-feature-settings: 'tnum'; for tabular numbers */}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridColumnsChanged={onGridReady}
      >
      </AgGridReact>
    </div>
  );
}