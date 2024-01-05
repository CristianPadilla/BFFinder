import { get } from "react-scroll/modules/mixins/scroller"
import { setActiveModule } from "./globalSlice"

export const changeActiveModule = ({ module }) =>
    async (dispatch, getState) => {
        console.log("changeActiveModule", module)
        module === getState().persisted.global.activeModule
            ? console.log("module already active")
            : dispatch(setActiveModule({ module }))

    }