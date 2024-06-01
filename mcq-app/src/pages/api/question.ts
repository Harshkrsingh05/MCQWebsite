// pages/api/question.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

// Sample in-memory storage for questions
let questions: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return all questions
    return res.status(200).json(questions);
  } else if (req.method === 'POST') {
    try {
      const newQuestion = req.body;
      console.log('Received question data:', newQuestion);

      // Validate the incoming data
      if (!newQuestion || !newQuestion.question || !newQuestion.options || newQuestion.options.length === 0) {
        console.log('Invalid question data');
        return res.status(400).json({ message: 'Invalid question data' });
      }

      // Add a unique ID to the question
      newQuestion.id = uuidv4();
      console.log('Generated ID:', newQuestion.id);

      // Add the new question to the list
      questions.push(newQuestion);
      console.log('Updated questions list:', questions);

      // Respond with the newly added question
      return res.status(201).json(newQuestion);
    } catch (error) {
      console.error('Error adding question:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Handle unsupported methods
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
