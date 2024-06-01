// react-quill.d.ts
declare module 'react-quill' {
    import * as React from 'react';
  
    interface QuillDelta {
      ops: any[];
    }
  
    interface QuillOptions {
      theme?: string;
      formats?: string[];
      modules?: any;
      bounds?: string | HTMLElement;
      readOnly?: boolean;
      placeholder?: string;
      scrollingContainer?: string | HTMLElement;
      preserveWhitespace?: boolean;
    }
  
    interface ReactQuillProps {
      value?: string | QuillDelta;
      defaultValue?: string | QuillDelta;
      placeholder?: string;
      readOnly?: boolean;
      theme?: string;
      onChange?: (content: string, delta: QuillDelta, source: string, editor: any) => void;
      onChangeSelection?: (selection: any, source: string, editor: any) => void;
      modules?: any;
      formats?: string[];
      bounds?: string | HTMLElement;
      scrollingContainer?: string | HTMLElement;
      preserveWhitespace?: boolean;
      children?: React.ReactNode;
    }
  
    const ReactQuill: React.ComponentType<ReactQuillProps>;
    export default ReactQuill;
  }
  