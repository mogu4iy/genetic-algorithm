import React from 'react'
import {Arrow} from "react-konva";

const CitiesConnection = ({city1, city2, color, radius}) => {
    const city1Position = {
        x: city1.x,
        y: city1.y,
    }
    const city2Position = {
        x: city2.x,
        y: city2.y,
    }

    const dx = city1Position.x - city2Position.x;
    const dy = city1Position.y - city2Position.y;
    let angle = Math.atan2(-dy, dx);

    const arrowRadius = - radius * 1.5

    const arrowStart = {
        x: city1Position.x + -arrowRadius * Math.cos(angle + Math.PI),
        y: city1Position.y + arrowRadius * Math.sin(angle + Math.PI)
    };

    const arrowEnd = {
        x: city2Position.x + -arrowRadius * Math.cos(angle),
        y: city2Position.y + arrowRadius * Math.sin(angle)
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
            strokeWidth={3}
            pointerWidth={6}
        />
    );
};

export default CitiesConnection