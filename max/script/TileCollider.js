import TileResolver from './TileResolver.js';
import {Sides} from './Entity.js';
//exports tileCollider
export default class TileCollider {
    constructor(tileMatrix) {
        this.tiles = new TileResolver(tileMatrix);
    }
    //Checks the hoirzon placement of entity
    checkX(entity) {
        let x;
        if (entity.vel.x > 0) {
            x = entity.bounds.right;
        } else if (entity.vel.x < 0) {
            x = entity.bounds.left;
        } else {
            return;
        }
        //Gives parameters to collider for ground
        const matches = this.tiles.searchByRange(
            x, x,
            entity.bounds.top, entity.bounds.bottom);
        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }

            if (entity.vel.x > 0) {
                if (entity.bounds.right > match.x1) {
                    entity.bounds.right = match.x1;
                    entity.vel.x = 0;

                    entity.obstruct(Sides.RIGHT);
                    entity.obstruct(Sides.RIGHT, match);
                }
            } else if (entity.vel.x < 0) {
                if (entity.bounds.left < match.x2) {
                    entity.bounds.left = match.x2;
                    entity.vel.x = 0;

                    entity.obstruct(Sides.LEFT);
                    entity.obstruct(Sides.LEFT, match);
                }
            }
        });
    }
    //Checks the vertical place of entity
    checkY(entity) {
        let y;
        if (entity.vel.y > 0) {
            y = entity.bounds.bottom;
        } else if (entity.vel.y < 0) {
            y = entity.bounds.top;
        } else {
            return;
        }
        const matches = this.tiles.searchByRange(
            entity.bounds.left, entity.bounds.right,
            y, y);
        matches.forEach(match => {
            if (match.tile.type !== 'ground') {
                return;
            }
            if (entity.vel.y > 0) {
                if (entity.bounds.bottom > match.y1) {
                    entity.obstruct(Sides.BOTTOM, match);
                }
            } else if (entity.vel.y < 0) {
                if (entity.bounds.top < match.y2) {
                    entity.bounds.top = match.y2;
                    entity.vel.y = 0;

                    entity.obstruct(Sides.TOP);
                    entity.obstruct(Sides.TOP, match);
                }
            }
        });
    }
}