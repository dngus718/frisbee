import React, { useEffect, useRef, useState } from 'react';
import './scss/Sub1Component.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sub1Component() {

    const slideWrap = useRef();
    const [cnt, setCnt] = useState(0);
    const [act, setAct] = useState([true,false,false,false])
    const [openSub, setOpenSub] = useState(false);
    const [smooth, setSmooth] = useState(false);
    const [mouseDown, setMouseDown] = useState(null);
    const [mouseUp, setMouseUp] = useState(null);
    const [dragStart, setDragStart] = useState(null);

    // 인디게이터 버튼 클릭 유무
    const [btnClick, setBtnClick] = useState(null);

    const [state, setState] = useState({
        title:'',
        mainMenu:[],
        subMenu:[],
        slide:[]
    });

    useEffect(()=>{
        axios({
            url:'./data/sub/sub1.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    title: res.data.sub1.title,
                    mainMenu: res.data.sub1.mainMenu,
                    subMenu: res.data.sub1.subMenu,
                    slide: res.data.sub1.slide
                })
            }
        })
        .catch((err)=>{
            return;
        });
    },[state]);

    const onClickSubBtn=(e)=>{
        e.preventDefault();
        setOpenSub(!openSub);
        setSmooth(!smooth);
    }

    const onClickGotoBtn=(e, num)=>{
        if(e!==null){
            e.preventDefault();
        }
        let imsi = Array(4).fill(false);
        imsi[num]=true;
        setAct(imsi);
        setCnt(num);
        // console.log(e, num);
        setBtnClick(true);
    }

    useEffect(()=>{
        let imsi = Array(4).fill(false);
        imsi[cnt]=true;
        setAct(imsi);

        if(btnClick===true){
            setBtnClick(false); // 인디게이터 초기화
            slideWrap.current.style.transition = 'transform 0.3s ease-in-out';
            slideWrap.current.style.transform = `translateX(${-426.666 * cnt}px)`;
        }
            
    },[btnClick, cnt]);
    
    const onMouseDownSlideContainer=(e)=>{
        e.preventDefault();
        setMouseDown('down');
        let dragS = e.clientX - (slideWrap.current.getBoundingClientRect().left - 311.5);
        setDragStart(dragS);
    }

    useEffect(()=>{
        if(mouseDown==='down'){
            function mouseupFn(e){
                setMouseUp('up');
                document.removeEventListener('mouseup', mouseupFn);
            }
            document.addEventListener('mouseup', mouseupFn);
        }
    },[mouseDown]);

    useEffect(()=>{
        if(mouseUp==='up'){            
            setMouseUp('ok');
        }
        else if(mouseUp==='ok'){
            setMouseDown(null);
            setMouseUp(null);
        }
    }, [mouseUp]);    

    // cnt 증감 함수
    function cntSetfn(num){       
        setCnt(num);
    }

   // 메인슬라이드 애니메이션 함수
   // 드래그앤드롭 할 때 애니메이션 구현
   function mainSlide(){            
        slideWrap.current.style.transition =`transform 0.6s linear`;        
        // slideWrap.current.style.transition =`transform 0.6s ease-in-out`;
        slideWrap.current.style.transform = `translateX(${-426.666 * cnt}px)`;          
   }

    const onMouseMoveSlideContainer=(e)=>{
        if(mouseDown!=='down') return;

        if(cnt>=0 && cnt<=3){
            // 한칸의 넓이보다 크면 두칸 가는 cnt대로 가게? 
            slideWrap.current.style.transition =`none`;
            slideWrap.current.style.transform = `translateX(${e.clientX - dragStart}px)`;        
            
            // 메인함수 이동 거리만큼 애니메이션 구현
            // mainSlide(e.clientX - dragStart);     
            setTimeout(()=>{
                mainSlide();
            }, 10); 
            
            // cnt 증가            
        }
        cntSetfn(Math.ceil((dragStart - e.clientX)/426.666)); // 1 2 3...
    }
    
    return (
        <main id='sub1' className='sub'>
            <section id="section1">
                <div className="main-menu">
                    <div className="title">
                        <h4>Apple</h4>
                    </div>
                    <div className="content">
                        <ul>
                        {
                            state.mainMenu.map((item)=>
                                <li key={item.no}>
                                    <a href="!#" onClick={onClickSubBtn}>
                                        <img src={`./images/sub/sub1/${item.img}`} alt="" />
                                        <p>{item.category}</p>
                                    </a>
                                </li>
                            )
                        }
                        </ul>
                    </div>
                </div>
                <div className={`sub-open-bar${openSub?' on':''}`}></div>
                {
                    <div className={`sub-menu${smooth?' on':''}`}>
                        <div className="sub-container">
                        {
                            state.subMenu.map((item)=>
                                <ul key={item.no}>
                                {
                                    item.products.map((item2, idx)=>
                                        <li key={idx}>
                                            <Link to="/sub1List">
                                                <span>{item2}</span>
                                            </Link>
                                        </li>  
                                    )
                                }                                  
                                </ul>
                            )
                        }
                        </div>
                    </div>
                }
            </section>
            <section id="section2">
                <div className="background"></div>
                <div className="content">
                    <div 
                        className="slide-container"
                        onMouseDown={onMouseDownSlideContainer}
                        onMouseMove={onMouseMoveSlideContainer}
                    >
                        <div className="slide-view">
                            <ul ref={slideWrap} className="slide-wrap">
                            {
                                state.slide.map((item, idx)=>
                                    <li key={item.no} className={`slide slide${idx+1}`}>
                                        <a href="!#">
                                            <img src={`./images/sub/sub1/${item.img}`} alt="" />
                                            <div className="text-box">
                                                <strong>{item.title1}</strong>
                                                <p>{item.title2}</p>
                                                <span>{item.more}</span>
                                            </div>
                                        </a>
                                    </li>
                                )
                            }
                            </ul>
                            <div className="click-box">
                            {
                                state.slide.map((item, idx)=>
                                idx<4 && (
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
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}