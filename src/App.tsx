import React from 'react';
import "./index.css"
import {Route, Routes} from "react-router-dom";
import {HomeView} from "./views/HomeView";
import {NotFoundView} from "./views/NotFoundView";

export const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomeView/>}/>
                <Route path="*" element={<NotFoundView/>}/>
            </Routes>
        </>
    )
};
// <">

// </div>
