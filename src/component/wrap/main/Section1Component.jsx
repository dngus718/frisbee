import React from 'react';
import './scss/Section1Component.scss'
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom';

export default function Section1Component() {

    const [cnt, setCnt] = React.useState(0);
    const [slideFont, setSlideFont] = React.useState([Array(5).fill(false)]);
    const [slideBar, setSlideBar] = React.useState([Array(5).fill(false)]);
    const [id, setId] = React.useState(0);
    const [mouseDown, setMouseDown] = React.useState(null);
    const [mouseUp, setMouseUp] = React.useState(null);
    const [touchStart, setTouchStart] = React.useState(null);
    const [touchEnd, setTouchEnd] = React.useState(null);
    const slideWrap = React.useRef();

    const [state, setState] = React.useState({
        slide:[],
        productFont:[],
        sectionNum:'section1'
    })

    const {sectionNum} = state;

    const onClickNext=(e)=>{
        e.preventDefault()
        setCnt(cnt+1)
    }
    const onClickPrev=(e)=>{
        e.preventDefault()
        setCnt(cnt-1)
    }

    const onClickFont=(num)=>{
        setCnt(num);
    }

    function nextCount(){
        setCnt(cnt+1)
    }

    function prevCount(){
        setCnt(cnt-1)
    }


    React.useEffect(()=>{
        if(cnt>5){
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.left = `${-100 * 0}%`; 
            setTimeout(()=>{
                setCnt(1)
            },10)
        }
        else if(cnt<0){
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.left = `${-100 * 5}%`; 
            setTimeout(()=>{
                setCnt(5-1)
            },10)
        }
        else{
            slideWrap.current.style.transition = 'all 0.3s ease-in-out';
            slideWrap.current.style.left = `${-100 * cnt}%`;   
        } 
        
        let imsi = Array(5).fill(false);
        imsi[cnt===5?0:cnt] = true;
        setSlideFont(imsi);

        let x = Array(5).fill(false);
        x[cnt===5?0:cnt] = true;
        setSlideBar(x)

    },[cnt])

    React.useEffect(()=>{
        const setId = setInterval(()=>{
            setCnt(cnt => cnt+1)
        },4000)
        return()=> clearInterval(setId)
    },[cnt])

    React.useEffect(()=>{
        axios({
            url:'./data/main/main.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    slide: res.data[sectionNum].slide,
                    productFont:res.data[sectionNum].productFont
                })
            }
        })
        .catch((err)=>{
            console.log(err);
            return;
        });
    },[sectionNum, state]);

    const onMouseEnterSlideView=()=>{
        clearInterval(id);
    }

    const onMouseDownSlideView=(e)=>{
        setMouseDown('down');
        setTouchStart(e.clientX);
    }

    React.useEffect(()=>{
        if(mouseDown==='down'){
            function mouseupfn(e){
                setMouseUp('up');
                setTouchEnd(e.clientX);
                document.removeEventListener('mouseup', mouseupfn);
            }
            document.addEventListener('mouseup',mouseupfn);
        }
    },[mouseDown])

    React.useEffect(()=>{
        if(mouseUp==='up'){
            if((touchStart-touchEnd)>200){
                nextCount()
            }
            if((touchStart-touchEnd)<-200){
                prevCount()
            }
            setMouseUp('ok');
        }
        else if(mouseUp==='ok'){
            setMouseDown(null);
            setMouseUp(null);
            setTouchStart(null);
            setTouchEnd(null);
        }
    },[mouseUp])

    return (
        <>
        <section id='section1'>
            <div className="slide-container">
                    <div className="font-box">
                        <ul>{
                            state.productFont.map((item,idx)=>{
                                return(
                                    <li key={item.no} className={`slideBar${slideBar[idx]?' on':''}`}>
                                        <Link to="/main" onClick={()=>onClickFont(idx)}>
                                            <span className={`slideFont${slideFont[idx]?' on':''}`}>{item.font}</span>
                                        </Link>
                                    </li>
                                )
                            })
                            }
                        </ul>                      
                    </div>
                    <div className="button-box">
                        <button onClick={onClickPrev}><a href="!#"><img src="./images/main/section1/prev_icon-type4-active.png" alt="" /></a></button>
                        <button onClick={onClickNext}><a href="!#"><img src="./images/main/section1/next_icon-type4-active.png" alt="" /></a></button>
                    </div>
                    <div className="box-box"></div>
                    <div 
                        className="slide-view"
                        onMouseEnter={onMouseEnterSlideView}
                        onMouseDown={onMouseDownSlideView}                        
                    >
                        <ul ref={slideWrap} className="slide-wrap">
                            {
                                state.slide.map((item, idx)=>{
                                    return(
                                        <li className={`slide slide${item.no}`} data-key={item.no}  key={item.no}>
                                            <Link to="/main">
                                                <img src={`./images/main/${sectionNum}/${item.image}`} alt="" />
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
            </div>
        </section>
        <Outlet/>
        </>
    );
}

