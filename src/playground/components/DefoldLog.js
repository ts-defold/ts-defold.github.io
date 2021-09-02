import React, { useEffect, useRef } from 'react';

export default function DefoldLog() {
  const ref = useRef();

  useEffect(() => {
    const logInterval = setInterval(() => {
      if (window.$_codepad_$) {
        window.$_codepad_$.onLog = (log) => {
          if (ref.current) {
            ref.current.innerHTML = log;
          }
        };
        clearInterval(logInterval);
      }
    }, 100);
    return () => clearInterval(logInterval);
  }, [ref]);

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