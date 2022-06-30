import React from 'react';
import "./index.css"

export const App = () => (
    <div className="main-container">
        <div className="all-tasks">
            <h2 className="taks-list-title">Projects</h2>
            <ul className="task-list">
                <li className="active-list">Youtube</li>
                <li>Work</li>
                <li>Grocery</li>
            </ul>

            <form action="">
                <input type="text" className="new list" placeholder="new project name" aria-label="create new list"/>
                <button className="btn list">+</button>
            </form>
        </div>

        <div className="todo-list">
            <h2 className="todo-header">TO-DO</h2>
            <form action="" className="form-container">
                <input type="text" className="input" placeholder='Task to be done...'/>
                <button className="submit-btn">Add</button>
            </form>
            <div className="todo-container">
                <input type="checkbox" className="check-box"/>
                <p className="task-text">Filmik</p>
                <button className="edit-todo">✎</button>
                <button className="remove-todo">Ⅹ</button>
            </div>
            <div className="todo-container">
                <input type="checkbox" className="check-box"/>
                <p className="task-text">WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW</p>
                <button className="edit-todo">✎</button>
                <button className="remove-todo">Ⅹ</button>
            </div>
        </div>

    </div>
);