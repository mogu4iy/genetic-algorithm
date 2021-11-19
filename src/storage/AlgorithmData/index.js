import React from 'react'

export const AlgorithmDataContext = React.createContext()

export const ACTIONS = {
    CREATE_CITY: 'create_city',
    CREATE_CITIES: 'create_cities',
    CREATE_POPULATION: 'create_population',
    MAKE_WAY_LAST: 'make_way_last'
}

export const algorithmDataInitialState = {
    cities: [], // list of cities
    colors: [], // list of used colors for ways
    populations: [], // list of populations
    ways: [], // list of best ways in every population
    scores: [], // list of best ways scores in every population
    overFitting: 0
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
            if (action.data.score < newState.scores[newState.scores.length - 1]) {
                newState.overFitting = 0
            } else {
                newState.overFitting += 1
            }
            newState.populations.push(action.data.population)
            newState.colors.push(action.data.color)
            newState.ways.push({
                way: action.data.way,
                color: action.data.color,
                last: action.data.last
            })

            newState.scores.push(action.data.score)
            return newState
        case ACTIONS.MAKE_WAY_LAST:
            newState.populations = newState.populations.slice(0, newState.populations.length - newState.overFitting)
            newState.ways = newState.ways.slice(0, newState.ways.length - newState.overFitting)
            newState.colors = newState.colors.slice(0, newState.colors.length - newState.overFitting)
            newState.scores = newState.scores.slice(0, newState.scores.length - newState.overFitting)
            newState.ways[newState.ways.length - 1].last = true
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

export const makeWayLastAction = (data) => {
    return {
        type: ACTIONS.MAKE_WAY_LAST,
    }
}