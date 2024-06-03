import { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles.css";
import { BackgroundBeams } from '@/components/ui/background-beams';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';

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
      let correctAnswers = 0;
      questions.forEach((question) => {
        const userResponses = responses[question.id] || [];
        const isCorrect = question.options.every((option, index) => option.isCorrect === (userResponses[index] || false));
        if (isCorrect) {
          correctAnswers += 1;
        }
      });
      setResult(correctAnswers);

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
    return <div className='h-[60rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-start antialiased'>
    <BackgroundBeams/>
    <p className='text-white mt-10 text-8xl font-extrabold m-4'>Loading !</p></div>;
  }

  if (error) {
    return <div className='h-[60rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-start antialiased'>
    <BackgroundBeams/>
    {error}</div>;
  }

  if (!questions.length) {
    return <div className='h-[60rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-start antialiased'>
      <BackgroundBeams/>
      <p className='text-white mt-10 text-8xl font-extrabold m-4'>No questions available</p></div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className='h-[60rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-start antialiased'>
      <BackgroundBeams/>
      <div className=" text-orange-600 text-3xl font-semibold font-serif antialiased absolute top-0 right-[45%] m-4"><h1 className="" style={{textShadow: "#FC0 1px 0 10px"}}>IPROPEL</h1></div>
      <Card className='relative max-w-[60%] min-w-[40%] top-[10rem]'>
        <CardContent>
          <div key={currentQuestion.id} style={{ marginBottom: '20px' }}>
            <h3 className=' text-3xl flex font-medium text-white'>
            {currentQuestionIndex + 1}. <span dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
            </h3>
          {currentQuestion.options.map((option, index) => (
            <div className='text-xl font-medium text-orange-100' key={index}>
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
        </CardContent>
      </Card>
      
      <div className='top-[10rem] relative'>
        {currentQuestionIndex > 0 && (
          <Button className='rounded-lg relative text-white font-medium m-4 outline outline-offset-2 outline-cyan-500 hover:bg-slate-200 hover:text-accent-foreground'  onClick={handlePrevious}>Previous</Button>
        )}
        {currentQuestionIndex < questions.length - 1 && (
          <Button  className='rounded-lg relative text-white font-medium m-4 outline outline-offset-2 outline-cyan-500 hover:bg-white hover:text-accent-foreground'  onClick={handleNext}>Next</Button>
        )}
        {currentQuestionIndex === questions.length - 1 && (
          <Button className='rounded-lg relative text-white font-medium m-4 outline outline-offset-2 outline-pink-500 hover:bg-orange-100 hover:text-accent-foreground'  onClick={handleSubmit}>Submit</Button>
        )}
      </div>
      {result !== null && (
        <div className='relative top-[11rem]'>
          <h3 className='text-3xl font-medium text-white '>Your response has been recorded.</h3>
          <h3 className='text-3xl font-medium text-white '>You got {result} out of {questions.length} questions correct.</h3>
        </div>
      )}
    </div>
  );
};

export default AttendMCQ;
