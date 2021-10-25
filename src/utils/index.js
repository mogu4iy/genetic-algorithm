export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

export function generateRandomColor() {
    let color = Math.floor(Math.random() * 16777216).toString(16);
    return '#000000'.slice(0, -color.length) + color;
}

// ALGORITHM


export const getBestWay = ({population}) => {
    let bestDistance = null
    let bestWay = null
    for (let way of population) {
        let distance = 0
        way.forEach((city, index) => {
            if (index !== 0 && index !== way.length - 1) {
                distance += getDistanceBetweenCities(city, way[index - 1])
            } else if (index === way.length - 1) {
                distance += getDistanceBetweenCities(city, way[0])
            }
        })
        if (!bestDistance || (distance < bestDistance)) {
            bestDistance = distance
            bestWay = way
        }
    }
    return {
        way: bestWay,
        score: bestDistance
    }
}
export const getDistanceBetweenCities = (c1, c2) => {
    return Math.sqrt((c1.position.x - c2.position.x) ** 2 + (c1.position.y - c2.position.y) ** 2)
}
export const generateNewWay = ({cities}) => {
    return cities.filter(city => city?.start).concat(shuffleArray(cities.filter(city => !city?.start)))
}

export const panmixia = ({population}) => {
    const parentNodes = {}
    for (let i = 0; i < population.length; i++) {
        parentNodes[i] = getRandomInt(0, population.length - 1)
    }
    return parentNodes
}

const buildCycles = ({way1, way2, citiesNum}) => {
    let cycle1 = {}
    let cycle2 = {}
    let index = 0
    while (way1[index].start) {
        index++
    }
    let cycleStart = way1[index]
    while (Object.values(cycle1).filter(city => city.name === cycleStart.name).length === 0) {
        cycle1[index] = way2[index]
        index = way1.indexOf(way1.filter(city => city.name === way2[index].name)[0])
    }
    index = 0
    while ((way2[index].start || Object.values(cycle1).includes(way2[index])) && index < citiesNum - 1) {
        index++
    }
    cycleStart = way2[index]
    while (Object.values(cycle2).filter(city => city.name === cycleStart.name).length === 0) {
        cycle2[index] = way1[index]
        index = way2.indexOf(way2.filter(city => city.name === way1[index].name)[0])
    }
    return {
        cycle1,
        cycle2
    }
}

const crossoverWays = ({way1, way2, citiesNum, mutateProbability}) => {
    let newWay1 = JSON.parse(JSON.stringify(way1))
    let newWay2 = JSON.parse(JSON.stringify(way2))
    const {cycle1, cycle2} = buildCycles({way2, way1, citiesNum})
    for (let i in cycle1) {
        newWay1[i] = cycle1[i]
    }
    for (let i in cycle2) {
        newWay2[i] = cycle2[i]
    }
    return [
        mutate({
            way: newWay1,
            mutateProbability
        }),
        mutate({
            way: newWay2,
            mutateProbability
        })
    ]
}


export const crossover = ({population, citiesNum, mutateProbability}) => {
    let newPopulation = []
    const selectOperator = panmixia({population})
    for (let i of Object.keys(selectOperator)) {
        if (i === selectOperator[i]) {
            continue
        }
        const newWays = crossoverWays({
            way1: population[i],
            way2: population[selectOperator[i]],
            citiesNum,
            mutateProbability
        })
        newPopulation = newPopulation.concat(newWays)
    }
    return newPopulation
}

export const mutate = ({way, mutateProbability}) => {
    let randomMutateProbability = getRandomInt(0, 100)
    if (randomMutateProbability > mutateProbability) {
        return way
    }
    let index1 = getRandomInt(0, way.length - 1)
    let index2 = getRandomInt(0, way.length - 1)
    while (index1 === index2) {
        index1 = getRandomInt(0, way.length - 1)
        index2 = getRandomInt(0, way.length - 1)
    }
    const newWay = JSON.parse(JSON.stringify(way))
    newWay[index1] = way[index2]
    newWay[index2] = way[index1]
    return newWay
}