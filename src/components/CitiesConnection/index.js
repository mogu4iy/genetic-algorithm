import React from 'react'
import {Arrow} from "react-konva";
import {getDistanceBetweenCities} from "../../utils";

const CitiesConnection = ({city1, city2, color, radius, strokeWidth}) => {
    const dx = city1.x - city2.x;
    const dy = city1.y - city2.y;
    let angle = Math.atan2(-dy, dx);

    let arrowRadius = - radius * 1.5
    if (radius > getDistanceBetweenCities({x: city1.x, y: city1.y}, {x: city2.x, y: city2.y})){
        console.log('radius')
    }

    const arrowStart = {
        x: city1.x + -arrowRadius * Math.cos(angle + Math.PI),
        y: city1.y + arrowRadius * Math.sin(angle + Math.PI)
    };

    const arrowEnd = {
        x: city2.x + -arrowRadius * Math.cos(angle),
        y: city2.y + arrowRadius * Math.sin(angle)
    };

    return (
        <Arrow
            tension={1}
            points={[
                arrowStart.x,
                arrowStart.y,
                arrowEnd.x,
                arrowEnd.y
            ]}
            stroke={color}
            fill={color}
            strokeWidth={strokeWidth}
            pointerWidth={6}
        />
    );
};

export default CitiesConnection