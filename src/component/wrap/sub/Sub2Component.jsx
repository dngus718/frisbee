/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useEffect,useState,useReducer } from 'react';
import './scss/Sub2Component.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { modalOpenAction } from '../../../store/modalState';
import { setViewProductAction } from '../../../store/viewProduct';
import { useNavigate } from 'react-router-dom';


export default  function Sub2Component() {

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
            
            arr = [obj.지금본상품, ...result]; 
            // const imsi = result.map((item)=>item.상품번호.includes(obj.지금본상품.상품번호) ? true : false);
            // if(imsi.includes(true)===true){
            //     arr = result; 
            // }
            // else{                
            // }
            // console.log(imsi)
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



    const [pageView] = useState(16);
    const [pageCurrent, setPageCurrent] = useState(1)  // 현재페이지
    const [pageNumber, setPageNumber] = useState([])
    const [pageTotal, setPageTotal] = useState(0)
    const [pageArr, setPageArr] = useState([])
    const [tab, setTab] = useState([]);

    const [hover, setHover] = useState(false);
    const [state, setState] = useState({
        title1:'',
        product:[],
        subName: 'sub2',
        filter:[],
        필터탭버튼:"ALL",
        필터상품:[],
        상품:[]
    });

    React.useEffect(()=>{
        axios({
            url:'./data/sub/sub2.json',
            method:'GET'
        })
        .then((res)=>{
                setState({
                    ...state,
                    title1: res.data.sub2.title1,
                    product: res.data.sub2.product,
                    filter: res.data.sub2.filter,
                    필터상품: res.data.sub2.product,
                    상품: res.data.sub2.product
                })                
            
            let a = Array(10).fill(false);
            a[0] = true;
            setTab(a)
        })
        .catch((err)=>{
            console.log(err)
        });
    },[]);

    // 페이지 넘김
    useEffect(()=>{

        if(state.product.length > 0){
            let imsi = [];
            let page = [];
            let pageArray=[];
            let num = 0;

            num = Math.ceil(state.상품.length / pageView);
            imsi = Array(num).fill(0);
            pageArray = Array(num).fill(false);
            pageArray[0] = true;
            imsi.reduce((acc,item,idx)=>
                    page[idx] = acc + 1
            ,0)
            setPageNumber(page);
            setPageTotal(num);
            setPageArr(pageArray);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[state])

    useEffect(()=>{
        let pageArray = Array(pageTotal).fill(false)
        pageArray[pageCurrent - 1] = true
        setPageArr(pageArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pageCurrent])

    const onClickPrev=(e)=>{
        e.preventDefault();
        setPageCurrent(pageCurrent - 1 <= 1 ? 1:pageCurrent-1);
    }
    const onClickNext=(e)=>{
        e.preventDefault();
        setPageCurrent(pageCurrent + 1 >= pageTotal ? pageTotal:pageCurrent+1);
    }
    const onClickpage=(e,num)=>{
        e.preventDefault();

        setPageCurrent(num)
    }

    ///////////////////////////////////////////

    const onClickOpenModal=(e)=>{
        e.preventDefault();
        
        dispatch(modalOpenAction(true));
    }

    const onMouseEnterHover=()=>{
        setHover(true);
    }

    const onMouseLeaveHover=()=>{
        setHover(false);
    }

    // 필터탭메뉴
    const onClickTab=(e, 필터탭버튼, idx)=>{
        e.preventDefault()

        let a = Array(10).fill(false);
        a[idx] = true;
        setTab(a);

        setState({
            ...state,
            필터탭버튼:필터탭버튼
        })
    }

    useEffect(()=>{
        filterTabBtn(state.필터탭버튼)
    },[state.필터탭버튼])

    function filterTabBtn(필터탭버튼){
        let imsi = [];

        if(필터탭버튼==='All'){
            imsi = state.product
        }
        else{
            imsi = state.product.filter((item)=>item['필터'].includes(필터탭버튼));
        }

        setState({
            ...state,
            필터상품:imsi,
            상품:imsi
        })
    }


    return (
        <main id='sub2' className='sub'>
            <div className="container">
                <div className="title">
                    <span><h2>NEW</h2></span>     
                    {/* 필터 */}               
                    <div className="filter-box">
                        <ul>
                            {
                                state.filter.map((item,idx)=>
                                    <li key={item}>
                                        <button 
                                            onClick={(e)=>onClickTab(e,item,idx)}
                                            className={tab[idx]?'on':''}
                                        >{item}</button>
                                    </li>
                                )
                            }                            
                        </ul>
                    </div>
                </div>
                <div className="content">
                {/* 상품나열 */}
                <ul>
                    {
                        state.상품.map((item, idx)=>{
                            if(Math.ceil((idx+1)/pageView) === pageCurrent){
                            return(
                                <li key={item.번호} className={`list list${idx+1}`}> 
                                    <div className="list-box">
                                        <div className="img-box">
                                            <a href="!#" onClick={(e)=>onClickViewProduct(e, item, `${item.상품이미지}`)}>
                                                <img src={`${item.상품이미지}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="text-box">
                                            <div className="row1">
                                                <div className="col1">
                                                {
                                                    item.종류.map((item2)=>{
                                                        return(
                                                            <span key={item2} className={item2}>{item2}</span>
                                                        )
                                                    })
                                                }    
                                                </div>
                                                <div className="col2">
                                                    <button onClick={onClickOpenModal} onMouseEnter={onMouseEnterHover} onMouseLeave={onMouseLeaveHover}>
                                                        {
                                                            hover===true?
                                                            <img src="./images/main/section9/bookmark_hover.png" alt="" />
                                                            :
                                                            <img src="./images/main/section9/bookmark.png" alt="" />
                                                        }
                                                    </button>
                                                </div>
                                            
                                            </div>
                                            <div className="row2">
                                                <h4>
                                                    <a href="!#">{item.상품명}</a>
                                                </h4>
                                            </div>
                                            <div className="row3">
                                            { 
                                                item.할인율<=0?
                                                <p className='dis-price'>{Math.round(item.정가*(1-item.할인율)).toLocaleString('ko-KR')}</p>
                                                :
                                                <>
                                                <p className='dis-price'>{Math.round(item.정가*(1-item.할인율)).toLocaleString('ko-KR')}</p>
                                                <p className='price'>{item.정가.toLocaleString('ko-KR')}</p>
                                                <p className='discount'>{Math.round(item.할인율*100)}%</p>
                                                </>
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                            }
                        })
                    }
                </ul>
                </div>
                {/* 페이지번호 */}
                <div className="event-bottom">
                    <span>
                        <a href='!#' onClick={onClickPrev}><img src="./images/sub/sub7/prev_icon.png" alt="" /></a>
                        {
                            pageNumber.map((item,idx)=>
                                <a 
                                    href='!#' 
                                    className= {`btnnum${pageArr[idx]?' on':''}`}
                                    key={item}
                                    data-key={item}
                                    onClick={(e)=>onClickpage(e,item)}
                                    >{item}</a>
                            )
                        }                    
                        <a href='!#' onClick={onClickNext}><img src="./images/sub/sub7/next_icon.png" alt="" /></a>
                    </span>                        
                </div>
            </div>
        </main>
    );
}

