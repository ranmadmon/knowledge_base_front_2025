/* eslint-disable */
'use strict';
import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Table from "./Table.jsx";
import Collapsible from "./Collapsable.jsx";
import Collapsable from "./Collapsable.jsx";


ListCard.propTypes = {
    perPage: PropTypes.number,
    currentPage: PropTypes.number,
    render: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired
};

function ListCard(props) {
    const [list, setList] = useState(props.list || []);
    const [perPage, setPerPage] = useState(props.perPage || 3);
    const [currentPg, setCurrentPg] = useState(props.currentPage || 1);


    useEffect(() => {
        setList(props.list)
    }, [props.list]);


    function renderList() {
        const startIndex = (currentPg - 1) * perPage;
        const endIdx = startIndex + perPage;
        const relevantPageList = list.slice(startIndex, endIdx);

        if (relevantPageList.length === 0) {
            return <p>No items to display.</p>;
        }

        return props.render(relevantPageList);
    }

    function nextPage() {
        if (currentPg * perPage < list.length) {
            setCurrentPg((prevPage) => prevPage + 1);
        }
    }

    function previousPage() {
        if (currentPg > 1) {
            setCurrentPg((prevPage) => prevPage - 1);
        }
    }

    const [columnDefs, setColumnDefs] = useState([
        {
            field: "name", filter: true, cellEditor: 'agLargeTextCellEditor',

            cellEditorPopup: true, editable: true, cellEditorParams: {
                rows: 15,
                cols: 60

            }
        },
        {field: "content", filter: true},
        {field: "course", filter: true},
        {field: "date", filter: true, cellDataType: 'date'}

    ]);

    const [rowData, setRowData] = useState([
        {make: "Tesla", name: "lol", content: 64950, date: new Date(2024, 2 - 1, 1)},
        {make: "Ford", name: "F-Series", content: 33850, date: new Date(2024, 2 - 1, 1)},
        {make: "Toyota", name: "Corolla", content: 29600, date: new Date(2024, 2 - 1, 1)},
        {make: "Mercedes", name: "EQA", content: 48890,date: new Date(2024, 2 - 1, 1)},
        {make: "Fiat", name: "500", content: 15774, date: new Date(2024, 2 - 1, 1)},
        {make: "Nissan", name: "Juke", content: 20675, date: new Date(2024, 2 - 1, 1)},
    ]);

    return (
        <nav className="ListCard">
            <h2 className="ListCard_header">{props.header}</h2>

            <Table column={ columnDefs} row={rowData}/>

            {/*<Collapsible title={"tasdasdst"}>t asdasdasd</Collapsible>*/}

            <div className={"buttons"}>
                <button onClick={previousPage} disabled={currentPg === 1}>
                    Previous Page
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPg * perPage >= list.length}
                >
                    Next Page
                </button>
            </div>
        </nav>
    );
}


export default ListCard;
