import React from 'react'

export const AlgorithmDataContext = React.createContext()

export const ACTIONS = {
    CREATE_CITY: 'create_city',
    CREATE_CITIES: 'create_cities',
    CREATE_POPULATION: 'create_population',
}

export const algorithmDataInitialState = {
    cities: [], // list of cities
    colors: [], // list of used colors for ways
    populations: [], // list of populations
    ways: [], // list of best ways in every population
    scores: [] // list of best ways scores in every population
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
        case ACTIONS.CREATE_POPULATION:
            newState.populations.push(action.data.population)
            newState.colors.push(action.data.color)
            newState.ways.push({
                way: action.data.way,
                color: action.data.color,
                last: action.data.last
            })
            newState.scores.push(action.data.score)
            console.log(`${new Array(25).fill('-').join('')}\nbest population way score : ${action.data.score}\npopulation color : ${action.data.color}}`)
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

export const createPopulationAction = (data) => {
    return {
        type: ACTIONS.CREATE_POPULATION,
        data: {
            population: data.population,
            color: data.color,
            way: data.way,
            score: data.score,
            last: data?.last
        }
    }
}