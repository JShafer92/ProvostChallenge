import Compositor from './Compositor.js';
import Timer from './Timer.js';
import {loadLevel} from './loaders.js';
import {createMaxwell} from './entities.js';
import {loadBackgroundSprites} from './sprites.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

import Keyboard from './KeyboardState.js';


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

    const gravity = 2000;
    maxwell.pos.set(64, 180);


    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(SPACE, keyState => {
        if (keyState) {
            maxwell.jump.start();
        } else {
            maxwell.jump.cancel();
        }
    });
    input.listenTo(window);


    const spriteLayer = createSpriteLayer(maxwell);
    comp.layers.push(spriteLayer);

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        maxwell.update(deltaTime);

        comp.draw(context);

        maxwell.vel.y += gravity * deltaTime;
    }

    timer.start();
});