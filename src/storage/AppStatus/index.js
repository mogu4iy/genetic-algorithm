import {createContext} from 'react'

export const AppStatusContext = createContext()

export const ACTIONS = {
    SUBMIT_PARAMETERS: 'submit_parameters',
    CREATE_CITIES: 'create_cities',
    FINISH: 'finish'
}

export const STATUS = {
    DISABLED: 'disabled', // display parameters form
    PARAMETERS_SUBMITTED: 'parameters_submitted', // generate random cities or create custom
    CITIES_CREATED: 'cities_created', // start algorithm
    FINISHED: 'finished' // display best way
}

export const appStatusInitialState = {
    status: STATUS.DISABLED
}

export const appStatusReducer = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case ACTIONS.SUBMIT_PARAMETERS:
            newState.status = STATUS.PARAMETERS_SUBMITTED
            return newState
        case ACTIONS.CREATE_CITIES:
            newState.status = STATUS.CITIES_CREATED
            return newState
        case ACTIONS.FINISH:
            newState.status = STATUS.FINISHED
            return newState
        default:
            return newState
    }
}

export const appSubmitParametersAction = {
    type: ACTIONS.SUBMIT_PARAMETERS,
}

export const appCreateCitiesAction = {
    type: ACTIONS.CREATE_CITIES,
}
export const appFinishAction = {
    type: ACTIONS.FINISH,
}