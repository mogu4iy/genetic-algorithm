import React, {useContext} from "react";
import {Circle} from 'react-konva';
import {CitiesCanvasContext} from "../../storage/CitiesCanvas";

const CityItem = ({city}) => {
    const citiesCanvasContext = useContext(CitiesCanvasContext)
    return (
        <Circle
            fill={city.color}
            radius={city.size.radius}
            x={city.position.x}
            y={city.position.y}
        />
    )
}

export default CityItem