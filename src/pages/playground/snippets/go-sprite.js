export default `
type Props = {
  key: string;
  distance: number;
  speed: number;
  theta: number;
};

export function init(this: Props) {
  this.key = "position.y";
  this.distance = 100;
  this.speed = 2;
  this.theta = 0;
}

export function update(this: Props, dt: number) {
  this.theta += this.speed / 2 * dt;
  go.set_position(vmath.vector3(Math.cos(this.theta) * 200, 0, 0));
}

export function on_reload(this: Props) {
  go.set_position(vmath.vector3(0, -this.distance, 0));
  go.cancel_animations(".", this.key);
  go.animate(".", this.key, go.PLAYBACK_LOOP_PINGPONG, this.distance, go.EASING_INOUTELASTIC, this.speed);
}
`