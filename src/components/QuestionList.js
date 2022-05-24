import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList({ initializeQDB, updatedStateDelete, updateAnswerChange}) {

console.log(initializeQDB);
  
  const qsForForm = initializeQDB.map(question => {
    return (
      <QuestionItem key={question.id} question={question} updatedStateDelete={updatedStateDelete} updateAnswerChange={updateAnswerChange}/>
    )
  }
  )


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{qsForForm} </ul>
    </section>
  );
}

export default QuestionList;
