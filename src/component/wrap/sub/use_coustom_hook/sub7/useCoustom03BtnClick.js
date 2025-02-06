import { useState } from 'react';

export default function useCoustom03BtnClick(){
    const [isShow, setIsShow] = useState(false);

    const onClickOnline=(e)=>{
        e.preventDefault();
        setIsShow(false);
    }
    const onClickMarket=(e)=>{
        e.preventDefault();
        setIsShow(true);
    }
    return{
        isShow,
        setIsShow,
        onClickOnline,
        onClickMarket
    }
}