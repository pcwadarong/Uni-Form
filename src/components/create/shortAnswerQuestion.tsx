const ShortAnswerQuestion = ({ question, isEditing, onChange }) => {
  const handleAnswerChange = (e) => {
    const updatedQuestion = { ...question, answer: e.target.value };
    onChange(updatedQuestion);
  };

  if (isEditing) {
    return (
      <div>
        <input
          type="text"
          value={question.question}
          onChange={(e) => onChange({ ...question, question: e.target.value })}
        />
      </div>
    );
  }

  return (
    <div>
      <p>{question.question}</p>
      <input type="text" value={question.answer} onChange={handleAnswerChange} />
    </div>
  );
};

export default ShortAnswerQuestion;
