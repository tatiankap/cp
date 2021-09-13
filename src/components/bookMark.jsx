import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status = false, handleToggleBookmark, id }) => {
    return (
        <button onClick={() => handleToggleBookmark(id)}>
            <i className={`bi bi-bookmark${status ? "-fill" : ""}`}></i>
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired,
    handleToggleBookmark: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default BookMark;
