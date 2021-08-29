import React, { useEffect, useRef, useState } from 'react';
import { useDebounceCallback } from '@react-hook/debounce';

export default function Monaco() {
  const ref = useRef(null);
  const [, setData] = useState({});
  const [monacoEditor, setMonacoEditor] = useState(null);

  const updateModel = useDebounceCallback(async (model) => {
      const getWorker = await monacoEditor.monaco.languages.typescript.getTypeScriptWorker();
      const client = (await getWorker(model.uri));
      const { lua, sourceMap } = await client.getTranspileOutput(model.uri.toString());
      const source = model.getValue();
      setData({ source, lua, sourceMap, results: [] });
  }, 250);

  useEffect(() => {
    if (ref.current) updateModel(ref.current.editor.getModel());
  }, [ref]);

  useEffect(() => {
    import("./monaco").then(({ monaco, getTheme }) => {
      import('react-monaco-editor').then(({ default: MonacoEditor }) => {
        setMonacoEditor({ MonacoEditor, monaco, getTheme });
      });
    });
  }, []);

  const options = {
    minimap: { enabled: false },
    automaticLayout: true,
    scrollbar: { useShadows: false },
    fixedOverflowWidgets: true,
  };

  return (
    <div style={{ marginTop: '10px' }}>
      {monacoEditor && (
        <monacoEditor.MonacoEditor
          height="100vh"
          theme={monacoEditor.getTheme()}
          language="typescript"
          options={options}
          onChange={() => updateModel(ref.current.editor.getModel())}
          ref={ref}
          defaultValue={`
type Props = {
  value: string;
};

function test(this:Props) {
  print(this.value);
}
        `}      
        />
    )}
    </div>
  );
}
