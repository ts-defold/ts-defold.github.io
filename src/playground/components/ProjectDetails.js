import React, { useCallback, useEffect, useState } from 'react';
import SceneGraph from './SceneGraph';
import styled from '@emotion/styled';
import { Share2, Download } from 'react-feather';
import { useDebounceCallback } from '@react-hook/debounce';

export default function ProjectDetails({
  onShareClick,
  onDownloadClick,
  onDetailsChange,
  onSceneChange,
  project,
  scenes,
  graph,
}) {
  // TODO: populate this with the project's data
  void onShareClick, onDownloadClick;

  const [name, setName] = useState(project ? project.name : '');
  const [description, setDescription] = useState(project ? project.description : '');
  const [selectedScene, setSelectedScene] = useState(project ? project.scene : '');

  const debounceDetailsChange = useDebounceCallback(
    useCallback(
      ({ name, description }) => {
        if (onDetailsChange) onDetailsChange({ name, description });
      },
      [onDetailsChange]
    ),
    250
  );
  
  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setSelectedScene(project.scene);
    }
  }, [project]);

  useEffect(() => {
    if (project && selectedScene && selectedScene !== project.scene) {
      if (onSceneChange) onSceneChange({ scene: selectedScene });
    }
  }, [project, selectedScene, onSceneChange]);

  useEffect(() => {
    debounceDetailsChange({ name, description });
  }, [name, description, debounceDetailsChange]);

  return (
    <Details>
      <Field>
        <Label>Project: </Label>
        <TextInput
          name="project-name"
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Field>
      <Field>
        <Label>Description: </Label>
        <TextArea
          cols={20}
          rows={5}
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>
      <Field>
        <Label>Scene: </Label>
        <SelectWrapper>
          <Select value={selectedScene} onChange={(e) => setSelectedScene(e.target.value)}>
            {scenes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
        </SelectWrapper>
      </Field>
      <Field style={{ justifyContent: 'left' }}>
        <Label>Graph: </Label>
        <SceneGraph graph={graph} />
      </Field>
      <Footer>
        <div style={{ minWidth: '100px', padding: '8px', textAlign: 'center' }}>
          <span style={{ verticalAlign: 'middle', paddingRight: '6px' }}>
            <Share2 size={18} />
          </span>
          Share
        </div>
        <div style={{ minWidth: '100px', padding: '8px', textAlign: 'center' }}>
          <span style={{ verticalAlign: 'middle', paddingRight: '6px' }}>
            <Download size={18} />
          </span>
          Save
        </div>
      </Footer>
    </Details>
  );
}

const Details = styled.div`
  padding: 12px;
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0 8px;
  background-color: #212835;
`;

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
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 16px;
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  border-bottom: 1px solid #a8b5d0;
  margin: 0 8px;
  color: #a8b5d0;
  flex-grow: 1;
  min-width: 100px;

  &:focus {
    outline: none;
    border-bottom: 1px solid #e9b684;
    color: #e9b684;
  }
`;

const TextArea = styled.textarea`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 16px;
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  border-bottom: 1px solid #a8b5d0;
  border-right: 1px solid #a8b5d0;
  margin: 0 8px;
  color: #a8b5d0;
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
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  border-radius: 0;
  color: #a8b5d0;
  font-size: 14px;
  cursor: pointer;
  width: 100%;

  &:focus {
    outline: none;
    color: #e9b684;
  }
`;

const SelectWrapper = styled.div`
  flex-grow: 1;
  min-width: 100px;
  display: grid;
  grid-template-areas: 'select';
  align-items: center;
  margin: 0 8px;
  padding-right: 4px;
  cursor: pointer;

  border-bottom: 1px solid #a8b5d0;
  &:focus-within {
    border-bottom: 1px solid #e9b684;
  }

  select,
  &::after {
    grid-area: select;
  }

  &::after {
    content: '';
    width: 0.8em;
    height: 0.5em;
    background-color: #a8b5d0;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
    justify-self: end;
  }

  &:focus-within::after {
    background-color: #e9b684;
  }
`;
