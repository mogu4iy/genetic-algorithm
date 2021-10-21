import {createContext} from 'react'

export const CitiesCanvasContext = createContext()

export const ACTIONS = {
    RESIZE: 'submit_parameters',
}

export const citiesCanvasInitialState = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    }
}

export const citiesCanvasReducer = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case ACTIONS.RESIZE:
            newState.width = action.data.width
            newState.height = action.data.height
            return newState
        default:
            return newState
    }
}

export const citiesCanvasResizeAction = (data) => {
    return {
        type: ACTIONS.RESIZE,
        data: data
    }
}