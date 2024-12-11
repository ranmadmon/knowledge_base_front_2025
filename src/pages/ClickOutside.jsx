import  {useRef, useEffect} from "react";
import PropTypes from "prop-types";

function useClickOutside(ref,action) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)){
                action
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [ref]);
}

export default function ClickOutside(props,action) {
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef,action)
    return (
        <div ref={wrapperRef}>{props.children}</div>
    )

}
ClickOutside.propTypes = {
    children: PropTypes.node.isRequired,
}