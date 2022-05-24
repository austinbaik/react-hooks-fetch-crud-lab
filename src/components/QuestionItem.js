import React from "react";

function QuestionItem({ question, updatedStateDelete, updateAnswerChange }) {

  // console.log('question', question)

  const { id, prompt, answers, correctIndex } = question;

  // console.log('answers', answers)

  const options = answers.map((answer, index) => {
    return (
      <option key={index} value={index}>
        {answer}
      </option>
    )
  }
  )

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => updatedStateDelete(question));
  }

  function handleChange(e) {
    console.log('onchange', e.target.value)
    console.log('index:0', question);
    console.log('question.options', question.options)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: e.target.value,
      }),
    })
      .then((r) => r.json())
      .then((updatedAnswer) => updateAnswerChange(updatedAnswer))
      ;
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDelete} >Delete Question</button>
    </li>
  );
}

export default QuestionItem;
