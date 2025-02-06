/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect } from 'react';

export default function useCoustom02Axios({state,setState}){
    useEffect(()=>{
        axios({
            url:'./data/sub/sub7.json',
            method:'GET'
        })
        .then((res)=>{
            setState({
                ...state,
                online:res.data.sub7.online,
                market:res.data.sub7.market
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    },[]);
}