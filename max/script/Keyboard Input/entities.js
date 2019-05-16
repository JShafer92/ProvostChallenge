import Entity from './Entity.js';
import Jump from './traits/Jump.js';
import Velocity from './traits/Velocity.js';
import {loadMaxwellSprite} from './sprites.js';

export function createMaxwell() {
    return loadMaxwellSprite()
    .then(sprite => {
        const maxwell = new Entity();

        maxwell.addTrait(new Velocity());
        maxwell.addTrait(new Jump());

        maxwell.draw = function drawMaxwell(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        return maxwell;
    });
}