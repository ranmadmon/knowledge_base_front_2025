import React, {useState, useEffect, useMemo} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PropTypes from "prop-types";
import Collapsable from "./Collapsable.jsx";

Table.propTypes = {
    row: PropTypes.array,
    column: PropTypes.array,

};


function Table(props) {
    const [rowData, setRowData] = useState(props.row);
    const [columnDefs, setColumnDefs] = useState(props.column);
    const defaultColDef = useMemo(() => {
        return {
            filter: "agTextColumnFilter",
            floatingFilter: true,
        };
    }, []);


    return (
        <div className="ag-theme-alpine" style={{height: '400px', width: '100%'}}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                // rowSelection={rowSelection}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 25, 50]}
            />
        </div>
    );
}

export default Table;