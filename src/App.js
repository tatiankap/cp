import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./API";

export default function App() {
    const [users, setUsers] = useState();

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
    }, []);

    return (
        <div>
            {users && (
                <Users
                    users={users}
                    handleDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                />
            )}
        </div>
    );
}
