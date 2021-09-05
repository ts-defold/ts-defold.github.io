export default `// Gui Nodes
type Props = {
};

export function init(this: Props) {
  gui.animate(gui.get_node("box"), gui.PROP_POSITION, vmath.vector3(0), gui.EASING_INOUTQUAD, 2, 0, null, gui.PLAYBACK_LOOP_PINGPONG);
}
`;
