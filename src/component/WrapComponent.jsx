import React, { useEffect } from "react";
import HeaderComponent from './wrap/HeaderComponent';
import MainComponent from './wrap/MainComponent';
import FooterComponent from './wrap/FooterComponent';
import Sub1Component from './wrap/sub/Sub1Component';
import Sub2Component from './wrap/sub/Sub2Component';
import Sub3Component from './wrap/sub/Sub3Component';
import Sub4Component from './wrap/sub/Sub4Component';
import Sub5Component from './wrap/sub/Sub5Component';
import Sub6Component from './wrap/sub/Sub6Component';
import Sub7Component from './wrap/sub/Sub7Component';
import Sub8ShoppingComponent from './wrap/sub/Sub8ShoppingComponent'
import Sub9MyPageComponent from './wrap/sub/Sub9MyPageComponent'
import Sub10LoginComponent from './wrap/sub/Sub10LoginComponent';
import Sub11SignupComponent from './wrap/sub/Sub11SignupComponent';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ModalComponent from './wrap/ModalComponent';
import Sub1ListComponent from './wrap/sub/Sub1ListComponent';
import ProductViewComponent from './wrap/sub/ProductViewComponent';
import Not404Component from './wrap/sub/Not404Component';
import MainModal1Component from "./wrap/MainModal1Component";
import { useSelector, useDispatch } from 'react-redux';
import { mainModalAction, topModalAction } from '../store/modal';


export default function WrapComponent() {

    const mainModal = useSelector((state)=> state.modal.mainModal);
    const dispatch = useDispatch();

    function getCookie(){
        let cookie = document.cookie.replaceAll(' ','');
        
        cookie = decodeURIComponent(cookie); 
        
        const cookiArr = cookie.split(';');
        let obj = cookiArr.map((item)=> (
            {
                name: item.split('=')[0],
                value: item.split('=')[1]

            }
        ));

        obj.map((item)=>{
            if(
                !item.name.includes('MAIN MODAL')  ||  
                !item.value.includes('kurly main modal close !')){
                return dispatch(mainModalAction(true));
            }
            else {
                return dispatch(mainModalAction(false));
            }
        });

        obj.map((item)=>{
            if(
                !item.name.includes('TOP MODAL')  ||  
                !item.value.includes('kurly top modal close !')){
                return dispatch(topModalAction(true));
            }
            else {
                return dispatch(topModalAction(false));
            }
        });
    }

    useEffect(()=>{
        getCookie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <div id='wrap'>
            <HashRouter>
            <Routes>
                <Route path="/" element={<HeaderComponent/>}>
                    <Route index element={<MainComponent/>} />
                    <Route path="/main" element={<MainComponent/>} />
                    <Route path="/sub1" element={<Sub1Component/>} />
                    <Route path="/sub1List" element={<Sub1ListComponent />} />
                    <Route path="/sub2" element={<Sub2Component/>} />
                    <Route path="/sub3" element={<Sub3Component/>} />
                    <Route path="/sub4" element={<Sub4Component/>} />
                    <Route path="/sub5" element={<Sub5Component/>} />
                    <Route path="/sub6" element={<Sub6Component/>} />
                    <Route path="/sub7" element={<Sub7Component/>} />
                    <Route path="/sub8" element={<Sub8ShoppingComponent/>} />
                    <Route path="/sub9" element={<Sub9MyPageComponent/>} />
                    <Route path="/sub10Login" element={<Sub10LoginComponent/>} /> 
                    <Route path="/sub11Signup" element={<Sub11SignupComponent/>} /> 
                    <Route path="/product-view"  element={<ProductViewComponent />} />
                    <Route path="/*" element={<Not404Component/>} />
                </Route>
            </Routes>
            <FooterComponent />
            <ModalComponent />
                {
                    mainModal && <MainModal1Component />
                }
            </HashRouter>
        </div>
    );
}

