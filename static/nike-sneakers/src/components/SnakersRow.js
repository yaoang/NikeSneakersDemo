import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setBuySneaker } from "../store/sneakersSlice";

export function SneakersRow({ id, name, price, image, currentStatus, onSetImg }) {
    const buySneaker = useCallback(() => {
        console.log(`Going to buy ${name}, price is ${price}, status is ${currentStatus} image is ${image}`)
        dispatch(setBuySneaker({
            id,
            name,
            price,
            currentStatus,
        }))
    }, [])
    const dispatch = useDispatch()

    const freshImg = () => {
        onSetImg(require(`../images/${image}`))
    }

    return (<div className="sneaker-row">
        <ul onMouseOver={freshImg}>
            {/* <li className="row-id">{id}</li> */}
            <li>{name}</li>
            <li>{price}</li>
            <li>{currentStatus}</li>
            <li>
                <button onClick={buySneaker}>Buy</button>
            </li>
        </ul>
    </div>)
}
