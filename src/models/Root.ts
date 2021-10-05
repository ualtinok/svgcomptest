import { Instance, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { SVGStore } from "./SVGStore";

const RootModel = types.model({
    svgstore: SVGStore
});

let initialState = RootModel.create({
    svgstore: { items: [] },
});

export const rootStore = initialState;

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error("Store cannot be null, please add a context provider");
    }
    return store;
}
