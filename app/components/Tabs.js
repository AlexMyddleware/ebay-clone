// directory: C:\cplusplusfiles\ebayclone\app\components\Tabs.js

'use client'
import { useCart } from "../context/cart"
import { toast } from "react-toastify"
import "@/app/styles/Tabs.css";
import React from "react";

const Tabs = () => {
    return (
        <div>
            <div className="container">
                <div className="bloc-tabs">
                    <button className="tabs active-tabs">
                        Education
                    </button>
                    <button className="tabs">
                        Experience
                    </button>
                    <button className="tabs">
                        Skills
                    </button>
                </div>
                <div className="content-tabs">
                    <div className="content active-content">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;