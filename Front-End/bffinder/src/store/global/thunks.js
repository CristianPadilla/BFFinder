import { get } from "react-scroll/modules/mixins/scroller"
import { setActiveModule, startContentLoading } from "./globalSlice"

export const changeActiveModule = ({ module }) =>
    async (dispatch, getState) => {
        if (module === getState().persisted.global.activeModule) return
        dispatch(setActiveModule({ module }))

    }