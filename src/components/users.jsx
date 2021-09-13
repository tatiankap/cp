import React, { useState } from "react";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import User from "./user";
import { paginate } from "../utils/paginate";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const count = allUsers.length;
    const pageSize = 4;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const users = paginate(allUsers, currentPage, pageSize);
    return (
        <>
            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Професия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return <User key={user._id} {...user} {...rest} />;
                        })}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
