import React, {FormEvent, useState} from 'react';
import {FetchDataApi} from "../../utils/FetchDataApi";

import "./EditPopup.css";

interface Props {
    idOfElementToDelete: string;
    taskName: string;
    handleEditTask: (show: boolean) => void;
    refresh: () => void;
}

export const EditPopup = (props: Props) => {

    const [name, setName] = useState<string>(props.taskName);

    const updateForm = (value: any) => {
        setName(value);
    };

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await FetchDataApi.updateData(`/task/${props.idOfElementToDelete}`, {
                taskName: name,
            });
        } finally {
            props.handleEditTask(false);
            props.refresh();
        }
    };

    const cancelUpdate = () => {
        props.handleEditTask(false);
    }

    return (
        <div className="edit-popup">
            <div className="edit-popup__inner">
                <form onSubmit={sendForm} className="form-container">
                    <input
                        type="text"
                        className="input"
                        placeholder='New name for task...'
                        value={name}
                        onChange={e => updateForm(e.target.value)}
                    />
                    <button className="submit-btn">Update</button>
                </form>
                <button className="edit-cancel" onClick={cancelUpdate}>Cancel</button>
            </div>
        </div>
    );
}