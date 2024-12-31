import "../CssFiles/Error.css"

export default function Error({errorMessage}){
    return(
        <div className={"error-component"}>
            <img className={"error-icon"} src={"src/Components/General/Error/icons/img.png"}/>
            <label className={"error-code"}> {errorMessage}</label>
        </div>
    )
}
