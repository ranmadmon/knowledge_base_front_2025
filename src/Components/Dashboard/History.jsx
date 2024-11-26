import {useEffect} from "react";

function History() {
    const historyList = ['history','math'];//todo : make them clickable (that it will lead to the same course)

    useEffect(() => {
        const fetchData = async () => {

        };
        fetchData();
    }, []);

    return (
        <div className="history">
            {historyList.length === 0 ? (
                <div>No history available.</div>
            ) : (
                <div>
                    <h5>Your recent visits:</h5>
                    <ul>
                        {historyList.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default History;
