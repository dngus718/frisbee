import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { mainModalAction } from '../../store/modal';
import './scss/MainModal1Component.scss';

export default function MainModal1Component() {
    
    const [state, setState] = useState({
        name: '',
        value: '',
        expires: ''
    });

    const { name, value, expires } = state;

    const dispatch = useDispatch();

    const onClickModalClose=(e)=>{
        e.preventDefault();
        dispatch(mainModalAction(false));
    }

    const onClickCheckEvent=(e)=>{
        e.preventDefault();
        dispatch(mainModalAction(false));
        setCookie(name, value, expires);
    }

    function setCookie(name, value, expires){
        document.cookie = `${name}=${value}; path=/; expires=${expires}`;
    }

    useEffect(()=>{
        if(state){          
            let toDay = new Date();
            toDay.setDate(toDay.getDate() + 1);
            
            let name    = encodeURIComponent('MAIN MODAL');            
            let value   = encodeURIComponent('kurly main modal close !');
            let expires = toDay.toUTCString();

            setState({
                ...state,
                name: name,
                value: value,
                expires: expires
            })
        }
        else{
            setState({
                ...state,
                name: '',
                value: '',
                expires: ''
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div id='mainModal'>
            <div className="container">
                <a href="!#">
                    <div className="img_box">
                        <p>새해 복 많이 받으세요!!</p>
                        <img src="./images/modal/dh8z02n3epok.png" alt="" />
                    </div>
                    <div className="btn_box">
                        <button href="!#" onClick={onClickCheckEvent}>
                            <span>오늘 하루 안보기</span>
                        </button>
                        <button href="!#" onClick={onClickModalClose}>
                            <span>닫기</span>
                        </button>
                    </div>
                </a>
            </div>
        </div>
    );
}