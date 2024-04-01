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
                        Deposit
                    </button>
                    <button className={toggleState === 2? 'tabs active-tabs' : 'tabs'} 
                    onClick={() => toggleTab(2)}>
                        Withdraw
                    </button>
                </div>
                <div className="content-tabs">
                    <div className={toggleState === 1 ? 'content active-content' : 'content'}>
                        <hr />
                        <h3>Payment Method: </h3>
                    </div>
                    <div className={toggleState === 2 ? 'content active-content' : 'content'}>
                        <hr />
                        <h3>Account to receive: </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;