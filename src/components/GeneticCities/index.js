import React, {useContext, useEffect, useReducer} from "react";
import {POPULATION} from "../../config";
import {
    generateRandomColor,
    crossover,
    generateNewWay,
    getBestWay
} from "../../utils";
import {
    appFinishAction,
    AppStatusContext
} from "../../storage/AppStatus";
import {AppParametersContext} from "../../storage/AppParameters";
import {CitiesCanvasContext} from "../../storage/CitiesCanvas";
import {
    AlgorithmDataContext,
    createPopulationAction
} from "../../storage/AlgorithmData";
import CitiesStage from "../CitiesStage";

const GeneticCities = () => {
    const appStatusContext = useContext(AppStatusContext)
    const appParametersContext = useContext(AppParametersContext)
    const citiesCanvasContext = useContext(CitiesCanvasContext)
    const algorithmDataContext = useContext(AlgorithmDataContext)
    const [iteration, setIteration] = useReducer(state => {
        return state + 1
    }, 0)

    const generateNewPopulation = () => {
        const newPopulation = []
        let newColor = generateRandomColor()
        while (algorithmDataContext.state.colors.includes(newColor)) {
            newColor = generateRandomColor()
        }
        for (let i = 0; i < POPULATION.count; i++) {
            newPopulation.push(generateNewWay({
                cities: algorithmDataContext.state.cities,
            }))
        }
        const {way, score} = getBestWay({
            population: newPopulation
        })
        algorithmDataContext.dispatch(createPopulationAction({
            population: newPopulation,
            way: way,
            score: score,
            color: newColor
        }))
    }

    useEffect(() => {
        if (appParametersContext.state.iterations === iteration) {
            appStatusContext.dispatch(appFinishAction)
            return
        }
        console.log(appParametersContext.state.iterations, iteration)
        setIteration()
        if (algorithmDataContext.state.populations.length === 0) {
            console.log('initial population')
            generateNewPopulation() // generate initial population
            return
        }
        let newColor = generateRandomColor()
        while (algorithmDataContext.state.colors.includes(newColor)) {
            newColor = generateRandomColor()
        } // generate color for new way
        const newPopulation = crossover({
            population: algorithmDataContext.state.populations.at(-1),
            color: newColor,
            citiesNum: appParametersContext.state.cities,
        }) // crossover new population
        const {way, score} = getBestWay({
            population: newPopulation
        }) // find best population way
        setTimeout(() => {
            algorithmDataContext.dispatch(createPopulationAction({
                population: newPopulation,
                way: way,
                score: score,
                color: newColor,
                last: iteration === appParametersContext.state.iterations - 1
            }))
        }, 1000) // timeout for best view
    }, [algorithmDataContext.state])

    return (
        <>
            <CitiesStage onClickHandler={() => {
            }}/>
        </>
    )
}

export default GeneticCities