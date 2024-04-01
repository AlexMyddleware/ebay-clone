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
                        <h2>Experience</h2>
                        <hr />
                        <li>Worked at Google</li>
                        <li>Worked at Amazon</li>
                        <li>Worked at Facebook</li>
                        <li>Worked at Microsoft</li>
                        <li>Worked at Netflix</li>
                    </div>
                    <div className="content active-content">
                        <h2>Skills</h2>
                        <hr />
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>Tailwind</li>
                        <li>Bootstrap</li>
                        <li>Javascript</li>
                        <li>React</li>
                        <li>Typescript</li>
                        <li>Express</li>
                    </div>
                    <div className="content active-content">
                        <h2>Education</h2>
                        <hr />
                        <li>Computer Science</li>
                        <li>High School</li>
                        <li>School</li>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;