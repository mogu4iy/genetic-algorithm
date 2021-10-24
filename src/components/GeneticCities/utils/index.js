export const getDistanceBetweenCities = (c1, c2) => {
    return Math.sqrt((c1.position.x - c2.position.x) ** 2 + (c1.position.y - c2.position.y) ** 2)
}

