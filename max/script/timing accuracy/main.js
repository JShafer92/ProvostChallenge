import Compositor from './Compositor.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createMaxwell} from './entities.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createMaxwell(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([maxwell, backgroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const gravity = 30;
    maxwell.pos.set(64, 180);
    maxwell.vel.set(200, -600);


    const spriteLayer = createSpriteLayer(maxwell);
    comp.layers.push(spriteLayer);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        comp.draw(context);
        maxwell.update(deltaTime);
        maxwell.vel.y += gravity;
    }

    timer.start();
});
