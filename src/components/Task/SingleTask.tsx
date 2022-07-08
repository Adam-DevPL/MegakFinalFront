import React, {useState} from 'react';
import {SetCompletedForTask} from 'types';
import {FetchDataApi} from "../../utils/FetchDataApi";
import {EditPopup} from "../Popup/EditPopup";
import {DeleteItem} from "../Popup/DeleteItem";

import "./styles/SingleTask.css";

interface Props {
    id: string;
    name: string;
    completed: boolean;
    projectId: string;
    refresh: () => void;
}

export const SingleTask = (props: Props) => {

    const [competedTask, setCompletedTask] = useState<boolean>(props.completed);
    const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);


    const updateTaskCompleted = async (str: boolean) => {
        setCompletedTask(() => str);
        await updateTask();
    };

    const updateTask = async () => {
        await FetchDataApi.updateData(`/task/update/${props.id}`, {
            completed: !competedTask,
        } as SetCompletedForTask);
        props.refresh();
    };

    return (
        <div className="task-container">
            <input
                type="checkbox"
                className="check-box"
                defaultChecked={competedTask}
                onChange={(e) => updateTaskCompleted(e.target.checked)}
            />
            <p
                className={competedTask ? "task-text line-through" : "task-text"}
            >
                {props.name}
            </p>
            <button className="edit-todo" onClick={() => setShowEditPopup(true)}>✎</button>
            <button className="remove-todo" onClick={() => setShowDeletePopup(true)}>Ⅹ</button>
            {showEditPopup &&
                <EditPopup
                    idOfElementToDelete={props.id}
                    taskName={props.name}
                    handleEditTask={setShowEditPopup}
                    refresh={props.refresh}
                />
            }
            {showDeletePopup &&
                <DeleteItem
                    text="Delete task"
                    itemId={props.id}
                    setShopPopUp={setShowDeletePopup}
                    refresh={props.refresh}
                    typeOfItem="task"
                />
            }
        </div>
    );
}