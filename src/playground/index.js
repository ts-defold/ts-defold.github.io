import React, { useEffect, useState } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter, ReflexHandle } from 'react-reflex';
import { Folder, Terminal } from 'react-feather';
import TypescriptIcon from 'react-devicons/typescript/plain'
import LuaIcon from 'react-devicons/lua/plain'
import DefoldLog from './components/DefoldLog';
import DefoldRuntime from "./components/DefoldRuntime";
import MonacoEditorLua from './components/MonacoEditorLua';
import MonacoEditorTSTL from './components/MonacoEditorTSTL';
import ProjectDetails from './components/ProjectDetails';

import 'react-reflex/styles.css';

const splitterStyle = { borderColor: '#000', zIndex: 'unset' };

export default function Monaco() {
  const [lua, setLua] = useState('');

  useEffect(() => {
    const readyInterval = setInterval(() => {
      if (window.$_codepad_$) {
        window.$_codepad_$.ready();
        clearInterval(readyInterval);
      }
    }, 100);
    return () => clearInterval(readyInterval);
  }, []);

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
            <MonacoEditorTSTL onChange={(lua) => setLua(lua)} />
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
              {Terminal.render({ width: '16px', height: '16px', color: '#a8b5d0', style: { marginRight: '8px' } })}
            </span>
              LOG
            </ReflexHandle>
            <DefoldLog />
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
          {Folder.render({ width: '16px', height: '16px', color: '#a8b5d0', style: { marginBottom: '8px' } })}
        </span>
        PROJECT
      </ReflexSplitter>

      <ReflexElement size={0} flex={0} style={{ overflow: 'hidden' }}>
        <ProjectDetails />
      </ReflexElement>
      
    </ReflexContainer>
  );
}



