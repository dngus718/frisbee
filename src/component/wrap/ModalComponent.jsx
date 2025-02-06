import React from 'react';
import './scss/ModalComponent.scss';
import { useDispatch, useSelector } from 'react-redux';
import { modalCloseAction } from '../../store/modalState';
import { useNavigate } from 'react-router-dom';

export default function ModalComponent() {

    const navigate = useNavigate();
    const modalState = useSelector((state)=>state.modalState);
    const dispatch = useDispatch();

    const onClickModalClose=(e)=>{
        e.preventDefault();
        dispatch(modalCloseAction(false));
    }

    const onClickLogin=(e)=>{
        e.preventDefault();
        navigate('/sub10Login');
        dispatch(modalCloseAction(false));
    }

    return (
        <div className={`modal${modalState.isModal?' on':''}`}>
            <div className="container">
                <div className="content">
                    <p>로그인 후 이용 가능합니다.</p>
                </div>
                <div className="btn-box">
                    <button onClick={onClickModalClose} className='close-btn'>취소</button>
                    <a onClick={onClickLogin} href="!#" className='login-btn'>로그인</a>
                </div>
            </div>
        </div>
    );
}