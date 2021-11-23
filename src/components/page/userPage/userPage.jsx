import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../API";
import Qualities from "./../../ui/qulities";
import { useHistory } from "react-router-dom";
// import CommentsList from "../../ui/comments/commentsList";
// import AddComment from "../../ui/comments/addComment";
import Comments from "../../common/comments/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState({});

    const history = useHistory();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleChange = () => {
        history.push(`/users/${userId}/edit`);
    };

    return (
        <>
            {
                // eslint-disable-next-line no-prototype-builtins
                user.hasOwnProperty("name")
                    ? (
                        <div className="container">
                            <div className="row gutters-sm">
                                <div className="col-md-4 mb-3">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <button
                                                onClick={handleChange}
                                                className="position-absolute top-0 end-0 btn btn-light btn-sm"
                                            >
                                                <i className="bi bi-gear"></i>
                                            </button>
                                            <div className="d-flex flex-column align-items-center text-center position-relative">
                                                <img
                                                    src={`https://avatars.dicebear.com/api/avataaars/${(
                                                        Math.random() + 1
                                                    )
                                                        .toString(36)
                                                        .substring(7)}.svg`}
                                                    className="rounded-circle shadow-1-strong me-3"
                                                    alt="avatar"
                                                    width="65"
                                                    height="65"
                                                />
                                                <div className="mt-3">
                                                    <h4>{user.name}</h4>
                                                    <p className="text-secondary mb-1">
                                                        {user.profession.name}
                                                    </p>
                                                    <div className="text-muted">
                                                        <i
                                                            className="bi bi-caret-down-fill text-primary"
                                                            role="button"
                                                        ></i>
                                                        <i
                                                            className="bi bi-caret-up text-secondary"
                                                            role="button"
                                                        ></i>
                                                        <span className="ms-2">
                                                            {user.rate}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card mb-3">
                                        <div className="card-body d-flex flex-column justify-content-center text-center">
                                            <h5 className="card-title">
                                                <span>Qualities</span>
                                            </h5>
                                            <p className="card-text">
                                                <Qualities
                                                    qualities={user.qualities}
                                                />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="card mb-3">
                                        <div className="card-body d-flex flex-column justify-content-center text-center">
                                            <h5 className="card-title">
                                                <span>Completed meetings</span>
                                            </h5>

                                            <h1 className="display-1">
                                                {user.completedMeetings}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <Comments userId={userId} />
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        <h1>Loading</h1>
                    )
            }
        </>
    );

    // <div>
    //             <h1>{user.name}</h1>
    //             <h2>Профессия: {user.profession.name}</h2>
    //             <div>
    //                 <Qualities qualities={user.qualities} />
    //             </div>

    //             <span>completedMeetings: {user.completedMeetings}</span>
    //             <h3 className="mt-2">Rate: {user.rate}</h3>
    //             <button
    //                 onClick={handleAll}
    //                 className="btn btn-outline-secondary mt-2"
    //             >
    //                 Изменить
    //             </button>
    //         </div>
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
