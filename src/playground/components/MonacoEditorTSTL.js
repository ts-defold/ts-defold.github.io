import React, { useEffect, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useDebounceCallback } from '@react-hook/debounce';
import { monaco, getTheme, getOptions } from '../monaco';

export default function MonacoEditorTSTL({ dimensions, src, onChange }) {
  const ref = useRef(null);

  const updateModel = useDebounceCallback(async (model) => {
    const getWorker = await monaco.languages.typescript.getTypeScriptWorker();
    const client = await getWorker(model.uri);
    const semantics = await client.getSemanticDiagnostics(model.uri.toString());
    const syntactics = await client.getSyntacticDiagnostics(model.uri.toString());
    const diagnostics = [...semantics, ...syntactics];
    const { lua, sourceMap } = await client.getTranspileOutput(model.uri.toString());
    const source = model.getValue();
    if (onChange) onChange({ src: source, lua, diagnostics, sourceMap });
  }, 250);

  useEffect(() => {
    if (ref.current) {
      const model = ref.current.editor.getModel();
      if (src) model.setValue(src);
      updateModel(model);
    }
  }, [ref, src, updateModel]);

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
    />
  );
};