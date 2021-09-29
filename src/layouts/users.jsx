import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import api from "../API";
import GroupList from "../components/groupList";
import SearchStatus from "../components/searchStatus";
import UsersTable from "../components/usersTable";
import { useParams } from "react-router";
import UserPage from "../components/userPage";

const Users = () => {
    const params = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();

    const pageSize = 4;
    const { id } = params;

    const handleDelete = (userId) => {
        const newArr = users.filter((user) => user._id !== userId);
        setUsers(newArr);
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession.name === selectedProf.name)
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        return (
            <div className="d-flex">
                {id
                    ? (
                        <UserPage users={users} />
                    )
                    : (
                        <>
                            {professions && (
                                <div className="d-flex flex-column flex-shrink-0 p-3">
                                    <GroupList
                                        items={professions}
                                        selectedItem={selectedProf}
                                        onItemSelect={handleProfessionSelect}
                                    />
                                    <button
                                        className="btn btn-secondary mt-2"
                                        onClick={clearFilter}
                                    >
                                    Очистить
                                    </button>
                                </div>
                            )}
                            <div className="d-flex flex-column">
                                <SearchStatus length={count} />
                                {count > 0 && (
                                    <UsersTable
                                        users={usersCrop}
                                        selectedSort={sortBy}
                                        onSort={handleSort}
                                        onDelete={handleDelete}
                                        onToggleBookMark={handleToggleBookMark}
                                    />
                                )}

                                <div className="d-flex justify-content-center">
                                    <Pagination
                                        itemsCount={count}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </>
                    )}
            </div>
        );
    }
    return "loading....";
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
