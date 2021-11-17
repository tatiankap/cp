import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import api from "../../../API";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import { useParams } from "react-router";
import UserPage from "../userPage/userPage";

const UsersListPage = () => {
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState();
    const [searchValue, setSearchValue] = useState("");

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
        setCurrentPage(1);
    }, [selectedProf, searchValue]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        if (searchValue !== "") setSearchValue("");
    };

    const clearFilter = () => {
        setSelectedProf();
        setSearchValue();
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearch = ({ target }) => {
        setSearchValue(target.value);
        setSelectedProf();
    };

    if (users) {
        const filteredUsers = searchValue
            ? users.filter((user) =>
                user.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            : selectedProf
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
                                <div className="input-group">
                                    <input
                                        className="w-100"
                                        type="text"
                                        id=""
                                        name=""
                                        value={searchValue}
                                        placeholder="Search...."
                                        onChange={handleSearch}
                                    />
                                </div>
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

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
