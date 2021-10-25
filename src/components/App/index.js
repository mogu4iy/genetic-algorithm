import React, {useContext} from 'react'
import {
    STATUS as appStatus,
    AppStatusContext
} from "../../storage/AppStatus";
import ParametersForm from "../ParametersForm";
import FinishScreen from "../FinishScreen";
import GeneticCities from "../GeneticCities";
import CreateCitiesStage from "../CreateCitiesStage";

const App = () => {
    const appStatusContext = useContext(AppStatusContext)
    const renderSwitch = () => {
        switch (appStatusContext.state.status) {
            case appStatus.DISABLED:
                return (
                    <ParametersForm/>
                )
            case appStatus.PARAMETERS_SUBMITTED:
                return (
                    <CreateCitiesStage/>
                )
            case appStatus.CITIES_CREATED:
                return (
                    <GeneticCities/>
                )
            case appStatus.FINISHED:
                return (
                    <FinishScreen/>
                )
        }
    }

    return (
        <>
            {renderSwitch()}
        </>
    )
}

export default App