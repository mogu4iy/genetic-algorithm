import React from 'react'

export const AppParametersContext = React.createContext()

export const ACTIONS = {
    UPDATE: 'update',
}
export const INPUT_TYPES = {
    TEXT: 'text',
    SELECT: 'select'
}
export const TYPES = {
    NUMBER: 'number',
    STRING: 'string'
}
export const REGEX = {
    NUMBER: /^(?!0)[0-9]+$/,
    STRING: /^\w+$/
}
export const NAMES = {
    iterations: 'iterations',
    cities_creation: 'cities_creation',
    cities: 'cities',
    mutation: 'mutation'
}
export const VALUES = {
    iterations: 10,
    cities_creation: {
        RANDOM: 'random',
        CUSTOM: 'custom'
    },
    cities: 30,
    mutation: 10
}

export const appParametersInitialState = {
    iterations: {
        inputType: INPUT_TYPES.TEXT,
        type: TYPES.NUMBER,
        name: NAMES.iterations,
        value: VALUES.iterations,
        regex: REGEX.NUMBER
    },
    cities_creation: {
        inputType: INPUT_TYPES.SELECT,
        type: TYPES.STRING,
        name: NAMES.cities_creation,
        value: VALUES.cities_creation.RANDOM,
        regex: REGEX.STRING,
        options: Object.values(VALUES.cities_creation)
    },
    cities: {
        inputType: INPUT_TYPES.TEXT,
        type: TYPES.NUMBER,
        name: NAMES.cities,
        value: VALUES.cities,
        regex: REGEX.NUMBER,
        case: {
            [NAMES.cities_creation]: VALUES.cities_creation.CUSTOM
        }
    },
    mutation: {
        inputType: INPUT_TYPES.TEXT,
        type: TYPES.NUMBER,
        name: NAMES.mutation,
        value: VALUES.mutation,
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
        type: ACTIONS.UPDATE,
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