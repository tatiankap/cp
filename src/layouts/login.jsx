import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "./../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { target } = e;
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        // eslint-disable-next-line no-useless-return
        if (!isValid) return;

        console.log(data);
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
                message: "Парольобьязателен к заполнению"
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

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className='mb-4'>Login</h3>
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
                        <button className='btn btn-primary w-100 mx-auto' type="submit" disabled={!isValid}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
