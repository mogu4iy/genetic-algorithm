import React, {useReducer} from "react";
import {
    AppStatusContext,
    appStatusInitialState,
    appStatusReducer
} from "../../storage/AppStatus";
import {
    AppParametersContext,
    appParametersInitialState,
    appParametersReducer
} from "../../storage/AppParameters";
import {
    CitiesCanvasContext,
    citiesCanvasInitialState,
    citiesCanvasReducer
} from "../../storage/CitiesCanvas";
import {
    AlgorithmDataContext,
    algorithmDataInitialState,
    algorithmDataReducer
} from '../../storage/AlgorithmData'
import App from "../App";

const AppWrapper = () => {
    const [appStatusState, appStatusDispatch] = useReducer(appStatusReducer, appStatusInitialState)
    const [appParametersState, appParametersDispatch] = useReducer(appParametersReducer, appParametersInitialState)
    const [citiesCanvasState, citiesCanvasDispatch] = useReducer(citiesCanvasReducer, citiesCanvasInitialState())
    const [algorithmDataState, algorithmDataDispatch] = useReducer(algorithmDataReducer, algorithmDataInitialState)

    return (
        <>
            <AppStatusContext.Provider
                value={{state: appStatusState, dispatch: appStatusDispatch}}>
                <AppParametersContext.Provider
                    value={{state: appParametersState, dispatch: appParametersDispatch}}>
                    <CitiesCanvasContext.Provider
                        value={{state: citiesCanvasState, dispatch: citiesCanvasDispatch}}>
                        <AlgorithmDataContext.Provider
                            value={{state: algorithmDataState, dispatch: algorithmDataDispatch}}>
                            <App/>
                        </AlgorithmDataContext.Provider>
                    </CitiesCanvasContext.Provider>
                </AppParametersContext.Provider>
            </AppStatusContext.Provider>
        </>
    )
}

export default AppWrapper