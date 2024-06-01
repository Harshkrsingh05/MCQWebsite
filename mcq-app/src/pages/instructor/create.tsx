// pages/instructor/create.tsx
"use client";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import axios from 'axios';
import RichTextEditor from '../../components/ui/RichTextEditor';
import { useState, useEffect } from 'react';

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
    <div className="max-w-lg mx-auto">
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
          <label className="block text-gray-700">Question:</label>
          <Controller
            name="question"
            control={control}
            render={({ field }) => (
              <RichTextEditor value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        <div className="mb-4">
          {fields.map((field, index) => (
            <div key={field.id} className="mb-2 flex items-center">
              <input
                {...register(`options.${index}.text` as const)}
                placeholder={`Option ${index + 1}`}
                className="border p-2 mr-2 flex-1"
              />
              <input
                type="checkbox"
                {...register(`options.${index}.isCorrect` as const)}
                className="mr-2"
              />
              <button type="button" onClick={() => remove(index)} className="text-red-500">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({ text: '', isCorrect: false })} className="text-blue-500">
            Add Option
          </button>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateMCQ;
