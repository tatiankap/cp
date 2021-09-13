import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./API";

export default function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        const newArr = users.filter((user) => user._id !== userId);
        setUsers(newArr);
    };
    const handleToggleBookmark = (id) => {
        const newUsers = [...users];
        newUsers.forEach((user, index) => {
            if (user._id === id) {
                newUsers[index].status = !newUsers[index].status;
            }
        });
        setUsers(newUsers);
    };

    return (
        <div>
            <SearchStatus length={users.length} />
            <Users
                users={users}
                handleDelete={handleDelete}
                handleToggleBookmark={handleToggleBookmark}
            />
        </div>
    );
}
