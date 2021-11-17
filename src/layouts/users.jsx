import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage";
import UserPageEdit from "../components/page/userPageEdit";

const Users = () => {
    const { id, edit } = useParams();

    return <>{edit ? <UserPageEdit userId={id} /> : id ? <UserPage userId={id} /> : <UsersListPage />}</>;
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
