import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAllData } from "../store/sneakersSlice";
import { SneakersRow } from "./SnakersRow";
import { getAll } from "../api";
import logo from '../images/nike.png';

// const img = require('../images/nike.png')
// console.log(img)

const IS_DEBUGGER = false

export function SneakersList() {
    console.log('Sneakers List')

    const list = useSelector((state) => state.sneakers.list)
    const dispatch = useDispatch()
    const [currentImg, setCurrentImg] = useState(require('../images/nike.png'))

    useEffect(() => {
        const initData = async () => {
            console.log('Getting all list')
            const {data} = await getAll(IS_DEBUGGER)
            console.log(data)
            dispatch(saveAllData(data))
        }

        initData()

        return () => {
            console.log('unsubcribe effect')
        }
    }, [])

    const getListRows = () => {
        console.log(`list = ${JSON.stringify(list)}`)
        return list && list.map(row =>
            <SneakersRow
                key={row.id}
                id={row.id}
                name={row.name}
                price={row.price}
                currentStatus={row.status}
                image={row.image}
                onSetImg={setCurrentImg}
            ></SneakersRow>
        )
    }

    // const refreshList = () => {
    //     dispatch(saveAllData(null))
    // }

    return (<div>
        {/* <div>
            <button onClick={refreshList}>Refresh</button>
        </div> */}
        {getListRows()}

        <header className="">
            <img src={currentImg} className="App-logo" alt="logo" />
        </header>
    </div>)
}
