import React, {useContext} from "react";
import {appCreateCitiesAction, AppStatusContext} from "../../storage/AppStatus";
import {AppParametersContext} from "../../storage/AppParameters";
import {CitiesCanvasContext} from "../../storage/CitiesCanvas";
import {AlgorithmDataContext, createCityAction} from "../../storage/AlgorithmData";
import CitiesStage from "../CitiesStage";

const citiesConfig = {
    circle: {
        radius: 30,
        color: 'blue'
    },
    start: {
        radius: 30
    }
}

const CreateCitiesStage = () => {
    const appStatusContext = useContext(AppStatusContext)
    const appParametersContext = useContext(AppParametersContext)
    const citiesCanvasContext = useContext(CitiesCanvasContext)
    const algorithmDataContext = useContext(AlgorithmDataContext)
    console.log(appParametersContext.state)

    const createCity = ({x, y}) => {
        return {
            position: {
                x: x / citiesCanvasContext.state.width,
                y: y / citiesCanvasContext.state.height
            },
            size: {
                radius: 1 / appParametersContext.state.cities,
            },
            color: citiesConfig.circle.color,
            name: algorithmDataContext.state.cities.length
        }
    }

    const onClickHandler = (e) => {
        const eventPosition = e.target.getStage().getPointerPosition()
        algorithmDataContext.dispatch(createCityAction({
            city: createCity({x: eventPosition.x, y: eventPosition.y})
        }))
    };

    const submitCities = () => {
        appStatusContext.dispatch(appCreateCitiesAction)
    }

    return (
        <>
            <div>Click to create city</div>
            <CitiesStage onClickHandler={onClickHandler}/>
            <button onClick={submitCities}>Start</button>
        </>
    )
}

export default CreateCitiesStage