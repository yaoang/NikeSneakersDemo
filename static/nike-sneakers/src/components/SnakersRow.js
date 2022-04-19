import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setBuySneaker } from "../store/sneakersSlice";

export function SneakersRow({id, name, price, currentStatus}) {
    const buySneaker = useCallback( () => {
        console.log(`Going to buy ${name}, price is ${price}`)
        dispatch(setBuySneaker({
            id,
            name,
            price,
            currentStatus,
        }))
    }, [id, name, price, currentStatus])
    const dispatch = useDispatch()

    return (<div className="sneaker-row">
        <ul>
            <li>{id}</li>
            <li>{name}</li>
            <li>{price}</li>
            <li>{currentStatus}</li>
            <li>
                <button onClick={buySneaker}>Buy</button>
            </li>
        </ul>
    </div>)
}
