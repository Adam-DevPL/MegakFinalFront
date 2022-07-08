import React, {useContext, useEffect} from 'react';
import {ProjectList} from "./ProjectList";
import {AddProject} from "../AddProject/AddProject";
import {AppContext} from "../../views/HomeView";

import "./styles/Project.css";
import {ErrorPopup} from "../Popup/ErrorPopup";

export const Project = () => {

    const projectsContext = useContext(AppContext);

    if (!projectsContext) throw new Error("No context");

    const {refreshListOfProjects, isLoading, errorMsg, lists} = projectsContext;


    useEffect(() => {
        refreshListOfProjects();
    }, [])

    return (
        <div className="projects">
            <h2 className="projects__title">Projects</h2>
            {isLoading && <h2>Loading...</h2>}
            {!isLoading && (errorMsg !== "") ? (<ErrorPopup errorMsg={errorMsg} />) :
                (
                    lists !== null && <ProjectList projects={lists}/>
                )}
            <AddProject refresh={refreshListOfProjects}/>
        </div>
    );
}