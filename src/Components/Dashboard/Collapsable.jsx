import React, {useState} from "react";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import PropTypes from "prop-types";
import "../../App.css";
import formatDatetime from "../../Utils/formatDatetime.js";


const Collapsible = ({open, children, title, date, course}) => {
    const [isOpen, setIsOpen] = useState(open);
    course = (course || {
        name: ""
    });


    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };


    return (
        <>
            <div onClick={handleFilterOpening}
                 className="my-collapse"
                 style={{
                     minWidth: "100%",
                     borderBottom: "1px dashed lightgray",
                     paddingBottom: "10px",
                     textAlign: "left",

                 }}>
                <div>
                    <div >
                        <h2 className="font-weight-bold">
                            {title}
                            <div style={{
                                marginLeft:"0.5rem",
                                fontSize: "0.75rem",
                                display: "inline-block",
                                justifyContent: "start",
                                overflow: "hidden"
                            }}>
                                {"posted by:" + course.name + " " + formatDatetime(date)}
                            </div>
                            {!isOpen ? (
                                <KeyboardArrowUpRoundedIcon/>
                            ) : (
                                <KeyboardArrowDownRoundedIcon/>
                            )}</h2>
                    </div>
                </div>

                <div>
                    {isOpen && <div style={{
                        textAlign: "left",
                    }}>
                        <div style={{fontSize: "0.75rem"}}></div>
                        {children}
                    </div>}
                </div>
            </div>
        </>
    );
};

Collapsible.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    course: PropTypes.object
};
export default Collapsible;

