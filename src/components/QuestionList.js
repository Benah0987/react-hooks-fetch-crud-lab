import React, { useState, useEffect } from "react";

function QuestionList(props) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error(error));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      setQuestions(questions.filter(question => question.id !== id));
      // Displaying a success message
      swal({
        title: "Success!",
        text: `Question '${data.prompt}' has been deleted.`,
        icon: "success",
        button: "OK",
      });
    })
    .catch(error => {
      // Handle any errors
    });
  }

  return (
    <section>
      <h1>Question List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Prompt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.prompt}</td>
              <td>
                <button onClick={() => handleDelete(question.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default QuestionList;
