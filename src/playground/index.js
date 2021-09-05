import React, { useCallback, useEffect, useState } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter, ReflexHandle } from 'react-reflex';
import { Folder, Terminal } from 'react-feather';
import TypescriptIcon from 'react-devicons/typescript/plain';
import LuaIcon from 'react-devicons/lua/plain';
import DefoldLog from './components/DefoldLog';
import DefoldRuntime from './components/DefoldRuntime';
import MonacoEditorLua from './components/MonacoEditorLua';
import MonacoEditorTSTL from './components/MonacoEditorTSTL';
import ProjectDetails from './components/ProjectDetails';
import { useSerializeProject, useDeserializeProject } from './hooks/serialize';
import { useDefoldApi } from './hooks/defold';

import snippets from './snippets';
import 'react-reflex/styles.css';

const splitterStyle = { borderColor: '#000', zIndex: 'unset' };

export default function Playground({ location }) {
  const [src, setSrc] = useState('');
  const [lua, setLua] = useState('');
  const [diagnostics, setDiagnostics] = useState(null);
  const [graph, setGraph] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [log, setLog] = useState('');
  const [project, setProject] = useState(null);

  const [hash, serializeProject] = useSerializeProject();
  const [template, deserializeProject] = useDeserializeProject();

  const onReady = useCallback(
    (scenes, setScene) => {
      setScenes(scenes);
      const scene = scenes.find((scene) => scene.id === project.scene);
      setScene(scene ? scene.id : scenes[0].id);
    },
    [project]
  );

  const onGraph = useCallback(
    (graph) => {
      setGraph(graph);
    },
    [setGraph]
  );

  const onLog = useCallback(
    (log) => {
      setLog(log);
    },
    [setLog]
  );

  const [ready, setReady] = useDefoldApi({ onReady, onGraph, onLog });

  // Setup initial project data
  useEffect(() => {
    const projectHash = location.hash.split('=')[1];
    deserializeProject(projectHash, {
      name: '',
      description: '',
      scene: '#cp_sprite',
      src: snippets[0],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load the project and set defold engine ready
  useEffect(() => {
    if (template) {
      setSrc(template.src);
      setProject(template);
    }
  }, [template]);

  // Update the lua src and set defold engine ready
  useEffect(() => {
    if (lua) {
      if (ready) {
        if (diagnostics && diagnostics.length == 0) {
          window.$_codepad_$.setCode(lua, true);
        }
      } else {
        window.$_codepad_$.setCode(lua, false);
        setReady(true);
      }
    }
  }, [lua, diagnostics, ready, setReady]);

  // Update the hash in the url (do not push history)
  useEffect(() => {
    if (hash) {
      const current = new URL(window.location.href);
      current.hash = '';
      window.location.replace(current.href + `#project=${hash}`);
    }
  }, [hash]);

  // Serialize the project to a shareable hash
  const onChange = useCallback(
    ({ src, lua, diagnostics }) => {
      setLua(lua);
      setDiagnostics(diagnostics);
      if (project) serializeProject({ ...project, src });
    },
    [project, serializeProject]
  );

  // Update project info & Serialize hash
  const onDetailsChange = useCallback(
    ({ name, description }) => {
      if (project) {
        serializeProject({ ...project, name, description });
      }
    },
    [project, serializeProject]
  );

  return (
    <ReflexContainer
      orientation="vertical"
      style={{ height: 'calc(100vh - var(--header-height))', marginTop: 'var(--header-margin)' }}
    >
      <ReflexElement minSize={400} propagateDimensions>
        <ReflexContainer orientation="horizontal">
          <ReflexElement minSize={27} propagateDimensions>
            <div className="handle" style={{ padding: '4px', userSelect: 'none' }}>
              <span style={{ verticalAlign: 'middle' }}>
                <TypescriptIcon color="#a8b5d0" style={{ marginRight: '8px' }} />
              </span>
              TYPESCRIPT
            </div>
            <MonacoEditorTSTL src={src} onChange={onChange} />
          </ReflexElement>

          <ReflexSplitter style={splitterStyle} propagate />

          <ReflexElement minSize={27} flex={0.3} propagateDimensions>
            <ReflexHandle className="handle" style={{ padding: '4px', cursor: 'grab' }}>
              <span style={{ verticalAlign: 'middle' }}>
                <LuaIcon color="#a8b5d0" style={{ marginRight: '8px' }} />
              </span>
              GENERATED LUA
            </ReflexHandle>
            <MonacoEditorLua src={lua} />
          </ReflexElement>

          <ReflexSplitter style={splitterStyle} propagate />

          <ReflexElement minSize={27} size={27} flex={0} style={{ overflow: 'hidden' }}>
            <ReflexHandle className="handle" style={{ padding: '4px', cursor: 'grab' }}>
              <span style={{ verticalAlign: 'middle' }}>
                {Terminal.render({
                  width: '16px',
                  height: '16px',
                  color: '#a8b5d0',
                  style: { marginRight: '8px' },
                })}
              </span>
              LOG
            </ReflexHandle>
            <DefoldLog log={log} />
          </ReflexElement>
        </ReflexContainer>
      </ReflexElement>

      <ReflexSplitter style={splitterStyle} propagate></ReflexSplitter>

      <ReflexElement minSize={400} flex={0.55} style={{ overflow: 'hidden' }} propagateDimensions>
        <DefoldRuntime />
      </ReflexElement>

      <ReflexSplitter
        style={{
          ...splitterStyle,
          writingMode: 'vertical-rl',
          minWidth: '28px',
          color: '#a8b5d0',
          backgroundColor: '#212835',
          padding: '4px',
          cursor: 'grab',
          borderLeft: '2px solid #000',
          borderRight: 'none',
        }}
      >
        <span>
          {Folder.render({
            width: '16px',
            height: '16px',
            color: '#a8b5d0',
            style: { marginBottom: '8px' },
          })}
        </span>
        PROJECT
      </ReflexSplitter>

      <ReflexElement size={0} flex={0} style={{ overflow: 'hidden' }}>
        <ProjectDetails
          project={project}
          scenes={scenes}
          graph={graph}
          onDetailsChange={onDetailsChange}
        />
      </ReflexElement>
    </ReflexContainer>
  );
}
