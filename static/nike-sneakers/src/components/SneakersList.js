import React, {useCallback, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveAllData } from "../store/sneakersSlice";
import { SneakersRow } from "./SnakersRow";
import { getAll } from "../api";

const IS_DEBUGGER = true

export function SneakersList() {
    console.log('Sneakers List')
    // const id = 1
    const list = useSelector((state) => state.sneakers.list)
    const dispatch = useDispatch()

    const initData = async () => {
        console.log('Getting all list')
        const allData = await getAll(IS_DEBUGGER)
        console.log(allData)
        dispatch(saveAllData(allData))

        return () => {}
    }

    useEffect( () => {
        initData()

        return () => {}
    }, [])

    const getListRows = () => { 
        // console.log(`list is ${JSON.stringify( list)}, ${typeof list}`)
        return list && list.map(row => 
            <SneakersRow
                key={row.id}
                id={row.id}
                name={row.name}
                price={row.price}
                currentStatus={row.currentStatus}
            ></SneakersRow>
        )
    }

    const refreshList = () => {
        dispatch(saveAllData(null))
    }

    // useEffect( initData(), [id])

    return (<div>
        <div>
            <button onClick={refreshList}>Refresh</button>
        </div>
        {getListRows()}
    </div>)
}
