import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";
// import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    // const validateScheme = yup.object().shape({
    //     password: yup
    //         .string()
    //         .required("Пароль обьязателен к заполнению")
    //         .matches(
    //             /(?=.*[A-Z])/,
    //             "Пароль должен содержать хотя б одну заглавную букву"
    //         )
    //         .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя б одну цыфру")
    //         .matches(
    //             /(?=.*[!@#$%^&])/,
    //             "Пароль должен содержать 1 из специальных символов !@#$%^&"
    //         )
    //         .matches(/(?=.{8,})/, "Пароль должен содержать больше 8 символов"),
    //     email: yup
    //         .string()
    //         .required("Электронная почта обьязательна к заполнению")
    //         .email("email isnt correct")
    // });

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        // eslint-disable-next-line no-useless-return
        if (!isValid) return;
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обьязательна к заполнению"
            },
            isEmail: {
                message: "email isnt correct"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обьязателен к заполнению"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя б одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя б одну цыфру"
            },
            min: {
                message: "Пароль должен содержать больше 8 символов",
                value: 8
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        // validateScheme
        //     .validate(data, { abortEarly: false })
        //     .then(() => setErrors({}))
        //     .catch((err) => setErrors({ [err.type]: err.message }));
        setErrors(errors);

        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />

            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                name="stayOn"
                onChange={handleChange}
                value={data.stayOn}
            >
                Оставаться в системе
            </CheckBoxField>
            {/* <div>
                <div>
                    <label htmlFor="radio1">Radio 1</label>
                    <input type="radio" id="radio1" name="radio" />
                </div>
                <div>
                    <label htmlFor="radio2">Radio 2</label>
                    <input type="radio" id="radio2" name="radio" />
                </div>
            </div> */}
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
