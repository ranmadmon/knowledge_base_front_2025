import React, { useEffect, useState, useRef } from "react";
import Cookies from "universal-cookie";
import "./MathematicalExercises.css";

const cookies = new Cookies();
const token = cookies.get("token");

const ExerciseComponent = () => {
    // המשתנים
    const [exerciseType, setExerciseType] = useState("");
    const [exercise, setExercise] = useState(null);
    const [exerciseLevel, setExerciseLevel] = useState(null);
    const [result, setResult] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState(null);
    const [error, setError] = useState(null);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [isFetchingExercise, setIsFetchingExercise] = useState(false);
    const [canvasVisible, setCanvasVisible] = useState(false);
    const [isAnswerChecked, setIsAnswerChecked] = useState(false);
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);

    useEffect(() => {
        if (token && exerciseType) {
            // הגדרת type: mathematics=1, verbal=2, variable=3
            const typeValue =
                exerciseType === "mathematics"
                    ? 1
                    : exerciseType === "verbal"
                        ? 2
                        : 3;
            fetchLevel(token, typeValue);
            fetchExercise(token, exerciseType);
        } else if (!token) {
            setError("Token not found. Please log in.");
        }
    }, [exerciseType]);

    const fetchLevel = async (token, type) => {
        try {
            const response = await fetch(
                `http://localhost:8080/get-level?token=${encodeURIComponent(
                    token
                )}&type=${type}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const level = await response.json();
            setLevel(level);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchExercise = async (token, type) => {
        setIsAnswerChecked(false); // איפוס מצב הכפתור "Next Exercise"
        setIsFetchingExercise(true);
        let endpoint = "";
        if (type === "mathematics") {
            endpoint = "generate-exercise";
        } else if (type === "verbal") {
            endpoint = "generate-exercise-from-template";
        } else if (type === "variable") {
            endpoint = "generate-variable-exercise";
        }
        try {
            const response = await fetch(
                `http://localhost:8080/${endpoint}?token=${encodeURIComponent(token)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setExercise(data.exercise);
            setResult(data.result);
            setExerciseLevel(data.level);
            setScore(data.score);
            setFeedback(null);
            setUserAnswer("");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsFetchingExercise(false);
        }
    };

    const handleCheckAnswer = async () => {
        const isCorrect = parseFloat(userAnswer) === result;
        const feedbackMessage = isCorrect
            ? "Correct! Well done!"
            : `Incorrect. The correct answer is ${result}.`;
        setFeedback(feedbackMessage);
        setIsAnswerChecked(true);

        // הגדרת type לפי סוג השאלה
        const typeValue =
            exerciseType === "mathematics" ? 1 : exerciseType === "verbal" ? 2 : 3;
        const endpoint = "send-answer";
        try {
            const response = await fetch(`http://localhost:8080/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    question: exercise,
                    correctAnswer: result,
                    answerGiven: userAnswer,
                    exerciseLevel,
                    token,
                    type: typeValue,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setScore(data.score);
            fetchLevel(token, typeValue);
            setUserAnswer("");
        } catch (err) {
            setError(err.message);
        }
    };

    // פונקציות לציור על קנבס (לא השתנו)
    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        isDrawing.current = true;
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    };

    const draw = (e) => {
        if (!isDrawing.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
    };

    const stopDrawing = () => {
        isDrawing.current = false;
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // פונקציה להצגת השאלה - במקרה של variable עם תבנית הכוללת שבר בתוך ביטוי ואחריו סימן שווה
    const renderExerciseContent = () => {
        if (exerciseType === "variable" && exercise) {
            // בדיקה האם יש סימן "=" בתרגיל
            if (exercise.includes("=")) {
                const parts = exercise.split("=");
                const leftPart = parts[0].trim(); // החלק השמאלי (שכולל את השבר)
                const rightPart = parts.slice(1).join("=").trim(); // כל מה שבא לאחר "="
                // אם החלק השמאלי כולל "/" – נניח שמדובר בשבר
                if (leftPart.includes("/")) {
                    const fractionParts = leftPart.split("/").map((p) => p.trim());
                    if (fractionParts.length === 2) {
                        return (
                            <>
                <span className="fraction">
                  <span className="numerator">{fractionParts[0]}</span>
                  <span className="denominator">{fractionParts[1]}</span>
                </span>
                                {" = " + rightPart}
                            </>
                        );
                    }
                }
                // אם אין "/" בחלק השמאלי – מציגים את כל הביטוי כרגיל
                return <>{leftPart} = {rightPart}</>;
            } else if (exercise.includes("/")) {
                // אם אין סימן "=" אך יש "/" – נעבד את כל הביטוי כשבר
                const parts = exercise.split("/").map((p) => p.trim());
                if (parts.length === 2) {
                    return (
                        <span className="fraction">
              <span className="numerator">{parts[0]}</span>
              <span className="denominator">{parts[1]}</span>
            </span>
                    );
                }
            }
            return <span>{exercise}</span>;
        }
        return <span>{exercise}</span>;
    };

    if (!exerciseType) {
        return (
            <div className="exercise-container">
                <h1 className="title">Choose Exercise Type</h1>
                <div className="buttons">
                    <img
                        src={"src/assets/math buttons/mathematics-button.png"}
                        alt="Mathematics"
                        onClick={() => setExerciseType("mathematics")}
                        className="btn-img"
                    />
                    <img
                        src={"src/assets/math buttons/verbal-button.png"}
                        alt="Verbal Exercises"
                        onClick={() => setExerciseType("verbal")}
                        className="btn-img"
                    />
                    <img
                        src={"src/assets/math buttons/variable-button.png"}
                        alt="Variable Exercises"
                        onClick={() => setExerciseType("variable")}
                        className="btn-img"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="exercise-container">
            <h1 className="title">
                {exerciseType === "mathematics"
                    ? "Mathematics Challenge"
                    : exerciseType === "verbal"
                        ? "Verbal Challenge"
                        : "Variable Challenge"}
            </h1>
            <div className="score-container">
                <p>
                    <strong>Score:</strong> {score}
                </p>
                <p>
                    <strong>Current Level:</strong> {level}
                </p>
            </div>
            {error && <p className="error">Error: {error}</p>}
            {exercise && (
                <div className="exercise-card">
                    <p className="exercise-text">
                        <strong>Exercise:</strong> {renderExerciseContent()}
                    </p>
                    <input
                        type="number"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Enter your answer"
                        className="exercise-input"
                    />
                    <div className="buttons">
                        <button
                            disabled={!userAnswer}
                            onClick={handleCheckAnswer}
                            className="btn check-btn"
                        >
                            Check Answer
                        </button>
                        <button
                            disabled={!isAnswerChecked}
                            onClick={() => fetchExercise(token, exerciseType)}
                            className="btn next-btn"
                        >
                            Next Exercise
                        </button>
                        <button
                            onClick={() => setCanvasVisible(!canvasVisible)}
                            className="btn notepad-btn"
                        >
                            {canvasVisible ? "Close Canvas" : "Open Canvas"}
                        </button>
                        <button
                            onClick={() => setExerciseType("")}
                            className="btn back-btn"
                        >
                            Back to Main
                        </button>
                    </div>
                    {feedback && (
                        <p
                            className={`feedback ${
                                feedback.includes("Correct") ? "correct" : "incorrect"
                            }`}
                        >
                            {feedback}
                        </p>
                    )}
                </div>
            )}
            {canvasVisible && (
                <div className="overlay">
                    <div className="canvas-container">
                        <canvas
                            ref={canvasRef}
                            width={500}
                            height={300}
                            className="drawing-canvas"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                        />
                        <button onClick={clearCanvas} className="btn clear-btn">
                            Clear Canvas
                        </button>
                        <button
                            onClick={() => setCanvasVisible(false)}
                            className="btn close-btn"
                        >
                            Close Canvas
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExerciseComponent;
