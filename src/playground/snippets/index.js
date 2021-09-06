import basic from './basic';
import cp_factory from './cp_factory';
import cp_gui_nodes from './cp_gui_nodes';
import cp_sprite from './cp_sprite';
import cp_twin_logos from './cp_twin_logos';
export default function(scene) {
  switch (scene) {
    case '#cp_factory': return cp_factory;
    case '#cp_gui_nodes': return cp_gui_nodes;
    case '#cp_sprite': return cp_sprite;
    case '#cp_twin_logos': return cp_twin_logos;
    default: return basic;
  }
};