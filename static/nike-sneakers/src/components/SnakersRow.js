import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBuySneaker } from "../store/sneakersSlice";

export function SneakersRow({ id, name, price, image, currentStatus, onSetImg }) {
    const buy = useSelector((state) => state.sneakers.buy)

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

    const getRowClassName = () => {
        const {id: buyId} = buy
        // console.log('getting row class, id=', id, ', buyId = ', buyId)
        return 'sneaker-row ' + (buyId === id ? 'buy' : '')
    }

    return (<div className={getRowClassName()}>
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
