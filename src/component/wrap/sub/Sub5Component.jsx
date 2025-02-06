import React, { useEffect, useState, useReducer } from 'react';
import './scss/Sub5Component.scss';
import axios from 'axios';
import { setViewProductAction } from '../../../store/viewProduct';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { modalOpenAction } from '../../../store/modalState';

export default function Sub5Component() {

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

    const [state, setState] = useState({
        filter: [], 
        product: [], 
        filterproduct: [], 
        filterbtn: '', 
    });
    const [tab, setTab] = useState([]); 

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
            url: './data/sub/sub5.json',
            method: 'GET',
        })
            .then((res) => {
                setState({
                    filter: res.data.sub5.filter, 
                    product: res.data.sub5.product, 
                    filterproduct: res.data.sub5.product.filter((item) => item.filter.includes(res.data.sub5.filter[0])), 
                    filterbtn: res.data.sub5.filter[0], 
                });

                const a = Array(res.data.sub5.filter.length).fill(false);
                a[0] = true;
                setTab(a);
            })
            .catch((err) => console.error(err));
    }, []);

    const onClickFilterBtn = (e, filterbtn, idx) => {
        e.preventDefault();

        const a = Array(state.filter.length).fill(false);
        a[idx] = true;
        setTab(a);

        setState({
            ...state,
            filterbtn: filterbtn,
            filterproduct: state.product.filter((item) => item.filter.includes(filterbtn))
        });
    };

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


    const onClickOpenModal=(e)=>{
        e.preventDefault();
        dispatch(modalOpenAction(true));
    }

    return (
        <main id="sub5" className="sub">
            <div className="container">
                <div className="title">
                    <h2>Ranking</h2>
                </div>
                <div className="filter-box">
                    <ul>
                        {state.filter.map((item, idx) => (
                            <li key={idx}>
                                <button
                                    onClick={(e) => onClickFilterBtn(e, item, idx)}
                                    title={item}
                                    className={tab[idx] ? 'on' : ''}
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="ranking-wrap">
                    <div className="ranking-box">
                        <div className="ranking-list">
                            <ul>
                                {state.filterproduct.slice(0, 3).map((item, idx) => (
                                    <li key={item.번호}>
                                        <div className="img-box">
                                            <a 
                                                href="!#"
                                                onClick={(e)=>onClickViewProduct(e, item, `./images/sub/sub5/${item.상품이미지}`)}
                                            >
                                                <img
                                                    src={`./images/sub/sub5/${item.상품이미지}`}
                                                    alt={item.상품명}
                                                />
                                            </a>
                                        </div>
                                        <h2>{idx + 1}</h2>
                                        <div className="content">
                                            <div className="item-box">
                                                <div className="item">
                                                    {item.item.map((tag, i) => (
                                                        <p key={i} className={tag}>
                                                            {tagMenu[tag] || tag}
                                                        </p>
                                                    ))}
                                                </div>
                                                <div className="bookmark">
                                                    <a href="!#" onClick={onClickOpenModal}>
                                                        <img
                                                            src="./images/sub/sub5/bookmark.png"
                                                            alt="bookmark"
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                            <h3>{item.상품명}</h3>
                                            <div className="price">
                                                <strong>
                                                    {(item.정가 * (1 - item.할인율)).toLocaleString('ko-KR')}
                                                </strong>
                                                <p>{item.정가.toLocaleString('ko-KR')}</p>
                                                <span>{Math.round(item.할인율 * 100)}%</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="list-box">
                        <div className="list">
                            <ul>
                                {state.filterproduct.slice(3).map((item, idx) => (
                                    <li key={item.번호}>
                                        <div className="img-box">
                                            <a 
                                                href="!#"
                                                onClick={(e)=>onClickViewProduct(e, item, `./images/sub/sub5/${item.상품이미지}`)}
                                            >
                                                <img
                                                    src={`./images/sub/sub5/${item.상품이미지}`}
                                                    alt={item.상품명}
                                                />
                                            </a>
                                        </div>
                                        <h2>{idx + 4}</h2>
                                        <div className="content">
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
                                                            {(item.정가 * (1 - item.할인율)).toLocaleString('ko-KR')}
                                                        </strong>
                                                        <p>{item.정가.toLocaleString('ko-KR')}</p>
                                                        <span>{Math.round(item.할인율 * 100)}%</span>
                                                    </>
                                                )}
                                                {item.할인율 === 0 && (
                                                    <strong>{item.정가.toLocaleString('ko-KR')}</strong>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
