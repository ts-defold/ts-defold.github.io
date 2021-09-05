import React, { useEffect, useRef } from 'react';

export default function DefoldLog({ log }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current && log) ref.current.innerHTML = log;
  }, [ref, log]);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#111',
        color: '#fff',
        fontFamily: 'monospace',
        fontSize: '12px',
        padding: ' 4px 8px',
      }}
    ></div>
  );
};