import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../views/HomeView";
import {FetchDataApi} from "../../utils/FetchDataApi";
import {TaskEntity} from 'types';
import {TaskList} from "./TaskList";
import {AddTask} from "../AddTask/AddTask";

import "./styles/Task.css";
import {ErrorPopup} from "../Popup/ErrorPopup";


export const Task = () => {
    const [tasksList, setTasksList] = useState<TaskEntity[] | null>(null)
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(AppContext);

    const refreshGifts = async () => {

        setIsLoading(true);
        const tasksTest = await FetchDataApi.getData('/tasks');
        setIsLoading(false);

        if (tasksTest.errorMsg !== "") {
            setErrorMsg(tasksTest.errorMsg)
            return;
        }

        setTasksList(tasksTest.data.tasks);
    };

    useEffect(() => {
        refreshGifts();
    }, []);

    if (!context) return null;

    const {projectId} = context;


    return (
        <div className="tasks">
            <h2 className="tasks__title">To Do</h2>
            {projectId &&
            <AddTask projectId={projectId} refresh={refreshGifts}/>}
            {isLoading && <h2>Loading...</h2>}
            {!isLoading && (errorMsg !== "") ? (<ErrorPopup errorMsg={errorMsg} />) :
                (
                    tasksList !== null &&
                    <TaskList tasks={tasksList} selectedProject={projectId} refresh={refreshGifts}/>
                )}
        </div>
    );
}