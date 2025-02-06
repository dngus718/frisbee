import React from 'react';
import './scss/Section3Component.scss'
import axios from 'axios';
import { useEffect, useState, useRef, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { modalOpenAction } from '../../../store/modalState';
import { setViewProductAction } from '../../../store/viewProduct';
import { useNavigate } from 'react-router-dom';

export default function Section3Component() {

    const [spot, setSpot] = useState([Array(16).fill(false)]);

    const [showL, setShowL] = useState(false);
    const [showR, setShowR] = useState(false);
    const slideWrap = useRef();
    const dispatch = useDispatch();
    const [hover, setHover] = React.useState(false);

    const [cnt, setCnt] = useState(0);

    const [state, setState] = useState({
        title1: '',
        title2: '',
        product: [],
        sectionName: 'section3'
    });
    const {sectionName} = state;

    useEffect(()=>{
        axios({
            url:'./data/main/main.json',
            method: 'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    title1: res.data[sectionName].title1,
                    title2: res.data[sectionName].title2,
                    product: res.data[sectionName].product,
                })
            }
        })
        .catch((err)=>{
            console.timeLog(err);
        })
    },[sectionName, state])

    const onClickNextBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt>=16 ? 16 : cnt=>cnt+1);
    }
    
    const onClickPrevBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt<=0 ? 0 : cnt=>cnt-1);
    }

    useEffect(()=>{
        cnt===0 ? setShowL(true) : setShowL(false);
        cnt===16 ? setShowR(true) : setShowR(false);

        slideWrap.current.style.transition = 'all 0.3s'
        slideWrap.current.style.left = `${-320 * cnt}px`;

        // spot 해당 점일경우 검정막대로 보이기
        let imsi = Array(17).fill(false);
        imsi[cnt] = true;
        setSpot(imsi);
    },[cnt])

    // spot 클릭으로 슬라이드 넘기기
    const onClickSpot=(e, idx)=>{
        e.preventDefault();
        setCnt(idx);
    }

    const onClickOpenModal=(e)=>{
        e.preventDefault();
        // const obj = {
        //     modal: true
        // }
        dispatch(modalOpenAction(true));
    }

    const onMouseEnterHover=()=>{
        setHover(true);
    }

    const onMouseLeaveHover=()=>{
        setHover(false);
    }


    const navigate = useNavigate();

    let init = {
        cnt: 0,
        title1:'',
        title2:'',
        product: [],
    }

    function reducer(state, action){
        
        if(action.cnt>0){
            return {
                ...state,
                cnt: state.cnt + action.cnt
            }
        }
        else if(Object.keys(action.product).length>0){
            return {
                ...state,                
                product : [action.product, ...state.product]
            }
        }
        else {
            return;
        }

    }
    // eslint-disable-next-line no-unused-vars
    const [state2, dispatch2] = useReducer(reducer, init);

    useEffect(()=>{
    }, [state2])

    const onClickViewProduct=(e, 상품, 이미지경로)=>{
        e.preventDefault();
        let 상품정보 = 상품;

        상품정보 = {
            ...상품정보,
            상품이미지: 이미지경로
        }
        let obj = {
            지금본상품: 상품정보         
        }

        localStorage.setItem('view_product', JSON.stringify(obj.지금본상품))

        let arr = [];
        if(localStorage.getItem('view_product_list')!==null ){
            const result = JSON.parse(localStorage.getItem('view_product_list'));

            const imsi = result.map((item)=>item.번호 === obj.지금본상품.번호 ? true : false);
            
            if(imsi.includes(true)===true){
                arr = result; 
            }
            else{                
                arr = [obj.지금본상품, ...result]; 
            }
            console.log(imsi)
        }
        else{
            arr = [obj.지금본상품];
        }

        obj = {
            ...obj,
            최근본상품: arr
        }       

        dispatch(setViewProductAction(obj))

        localStorage.setItem('view_product_list', JSON.stringify(arr))

        navigate('/product-view');

    }

    return (
        <section id="section3">
            <div className="section-title">
                <div className="col-left">
                    <h3>{state.title1}{state.title2}</h3>
                </div>
                <div className="col-right">
                    <a href="!#">
                        더 많은 상품 보기 &gt;
                    </a>
                </div>
            </div>
            <div className="slide-container">
                <div className="slide-view">
                    <ul ref={slideWrap} className="slide-wrap">
                        {
                            state.product.map((item, idx)=>{
                                return (
                                    <li className={`slide slide${idx+1}`} key={item.no}>
                                        <div className="container">
                                            <div className="img-box">
                                                <a href="!#" onClick={(e)=>onClickViewProduct(e, item, `./images/main/${sectionName}/${item.상품이미지}`)}>
                                                    <img src={`./images/main/${sectionName}/${item.상품이미지}`} alt="section3-img1" />
                                                </a>
                                            </div>
                                            <div className="text-box">
                                                <div className='product icon-list'>
                                                    {
                                                        item.종류.map((item2)=>{
                                                            return (
                                                                <span key={item2} className={item2}>{item2}</span>
                                                            )
                                                        })
                                                    }
                                                    <button className="bookmark-button" onClick={onClickOpenModal} onMouseEnter={onMouseEnterHover} onMouseLeave={onMouseLeaveHover}>
                                                        {
                                                            hover===true?
                                                            <img src="./images/main/section3/bookmark_hover.png" alt="" />
                                                            :
                                                            <img src="./images/main/section3/bookmark.png" alt="" />
                                                        }
                                                    </button>
                                                </div>
                                                <div className='product product-item'>
                                                    <a href="!#">
                                                        <strong>{item.상품명}</strong>
                                                    </a>
                                                </div>
                                                <div className='product product-price'>
                                                {
                                                    item.할인율<=0?
                                                    <strong>{Math.round(item.정가*(1-item.할인율)).toLocaleString('ko-KR')}</strong>
                                                    :
                                                    <>
                                                    <strong>{Math.round(item.정가*(1-item.할인율)).toLocaleString('ko-KR')}</strong>
                                                    <span >{item.정가.toLocaleString('ko-KR')}</span>
                                                    <p>{Math.round(item.할인율*100)}%</p>
                                                    </>
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>


                <div className="swiper-nav">
                {  
                    state.product.map((item, idx)=>
                    idx<=16 &&
                        <span 
                            key={item.no} 
                            onClick={(e)=>onClickSpot(e, idx)} 
                            className={`swiper-spot${spot[idx]? ' on':''}`}>
                        </span>
                    )
                }
                </div>                


                {/* 좌우화살버튼 배치 */}
                <a href="!#" onClick={onClickNextBtn} className={`slide-btn-next${showR? ' on': ''}`}><img src="./images/main/section3/next_icon-type3-active.png" alt="오른쪽 화살표" /></a>
                <a href="!#" onClick={onClickPrevBtn} className={`slide-btn-prev${showL? ' on': ''}`}><img src="./images/main/section3/next_icon-type3-active.png" alt="왼쪽 화살표" /></a>
                
            </div>
        </section>
    );
}