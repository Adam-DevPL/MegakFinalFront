import React, {useState} from 'react';
import {TaskEntity} from 'types';
import {SingleTask} from "./SingleTask";
import {DeleteItem} from "../Popup/DeleteItem";

interface Props {
    tasks: TaskEntity[];
    selectedProject: string;
    refresh: () => void;
}

export const TaskList = (props: Props) => {

    const [showPopup, setShopPopUp] = useState(false);

    return (
        <>
            {props.tasks && props.tasks.filter(task => task.projectId === props.selectedProject).map(ele => (
                <SingleTask key={ele.id} name={ele.taskName} completed={ele.completed} id={ele.id}
                            projectId={ele.projectId}
                            refresh={props.refresh}/>
            ))}
            <button className="delete-list" onClick={() => setShopPopUp(true)}>Delete ALL</button>
            {showPopup &&
                <DeleteItem
                    text="Delete project"
                    typeOfItem="project"
                    itemId={props.selectedProject}
                    setShopPopUp={setShopPopUp}
                    refresh={props.refresh}
                />
            }
        </>
    );
}