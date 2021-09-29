import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { button } from "bootstrap";
import QualitiesList from "./qualitiesList";
import PropTypes from "prop-types";
import api from "./../API";

const UserPage = ({ users }) => {
    const { id } = useParams();
    const history = useHistory();

    const [user, setUser] = useState({});

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    const handleAll = () => {
        history.push("/users");
    };

    // eslint-disable-next-line no-prototype-builtins
    if (user?.hasOwnProperty("name")) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <div>
                    <QualitiesList qualities={user.qualities} />
                </div>

                <span>completedMeetings: {user.completedMeetings}</span>
                <h3 className="mt-2">Rate: {user.rate}</h3>
                <button
                    onClick={handleAll}
                    className="btn btn-outline-secondary mt-2"
                >
                    Все Пользователи
                </button>
            </div>
        );
    }
    return <h1>Loading</h1>;
};

UserPage.propTypes = {
    users: PropTypes.array
};

export default UserPage;
