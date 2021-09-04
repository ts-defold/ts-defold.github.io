import React, { useEffect, useState } from "react";
import SceneGraph from "./SceneGraph";
import styled from "@emotion/styled";

export default function ProjectDetails() {
  const [scene, setScene] = useState((window.$_codepad_$ && window.$_codepad_$.data.scene) || '');
  const [scenes, setScenes] = useState((window.$_codepad_$ && window.$_codepad_$.data.scenes) || []);

  useEffect(() => {
    const i = setInterval(() => {
      if (window.$_codepad_$ && window.$_codepad_$.data.scene) {
        setScene(window.$_codepad_$.data.scene);
        setScenes(window.$_codepad_$.data.scenes);
        clearInterval(i);
      }
    }, 100);
    return () => clearInterval(i);
  }, []);

  return (
    <div style={{ padding: '12px', width: '100%', height: '100%', overflow: 'auto' }}>
      <div>
        <Field>
          <Label>Project: </Label>
          <TextInput name="project-name" type="text" placeholder="Project Name" />
        </Field>
        <Field>
          <Label>Description: </Label>
          <TextArea cols={20} rows={5} placeholder="Project Description" />
        </Field>
        <Field>
          <Label>Scene: </Label>
          <Select defaultValue={scene}>
            {scenes.filter(s => s.id === scene).map(scene => (
              <option key={scene.id} value={scene.id}>{scene.name}</option>
            ))}
          </Select>
        </Field>
        <Field style={{ justifyContent: 'left' }}>
        <Label>Graph: </Label>
          <SceneGraph />
        </Field>
      </div>
    </div>
  )
}

const Field = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Label = styled.label`
  vertical-align: top;
  display: inline-flex;
  min-width: 90px;
`;

const TextInput = styled.input`
  border: none;
  background-image:none;
  background-color:transparent;
  box-shadow: none;
  border-bottom: 1px solid #a8b5d0;
  margin: 0 8px;
  color: #a8b5d0;
  font-size: 14px;
  line-height: 16px;
  flex-grow: 1;
  min-width: 100px;

  &:focus {
    outline: none;
    border-bottom: 1px solid #e9b684;
    color: #e9b684;
  }
`;

const TextArea = styled.textarea`
  border: none;
  background-image:none;
  background-color:transparent;
  box-shadow: none;
  border-bottom: 1px solid #a8b5d0;
  border-right: 1px solid #a8b5d0;
  margin: 0 8px;
  color: #a8b5d0;
  font-size: 14px;
  flex-grow: 1;
  min-width: 100px;

  &:focus {
    outline: none;
    border-bottom: 1px solid #e9b684;
    border-right: 1px solid #e9b684;
    color: #e9b684;
  }
`;

const Select = styled.select`
  appearance: none;
  border: none;
  background-image:none;
  background-color:transparent;
  box-shadow: none;
  border-bottom: 1px solid #a8b5d0;
  border-radius: 0;
  margin: 0 8px;
  color: #a8b5d0;
  font-size: 14px;
  flex-grow: 1;
  min-width: 100px;
  display: grid;
  grid-template-areas: "select";
  align-items: center;

  &,
  &::after {
    grid-area: select;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #e9b684;
    color: #e9b684;
  }

  &::after {
    content: '';
    width: 0.8em;
    height: 0.5em;
    background-color: #fff;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
    justify-self: end;
  }
`;