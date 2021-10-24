import React, {useContext, useEffect} from "react";
import {AppStatusContext} from "../../storage/AppStatus";
import {AppParametersContext} from "../../storage/AppParameters";
import {CitiesCanvasContext} from "../../storage/CitiesCanvas";
import {AlgorithmDataContext} from "../../storage/AlgorithmData";
import CitiesStage from "../CitiesStage";

const GeneticCities = () => {
    const appStatusContext = useContext(AppStatusContext)
    const appParametersContext = useContext(AppParametersContext)
    const citiesCanvasContext = useContext(CitiesCanvasContext)
    const algorithmDataContext = useContext(AlgorithmDataContext)

    const onClickHandler = (e) => {
    };
    useEffect(() => {

    })
    return (
        <>
            <CitiesStage onClickHandler={onClickHandler}/>
        </>
    )
}

export default GeneticCities