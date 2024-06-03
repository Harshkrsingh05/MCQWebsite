import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { IncomingForm, Files } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const form = new IncomingForm({
      uploadDir: uploadDir,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files: Files) => {
      if (err) {
        console.error('Error parsing the files', err);
        return res.status(500).json({ message: 'Error parsing the files' });
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      if (file) {
        const url = `/uploads/${file.newFilename}`;
        return res.status(200).json({ url });
      } else {
        return res.status(400).json({ message: 'File upload failed' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
