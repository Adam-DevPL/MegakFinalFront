import React, {createContext, useState} from "react";
import { ProjectEntity } from "types";
import {Project} from "../components/Project/Project";
import {Task} from "../components/Task/Task";
import {FetchDataApi} from "../utils/FetchDataApi";

import "./HomeView.css"

interface AppContextType {
    projectId: string;
    setProjectId: (id: string) => void;
    refreshListOfProjects: () => void;
    errorMsg: string;
    isLoading: boolean;
    lists: ProjectEntity[] | null;
    setErrorMsg: (msg: string) => void;
    setIsLoading: (msg: boolean) => void;
    setLists: (projects: ProjectEntity[]) => void;
}

export const AppContext = createContext<AppContextType | null>(null);


export const HomeView = () => {
    const [projectId, setProjectId] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [lists, setLists] = useState<ProjectEntity[] | null>(null)


    const refreshListOfProjects = async () => {

        setIsLoading(true);
        const projectsTest = await FetchDataApi.getData('/project');
        setIsLoading(false);

        if (projectsTest.errorMsg !== "") {
            setErrorMsg(projectsTest.errorMsg)
            return;
        }

        setLists(projectsTest.data.projects);
    };

    return (
        <div className="main-container">
            <AppContext.Provider value={
                {
                    projectId,
                    setProjectId,
                    refreshListOfProjects,
                    errorMsg,
                    isLoading,
                    lists,
                    setErrorMsg,
                    setIsLoading,
                    setLists,
                }
            }>
                <Project/>
                <Task/>
            </AppContext.Provider>
        </div>
    )
};