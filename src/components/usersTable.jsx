import React from "react";
import PropTypes from "prop-types";
// import User from "./user";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import BookMark from "./bookMark";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    handleDelete,
    ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: { name: "Качества" },
        profession: { path: "profession.name", name: "Професия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };

    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort }} columns={columns} />
            <TableBody {...{ columns, data: users }} />
            {/* <tbody>
                {users.map((user) => {
                    return <User {...rest} {...user} key={user._id} />;
                })}
            </tbody> */}
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default UsersTable;
