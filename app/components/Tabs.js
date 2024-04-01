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
                        <p><li>Worked at Google</li></p>
                        <p><li>Worked at Amazon</li></p>
                        <p><li>Worked at Facebook</li></p>
                        <p><li>Worked at Microsoft</li></p>
                        <p><li>Worked at Netflix</li></p>
                    </div>
                    <div className="content active-content">
                        <h2>Skills</h2>
                        <hr />
                        <p><li>HTML</li></p>
                        <p><li>CSS</li></p>
                        <p><li>Tailwind</li></p>
                        <p><li>Bootstrap</li></p>
                        <p><li>Javascript</li></p>
                        <p><li>React</li></p>
                        <p><li>Typescript</li></p>
                        <p><li>Express</li></p>
                    </div>
                    <div className="content active-content">
                        <h2>Education</h2>
                        <hr />
                        <p><li>Computer Science</li></p>
                        <p><li>High School</li></p>
                        <p><li>School</li></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;