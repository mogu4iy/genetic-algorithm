import React, {useCallback, useContext} from 'react'
import {useFormik} from 'formik';
import {v4 as uuidv4} from 'uuid';
import {
    appCreateCitiesAction,
    AppStatusContext,
    appSubmitParametersAction
} from "../../storage/AppStatus";
import {
    AppParametersContext,
    CONFIG as appParametersConfig,
    INPUT_TYPES, NAMES,
    updateAppParameters, VALUES
} from "../../storage/AppParameters";
import {
    CITIES
} from "../../config";
import {
    getRandomInt
} from "../../utils";
import {
    AlgorithmDataContext,
    createCitiesAction
} from "../../storage/AlgorithmData";

import('./index.css')

const ParametersForm = () => {
    const appStatusContext = useContext(AppStatusContext)
    const appParametersContext = useContext(AppParametersContext)
    const algorithmDataContext = useContext(AlgorithmDataContext)
    const createRandomCity = ({index, citiesNum}) => {
        const city = {
            id: uuidv4(),
            position: {
                x: getRandomInt(Math.floor(1 / (citiesNum * 4) * 100), 100 - Math.floor(1 / (citiesNum * 4) * 100)) / 100,
                y: getRandomInt(Math.floor(1 / (citiesNum * 4) * 100), 100 - Math.floor(1 / (citiesNum * 4) * 100)) / 100
            },
            size: {
                radius: CITIES.radiusScale / citiesNum,
            },
            color: CITIES.color,
            name: index
        }
        if (index === 0) {
            city.start = true
            city.color = CITIES.start.color
        }
        return city
    }
    const initialValues = useCallback(() => {
        const values = {}
        Object.keys(appParametersContext.state).forEach(field => {
            values[field] = appParametersContext.state[field]
        })
        return values
    }, [appParametersContext.state])
    const validateValues = (values) => {
        const errors = {}
        Object.values(appParametersConfig).forEach(field => {
            const regexValidation = new RegExp(field.regex)
            if (!values[field.name]) {
                errors[field.name] = `${field.name} is required`
                return
            }
            if (!regexValidation.test(values[field.name])) {
                errors[field.name] = `${field.name} is invalid, must be a ${field.type}`
            }
        })
        return errors
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validate: validateValues,
        onSubmit: values => {
            if (values[NAMES.cities_creation] === VALUES.cities_creation.RANDOM) {
                appParametersContext.dispatch(updateAppParameters(values))
                const citiesNum = getRandomInt(CITIES.min, CITIES.max)
                const cities = []
                for (let i = 0; i < citiesNum; i++) {
                    let newCity = createRandomCity({index: i, citiesNum: citiesNum})
                    let xP = (newCity.position.x / newCity.size.radius)
                    let yP = (newCity.position.y / newCity.size.radius)
                    let radiusP = (1 / newCity.size.radius) - 1
                    while (xP <= 1 || xP >= radiusP || yP <= 1 || yP >= radiusP) {
                        newCity = createRandomCity({index: i, citiesNum: citiesNum})
                        xP = (newCity.position.x / newCity.size.radius)
                        yP = (newCity.position.y / newCity.size.radius)
                    }
                    cities.push(newCity)
                }
                values.cities = cities
                algorithmDataContext.dispatch(createCitiesAction({
                    cities: values.cities
                }))
                appStatusContext.dispatch(appCreateCitiesAction)
                return
            }
            appParametersContext.dispatch(updateAppParameters(values))
            appStatusContext.dispatch(appSubmitParametersAction)
        },
    });

    const inputSwitch = (field) => {
        switch (field.inputType) {
            case INPUT_TYPES.TEXT:
                return (
                    <input
                        id={`input-${field.name}`}
                        name={field.name}
                        type={field.inputType}
                        value={formik.values[field.name]}
                        onChange={formik.handleChange}
                    />
                )
            case INPUT_TYPES.NUMBER:
                return (
                    <input
                        id={`input-${field.name}`}
                        name={field.name}
                        type={field.inputType}
                        value={formik.values[field.name]}
                        onChange={formik.handleChange}
                    />
                )
            case INPUT_TYPES.SELECT:
                return (
                    <select
                        id={`input-${field.name}`}
                        name={field.name}
                        value={formik.values[field.name]}
                        onChange={formik.handleChange}
                    >
                        {field.options.map(option => {
                            return (
                                <option
                                    value={option}
                                    key={option}
                                >{option}</option>
                            )
                        })}
                    </select>
                )
        }
    }
    return (
        <>
            <form onSubmit={formik.handleSubmit} className={'parameters-form'}>
                {
                    Object.values(appParametersConfig).map(field => {
                        return (
                            <div key={field.name}>
                                {
                                    field.case ? (
                                        Object.keys(field.case).map(fieldCase => {
                                            return formik.values[fieldCase] === field.case[fieldCase]
                                        }).every(value => value) && (
                                            <div className='parameters-form-item'>
                                                <label
                                                    htmlFor={`input-${field.name}`}
                                                >
                                                    {field.name[0].toUpperCase() + field.name.slice(1)}
                                                </label>
                                                {inputSwitch(field)}
                                                {formik.errors[field.name]}
                                            </div>
                                        )) : (
                                        <div className='parameters-form-item'>
                                            <label
                                                htmlFor={`input-${field.name}`}
                                            >
                                                {field.name[0].toUpperCase() + field.name.slice(1)}
                                            </label>
                                            {inputSwitch(field)}
                                            {formik.errors[field.name]}
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
                <button type="submit">Start</button>
            </form>
        </>
    )
}

export default ParametersForm