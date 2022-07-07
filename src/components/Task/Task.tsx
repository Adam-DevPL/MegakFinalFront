import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../views/HomeView";
import {FetchDataApi} from "../../utils/FetchDataApi";
import {TaskEntity} from 'types';
import {TaskList} from "./TaskList";
import {AddTask} from "../AddTask/AddTask";


export const Task = () => {
    const [tasksList, setTasksList] = useState<TaskEntity[] | null>(null)
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const context = useContext(AppContext);

    const refreshGifts = async () => {

        setIsLoading(true);
        const tasksTest = await FetchDataApi.getData('/task');
        // console.log(tasksTest.data.tasks);
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
        <div className="todo-list">
            <h2 className="todo-header">To Do</h2>
            {projectId &&
            <AddTask projectId={projectId} refresh={refreshGifts}/>}
            {isLoading && <h2>Loading...</h2>}
            {!isLoading && (errorMsg !== "") ? (<p>{errorMsg}</p>) :
                (
                    tasksList !== null &&
                    <TaskList tasks={tasksList} selectedProject={projectId} refresh={refreshGifts}/>
                )}
        </div>
    );
}