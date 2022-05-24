import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionDB, setQuestionDB] = useState([]);
  console.log("Qs", questionDB)

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((items) => setQuestionDB(items));
  }, []);

  function handleUpdate(items) {
    setQuestionDB([...questionDB, items])
  }

  function updateStateDelete(question) {
    const deleteFromDB = questionDB.filter(each => each.id !== question.id)
    setQuestionDB(deleteFromDB)
  }

  function updateAnswerChange(updatedAnswer) {
    console.log('patch', updatedAnswer)
    const patchedQuestionsDB = questionDB.map((question) => {
      if (question.id === updatedAnswer.id) {
        return updatedAnswer;
      } else {
        return question
      }
    })
    setQuestionDB(patchedQuestionsDB)
  }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm updateQtoDB={handleUpdate} /> : <QuestionList initializeQDB={questionDB} updatedStateDelete={updateStateDelete} updateAnswerChange={updateAnswerChange} />}
    </main>
  );
}

export default App;
