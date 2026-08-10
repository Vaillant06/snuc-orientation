import { useState } from 'react';

function shuffle(arr) {
  const a = [...arr];

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

function pickQuestions(allQuestions) {
  return shuffle(allQuestions).slice(0, 5);
}

function Questionnaire({ questions, moduleId, onPass }) {
  const [quizQuestions, setQuizQuestions] = useState(() => pickQuestions(questions));
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState({});
  const [retryCount, setRetryCount] = useState(0);
  const [passed, setPassed] = useState(false);

  const allAnswered = Object.keys(selected).length === 5;
  const score = Object.values(results).filter((r) => r === 'correct').length;

  function handleSelect(qId, optIndex) {
    if (submitted) return;
    setSelected((prev) => ({ ...prev, [qId]: optIndex }));
  }

  function handleSubmit() {
    const res = {};
    let allCorrect = true;
    quizQuestions.forEach((q) => {
      const correct = selected[q.id] === q.correctAnswer;
      res[q.id] = correct ? 'correct' : 'wrong';
      if (!correct) allCorrect = false;
    })
    setResults(res);
    setSubmitted(true);

    if (allCorrect) {
      setPassed(true);
      onPass(retryCount);
    }
  }

  function handleRetry() {
    setQuizQuestions(pickQuestions(questions));
    setSelected({});
    setSubmitted(false);
    setResults({});
    setRetryCount((c) => c + 1);
  }

  function optionClass(q, optIndex) {
    if (!submitted) {
      return selected[q.id] === optIndex ? 'bg-primary-subtle rounded' : '';
    }
    const isSelected = selected[q.id] === optIndex;
    const isCorrectAnswer = optIndex === q.correctAnswer;

    if (isSelected && isCorrectAnswer) return 'bg-success-subtle rounded text-success fw-semibold';
    if (isSelected && !isCorrectAnswer) return 'bg-danger-subtle rounded text-danger fw-semibold';
    return ''
  }

  const cardBorder = (qId) => {
    if (!submitted) return 'border-primary';
    return results[qId] === 'correct' ? 'border-success' : 'border-danger';
  }

  return (
    <div className="pb-4">
      <h4 className="text-primary fw-bold mb-3">Questionnaire</h4>

      {quizQuestions.map((q, idx) => (
        <div key={q.id} className={`card mb-3 border-2 ${cardBorder(q.id)}`}>
          <div className="card-body">
            <p className="fw-semibold mb-3">{idx + 1}. {q.question}</p>
            {q.options.map((opt, oi) => (
              <div
                key={oi}
                className={`form-check py-2 px-3 mb-1 ${optionClass(q, oi)}`}
                onClick={() => handleSelect(q.id, oi)}
                style={{ cursor: submitted ? 'default' : 'pointer' }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name={`q-${q.id}`}
                  checked={selected[q.id] === oi}
                  onChange={() => handleSelect(q.id, oi)}
                  disabled={submitted}
                />
                <label className="form-check-label ms-1">{opt}</label>
              </div>
            ))}

          </div>
        </div>
      ))}

      {!submitted && (
        <button
          className="btn btn-primary w-100 mt-2"
          disabled={!allAnswered}
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}

      {submitted && !passed && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between mt-3">
          <span><i className="bi bi-x-circle me-2"></i>You scored {score}/5. Try again!</span>
          <button className="btn btn-outline-danger btn-sm" onClick={handleRetry}>
            <i className="bi bi-arrow-counterclockwise me-1"></i>Retry
          </button>
        </div>
      )}

      {passed && (
      <div className="alert alert-success mt-3">
        <i className="bi bi-check-circle-fill me-2"></i>
        {moduleId === 4 ? (
      <>
        <h5>Congratulations!</h5>
        <p className="mb-0">
          You have successfully completed the SNUC Orientation Programme.
        </p>
      </>
      ) : (
        <p className="mb-0">
          Congratulations! You passed Module {moduleId}!
        </p>
      )}
        </div>
      )}
    </div>
  )
}

export default Questionnaire;
