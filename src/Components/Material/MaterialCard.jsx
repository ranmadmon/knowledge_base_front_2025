import React from 'react';
import PropTypes from "prop-types";
import {Alert, Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {COURSE_URL, MATERIAL_PAGE_URL} from "../../Utils/Constants.jsx";

MaterialCard.propTypes = {
    material: PropTypes.array
};

function MaterialCard({material},{index},{courses}) {
    const navigate = useNavigate();
    return (
        <div ref={index === courses.length - 1 ? ref : null} data-material-id={material.id} className={"card-container"}>
            {material.length > 0 &&
                material.map((item, index) => {
                    return (
                        <div onClick={() => navigate(COURSE_URL + item.courseEntity.id + MATERIAL_PAGE_URL + +item.id)}
                             className={"card"} key={index}>
                            <div className="card-content-text">
                                <text className="text1">Title: {item.title}</text>
                                <text className="text2">Description: {item.description}</text>
                                <text>content: {item.content} </text>
                                <text>By: {item.userEntity.username}</text>
                            </div>
                        </div>
                    );
                })
            }

            {material.length === 0 &&
                <Box width={"100%"} display="flex" flexDirection="row" alignItems={"center"} justifyContent={"center"}>
                    <Alert severity={"info"}>
                        No material found, be the first to upload!
                    </Alert>
                </Box>}


        </div>
    );
}

export default MaterialCard;
