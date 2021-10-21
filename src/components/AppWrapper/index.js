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
import App from "../App";
import {CitiesCanvasContext, citiesCanvasInitialState, citiesCanvasReducer} from "../../storage/CitiesCanvas";

const AppWrapper = () => {
    const [appStatusState, appStatusDispatch] = useReducer(appStatusReducer, appStatusInitialState)
    const [appParametersState, appParametersDispatch] = useReducer(appParametersReducer, appParametersInitialState)
    const [citiesCanvasState, citiesCanvasDispatch] = useReducer(citiesCanvasReducer, citiesCanvasInitialState())

    return (
        <>
            <AppStatusContext.Provider value={{state: appStatusState, dispatch: appStatusDispatch}}>
                <AppParametersContext.Provider value={{state: appParametersState, dispatch: appParametersDispatch}}>
                    <CitiesCanvasContext.Provider value={{state: citiesCanvasState, dispatch: citiesCanvasDispatch}}>
                        <App/>
                    </CitiesCanvasContext.Provider>
                </AppParametersContext.Provider>
            </AppStatusContext.Provider>
        </>
    )
}

export default AppWrapper