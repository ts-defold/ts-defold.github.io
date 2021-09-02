import React, { useEffect, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { getTheme, getOptions } from '../monaco';

export default function MonacoEditorLua({ dimensions, src }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && src) ref.current.editor.getModel().setValue(src);
  }, [ref, src]);

  const { width, height } = dimensions;
  const options = getOptions();

  return (
    <MonacoEditor
      height={height}
      width={width}
      theme={getTheme()}
      language="lua"
      options={options}
      ref={ref}
    />
  );
};
