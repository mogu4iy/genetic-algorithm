import React, {useContext} from "react";
import {Circle} from 'react-konva';
import {CitiesCanvasContext} from "../../storage/CitiesCanvas";

const CityItem = ({city}) => {
    const citiesCanvasContext = useContext(CitiesCanvasContext)
    return (
        <Circle
            fill={city.color}
            radius={city.size.radius}
            x={city.position.x * citiesCanvasContext.state.width}
            y={city.position.y * citiesCanvasContext.state.height}
        />
    )
}

export default CityItem