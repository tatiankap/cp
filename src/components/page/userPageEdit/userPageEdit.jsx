import React, { useState, useEffect } from "react";
// import RegisterForm from "../../ui/registerForm";
import MultiSelectField from "./../../common/form/multiSelectField";
import api from "./../../../API";
import RadioField from "../../common/form/radio.Field";
import SelectField from "../../common/form/selectField";
import TextField from "./../../common/form/textField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { validator } from "./../../../utils/validator";

const UserPageEdit = ({ userId }) => {
    const history = useHistory();

    const [data, setData] = useState({});
    const [professions, setProfessions] = useState();
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState({});

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обьязательна к заполнению"
            },
            isEmail: {
                message: "email isnt correct"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        if (target.name[0] === "profession") {
            const optionsArray =
                !Array.isArray(professions) && typeof professions === "object"
                    ? Object.keys(professions).map((optionName) => ({
                        name: professions[optionName].name,
                        _id: professions[optionName]._id
                    }))
                    : professions;

            setData((prev) => ({
                ...prev,
                [target.name]: optionsArray.find(
                    (profession) => profession._id === target.value
                )
            }));
        } else if (target.name === "qualities") {
            const optionsArray =
                !Array.isArray(qualities) && typeof qualities === "object"
                    ? Object.keys(qualities).map((optionName) => ({
                        name: qualities[optionName].name,
                        _id: qualities[optionName]._id,
                        color: qualities[optionName].color
                    }))
                    : qualities;
            setData((prev) => ({
                ...prev,
                [target.name]: target.value.map((value) =>
                    optionsArray.find((qulity) => qulity._id === value.value)
                )
            }));
        } else {
            setData((prev) => ({ ...prev, [target.name]: target.value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/users/${data._id}`);
        api.users.update(data._id, data);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
        api.users.getById(userId).then((data) => {
            setData(data);
        });
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    return (
        <form
            onSubmit={handleSubmit}
            className="shadow p-3 m-5 bg-white rounded"
        >
            {Object.prototype.hasOwnProperty.call(data, "name") &&
            professions &&
            qualities
                ? (
                    <>
                        <TextField
                            label="Имя"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            type="text"
                            value={data.email}
                            error={errors.email}
                            onChange={handleChange}
                        />
                        <SelectField
                            onChange={handleChange}
                            options={professions}
                            label="Выбери свою профессию"
                            value={data.profession._id}
                            defaultOption="Выбери свою профессию"
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
                            values={data.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                        >
                        Обновить
                        </button>
                    </>
                )
                : (
                    <h4>Loading...</h4>
                )}
        </form>
    );
};

UserPageEdit.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPageEdit;
