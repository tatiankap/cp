import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./API";

export default function App() {
    const [users, setUsers] = useState();

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

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    return (
        <div>
            {users && (
                <Users
                    users={users}
                    handleDelete={handleDelete}
                    handleToggleBookmark={handleToggleBookmark}
                />
            )}
        </div>
    );
}
