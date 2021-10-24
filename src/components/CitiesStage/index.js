import React, {useContext, useEffect} from "react";
import {AppStatusContext} from "../../storage/AppStatus";
import {AppParametersContext} from "../../storage/AppParameters";
import {Circle, Layer, Stage, Text} from "react-konva";
import {CitiesCanvasContext, citiesCanvasResizeAction} from "../../storage/CitiesCanvas";
import {AlgorithmDataContext} from "../../storage/AlgorithmData";

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
                                    fill={city.color}
                                    radius={city.size.radius * citiesCanvasContext.state.width}
                                    x={city.position.x * citiesCanvasContext.state.width}
                                    y={city.position.y * citiesCanvasContext.state.height}
                                />
                            )
                        })
                    }
                </Layer>
            </Stage>
        </>
    )
}

export default CitiesStage