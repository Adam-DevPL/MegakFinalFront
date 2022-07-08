import React, {useState} from 'react';
import {TaskEntity} from 'types';
import {SingleTask} from "./SingleTask";
import {DeleteItem} from "../Popup/DeleteItem";
import {DeleteBtn} from "../Button/DeleteBtn";

interface Props {
    tasks: TaskEntity[];
    selectedProject: string;
    refresh: () => void;
}

export const TaskList = (props: Props) => {

    const [showPopup, setShopPopUp] = useState(false);

    return (
        <>
            {props.tasks && props.tasks
                .filter(task => task.projectId === props.selectedProject)
                .sort((a, b) => {
                    const date1 = new Date(a.createdAt as Date);
                    const date2 = new Date(b.createdAt as Date);
                    return Number(date1) - Number(date2);
                })
                .map(ele => (
                    <SingleTask
                        key={ele.id}
                        name={ele.taskName}
                        completed={ele.completed}
                        id={ele.id}
                        projectId={ele.projectId}
                        refresh={props.refresh}
                    />
                ))}
            <DeleteBtn
                setShopPopup={setShopPopUp}
            >
                Delete All
            </DeleteBtn>
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