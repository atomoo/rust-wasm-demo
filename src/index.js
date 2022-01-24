// import("../pkg/index.js").then((module) => {
//     console.log(module);
// }).catch(console.error);

import {Universe} from '../pkg/index.js';

const universe = Universe.new(32, 32);

const pre = document.createElement('pre');
document.body.appendChild(pre);

function render() {
    pre.textContent = universe.render();
    universe.tick();
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
