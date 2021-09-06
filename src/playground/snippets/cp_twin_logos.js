export default `// Twin Logos
type Action = {
    pressed: boolean;
    released: boolean;
    x: number;
    y: number;
}

type Props = {
    go: string[];
    radius: number;
    targetRadius: number;
    speed: number;
    theta: number;
    drag: {
        isDragging: boolean,
        begin: vmath.vector3;
        end: vmath.vector3;
    };
};

export function init(this: Props) {
    msg.post(".", "acquire_input_focus");
    this.go = ["/go1", "/go2"];
    
    this.radius = 100;
    this.theta = 0;
    this.speed = 100;

    this.drag = {
        isDragging: false,
        begin: vmath.vector3(),
        end: vmath.vector3()
    }
}

export function update(this: Props, dt: number) {
    this.targetRadius = 100 + vmath.length(this.drag.end - this.drag.begin as vmath.vector3);
    const step = (this.targetRadius - this.radius) / 8;
    this.radius += step;

    this.theta += this.speed * dt;
    const x = this.radius * math.cos(math.rad(this.theta));
    const y = this.radius * math.sin(math.rad(this.theta));

    go.set_position(vmath.vector3(x, y, 0), "/go1");
    go.set_position(vmath.vector3(-x, -y, 0), "/go2");

    go.set_rotation(vmath.quat_rotation_z(math.rad(this.theta * 2)), "/go1")
    go.set_rotation(vmath.quat_rotation_z(math.rad(this.theta * -2)), "/go2")
}

export function on_input(this: Props, action_id: hash, action: Action) {
    switch (action_id) {
        case hash("mouse_button_left"): {
            if (action.pressed) {
                this.drag.isDragging = true;
                this.drag.end.x = this.drag.begin.x = action.x;
                this.drag.end.y = this.drag.begin.y = action.y;
            } else if (action.released) {
                this.drag.isDragging = false;
                this.drag.end.x = this.drag.begin.x = 0;
                this.drag.end.y = this.drag.begin.y = 0;
            }
        } break;
        case null: {
            if (this.drag.isDragging) {
                this.drag.end.x = action.x
                this.drag.end.y = action.y;
            }
        }
    }
}
`;