import React from 'react';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function Search() {
    return (
        <div className={"upper-container"}>
            <div className={"search"}>
                <h1>Search the knowledge base</h1>
                <div className={"search-bar-container"}>
                    <input className={"search-input"} type="search" placeholder="Search"/>
                    <button className="search-button" type="submit" onClick={() => {
                        freeSearch()
                    }}>
                        <SearchRoundedIcon fontSize={"large"}/>
                    </button>
                </div>
            </div>
        </div>
    );
}

function freeSearch(){

}
export default Search;