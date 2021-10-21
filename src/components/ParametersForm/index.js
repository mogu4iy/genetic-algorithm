import React, {useCallback, useContext} from 'react'
import {useFormik} from 'formik';
import {
    AppStatusContext,
    appSubmitParametersAction
} from "../../storage/AppStatus";
import {
    AppParametersContext,
    updateAppParameters
} from "../../storage/AppParameters";

import('./index.css')

const ParametersForm = () => {
    const appStatusContext = useContext(AppStatusContext)
    const appParametersContext = useContext(AppParametersContext)
    const initialValues = useCallback(() => {
        const values = {}
        Object.keys(appParametersContext.state).forEach(field => {
            values[field] = appParametersContext.state[field].value
        })
        return values
    }, [])
    const validateValues = (values) => {
        const errors = {}
        Object.values(appParametersContext.state).forEach(field => {
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
            console.log(JSON.stringify(values));
            appStatusContext.dispatch(appSubmitParametersAction)
            appParametersContext.dispatch(updateAppParameters(values))
        },
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit} className={'parameters-form'}>
                {
                    Object.values(appParametersContext.state).map(field => {
                        return (
                            <div className='parameters-form-item'>
                                {field.name}
                                <label
                                    htmlFor={`input-${field.name}`}
                                >
                                    {field.name[0].toUpperCase() + field.name.slice(1)}
                                </label>
                                <input
                                    id={`input-${field.name}`}
                                    name={field.name}
                                    type={field.inputType}
                                    value={formik.values[field.name]}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors[field.name]}
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