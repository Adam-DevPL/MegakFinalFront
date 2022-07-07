import React, {FormEvent, useState} from 'react';
import {NewProjectEntity} from 'types';
import {FetchDataApi} from "../../utils/FetchDataApi";

import "./AddProject.css";

interface Props {
    refresh: () => void;
}

export const AddProject = (props: Props) => {
    const [projectName, setProjectName] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);


    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            await FetchDataApi.postData<NewProjectEntity>("/project", {
                projectName,
            });
        } finally {
            setLoading(false);
            props.refresh();
            setProjectName("");
        }
    };

    if (loading) {
        return <h2>Loading....</h2>
    }

    return (
        <form className="add-project" onSubmit={sendForm}>
            <input
                type="text"
                className="add-project__list"
                placeholder="new project name"
                aria-label="create new list"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
            />
            <button className="add-project__btn">＋</button>
        </form>
    );
}