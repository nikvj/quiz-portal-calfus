import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(false);

  useEffect(() => {
    const fetchQuestions = async (retryCount = 0) => {
      const url = "https://opentdb.com/api.php?amount=10&difficulty=medium";
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          setQuestions(response.data.results);
        } else if (response.status === 429 && retryCount < 3) {
          setTimeout(() => fetchQuestions(retryCount + 1), 1000 * (2 ** retryCount));
        } else {
          setError("Failed to fetch questions.");
        }
      } catch (error) {
        if (retryCount < 3) {
          setTimeout(() => fetchQuestions(retryCount + 1), 1000 * (2 ** retryCount));
        } else {
          setError("Failed to fetch questions.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) return <div className='loading'>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!questions.length) return null;

  const { question, incorrect_answers, correct_answer } = questions[activeQuestion];
  const allAnswers = [...incorrect_answers, correct_answer].sort();

  const handleNextQuestion = () => {
    const isAnswerCorrect = selectedAnswerIndex !== null && allAnswers[selectedAnswerIndex] === correct_answer;
    setResult((prevResult) => ({
      ...prevResult,
      score: isAnswerCorrect ? prevResult.score + 5 : prevResult.score,
      correctAnswers: isAnswerCorrect ? prevResult.correctAnswers + 1 : prevResult.correctAnswers,
      wrongAnswers: isAnswerCorrect ? prevResult.wrongAnswers : prevResult.wrongAnswers + 1,
    }));

    setFeedback(true);

    setTimeout(() => {
      setFeedback(false);
      setSelectedAnswerIndex(null);

      if (activeQuestion < questions.length - 1) {
        setActiveQuestion((prevActiveQuestion) => prevActiveQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleRefreshClick = () => {
    window.location.reload();
};

  const handleAnswerSelected = (index) => {
    setSelectedAnswerIndex(index);
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div className='heading'>
          <div>
            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-question">/{addLeadingZero(questions.length)}</span>
          </div>
          <div>
          <span className="score">Score: {result.score}</span>
          </div>
          </div>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <ul>
            {allAnswers.map((answer, index) => (
              <li
                onClick={() => handleAnswerSelected(index)}
                key={answer}
                className={
                  feedback
                    ? index === selectedAnswerIndex
                      ? allAnswers[selectedAnswerIndex] === correct_answer
                        ? 'correct-answer'
                        : 'wrong-answer'
                      : index === allAnswers.indexOf(correct_answer)
                      ? 'correct-answer'
                      : ''
                    : selectedAnswerIndex === index
                    ? 'selected-answer'
                    : ''
                }
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            ))}
          </ul>
          <div className="flex-right">
            <button onClick={handleNextQuestion} disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="table-container">
          <h3>Result</h3>
          <table className="table">
                <thead>
                    <tr>
                        <th>Total Questions</th>
                        <th>Total Score</th>
                        <th>Correct Answers</th>
                        <th>Wrong Answers</th>
                    </tr>
                </thead>
                <tbody>
                            <td>{questions.length}</td>
                            <td>{result.score}</td>
                            <td>{result.correctAnswers}</td>
                            <td>{result.wrongAnswers}</td>
                </tbody>
            </table>
          <div className='flex-right'>
          <button onClick={handleRefreshClick}>Retry</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;