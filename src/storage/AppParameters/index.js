import React from 'react'

export const AppParametersContext = React.createContext()

export const ACTIONS = {
    UPDATE: 'update',
}
export const INPUT_TYPES = {
    TEXT: 'text'
}
export const TYPES = {
    NUMBER: 'number'
}
export const REGEX = {
    NUMBER: /^(?!0)[0-9]+$/
}

export const appParametersInitialState = {
    iterations: {
        inputType: INPUT_TYPES.TEXT,
        type: TYPES.NUMBER,
        name: 'iterations',
        value: 10,
        regex: REGEX.NUMBER
    },
    cities: {
        inputType: INPUT_TYPES.TEXT,
        type: TYPES.NUMBER,
        name: 'cities',
        value: 6,
        regex: REGEX.NUMBER
    },
    mutation: {
        inputType: INPUT_TYPES.TEXT,
        type: TYPES.NUMBER,
        name: 'mutation',
        value: 10,
        regex: REGEX.NUMBER
    },
}

export const appParametersReducer = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case ACTIONS.UPDATE:
            Object.keys(state).forEach(field => {
                action.data[field] && (newState[field].value = action.data[field].value)
            })
            return newState
        default:
            return newState
    }
}

export const updateAppParameters = (data) => {
    return {
        type: ACTIONS.SUBMIT,
        data: {
            ...Object.keys(data).map(field => {
                return {
                    field: {
                        value: data[field]
                    }
                }
            })
        }
    }
}