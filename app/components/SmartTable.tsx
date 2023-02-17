// AG GRID
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import type { ColumnEvent, GridColumnsChangedEvent } from "ag-grid-community";
import { User } from "@prisma/client";
import * as React from "react";


export default function SmartTable(
  { columnDefs, handleColSort, rowData }: { columnDefs: any, handleColSort: any, rowData: any }
) { // fixme: non any types

  const defaultColDef = {
    sortable: true,
    resizable: true
  };

  const onGridReady = (params: GridColumnsChangedEvent) => {
    let columns = params.columnApi.getColumns();
    if (!columns) return;
    columns.map(column => {
      column.addEventListener("sortChanged", handleColSort);
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