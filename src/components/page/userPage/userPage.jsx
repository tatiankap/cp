import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../API";
import Qualities from "./../../ui/qulities";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState({});
    const history = useHistory();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleAll = () => {
        history.push(`/users/${userId}/edit`);
    };

    // eslint-disable-next-line no-prototype-builtins
    if (user.hasOwnProperty("name")) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <div>
                    <Qualities qualities={user.qualities} />
                </div>

                <span>completedMeetings: {user.completedMeetings}</span>
                <h3 className="mt-2">Rate: {user.rate}</h3>
                <button
                    onClick={handleAll}
                    className="btn btn-outline-secondary mt-2"
                >
                    Изменить
                </button>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
