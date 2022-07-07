import React, {useContext, useState} from 'react';
import {ProjectEntity} from 'types';
import {SingleItem} from "./SingleProject";
import {AppContext} from "../../views/HomeView";

interface Props {
    projects: ProjectEntity[];
}

export const ProjectList = (props: Props) => {
    const [selectedProjectId, setSelectedProjectId] = useState<string>("");

    const context = useContext(AppContext);

    if(!context) return null;

    const {setProjectId} = context;

    const selectProject = (id: string) => {
        setSelectedProjectId(id);
        setProjectId(id);
    }

    return (
        <>
            {props.projects.map(project => (
                <SingleItem key={project.id} projectName={project.projectName} id={project.id} selectProject={selectProject} selectedId={selectedProjectId}/>))}
        </>
    );
}