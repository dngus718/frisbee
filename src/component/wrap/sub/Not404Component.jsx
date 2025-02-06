import React from 'react';
import './scss/Not404Component.scss'
import { Link, Outlet } from 'react-router-dom';

export default function Not404Component(props) {
    return (
        <>
        <div id='ErrorPage' className='sub'>
            <div className="container">            
            <div className="title">
                <h4>404</h4>
                <span><h5>페이지를 찾을 수 없습니다.</h5></span>
            </div>
            <div className="content">
                <div className="content-box">
                    <p>죄송합니다. 더 이상 존재하지 않는 페이지입니다.</p>
                </div>
                <div className="button-box">
                    <Link to ="/main">
                        <button>
                            <span>홈으로 이동</span>
                        </button>                        
                    </Link>
                </div>
            </div>
            </div>
        </div>
        <Outlet/>
        </>
    );
}

