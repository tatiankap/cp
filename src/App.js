import React from "react";
import NavBar from "./components/ui/navBar";
// import Users from "./components/users";
import AppRouter from "./AppRouter";

export default function App() {
    return (
        <div className="m-2">
            <NavBar />
            <AppRouter />
        </div>
    );
}
