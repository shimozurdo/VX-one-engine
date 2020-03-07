import Render from "./render.js";
import Scene from "./scene.js";

const STEP = 1 / 60;
const MAX_FRAME = STEP * 5;

class Game {
  constructor(config) {
    this.w = config.width;
    this.h = config.height;
    this.render = new Render(this.w, this.h);
    config.parent = config.parent || "game";
    let el = document.querySelector(config.parent)
    if (!el) {
      document.body.innerHTML = '<div id="' + config.parent + '"' + '></div>';
    }
    document.getElementById(config.parent).appendChild(this.render.view);

    this.scene = new Scene();
  }

  run(gameUpdate = () => { }) {
    let dt = 0;
    let last = 0;
    let fps = 0;

    const mainloop = ms => {
      //create delta
      const t = ms / 1000;
      dt = Math.min(t - last, MAX_FRAME);
      last = t;
      fps = Math.round(1 / dt);
      //

      this.scene.update(dt, t);
      gameUpdate(dt, t);
      this.render.render(this.scene);
    };
    requestAnimationFrame(mainloop);
  }
}

export default Game;