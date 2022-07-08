import React, {FormEvent, useState} from 'react';
import {NewTaskEntity} from 'types';
import {FetchDataApi} from "../../utils/FetchDataApi";

import "./AddTask.css";

interface Props {
    projectId: string;
    refresh: () => void;
}

export const AddTask = (props: Props) => {

    const [form, setForm] = useState<NewTaskEntity>({
        taskName: "",
        completed: false,
        projectId: "",
    });

    const [loading, setLoading] = useState<boolean>(false);


    const updateForm = (value: any) => {
        setForm({
            taskName: value,
            completed: false,
            projectId: props.projectId,
        });
    };

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            await FetchDataApi.postData<NewTaskEntity>("/task", form);

        } finally {
            setLoading(false);
            props.refresh();
            setForm({taskName: "", completed: false, projectId: ""});
        }
    };


    if (loading) {
        return <h2>Loading....</h2>
    }
    return (
        <form onSubmit={sendForm} className="form-container">
            <input
                type="text"
                className="input"
                placeholder='Task to be done...'
                value={form.taskName}
                onChange={e => updateForm(e.target.value)}
            />
            <button className="submit-btn">Add</button>
        </form>
    );
}