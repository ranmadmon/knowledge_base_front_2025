import React, {useMemo} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {COURSE_URL} from "../../Utils/Constants.jsx";
import {Box} from "@mui/material";

Table.propTypes = {
    row: PropTypes.array,
    column: PropTypes.array,
};

function Table(props) {
    const navigate = useNavigate();
    const defaultColDef = useMemo(() => {
        return {
            filter: "agTextColumnFilter",
            floatingFilter: true,
        };
    }, []);

    const onRowClicked = (params) => {
        const  id = params?.data.courseEntity?.id
        navigate(COURSE_URL+id,{replace:true});
    }


    const dataTypeDefinitions = useMemo(() => {
        return {
            dateString: {
                baseDataType: "dateString",
                extendsDataType: "dateString",
                dateParser: (value) => {
                    console.log(value)
                    value.replace("T", " ")
                }

            },
        };
    }, []);

    return (
        <Box className="ag-theme-alpine"  sx={{ height: '500px', width: '100%' }}   >
            <AgGridReact
                onRowClicked={onRowClicked}
                rowData={props.row}
                columnDefs={props.column}
                defaultColDef={defaultColDef}
                dataTypeDefinitions={dataTypeDefinitions}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 25, 50]}
            />
        </Box>
    );
}
export default Table;