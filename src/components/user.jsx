import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import BookMark from "./bookMark";

const User = ({
    _id,
    name,
    status = false,
    qualities,
    profession,
    completedMeetings,
    rate,
    handleDelete,
    ...rest
}) => {
    return (
        <tr>
            <th scope="row">{name}</th>
            <td>
                {qualities.map((quality) => (
                    <Qualitie key={quality._id} {...quality} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <BookMark status={status} id={_id} {...rest} />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    status: PropTypes.bool,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default User;
