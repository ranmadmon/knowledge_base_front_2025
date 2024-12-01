
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

function ListCard(props) {
    const [list, setList] = useState(props.list || []);
    const [perPage, setPerPage] = useState(props.perPage || 3);
    const [currentPg, setCurrentPg] = useState(props.currentPage || 1);

    useEffect(()=>{
        setList(props.list)
    },[props.list]);


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

    return (
        <nav className="ListCard">
            <h2 className="ListCard_header">{props.header}</h2>
            <div>
                <input type="text" placeholder="Search" className="ListCardSearch" />
            </div>
            <ul>
                {renderList()}
            </ul>
            <div className={"buttons"}>
                <button  onClick={previousPage} disabled={currentPg === 1}>
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

ListCard.propTypes = {
    list: PropTypes.array.isRequired,
    perPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    render:PropTypes.func.isRequired,
    header:PropTypes.string.isRequired
};

export default ListCard;
