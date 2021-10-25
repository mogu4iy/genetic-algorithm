import React, {useContext, useEffect} from "react";
import {AppStatusContext} from "../../storage/AppStatus";
import {AppParametersContext} from "../../storage/AppParameters";
import {Circle, Layer, Stage, Text} from "react-konva";
import {CitiesCanvasContext, citiesCanvasResizeAction} from "../../storage/CitiesCanvas";
import {AlgorithmDataContext} from "../../storage/AlgorithmData";
import CitiesConnection from "../CitiesConnection";
import {CITIES, WAYS} from "../../config";

const CitiesStage = ({onClickHandler}) => {
    const appStatusContext = useContext(AppStatusContext)
    const appParametersContext = useContext(AppParametersContext)
    const citiesCanvasContext = useContext(CitiesCanvasContext)
    const algorithmDataContext = useContext(AlgorithmDataContext)

    const checkSize = () => {
        citiesCanvasContext.dispatch(citiesCanvasResizeAction({
            width: window.innerWidth,
            height: window.innerHeight,
        }))
    };
    useEffect(() => {
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    const serializeCity = (city) => {
        return {
            x: city.position.x * citiesCanvasContext.state.width,
            y: city.position.y * citiesCanvasContext.state.height
        }
    }

    return (
        <>
            <Stage
                width={citiesCanvasContext.state.width}
                height={citiesCanvasContext.state.height}
                onClick={onClickHandler}
                onTap={onClickHandler}
            >
                <Layer>
                    {
                        algorithmDataContext.state.cities.map(city => {
                            return (
                                <Circle
                                    key={city.name}
                                    fill={city.color}
                                    radius={city.size.radius * citiesCanvasContext.state.width}
                                    x={city.position.x * citiesCanvasContext.state.width}
                                    y={city.position.y * citiesCanvasContext.state.height}
                                />
                            )
                        })
                    }
                </Layer>
                {
                    algorithmDataContext.state.ways.map(way => {
                        return (
                            <Layer>
                                {
                                    way.way.map((city, index) => {
                                        switch (index) {
                                            case 0:
                                                return (
                                                    <>
                                                    </>
                                                )
                                            case way.way.length - 1:
                                                return (
                                                    <>
                                                        <CitiesConnection
                                                            radius={(citiesCanvasContext.state.width * CITIES.radiusScale) / appParametersContext.state.cities}
                                                            city1={serializeCity(way.way[index - 1])}
                                                            city2={serializeCity(city)}
                                                            color={way.last ? WAYS.best.color : way.color}
                                                            strokeWidth={way.last ? WAYS.best.strokeWidth : WAYS.strokeWidth}
                                                        />
                                                        <CitiesConnection
                                                            radius={(citiesCanvasContext.state.width * CITIES.radiusScale) / appParametersContext.state.cities}
                                                            city1={serializeCity(city)}
                                                            city2={serializeCity(way.way[0])}
                                                            color={way.last ? WAYS.best.color : way.color}
                                                            strokeWidth={way.last ? WAYS.best.strokeWidth : WAYS.strokeWidth}
                                                        />
                                                    </>
                                                )
                                            default:
                                                return (
                                                    <CitiesConnection
                                                        radius={(citiesCanvasContext.state.width * CITIES.radiusScale) / appParametersContext.state.cities}
                                                        city1={serializeCity(way.way[index - 1])}
                                                        city2={serializeCity(city)}
                                                        color={way.last ? WAYS.best.color : way.color}
                                                        strokeWidth={way.last ? WAYS.best.strokeWidth : WAYS.strokeWidth}
                                                    />
                                                )
                                        }
                                    })
                                }
                            </Layer>
                        )
                    })
                }
            </Stage>
        </>
    )
}

export default CitiesStage