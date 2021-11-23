import React, { useState, useEffect } from "react";
import SelectField from "./../../common/form/selectField";
import api from "./../../../API";
import MessageField from "./../../common/form/messageField";
import PropTypes from "prop-types";
import { validator } from "./../../../utils/validator";

const AddComment = ({ onAdd }) => {
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        userId: "",
        content: ""
    });

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Имя обьязательно к заполнению"
            }
        },
        content: {
            isRequired: {
                message: "Комментарий обьязателен к заполнению"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validate();
        const errors = validator(data, validatorConfig);
        if (!errors.userId && !errors.content) {
            onAdd({
                ...data
            });
            setData({ userId: "", content: "" });
        }
    };

    useEffect(() => {
        api.users
            .fetchAll()
            .then((data) =>
                setUsers(
                    data.map((user) => ({ name: user.name, value: user._id }))
                )
            );
    }, []);

    return (
        <form className="card-body" onSubmit={handleSubmit}>
            <div>
                <h2>New comment</h2>
                <SelectField
                    onChange={handleChange}
                    value={data.userId}
                    options={users}
                    name="userId"
                    error={errors.userId}
                    defaultOption="Выберите пользователя"
                />

                <MessageField
                    onChange={handleChange}
                    label="Сообщение"
                    name="content"
                    error={errors.content}
                    value={data.content}
                />
                <button type="submit" className="btn btn-primary">
                    Опубликовать
                </button>
            </div>
        </form>
    );
};

AddComment.propTypes = {
    pageId: PropTypes.string,
    onAdd: PropTypes.func
};

export default AddComment;
