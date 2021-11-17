import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label, values }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                label: options[optionName].name,
                value: options[optionName]._id
            }))
            : options;
    const valuesArray = values
        ? values.map((value) => ({
            label: value.name,
            value: value._id
        }))
        : [];

    const handleChange = (value) => {
        onChange({ name, value });
    };
    return (
        <div className="mb-4">
            <label>{label}</label>
            <Select
                isMulti
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                defaultValue={valuesArray}
                name={name}
                closeMenuOnSelect={false}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    values: PropTypes.array
};

export default MultiSelectField;
