import React from "react";
import PropType from "prop-types";
import Quality from "./qualitie";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qual) => (
                <Quality key={qual._id} {...qual} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropType.array.isRequired
};

export default QualitiesList;
