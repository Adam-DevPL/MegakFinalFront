import {Link} from "react-router-dom";

import "./NotFoundView.css";

export const NotFoundView = () => {
    return <>
        <div className="error-page">
            <h1>404 Error Page</h1>
            <p>Sorry, this page doesn't exist</p>
            <Link to="/">Go back</Link>
        </div>
    </>;
}