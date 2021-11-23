import React from "react";
import PropTypes from "prop-types";

const MessageField = ({ label, onChange, name, value, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : " ");
    };

    return (
        <div className="mb-4">
            <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
            >
                {label}
            </label>
            <textarea
                className={getInputClasses()}
                id="exampleFormControlTextarea1"
                rows="3"
                value={value}
                name={name}
                onChange={handleChange}
            ></textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

MessageField.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
};

export default MessageField;
