import React from "react";
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

export default User;
