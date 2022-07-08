import React from 'react';

import "./DeleteBtn.css";

interface Props {
    setShopPopup: (status: boolean) => void;
    children: React.ReactNode;
}

export const DeleteBtn = (props: Props) => {
    return (
        <button
            className="delete-btn"
            onClick={() => props.setShopPopup(true)}
        >
            {props.children}
        </button>
    );
}