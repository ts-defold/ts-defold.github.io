import { useEffect, useState } from "react";
import CompressionWorker from "worker-loader?name=compression.worker.js!./compression.worker";

export function useSerializeProject() {
  const [worker, setWorker] = useState(null);
  const [project, setProject] = useState(null);
  const [serializedProject, setSerializedProject] = useState(null);

  useEffect(() => {
    setWorker(new CompressionWorker());
    return () => worker.terminate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (worker && project) {
      worker.postMessage({
        type: "compress",
        data: JSON.stringify(project),
      });

      worker.onmessage = event => {
        if (event.data.type === "compressed" && event.data.data) {
          setSerializedProject(event.data.data);
        }
      };
    }
  }, [project, worker]);

  return [serializedProject, setProject];
}

export function useDeserializeProject() {
  const [worker, setWorker] = useState(null);
  const [project, setProject] = useState(null);
  const [deserializedProject, setDeserializedProject] = useState(null);

  useEffect(() => {
    setWorker(new CompressionWorker());
    return () => worker.terminate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (worker && project) {
      if (project.project) {
        worker.postMessage({
          type: "decompress",
          data: project.project,
        });
      
        worker.onmessage = event => {
          if (event.data.type === "decompressed") {
            let payload = project.fallback;
            if (!event.data.err && event.data.data) {
              try {
                payload = JSON.parse(event.data.data);
              } catch (e) { void e;}
              
              // Ensure the deserialized project is valid
              const keys = Object.keys(project.fallback).filter(key => payload[key] !== undefined);
              if (Object.keys(payload).length != keys.length) {
                payload = project.fallback;
              }

              setDeserializedProject(payload);
            }
          };
        }
      }
      else {
        setDeserializedProject(project.fallback);
      }
    }
  }, [project, worker]);

  const setProjectWithFallback = (project, fallback = {}) => setProject({ project, fallback });
  return [deserializedProject, setProjectWithFallback];
}