import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {Button, Card, Stack, Typography} from "@mui/material";


ListCard.propTypes = {
    perPage: PropTypes.number,
    currentPage: PropTypes.number,
    render: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired,
    list: PropTypes.array

};

function ListCard(props) {
    const [list, setList] = useState(props.list === undefined ? [] : props.list);
    const [perPage, setPerPage] = useState(props.perPage || 3);
    const [currentPg, setCurrentPg] = useState(props.currentPage || 1);


    useEffect(() => {
        setList(props.list)
    }, [props.list]);


    function renderList() {
        const startIndex = (currentPg - 1) * perPage;
        const endIndex = startIndex + perPage
        if (list.length === 0) {
            return <p>No items to display.</p>;
        }
        const relevantPageList = list.slice(startIndex, endIndex)
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

    return (
        <Card  elevation={6}>
            <Typography  margin={2} variant={"h4"}>
                {props.header}
            </Typography>

            {renderList()}

            <Stack sx={{flex: 1, m: 2}} justifyContent="center" alignItems="center" direction="row" spacing={2}>
                <Button
                    onClick={previousPage}
                    variant="contained"
                    disabled={currentPg === 1}
                >
                    Previous Page
                </Button>
                <Button
                    variant="contained"
                    onClick={nextPage}
                    disabled={currentPg * perPage >= list.length}
                >
                    Next Page
                </Button>
            </Stack>
        </Card>
    );
}


export default ListCard;
