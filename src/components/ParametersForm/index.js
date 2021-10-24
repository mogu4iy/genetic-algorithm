import React, {useCallback, useContext} from 'react'
import {useFormik} from 'formik';
import {
    AppStatusContext,
    appSubmitParametersAction
} from "../../storage/AppStatus";
import {
    AppParametersContext,
    CONFIG as appParametersConfig,
    INPUT_TYPES,
    updateAppParameters
} from "../../storage/AppParameters";

import('./index.css')

const ParametersForm = () => {
    const appStatusContext = useContext(AppStatusContext)
    const appParametersContext = useContext(AppParametersContext)
    const initialValues = useCallback(() => {
        const values = {}
        Object.keys(appParametersContext.state).forEach(field => {
            values[field] = appParametersContext.state[field]
        })
        return values
    }, [])
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
            console.log(values)
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
                                <option value={option}>{option}</option>
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
                            <>
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
                            </>
                        )
                    })
                }
                <button type="submit">Start</button>
            </form>
        </>
    )
}

export default ParametersForm