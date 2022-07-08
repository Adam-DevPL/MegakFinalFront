import React from 'react';

interface Props {
    errorMsg: string;
}

export const ErrorPopup = (props: Props) => {
    return (
        <div className="edit-popup">
            <div className="edit-popup__inner">
                {(props.errorMsg === "Not Found") ? (<h3>Tasks or projects {props.errorMsg}. Try refresh.</h3>) :
                    <h3>{props.errorMsg}</h3>
                }
            </div>
        </div>
    );
}