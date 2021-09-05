import { useEffect, useState } from "react";

export function useDefoldApi({ onReady, onGraph, onLog, onEngineInfo }) {
  const [apiReady, setApiReady] = useState(false);
  const [defoldReady, setDefoldReady] = useState(false);

  // Register the callbacks when the API is ready
  useEffect(() => {
    const readyInterval = setInterval(() => {
      if (window.$_codepad_$) {
        // Signal the API is ready
        setApiReady(true);
        clearInterval(readyInterval);
      }
    }, 100);
    return () => clearInterval(readyInterval);
  }, []);

  useEffect(() => {
    if (apiReady && onReady) {
      const onReadyProxy = window.$_codepad_$.onReady;
      window.$_codepad_$.onReady = (scenes) => {
        onReadyProxy(scenes);
        onReady(window.$_codepad_$.data.scenes, window.$_codepad_$.setScene);
      }
    }
  }, [apiReady, onReady]);
  

  useEffect(() => {
    if (apiReady && onGraph) {
      const onGraphProxy = window.$_codepad_$.onGraph;
      window.$_codepad_$.onGraph = (graph) => {
        onGraphProxy(graph);
        onGraph(window.$_codepad_$.data.graph);
      }
    }
  }, [apiReady, onGraph]);

  useEffect(() => {
    if (apiReady && onLog) window.$_codepad_$.onLog = onLog;
  }, [apiReady, onLog]);

  useEffect(() => {
    if (apiReady && onEngineInfo) window.$_codepad_$.onEngineInfo = onEngineInfo;
  }, [apiReady, onEngineInfo]);

  // When the API is ready and the hook consumer is ready, load the defold engine
  useEffect(() => {
    if (apiReady && defoldReady) setTimeout(() => {
      window.$_codepad_$.ready();
    }, 0);
  }, [defoldReady, apiReady]);

  return [defoldReady, setDefoldReady];
}