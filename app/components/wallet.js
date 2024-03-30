// this is in C:\cplusplusfiles\ebayclone\app\components\wallet.js
import React, { useState } from 'react';

function Wallet() {
    const [balance, setBalance] = useState(0);

    function addFunds(amount) {
        setBalance(balance + amount);
    }

    return (
        <div>
            <h2>Your balance: {balance}</h2>
            <button onClick={() => addFunds(10)}>Add $10</button>
        </div>
    );
}

export default Wallet;