import React, { useState } from "react";

function QuestionItem(props) {
  const { id, prompt, answers, correctIndex } = props.question;
  const [formData, setFormData] = useState({
    prompt,
    answers,
    correctIndex,
  });

  function handleAnswerChange(event) {
    const index = Number(event.target.name.slice(-1));
    const updatedAnswers = formData.answers.map((answer, i) => {
      return i === index ? event.target.value : answer;
    });
    setFormData({ ...formData, answers: updatedAnswers });
    updateQuestion({ answers: updatedAnswers });
  }

  function handleCorrectIndexChange(event) {
    const correctIndex = Number(event.target.value);
    setFormData({ ...formData, correctIndex });
    updateQuestion({ correctIndex });
  }

  function updateQuestion(updateData) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData({ ...formData, ...data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <li>
      <h3>{formData.prompt}</h3>
      <ol type="A">
        {formData.answers.map((answer, i) => (
          <li key={i}>
            <label>
              <input
                type="radio"
                value={i}
                checked={i === formData.correctIndex}
                onChange={handleCorrectIndexChange}
              />
              <input
                type="text"
                name={`answer${i}`}
                value={answer}
                onChange={handleAnswerChange}
              />
            </label>
          </li>
        ))}
      </ol>
    </li>
  );
}

export default QuestionItem;
