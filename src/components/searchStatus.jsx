import React from "react";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    return number
      ? number >= 2 && number <= 4
        ? `${number} человека тусанут с тобой сегодня`
        : `${number} человек тусанет с тобой сегодня`
      : "Никто с тобой не тусанет";
  };

  return (
    <span className={`badge bg-${length ? "primary" : "danger"}`}>
      {renderPhrase(length)}
    </span>
  );
};

export default SearchStatus;
