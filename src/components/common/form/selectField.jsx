import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error,
    name = "profession"
}) => {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : " ");
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                name: options[optionName].name,
                value: options[optionName]._id
            }))
            : options;

    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id="validationCustom04"
                value={value}
                onChange={handleChange}
                name={name}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            name={option.name}
                        >
                            {option.name}
                        </option>
                    ))}
                {/* {professions &&
                    Object.keys(professions).map((professionName) => (
                        <option
                            // selected={professions[professionName]._id === data.profession}
                            key={professions[professionName]._id}
                            value={professions[professionName]._id}
                        >
                            {professions[professionName].name}
                        </option>
                    ))} */}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string
};

export default SelectField;
