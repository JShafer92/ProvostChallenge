import Entity from './Entity.js';
import {loadMaxwellSprite} from './sprites.js';

export function createMaxwell() {
    return loadMaxwellSprite()
    .then(sprite => {
        const maxwell = new Entity();

        maxwell.draw = function drawMaxwell(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        maxwell.update = function updateMaxwell(deltaTime) {
            this.pos.x += this.vel.x * deltaTime;
            this.pos.y += this.vel.y * deltaTime;
        }

        return maxwell;
    });
}