import React, { useEffect, useState } from "react";
import { useNavigate, NavigateOptions, useLocation } from "react-router-dom";
import "../styles/iceberg.css";
import Coin from "../components/coin";
import Iceberg from "../components/iceberg";
import { wss } from "../App";
import { SocketMessage } from "../types";
import { RawData } from "ws";

// https://youtu.be/RB31CngY3ms?t=1298

export default function() {
    const [ animations, setAnimations ] = useState(["", "", "", "", "", "", "", "", ""]);
    const [ icebergVisibility, setIcebergVisibility ] = useState([true, true, true, true, false, true, true, true, true]);
    const [ coinsVisibility, setCoinsVisibility ] = useState([true, true, true, true, false, true, true, true, true]);
    const [ coinsQuantity, setCoinsQuantity ] = useState([1, 2, 3, 4, 0, 3, 1, 2, 1]);

    wss.onmessage = async function(event) {
        const message: SocketMessage = JSON.parse(event.data);

        switch (message.type) {
            case 0: // Hello
                wss.send(JSON.stringify({
                    type: 0,
                    data: "pong"
                }));
                break;
            case 1: // Forwards
            case 2: // Reverse
            { // Move Penguins
                const direction = message.type === 1 ? "forwards" :  "reverse";

                const movements: number[] = JSON.parse(message.data);

                let bergsVisibility = icebergVisibility;
                let _coinsVisibility = coinsVisibility;
                for (let i = 0; i < movements.length; i++) {
                    const bergIndex = movements[i];

                    _coinsVisibility[bergIndex] = false;

                    if (movements.indexOf(bergIndex) !== i)
                        bergsVisibility[bergIndex] = false;
                }

                const animations = movements
                    .map(function(movement: number) {
                        const movementAnimations: string[] = [];

                        // Up & Down
                        if (movement / 3 < 1)
                            movementAnimations.push("transformUp 0.5s ease-out " + direction);
                        else if (movement / 3 >= 2)
                            movementAnimations.push("transformDown 0.5s ease-out " + direction);

                        // Left & Right
                        if (movement % 3 === 0)
                            movementAnimations.push("transformLeft 0.5s ease-out " + direction);
                        else if (movement % 3 === 2)
                            movementAnimations.push("transformRight 0.5s ease-out " + direction);

                        return movementAnimations.join(",");
                    });

                setAnimations(animations);
                setIcebergVisibility(bergsVisibility);
                setCoinsVisibility(_coinsVisibility);
                break;
            }
            case 3: // Change Coins' Quantity
                setCoinsQuantity(JSON.parse(message.data));
                break;
        }
    };

    return (
        <div className="bg-slate-800" style={{ width: "100vw", height: "100vh" }}>
            <div className="bg-blue-500 ocean-background mx-auto mt-10 p-6 rounded-lg shadow-lg" style={{ width: "70vw", height: "90vh"}}>
                <div className="grid grid-cols-3 m-10" style={{ marginTop: "5vh", gap: "8vh" }}>
                    <Iceberg visible={ icebergVisibility[0] }>
                        <Coin quantity={ coinsQuantity[0] } visible={ coinsVisibility[0] } />
                    </Iceberg>

                    <Iceberg visible={ icebergVisibility[1] }>
                        <Coin quantity={ coinsQuantity[1] } visible={ coinsVisibility[1] } />
                    </Iceberg>
                    
                    <Iceberg visible={ icebergVisibility[2] }>
                        <Coin quantity={ coinsQuantity[2] } visible={ coinsVisibility[2] } />
                    </Iceberg>

                    <Iceberg visible={ icebergVisibility[3] }>
                        <Coin quantity={ coinsQuantity[3] } visible={ coinsVisibility[3] } />
                    </Iceberg>

                    <Iceberg visible={ true }>
                        <div className="grid grid-cols-2 gap-3 mt-6 ml-10">
                            <div style={{ animation: animations[0].split(",")[0] }}>
                                <div className="penguin rounded-lg bg-red-500 shadow shadow-red-600" style={{ animation: animations[0].split(",")[1] }}>
                                    1
                                </div>
                            </div>
                            <div style={{ animation: animations[1].split(",")[0] }}>
                                <div className="penguin rounded-lg bg-green-500 shadow shadow-green-600" style={{ animation: animations[1].split(",")[1] }}>
                                    2
                                </div>
                            </div>
                            <div style={{ animation: animations[2].split(",")[0] }}>
                                <div className="penguin rounded-lg bg-yellow-500 shadow shadow-yellow-600" style={{ animation: animations[2].split(",")[1] }}>
                                    3
                                </div>
                            </div>
                            <div style={{ animation: animations[3].split(",")[0] }}>
                                <div className="penguin rounded-lg bg-violet-500 shadow shadow-violet-600" style={{ animation: animations[3].split(",")[1] }}>
                                    4
                                </div>
                            </div>
                        </div>
                    </Iceberg>

                    <Iceberg visible={ icebergVisibility[5] }>
                        <Coin quantity={ coinsQuantity[5] } visible={ coinsVisibility[5] } />
                    </Iceberg>

                    <Iceberg visible={ icebergVisibility[6] }>
                        <Coin quantity={ coinsQuantity[6] } visible={ coinsVisibility[6] } />
                    </Iceberg>

                    <Iceberg visible={ icebergVisibility[7] }>
                        <Coin quantity={ coinsQuantity[7] } visible={ coinsVisibility[7] } />
                    </Iceberg>

                    <Iceberg visible={ icebergVisibility[8] }>
                        <Coin quantity={ coinsQuantity[8] } visible={ coinsVisibility[8] } />
                    </Iceberg>
                </div>
            </div>
        </div>
    );
}