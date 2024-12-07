import React from "react";
import "./Widget.scss";
import { AiOutlineArrowUp } from "react-icons/ai";

const Widget = ({ title, icon, link, total }) => {
    // Bug 1: Hardcoded diff value
    const diff = 20; // Hardcoding instead of dynamically calculating

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{title}</span>
                <span className="counter">{total}</span>
                <span className="link">{link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <AiOutlineArrowUp />
                    {diff} %
                </div>
                {/* Bug 2: Attempting to access 'icon' as a property */}
                <span>{icon.type}</span>
            </div>
        </div>
    );
};

export default Widget;
