// pages/learner/attend.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
}

const AttendMCQ = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<{ [key: string]: boolean[] }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    // Fetch questions from the API
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/question');
        console.log('Fetched questions:', response.data);
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleChange = (questionId: string, optionIndex: number) => {
    setResponses((prev) => {
      const newResponses = { ...prev };
      if (!newResponses[questionId]) {
        newResponses[questionId] = [];
      }
      newResponses[questionId][optionIndex] = !newResponses[questionId][optionIndex];
      return newResponses;
    });
  };

  const handleSubmit = async () => {
    try {
      // Calculate the number of correct answers
      let correctAnswers = 0;
      questions.forEach((question) => {
        const userResponses = responses[question.id] || [];
        const isCorrect = question.options.every((option, index) => option.isCorrect === (userResponses[index] || false));
        if (isCorrect) {
          correctAnswers += 1;
        }
      });
      setResult(correctAnswers);

      // Optionally send the responses to the server
      await axios.post('/api/submit', { responses });
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!questions.length) {
    return <div>No questions available</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div key={currentQuestion.id} style={{ marginBottom: '20px' }}>
        <h3>
          {currentQuestionIndex + 1}. <span dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
        </h3>
        {currentQuestion.options.map((option, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`${currentQuestion.id}-${index}`}
              name={`${currentQuestion.id}`}
              onChange={() => handleChange(currentQuestion.id, index)}
              checked={responses[currentQuestion.id]?.[index] || false}
            />
            <label htmlFor={`${currentQuestion.id}-${index}`}>{option.text}</label>
          </div>
        ))}
      </div>
      <div>
        {currentQuestionIndex > 0 && (
          <button type="button" onClick={handlePrevious}>Previous</button>
        )}
        {currentQuestionIndex < questions.length - 1 && (
          <button type="button" onClick={handleNext}>Next</button>
        )}
        {currentQuestionIndex === questions.length - 1 && (
          <button type="button" onClick={handleSubmit}>Submit</button>
        )}
      </div>
      {result !== null && (
        <div>
          <h3>You got {result} out of {questions.length} questions correct.</h3>
        </div>
      )}
    </div>
  );
};

export default AttendMCQ;
