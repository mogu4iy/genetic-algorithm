import React from 'react'

export const AlgorithmDataContext = React.createContext()

export const ACTIONS = {
    CREATE_CITY: 'create_city',
    CREATE_CITIES: 'create_cities',
    CREATE_WAY: 'create_way'
}

export const algorithmDataInitialState = {
    cities: [],
    ways: []
}

export const algorithmDataReducer = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case ACTIONS.CREATE_CITY:
            newState.cities.push(action.data.city)
            return newState
        case ACTIONS.CREATE_CITIES:
            newState.cities = action.data.cities
            return newState
        case ACTIONS.CREATE_WAY:
            newState.ways.push(action.data.way)
            return newState
        default:
            return newState
    }
}
export const createCityAction = (data) => {
    return {
        type: ACTIONS.CREATE_CITY,
        data: {
            city: data.city
        }
    }
}

export const createCitiesAction = (data) => {
    return {
        type: ACTIONS.CREATE_CITIES,
        data: {
            cities: data.cities
        }
    }
}

export const createWayAction = (data) => {
    return {
        type: ACTIONS.CREATE_WAY,
        data: {
            way: data.way
        }
    }
}