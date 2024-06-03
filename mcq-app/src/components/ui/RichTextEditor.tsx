import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }); // Dynamically import ReactQuill

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<any>(null); // Create a ref to Quill editor

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.root.setAttribute('spellcheck', 'false'); // Disable spellcheck
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'script',
  ];

  // const insertLink = () => {
  //   const url = window.prompt('Enter the URL of the link:');
  //   if (url) {
  //     const quill = quillRef.current.getEditor();
  //     const range = quill.getSelection();
  //     quill.format('link', url, 'user');
  //   }
  // };
  return (
    <div className='relative bg-orange-100'>

    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      />
      </div>
  );
};

export default RichTextEditor;
