import React, { useState } from "react";
import api from "../API";

export default function Users() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    const newArr = users.filter((user) => user._id !== userId);
    setUsers(newArr);
  };

  const renderPhrase = (number) => {
    return number
      ? number >= 2 && number <= 4
        ? `${number} человека тусанут с тобой сегодня`
        : `${number} человек тусанет с тобой сегодня`
      : "Никто с тобой не тусанет";
  };

  return (
    <>
      <span className={`badge bg-${users.length ? "primary" : "danger"}`}>
        {renderPhrase(users.length)}
      </span>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Професия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <th scope="row">{user.name}</th>
                <td>
                  {user.qualities.map((quality) => (
                    <span
                      key={quality._id}
                      className={`badge bg-${quality.color}`}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
