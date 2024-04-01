// directory: C:\cplusplusfiles\ebayclone\app\components\Tabs.js

'use client'
import { useCart } from "../context/cart"
import { toast } from "react-toastify"
import "@/app/styles/Tabs.css";
import React, { useState } from "react";

const Tabs = () => {

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    }

    return (
        <div>
            <div className="container">
                <div className="bloc-tabs">
                    <button className={toggleState === 1? 'tabs active-tabs' : 'tabs'} 
                    onClick={() => toggleTab(1)}>
                        Education
                    </button>
                    <button className={toggleState === 2? 'tabs active-tabs' : 'tabs'} 
                    onClick={() => toggleTab(2)}>
                        Education
                    </button>
                    <button className={toggleState === 3? 'tabs active-tabs' : 'tabs'} 
                    onClick={() => toggleTab(3)}>
                        Education
                    </button>
                </div>
                <div className="content-tabs">
                    <div className={setToggleState === 1 ? 'content active-content' : 'content'}>
                        <h2>Experience</h2>
                        <hr />
                        <li>Worked at Google</li>
                        <li>Worked at Amazon</li>
                        <li>Worked at Facebook</li>
                        <li>Worked at Microsoft</li>
                        <li>Worked at Netflix</li>
                    </div>
                    <div className={setToggleState === 2 ? 'content active-content' : 'content'}>
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
                    <div className={setToggleState === 3 ? 'content active-content' : 'content'}>
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