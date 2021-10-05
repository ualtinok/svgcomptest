import {
    Instance,
    types,
} from "mobx-state-tree";

export const SVGData = types
    .model({
        numberOfDots: types.number,
        pull: types.number
    });

export const SVGStore = types
    .model({
        items: types.optional(types.array(SVGData), [])
    }).actions(self => ({
       addItem(nDots: number, pull: number){
           self.items.push({
               numberOfDots: nDots,
               pull
           });
       }
    }));

export interface ISVGData extends Instance<typeof SVGData> {}
