import React from "react";
import { Route, Redirect,Link } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Football.css";

export const Football = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("ncaaf_user")) {
          return (
            <>
            <div className='container'>

            <Link className="main-page"
                                to={{
                                    pathname: `/`,
                                }}>
                                <h1>NCAA Football</h1>
                            </Link>

            {/* <h1>NCAA Football</h1>   */}
              <NavBar />
              <ApplicationViews />
            </div>
             
              
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);