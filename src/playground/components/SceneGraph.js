import React, { useEffect, useState } from 'react';
import FolderTree from 'react-folder-tree';
import { ChevronRight, ChevronDown, Folder, FolderPlus, Code, Box, Image, Minus } from 'react-feather';

const iconForType = (type) => {
  switch (type) {
    case 'collectionc': return Folder;
    case 'collectionproxyc': return FolderPlus;
    case 'goc': return Box;
    case 'scriptc': return Code;
    case 'spritec': return Image;
    default: return Minus;
  };
};

const mapGraphToTree = (graph) => {
  const type = graph.payload.type;
  const showProps = !['collectionc', 'collectionproxyc'].includes(type);

  const tree = {
    name: graph.name,
    isOpen: false,
    type,
    children: showProps ? Object.keys(graph.payload).map((key) => ({
      name: `${key}: ${graph.payload[key].toString()}`,
    })) : [],
  };

  graph.children.forEach((node) => {
    const { name, payload, children } = node;
    tree.children.push({
      name,
      type: payload.type,
      isOpen: false,
      children: children.map(mapGraphToTree),
    });
  });

  return tree;
};

export default function SceneGraph() {
  const [sceneGraph, setSceneGraph] = useState(null);

  useEffect(() => {
    const graphInterval = setInterval(() => {
      if (window.$_codepad_$) {
        const defaultOnGraph = window.$_codepad_$.onGraph;
        window.$_codepad_$.onGraph = (graph) => {
          defaultOnGraph(graph);
          if (window.$_codepad_$.data.graph) {
            setSceneGraph(mapGraphToTree(window.$_codepad_$.data.graph));
          }
        };
        clearInterval(graphInterval);
      }
    }, 100);
    return () => clearInterval(graphInterval);
  }, []);

  const iconStyle = { verticalAlign: 'middle', padding: '2px', paddingRight: '6px' };
  const CaretRightIcon = ({ onClick: defaultOnClick }) => (
    <span style={{ ...iconStyle, paddingRight: '2px' }}>
      <ChevronRight size={16} onClick={defaultOnClick} />
    </span>
  );
  const CaretDownIcon = ({ onClick: defaultOnClick }) => (
    <span style={{ ...iconStyle, paddingRight: '2px' }}>
      <ChevronDown size={16} onClick={defaultOnClick} />
    </span>
  );
  const FileIcon = ({ onClick: defaultOnClick, nodeData }) => (
    <span style={iconStyle}>
      {iconForType(nodeData.type).render({ size: 16, onClick: defaultOnClick })}
    </span>
  );
  const FolderIcon = ({ onClick: defaultOnClick, nodeData }) => (
    <span style={iconStyle}>
      {iconForType(nodeData.type).render({ size: 16, onClick: defaultOnClick })}
    </span>
  );
  const FolderOpenIcon = FolderIcon;

  const iconComponents = {
    FileIcon,
    FolderIcon,
    FolderOpenIcon,
    CaretRightIcon,
    CaretDownIcon,
  };

  return (
    <>
      {sceneGraph && (
        <FolderTree
          iconComponents={iconComponents}
          initOpenStatus='closed'
          data={sceneGraph}
          showCheckbox={false}
          readOnly={true}
          onChange={() => {}}
        />
      )}
    </>
  );
}
