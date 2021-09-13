import React from "react";

const BookMark = ({ status = false, handleToggleBookmark, id }) => {
  return (
    <button onClick={() => handleToggleBookmark(id)}>
      <i className={`bi bi-bookmark${status ? "-fill" : ""}`}></i>
    </button>
  );
};

export default BookMark;
