// this is wrapper to the Editor component from the library `@monaco-editor/react`

import Editor, { BeforeMount } from '@monaco-editor/react';
import { memo, MutableRefObject } from 'react';

type MonacoEditorProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  codeEditor: MutableRefObject<any>;
  content: string;
  codeLanguage: string;
};

const editor = ({ codeEditor, content, codeLanguage }: MonacoEditorProps) => {
  const handleEditorBeforeMount: BeforeMount = (monaco) => {
    // definee custom theme
    monaco.editor.defineTheme('lcl-theme', {
      base: 'vs',
      inherit: true,
      rules: [{ foreground: '#52525b' }],
      colors: {
        'editor.foreground': '#52525b',
        'editorLineNumber.foreground': '#d4d4d8',
        'editor.lineHighlightBackground': '#00000000',
        'editor.lineHighlightBorder': '#00000000'
      }
    });
  };

  return (
    <Editor
      height="70vh"
      // defaultLanguage="text"
      language={codeLanguage}
      defaultValue={content}
      beforeMount={handleEditorBeforeMount}
      onMount={(editor) => {
        // pass ref
        codeEditor.current = editor;
      }}
      wrapperClassName="border border-secondary-200 py-3 rounded-md"
      options={{
        minimap: {
          enabled: false
        }
      }}
      theme="lcl-theme"
    />
  );
};

export const MonacoEditor = memo(editor);
