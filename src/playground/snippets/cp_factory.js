export default `// Factory
type Props = {
};

type Action = {
    released: boolean;
    x: number;
    y: number;
}

export function init(this:Props) {
	msg.post(".", "acquire_input_focus")
}

export function on_input(this:Props, action_id: hash, action: Action) {
	if (action_id == hash("mouse_button_left") && action.released) {
		const id = factory.create("#factory", vmath.vector3(action.x, action.y, 0));
		print(id);
    }
}
`;