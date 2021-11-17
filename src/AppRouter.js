import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";

const AppRouter = () => {
    return (
        <Switch>
            <Route path="/" component={Main} exact></Route>
            <Route path="/login/:type?" component={Login}></Route>
            <Route path="/users/:id?/:edit?" render={(props) => <Users {...props}/>}></Route>
        </Switch>
    );
};

export default AppRouter;
