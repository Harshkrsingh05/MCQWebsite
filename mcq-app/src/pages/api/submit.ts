import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { responses } = req.body;
    console.log('Received responses:', responses);
    // from here save them to a database
    return res.status(200).json({ message: 'Responses received successfully' });
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
