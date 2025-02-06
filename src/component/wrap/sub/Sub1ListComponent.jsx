import React, { useEffect, useRef, useState, useReducer } from 'react';
import './scss/Sub1ListComponent.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setViewProductAction } from '../../../store/viewProduct';

export default function Sub1ListComponent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const refSubTop = useRef([]);
    const refSubBot = useRef([]);

    const [state, setState] = useState({
        topfilter1: [],
        topfilter2: [],
        필터메뉴: {},
        product: [] ,
        옵션필터박스:[],
        상품필터박스:[],
        필터탭버튼:'',
        상품: [],
        필터상품:[]
    });

    const tagMenu = {
        sale: '할인',
        timeDeal: '타임딜',
        new: '신상품',
        event: '이벤트',
        advance: '사전예약',
        delivery: '무료배송',
        GPS: 'GPS',
        coupon: '쿠폰',
    };

    useEffect(() => {
        axios({
            url: `./data/sub/sub1list.json`,
            method: 'GET',
        })
        .then((res) => {
            setState({
                ...state,
                topfilter1: res.data.sub1list.topfilter1,
                topfilter2: res.data.sub1list.topfilter2,
                필터메뉴: res.data.sub1list.필터메뉴,
                product: res.data.sub1list.product,
                상품: res.data.sub1list.product,
                필터상품: res.data.sub1list.product
            });

        })
        .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickTopFliterBtn=(e)=>{
        e.preventDefault();
        const filter = document.querySelector('.filter');
        filter.classList.toggle('on');
    }

    const onClickBotFliterBtn=(e)=>{
        e.preventDefault();
        const subMenu = document.querySelector('.sub-menu');
        const btn = document.querySelector('.btn');
        btn.classList.toggle('on');
        subMenu.classList.toggle('on');
    }



    useEffect(() => {
        if (refSubTop.current[0]) {
            refSubTop.current[0].style.height = `${41 * state.필터메뉴[Object.keys(state.필터메뉴)[0]].length}px`;
        }

        const filterTitles = document.querySelectorAll(".top-filter-title");
        if (filterTitles[0]) {
            filterTitles[0].classList.add("on");
        }
    }, [state.필터메뉴]);

    const onClickFilterTopOpen = (e, i, item) => {
        if (!refSubTop.current[i]) return;

        const Open = refSubTop.current[i].style.height && refSubTop.current[i].style.height !== "0px";
    
        refSubTop.current.forEach((ref, idx) => {
            if (ref) ref.style.height = "0px";
        });
    
        if (!Open) {
            refSubTop.current[i].style.height = `${41 * state.필터메뉴[item].length}px`;
        }
    
        const filterTitles = document.querySelectorAll(".top-filter-title");
        filterTitles.forEach((filterTitle, idx) => {
            filterTitle.classList.toggle("on", idx === i && !Open);
        });
    };

    const onClickFilterBotOpen = (e, i, item) => {
        const Open = refSubBot.current[i].style.height !== "0px" && refSubBot.current[i].style.height !== "";
    
        refSubBot.current.forEach((ref) => {
            if (ref) ref.style.height = "0px";
        });
    
        if (!Open) {
            refSubBot.current[i].style.height = `${29.8 * state.필터메뉴[item].length}px`;
        }
    
        const filterTitles = document.querySelectorAll(".bot-filter-title");
        filterTitles.forEach((filterTitle, idx) => {
            filterTitle.classList.toggle("on", idx === i && !Open);
        });
    };


    const onClickCheckEvent = (e, 필터메뉴, 필터항목) => {
        e.preventDefault();

        let imsi = [...state.상품필터박스];  

        const filterIndex = imsi.findIndex(item => item[필터메뉴] === 필터항목);
    
        if (filterIndex !== -1) {
            imsi = []; 
        } else {
            imsi = [{ [필터메뉴]: 필터항목 }];
        }

        setState({
            ...state,
            상품필터박스: imsi
        });
    };

    useEffect(() => {
        let imsi = [];

        if(state.상품필터박스.length > 0) {
            imsi = state.product;
            state.상품필터박스.map((필터항목)=>
                imsi = state.product.filter((item)=>item[Object.keys(필터항목)] === 필터항목[Object.keys(필터항목)])
            )   
        }
        else {
            imsi = state.product;
        }

        setState({
            ...state,
            상품: imsi
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.상품필터박스])


    const onChangeCheckEvent = (e, 필터메뉴, 필터항목) => {
        let imsi = state.옵션필터박스;

        if(e.target.checked === true){
            imsi = [...imsi, {[필터메뉴] : 필터항목}]
        }
        else {
            imsi = imsi.filter((item)=>item[Object.keys(item)] !== 필터항목);
        }

        setState({
            ...state,
            옵션필터박스: imsi
        })
    }

    const onClickOptionCloseBtn = (e, 삭제항목) =>{
        let imsi = state.옵션필터박스;

        imsi = imsi.filter((item) => item[Object.keys(item)] !== 삭제항목);
        setState({
            ...state,
            옵션필터박스: imsi
        })
    } 

    useEffect(() => {
        let imsi = [];

        if(state.옵션필터박스.length > 0) {
            imsi = [];
            state.옵션필터박스.map((필터항목)=>
                imsi = [...imsi, ...state.product.filter((item)=>item[Object.keys(필터항목)[0]] === 필터항목[Object.keys(필터항목)])]
            )   
        }
        else {
            imsi = state.product;
        }

        const result = imsi.reduce((acc, item)=>acc.some((item2) => item2.no === item.no) ? acc : [...acc, item] , []);
        setState({
            ...state,
            상품: result
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state.옵션필터박스])

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
        <main id='sub1List' className='sub'>
            <div className="container">
                <div className="title">
                    <div className="title-box1">
                        <div className="top-title">
                            <ul>
                                <li>홈</li>
                                <li>&gt;</li>
                                <li>Apple</li>
                                <li>&gt;</li>
                                <li>
                                    <button onClick={onClickTopFliterBtn}>
                                        Mac
                                        <img src="./images/sub/sub1list/drop_icon.png" alt="drop_icon" />    
                                    </button>
                                    <div className="filter">
                                        <ul>
                                            {
                                                state.topfilter1.slice(1).map((item)=>
                                                    <li key={item}><a href="!#">{item}</a></li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                            <h2>Apple</h2>
                        </div>
                    </div>
                    <div className="title-box2">
                        <div className="bot-title">
                            <div className="left">
                                <span>Mac</span>
                            </div>
                            <div className="right">
                                <div className="sub-filter">
                                    <button 
                                        className='btn'
                                        onClick={onClickBotFliterBtn}>
                                        {state.topfilter2[0]}
                                        <img src="./images/sub/sub1list/drop_icon3.png" alt="drop_icon" />
                                    </button>
                                </div>
                                <div className="sub-menu">
                                    <ul>
                                        {
                                            state.topfilter2.slice(1).map((item)=>
                                                <li key={item}><a href="!#">{item}</a></li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="left-container">
                        <div className="left-filter">
                            <div className="left-top-filter">
                                <h3>카테고리</h3>
                                <ul>
                                    {
                                        Object.keys(state.필터메뉴).slice(0, 9).map((item, i)=>
                                            <li key={item}>
                                                <div 
                                                    className="top-filter-title"
                                                    onClick={(e)=>onClickFilterTopOpen(e, i, item)}
                                                >
                                                    <span>{item}</span>
                                                    <img src="./images/sub/sub1list/drop_icon2.png" alt="drop_icon2" />
                                                </div>
                                                <div 
                                                    className="filter-menu"
                                                    ref={(e)=>refSubTop.current[i]=e}
                                                >
                                                    <ul>
                                                        {
                                                            state.필터메뉴[item].map((item2, idx) => {
                                                                // Check if the item is active in the filters
                                                                const isActive = state.상품필터박스.some(필터항목 => 필터항목[item] === item2);
                                                                return (
                                                                    <li key={item2}>
                                                                        <a 
                                                                            href="!#"
                                                                            className={isActive ? 'on' : ''}  // Apply 'on' class if active
                                                                            onClick={(e) => onClickCheckEvent(e, item, item2)}  // Toggle filter on click
                                                                        >
                                                                            {item2}
                                                                        </a>
                                                                    </li>
                                                                );
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                            <div className="left-bot-filter">
                                <div className="bot-title">
                                    <h3>필터</h3>
                                    <button>초기화</button>
                                </div>
                                <ul>
                                    {
                                        Object.keys(state.필터메뉴).slice(9).map((item, i)=>
                                            <li key={item}>
                                                <div 
                                                    className="bot-filter-title"
                                                    onClick={(e)=>onClickFilterBotOpen(e, i, item)}
                                                >
                                                    <span>{item}</span>
                                                    <img src="./images/sub/sub1list/drop_icon2.png" alt="drop_icon2" />
                                                </div>
                                                <div 
                                                    ref={(e)=>refSubBot.current[i]=e}
                                                    className="filter-menu"
                                                >
                                                    <ul>
                                                        {
                                                            state.필터메뉴[item].map((field, j) => (
                                                                <li key={field}>
                                                                    <label htmlFor={`sub${i+1}_chk${j+1}`}>
                                                                        <input 
                                                                            type="checkbox" 
                                                                            name={`sub${i+1}_chk${j+1}`} 
                                                                            id={`sub${i+1}_chk${j+1}`} 
                                                                            value={field}
                                                                            onChange={(e)=>onChangeCheckEvent(e, item, field)}  
                                                                            checked={state.옵션필터박스.map((item2)=>item2[Object.keys(item2)]===field).includes(true)}
                                                                        />
                                                                        {field}
                                                                    </label>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>    
                            </div>
                        </div>
                    </div>
                    <div className="center-container">
                        <div className="top-filter">
                            <div className="top-box">
                                <ul>
                                    <li><button className='on'>All</button></li>
                                    <li><button>MacBook Air 13 M2</button></li>
                                    <li><button>MacBook Air 13 M3</button></li>
                                    <li><button>MacBook Air 15</button></li>
                                    <li><button>MacBook Pro 14</button></li>
                                    <li><button>MacBook Pro 16</button></li>
                                    <li><button>iMac</button></li>
                                    <li><button>Mac mini</button></li>
                                    <li><button>Mac Studio & Display</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className="option-filter">
                            {
                                state.옵션필터박스.length > 0 &&
                                <div className="option-box">
                                    <p>선택옵션</p>
                                    <ul>
                                        {
                                            state.옵션필터박스.map((item, idx) =>
                                                <li key={idx}>
                                                    <div>
                                                        <span>{item[Object.keys(item)]}</span>
                                                        <button 
                                                            className='close'
                                                            onClick={(e)=>onClickOptionCloseBtn(e, item[Object.keys(item)])}
                                                        >
                                                            <img src="./images/sub/sub1list/close-icon.png" alt="close-icon" />
                                                        </button>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            }
                        </div>
                        <div className="product-list">
                            <div className="list-container">
                                <ul>
                                    {
                                        state.상품.map((item)=>
                                            <li key={item.번호}>
                                                <div className="list-img-box">
                                                    <a href="!#" onClick={(e)=>onClickViewProduct(e, item, `./images/sub/sub1list/product/Mac/${item.상품이미지}`)}>
                                                        <img src={`./images/sub/sub1list/product/Mac/${item.상품이미지}`} alt={item.상품명} />
                                                    </a>
                                                </div>
                                                <div className="list-content">
                                                    <div className="item-box">
                                                        <div className="item">
                                                            {item.item.map((tag, i) => (
                                                                <p key={i} className={tag}>
                                                                    {tagMenu[tag] || tag}
                                                                </p>
                                                            ))}
                                                        </div>
                                                        <div className="bookmark">
                                                            <a href="!#">
                                                                <img
                                                                    src="./images/sub/sub5/bookmark.png"
                                                                    alt="bookmark"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <h3>{item.상품명}</h3>
                                                    <div className="price">
                                                        {item.할인율 > 0 && (
                                                            <>
                                                                <strong>
                                                                    {(item.정가 * (1 - item.할인율)).toLocaleString()}
                                                                </strong>
                                                                <p>{item.정가.toLocaleString()}</p>
                                                                <span>{Math.round(item.할인율 * 100)}%</span>
                                                            </>
                                                        )}
                                                            {item.SALE === 0 && (
                                                                <strong>{item.정가.toLocaleString()}</strong>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="paging-btn">
                            <a href="!#" className="prev-btn">
                                <img src="./images/sub/sub3/prev_icon.png" alt="이전" />
                            </a>
                            <a href="!#" className='paging-num'>
                                <h2>1</h2>
                            </a>
                            <a href="!#" className="next-btn">
                                <img src="./images/sub/sub3/next_icon.png" alt="다음" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
