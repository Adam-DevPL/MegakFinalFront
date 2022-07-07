import React, {useContext} from 'react';
import {FetchDataApi} from "../../utils/FetchDataApi";
import {AppContext} from "../../views/HomeView";

interface Props {
    text: string;
    itemId: string;
    setShopPopUp: (status: boolean) => void;
    refresh: () => void;
    typeOfItem: string;
}

export const DeleteItem = (props: Props) => {

    const projectsContext = useContext(AppContext);

    if (!projectsContext) throw new Error("No context");

    const {refreshListOfProjects, setProjectId} = projectsContext;

    const cancelDelete = () => {
        props.setShopPopUp(false);
    }

    const confirmDelete = async () => {
        try {
            if (props.typeOfItem === "project") {
                await FetchDataApi.deleteData(`/project/${props.itemId}`);
            } else if (props.typeOfItem === "task") {
                await FetchDataApi.deleteData(`/task/${props.itemId}`);
            }
        } finally {
            props.setShopPopUp(false);
            props.refresh();
            refreshListOfProjects();
            if (props.typeOfItem === "project") setProjectId("");
        }
    }

    return (
        <div className="edit-popup">
            <div className="edit-popup__inner">
                <h3>{props.text}</h3>
                <div>
                    <button className="edit-cancel btn-delete" onClick={confirmDelete}>Delete</button>
                    <button className="edit-cancel" onClick={cancelDelete}>Cancel</button>
                </div>
            </div>
        </div>
    );
}