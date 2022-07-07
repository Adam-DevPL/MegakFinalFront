import React from 'react';

import "./styles/SingleProject.css";

interface Props {
    projectName: string;
    id: string;
    selectProject: (id: string) => void;
    selectedId: string;
}

export const SingleItem = (props: Props) => {

    return (
        <li onClick={() => props.selectProject(props.id)} key={props.id}
            className={((props.selectedId === props.id)) ? "projects-list projects-list--active" : "projects-list"}>{props.projectName}</li>
    )
}