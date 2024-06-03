import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

// need to add Database later
let questions: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
  
    return res.status(200).json(questions);
  } else if (req.method === 'POST') {
    try {
      const newQuestion = req.body;
      console.log('Received question data:', newQuestion);

      if (!newQuestion || !newQuestion.question || !newQuestion.options || newQuestion.options.length === 0) {
        console.log('Invalid question data');
        return res.status(400).json({ message: 'Invalid question data' });
      }

      newQuestion.id = uuidv4();
      console.log('Generated ID:', newQuestion.id);

      questions.push(newQuestion);
      console.log('Updated questions list:', questions);

      return res.status(201).json(newQuestion);
    } catch (error) {
      console.error('Error adding question:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {

    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
