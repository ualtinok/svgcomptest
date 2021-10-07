import {
    Instance,
    types,
} from "mobx-state-tree";

function random(min: number, max: number, float = false) {
    const val = Math.random() * (max - min) + min;

    if (float) {
        return val;
    }

    return Math.floor(val);
}

export const SVGData = types
    .model({
        numberOfDots: types.number,
        pull: types.number,
        size: types.number,
    }).actions(self => ({
        randomize() {
            self.numberOfDots = random(3, 5);
            self.pull = random(0.55, 1, true);
            self.size = random(50, 80);
        }
    }));

export const SVGStore = types
    .model({
        items: types.optional(types.array(SVGData), [])
    }).actions(self => ({
        addRandomItems(howMany: number) {
            for(let i = 0; i < howMany; i++) {
                self.items.push({
                    numberOfDots: random(3, 5),
                    pull: random(0.55, 1, true),
                    size: random(50, 80)
                });
            }
        }
    }));

export interface ISVGData extends Instance<typeof SVGData> {
}
