// AG GRID
import "ag-grid-community"; // can be ag-grid-enterprise but not clear if needed (and it's noisy in the console)
import { AgGridReact } from "ag-grid-react";
import type { ColumnEvent, GridColumnsChangedEvent } from "ag-grid-community";
import type { Column } from "ag-grid-community/dist/lib/entities/column";
import type { ColDef } from "ag-grid-community/dist/lib/entities/colDef";
import type { RowNode } from "ag-grid-community/dist/lib/entities/rowNode";
import { useEffect, useState } from "react";

export default function SmartTable(props: { entity: any, responseData: any, reloadData: any }) { // fixme: non any types
  const { entity, responseData, reloadData } = props;
  const [columnDefs, setColumnDefs] = useState<ColDef[] | undefined>(); // todo: types
  const [rowData, setRowData] = useState<RowNode[] | undefined>(); // todo: types

  const defaultColDef: ColDef = {
    sortable: true,
    resizable: true
  };

  const processResponse = (res: { data: object[] }) => {
    if (!res) return;
    const comparator = () => 0;
    if (res.data.length > 0) {
      const cols: ColDef[] = [];
      Object.keys(res.data[0]).map((col) => {
        cols.push({ field: col, comparator });
      });
      setColumnDefs(cols);
      setRowData(res.data as RowNode[]);
    }
  };

  useEffect(() => {
    processResponse(responseData);
  }, [responseData]);

  const handleColSort = (event: ColumnEvent, entity: any) => {
    if (!event.column) return;

    const direction = event.column.getSort();
    const sort_col = event.column.getColId();

    let desc = 0;
    let reload = false;

    if (direction === null && entity.sort_col !== null) {
      entity.sort_col = "";
      console.log("removing sort from ", sort_col);
      return false;
    }
    if (direction === "desc") desc = 1;

    if (entity.sort_col !== sort_col)  {
      entity.sort_col = sort_col;
      reload = true;
    }
    if (entity.sort_desc !== desc) {
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
    // todo: autoresize all columns to fit content (if < width, maybe size to fit?)
    const columns: Column[] | null = params.columnApi.getColumns();
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