import React, {useState} from "react";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import PropTypes from "prop-types";
import "../../App.css";


const Collapsible = ({open, children, title}) => {
    const [isOpen, setIsOpen] = useState(open);

    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };


    return (
        <>
            <div onClick={handleFilterOpening}
                 className="my-collapse"
                 style={{
                     minWidth: "100%"
                     , borderBottom: "1px dashed lightgray",
                     paddingBottom: "10px"
                 }}>
                <div>
                    <div style={{
                        width: "80%",
                        display: "inline-block",
                        justifyContent: "space-around",
                        overflow: "hidden"

                    }}>
                        <h2 className="font-weight-bold">
                            {title} {!isOpen ? (
                            <KeyboardArrowUpRoundedIcon/>
                        ) : (
                            <KeyboardArrowDownRoundedIcon/>
                        )}</h2>
                    </div>
                </div>

                <div>
                    {isOpen && <div>{children}</div>}
                </div>
            </div>
        </>
    );
};

Collapsible.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.string,
    title: PropTypes.string
};
export default Collapsible;

