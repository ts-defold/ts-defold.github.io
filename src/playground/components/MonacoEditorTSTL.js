import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useDebounceCallback } from '@react-hook/debounce';
import { monaco, getTheme, getOptions } from '../monaco';
import snippets from '../snippets';

export default function MonacoEditorTSTL({ dimensions, onChange }) {
  const ref = useRef(null);
  const [data, setData] = useState({});

  const updateModel = useDebounceCallback(async (model) => {
    const getWorker = await monaco.languages.typescript.getTypeScriptWorker();
    const client = await getWorker(model.uri);
    const semantics = await client.getSemanticDiagnostics(model.uri.toString());
    const syntactics = await client.getSyntacticDiagnostics(model.uri.toString());
    const diagnostics = [...semantics, ...syntactics];
    const { lua, sourceMap } = await client.getTranspileOutput(model.uri.toString());
    const source = model.getValue();
    setData({ source, lua, sourceMap, diagnostics });
  }, 250);

  useEffect(() => {
    if (ref.current) updateModel(ref.current.editor.getModel());
  }, [ref]);

  useEffect(() => {
    const lua = data.lua || '';

    // If the code is error free send it to the runtime
    if (data.diagnostics && data.diagnostics.length === 0) window.$_codepad_$.setCode(lua);

    // Send the trasnpiled code to the editor for display
    if (onChange) onChange(data.lua);
  }, [onChange, data]);

  const { width, height } = dimensions;
  const options = getOptions();

  return (
    <MonacoEditor
      height={height}
      width={width}
      theme={getTheme()}
      language="typescript"
      ref={ref}
      options={options}
      onChange={() => updateModel(ref.current.editor.getModel())}
      defaultValue={snippets[0] || ''}
    />
  );
};