import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useDebounceCallback } from '@react-hook/debounce';
import { monaco, getTheme } from "./monaco";

export default function Monaco() {
  const ref = useRef(null);
  const [, setData] = useState({});

  const updateModel = useDebounceCallback(async (model) => {
      const getWorker = await monaco.languages.typescript.getTypeScriptWorker();
      const client = (await getWorker(model.uri));
      const { lua, sourceMap } = await client.getTranspileOutput(model.uri.toString());
      const source = model.getValue();
      setData({ source, lua, sourceMap, results: [] });
  }, 250);

  useEffect(() => {
    if (ref.current) updateModel(ref.current.editor.getModel());
  }, [ref]);

  

  const options = {
    minimap: { enabled: false },
    automaticLayout: true,
    scrollbar: { useShadows: false },
    fixedOverflowWidgets: true,
  };

  return (
    <div style={{ marginTop: '10px' }}>
        <MonacoEditor
          height="100vh"
          theme={getTheme()}
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
    </div>
  );
}
