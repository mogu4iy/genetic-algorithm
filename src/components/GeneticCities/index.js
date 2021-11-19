import React, {useContext, useEffect, useReducer} from "react";
import {POPULATION, ALGORITHM} from "../../config";
import {
    generateRandomColor,
    crossover,
    generateNewWay,
    getBestWay, equals, factorial
} from "../../utils";
import {
    appFinishAction,
    AppStatusContext
} from "../../storage/AppStatus";
import {AppParametersContext} from "../../storage/AppParameters";
import {CitiesCanvasContext} from "../../storage/CitiesCanvas";
import {
    AlgorithmDataContext,
    createPopulationAction,
    makeWayLastAction
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
        for (let i = 0; i < Math.min(factorial(algorithmDataContext.state.cities.length - 1), POPULATION.count); i++) {
            let newWay = generateNewWay({
                cities: algorithmDataContext.state.cities,
            })
            while (newPopulation.some((way) => equals(way, newWay))) {
                newWay = generateNewWay({
                    cities: algorithmDataContext.state.cities,
                })
            }
            newPopulation.push(newWay)
        }
        const {way, score} = getBestWay(newPopulation)
        algorithmDataContext.dispatch(createPopulationAction({
            population: newPopulation,
            way: way,
            score: score,
            color: newColor
        }))
    }

    useEffect(() => {
        if (algorithmDataContext.state.overFitting >= ALGORITHM.overFitting - 1){
            console.log('finish by the reason of overFitting')
            algorithmDataContext.dispatch(makeWayLastAction())
            appStatusContext.dispatch(appFinishAction)
            return
        }
        if (appParametersContext.state.iterations === iteration - 1) {
            console.log('finish by the reason of iterations are limited')
            algorithmDataContext.dispatch(makeWayLastAction())
            appStatusContext.dispatch(appFinishAction)
            return
        }
        setIteration()
        if (algorithmDataContext.state.populations.length === 0) {
            console.log('initial population created')
            generateNewPopulation() // generate initial population
            return
        }
        let newColor = generateRandomColor()
        while (algorithmDataContext.state.colors.includes(newColor)) {
            newColor = generateRandomColor()
        } // generate color for new way
        const newPopulation = crossover({
            population: algorithmDataContext.state.populations[algorithmDataContext.state.populations.length - 1],
            color: newColor,
            citiesNum: appParametersContext.state.cities,
        }) // crossover new population
        if (newPopulation.length === 0 || !newPopulation) {
            console.log('finish by the reason of no more ways can be created')
            algorithmDataContext.dispatch(makeWayLastAction())
            appStatusContext.dispatch(appFinishAction)
            return
        }
        const {way, score} = getBestWay(newPopulation) // find best population way
        if (newPopulation.length === 1) {
            console.log('finish by the reason of that only 1 way can be created')
            algorithmDataContext.dispatch(createPopulationAction({
                population: newPopulation,
                way: way,
                score: score,
                color: newColor,
                last: iteration === appParametersContext.state.iterations - 1
            }))
            console.log([
                new Array(25).fill('-').join(''),
                `iteration : ${iteration}`,
                `best population way distance : ${score}`,
                `population color : ${newColor}`,
                `population length: ${newPopulation.length}`].join('\n'))
            algorithmDataContext.dispatch(makeWayLastAction())
            appStatusContext.dispatch(appFinishAction)
            return
        }
        // setTimeout(() => {
        algorithmDataContext.dispatch(createPopulationAction({
            population: newPopulation,
            way: way,
            score: score,
            color: newColor,
            last: iteration === appParametersContext.state.iterations - 1
        }))
        // }, 0) // timeout for best view
        console.log([
            new Array(25).fill('-').join(''),
            `iteration : ${iteration}`,
            `best population way distance : ${score}`,
            `population color : ${newColor}`,
            `population length: ${newPopulation.length}`].join('\n'))
    }, [algorithmDataContext.state])

    return (
        <>
            <CitiesStage onClickHandler={() => {
            }}/>
        </>
    )
}

export default GeneticCities