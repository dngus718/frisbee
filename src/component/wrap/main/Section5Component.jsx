import React, {  useEffect, useReducer } from 'react';
import './scss/Section5Component.scss';
import axios from 'axios';
import { setViewProductAction } from '../../../store/viewProduct';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Section5Component() {

    const slideWrap = React.useRef();

    const [cnt, setCnt] = React.useState(0);
    const [show1, setShow1] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const [act, setAct] = React.useState([true,false,false,false,false,false,false,false,false]);

    const [state, setState] = React.useState({
        title1:'',
        title2:'',
        product:[]
    });

    React.useEffect(()=>{
        axios({
            url:'./data/main/main.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){       // 응답 받으면
                setState({
                    ...state,
                    title1: res.data.section5.title1,
                    title2: res.data.section5.title2,
                    product: res.data.section5.product
                })
            }
        })
        .catch((err)=>{
            return;
        });
    },[state]);

    const onClickPrevBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt<=0 ? 0 : cnt=>cnt-1);
    }

    const onClickNextBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt>=8 ? 8 : cnt=>cnt+1);
    }

    const onClickGotoBtn=(e, num)=>{
        e.preventDefault();
        let imsi = Array(9).fill(false);
        imsi[num]=true;
        setCnt(num);
        setAct(imsi);
    }

    React.useEffect(()=>{

        cnt===0 ? setShow1(true) : setShow1(false);
        cnt===8 ? setShow2(true) : setShow2(false);

        let imsi = Array(9).fill(false);
        imsi[cnt]=true;
        setAct(imsi);
        // console.log(imsi);

        slideWrap.current.style.transition = 'all 0.3s';
        slideWrap.current.style.left = `${-325 * cnt}px`;

    }, [cnt]);


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
        <section id='section5'>
            <div className="title">
                <h3>{state.title1}</h3>
                <h2>{state.title2}</h2>
            </div>
            <div className="content">
                <div className="slide-container">
                    <div className="slide-view">
                        <ul ref={slideWrap} className="slide-wrap">
                        {
                            state.product.map((item, idx)=>{
                                return(
                                    <li key={item.번호} className={`slide slide${idx+1}`}>
                                        <div className="list-box">
                                            <div className="num">{idx+1}</div>
                                            <div className="img-box">
                                                <a href="!#" onClick={(e)=>onClickViewProduct(e, item, `./images/main/section5/${item.상품이미지}`)}>
                                                    <img src={`./images/main/section5/${item.상품이미지}`} alt="" />
                                                </a>
                                            </div>
                                            <div className="text-box">
                                                <div className="row1">
                                                {
                                                    item.종류.map((item2)=>{ 
                                                        return(
                                                            <span key={item2} className={item2.split('/')[0]}>{item2}</span>
                                                        )
                                                    })
                                                }
                                                </div>
                                                <div className="row2">
                                                    <h4>
                                                        <a href="!#">{item.상품명}</a>
                                                    </h4>
                                                </div>
                                                <div className="row3">
                                                    <p>{Math.round(item.정가*(1-item.할인율)).toLocaleString('ko-KR')}</p>
                                                    <p>{item.정가.toLocaleString('ko-KR')}</p>
                                                    <p>{Math.round(item.할인율*100)}%</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="click-box">
                <div className="col1">
                    {/* 반복문 cnt=idx true,false */}
                {
                    state.product.map((item, idx)=>
                        idx<9 && (
                                <a 
                                    key={idx} 
                                    href="!#" 
                                    onClick={(e)=>onClickGotoBtn(e, idx)}
                                    className={`goto blind${act[idx]?' on':''}`}
                                >
                                    {idx}
                                </a>
                        )
                    )
                }    
                </div>
                <div className="col2">
                    <a href="!#" onClick={onClickPrevBtn} className={`prev-btn${show1?' on':''}`}><img src="./images/main/section5/prev-btn.png" alt="" /></a>
                    <a href="!#" onClick={onClickNextBtn} className={`next-btn${show2?' on':''}`}><img src="./images/main/section5/next-btn.png" alt="" /></a>
                </div>
            </div>
        </section>
    );
}