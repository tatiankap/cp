import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../API";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radio.Field";
import MultiSelectField from "./../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState({});

    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

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
        },
        profession: {
            isRequired: {
                message: "It is very important to chooose your profession!"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без лицензионного соглашения"
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

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

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
            <SelectField
                onChange={handleChange}
                options={professions}
                label="Choose profession..."
                error={errors.profession}
                value={data.profession}
                defaultOption="Choose..."
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
            />
            <MultiSelectField
                onChange={handleChange}
                options={qualities}
                name="qualities"
                label="Выберите ваши качества....."
            />
            <CheckBoxField
                name="licence"
                onChange={handleChange}
                value={data.licence}
                error={errors.licence}
            >
                Подтвердить лицензионноу соглашение
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

export default RegisterForm;
