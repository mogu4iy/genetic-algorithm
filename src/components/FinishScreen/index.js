import React, {useContext, useEffect} from 'react'
import CitiesStage from "../CitiesStage";
import {AlgorithmDataContext} from "../../storage/AlgorithmData";

const FinishScreen = () => {
    const algorithmDataContext = useContext(AlgorithmDataContext)

    useEffect(() => {
        console.log([
            new Array(50).fill('-').join(''),
            `best way distance ever : ${algorithmDataContext.state.scores[algorithmDataContext.state.scores.length - 1]}`,
            `overFitting : ${algorithmDataContext.state.overFitting}`].join('\n'))
    })
    return (
        <>
            <CitiesStage onClickHandler={() => {
            }}/>
        </>
    )
}

export default FinishScreen