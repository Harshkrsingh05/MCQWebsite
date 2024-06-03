// pages/instructor/create.tsx
"use client";
import "../styles.css";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import axios from 'axios';
import RichTextEditor from '../../components/ui/RichTextEditor';
import { useState, useEffect } from 'react';
import { BackgroundBeams } from "../../components/ui/background-beams";
interface Option {
  text: string;
  isCorrect: boolean;
}

interface MCQFormValues {
  question: string;
  options: Option[];
}

const CreateMCQ = () => {
  const { control, register, handleSubmit, reset } = useForm<MCQFormValues>({
    defaultValues: {
      question: '',
      options: [{ text: '', isCorrect: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | '' }>({ message: '', type: '' });

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        setAlert({ message: '', type: '' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const onSubmit = async (data: MCQFormValues) => {
    try {
      await axios.post('/api/question', data);
      setAlert({ message: 'Question submitted successfully!', type: 'success' });
      reset(); // Reset form after successful submission
    } catch (error) {
      setAlert({ message: 'Error submitting question. Please try again.', type: 'error' });
      console.error('Error submitting form:', error);
    }
  };


  return (
    <>
    <div className="h-[60rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-start antialiased" >
      <BackgroundBeams />
      <div className="text-orange-600 text-3xl font-semibold font-serif antialiased absolute top-0 right-[45%] m-4"><h1 className="" style={{textShadow: "#FC0 1px 0 10px"}}>IPROPEL</h1></div>
    <div className="min-w-[40%] max-w-[60%] mx-auto mt-[9rem]">
      {alert.message && (
        <div
        className={`p-4 mb-4 text-sm text-white ${
          alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } rounded-lg`}
        role="alert"
        >
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-white">Question:</label>
          <Controller
            name="question"
            control={control}
            render={({ field }) => (
              <RichTextEditor  value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        <div className="mb-4">
          {fields.map((field, index) => (
            <div key={field.id} className="mb-2 flex items-center">
              <input
                {...register(`options.${index}.text` as const)}
                placeholder={`Option ${index + 1}`}
                className="relative border p-2 mr-2 flex-1  bg-orange-100"
              />
              <input
                type="checkbox"
                {...register(`options.${index}.isCorrect` as const)}
                className="mr-2 relative"
              />
              <button type="button" onClick={() => remove(index)} className="text-red-500 relative">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({ text: '', isCorrect: false })} className="text-blue-500 relative">
            Add Option
          </button>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-sky-700 text-white p-2 rounded relative">
          Submit
        </button>
      </form>
    </div>
    </div>
    </>
  );
};

export default CreateMCQ;
