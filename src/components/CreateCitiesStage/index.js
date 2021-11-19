import React, {useContext, useReducer} from "react";
import {
    appCreateCitiesAction,
    AppStatusContext
} from "../../storage/AppStatus";
import {
    AppParametersContext
} from "../../storage/AppParameters";
import {
    CitiesCanvasContext
} from "../../storage/CitiesCanvas";
import {
    AlgorithmDataContext,
    createCityAction
} from "../../storage/AlgorithmData";
import CitiesStage from "../CitiesStage";

import {CITIES} from "../../config";

const CreateCitiesStage = () => {
    const appStatusContext = useContext(AppStatusContext)
    const appParametersContext = useContext(AppParametersContext)
    const citiesCanvasContext = useContext(CitiesCanvasContext)
    const algorithmDataContext = useContext(AlgorithmDataContext)
    const [cities, setNewCity] = useReducer((state) => {
            const newState = state + 1
            if (appParametersContext.state.cities === state + 1) {
                appStatusContext.dispatch(appCreateCitiesAction)
                return newState
            }
            return newState
        }, 0
    )

    function createCity({x, y, start = false}) {
        const city = {
            position: {
                x: x / citiesCanvasContext.state.width,
                y: y / citiesCanvasContext.state.height
            },
            size: {
                radius: CITIES.radiusScale / appParametersContext.state.cities,
            },
            color: CITIES.color,
            name: algorithmDataContext.state.cities.length
        }
        if (start) {
            city.start = true
            city.color = CITIES.start.color
        }
        return city
    }

    const onClickHandler = (e) => {
        const eventPosition = e.target.getStage().getPointerPosition()
        const x = eventPosition.x
        const y = eventPosition.y
        const xP = ((x / citiesCanvasContext.state.width) / (CITIES.radiusScale / appParametersContext.state.cities))
        const yP = ((y / citiesCanvasContext.state.height) / (CITIES.radiusScale / appParametersContext.state.cities))
        let radiusP = (1 / (CITIES.radiusScale / appParametersContext.state.cities)) - 1
        if (xP <= 1 || xP >= radiusP || yP <= 1 || yP >= radiusP) {
            return
        }
        algorithmDataContext.dispatch(createCityAction({
            city: createCity({x: eventPosition.x, y: eventPosition.y, start: cities === 0})
        }))
        setNewCity()
    };

    return (
        <>
            <div>Click to create city</div>
            <CitiesStage onClickHandler={onClickHandler}/>
        </>
    )
}

export default CreateCitiesStage