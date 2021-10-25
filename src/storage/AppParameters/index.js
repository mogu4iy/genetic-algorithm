import React from 'react'

export const AppParametersContext = React.createContext()

export const ACTIONS = {
    UPDATE: 'update',
}
export const INPUT_TYPES = {
    TEXT: 'text',
    SELECT: 'select',
    NUMBER: 'number'
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
    iterations: 2,
    cities_creation: {
        RANDOM: 'random',
        CUSTOM: 'custom'
    },
    cities: 30,
    mutation: 10
}

export const CONFIG = {
    iterations: {
        inputType: INPUT_TYPES.NUMBER,
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
        inputType: INPUT_TYPES.NUMBER,
        type: TYPES.NUMBER,
        name: NAMES.cities,
        value: VALUES.cities,
        regex: REGEX.NUMBER,
        case: {
            [NAMES.cities_creation]: VALUES.cities_creation.CUSTOM
        }
    },
    mutation: {
        inputType: INPUT_TYPES.NUMBER,
        type: TYPES.NUMBER,
        name: NAMES.mutation,
        value: VALUES.mutation,
        regex: REGEX.NUMBER
    },
}

export const appParametersInitialState = {
    iterations: VALUES.iterations, // count of iterations for GA
    cities_creation: VALUES.cities_creation.RANDOM, // type of creation (random or custom)
    cities: VALUES.cities, // count of cities, that we need to create
    mutation: VALUES.mutation // percentage of mutations
}

export const appParametersReducer = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case ACTIONS.UPDATE:
            Object.keys(state).forEach(field => {
                action.data[field] && (newState[field] = action.data[field])
            })
            return newState
        default:
            return newState
    }
}

export const updateAppParameters = (data) => {
    const updateData = {}
    Object.keys(data).forEach(field => {
        updateData[field] = data[field]
    })
    return {
        type: ACTIONS.UPDATE,
        data: updateData
    }
}