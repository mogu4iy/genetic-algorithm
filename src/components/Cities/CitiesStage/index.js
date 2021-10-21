import React, {useContext, useEffect, useReducer} from "react";
import {appCreateCitiesAction, AppStatusContext} from "../../../storage/AppStatus";
import {AppParametersContext} from "../../../storage/AppParameters";
import {Circle, Layer, Stage, Text} from "react-konva";
import {CitiesCanvasContext, citiesCanvasResizeAction} from "../../../storage/CitiesCanvas";

const citiesConfig = {
    circle: {
        radius: 30,
        color: 'blue'
    }
}

const CitiesStage = () => {
    const appStatusContext = useContext(AppStatusContext)
    const appParametersContext = useContext(AppParametersContext)
    const citiesCanvasContext = useContext(CitiesCanvasContext)
    const [cities, setCities] = useReducer((state, data) => [...state, data], []);

    const createCity = ({x, y}) => {
        return {
            position: {
                x: x / citiesCanvasContext.state.width,
                y: y / citiesCanvasContext.state.height
            },
            size: {
                radius: citiesCanvasContext.state.width / citiesConfig.circle.radius,
            },
            color: citiesConfig.circle.color,
            name: cities.length
        }
    }

    const checkSize = () => {
        citiesCanvasContext.dispatch(citiesCanvasResizeAction({
            width: window.innerWidth,
            height: window.innerHeight,
        }))
    };

    const onStageClick = (e) => {
        const eventPosition = e.target.getStage().getPointerPosition()
        setCities(createCity({x: eventPosition.x, y: eventPosition.y}))
    };

    useEffect(() => {
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    const submitCities = () => {
        appStatusContext.dispatch(appCreateCitiesAction)
    }

    return (
        <>
            <Stage
                width={citiesCanvasContext.state.width}
                height={citiesCanvasContext.state.height}
                onClick={onStageClick}
                onTap={onStageClick}
            >
                <Layer>
                    <Text text="Click to create city"/>
                    {
                        cities.map(city => {
                            return (
                                <Circle
                                    fill={city.color}
                                    radius={city.size.radius}
                                    x={city.position.x * citiesCanvasContext.state.width}
                                    y={city.position.y * citiesCanvasContext.state.height}
                                />
                            )
                        })
                    }
                </Layer>
            </Stage>
            <button onClick={submitCities}>Start</button>
        </>
    )
}

export default CitiesStage