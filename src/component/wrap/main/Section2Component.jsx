import { React, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './scss/Section2Component.scss';

export default function Section2Component() {

    const [state, setState] = useState({
        slide: [],
        sectionName: 'section2'
    })

    const {sectionName} = state;
    const slideWrap = useRef();
    const [cnt, setCnt] = useState(0);
    const [spot, setSpot] = useState([Array(5).fill(false)]);

    useEffect(()=>{
        axios({
            url: './data/main/main.json',
            method: 'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    slide: res.data[sectionName].slide
                })
            }
        })
        .catch((err)=>{
            return;
        });
    },[sectionName, state]);

    const onClickNextBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt=>cnt+1);
        console.log(cnt);
    };

    const onClickPrevBtn=(e)=>{
        e.preventDefault()
        setCnt(cnt=>cnt-1); 
        console.log(cnt);  
    };

    useEffect(() => {
        if(cnt > 5){
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.left = `${-352 * 0}px`;
            setTimeout(()=>{
                setCnt(1);
            },10)
        }
        else if(cnt < 0){
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.left = `${-352 * 5}px`;
            setTimeout(()=>{
                setCnt(5-1);
            },10)
        }
        else{
            slideWrap.current.style.transition = 'all 0.3s ease-in-out';
            slideWrap.current.style.left = `${-352 * cnt}px`;
        }

        let imsi = Array(5).fill(false);
        imsi[cnt===5?0:cnt] = true;
        setSpot(imsi);
    }, [cnt]);

    const onClickPagingIcon=(e, idx)=>{
        e.preventDefault();
        setCnt(idx);
    }

    return (
        <section id='section2'>
            <div className="container">
                <div className='slide_container'>
                    <div className="slide-view">
                        <ul 
                            className="slide-wrap" 
                            ref={slideWrap}
                        >
                            {
                                state.slide.map((item, idx)=>{
                                    return(
                                        <li className='slide' key={item.no}>
                                            <a href="!#" title={item.title}>
                                                <p>{item.product_name}</p>
                                                <h2>{item.title}</h2>
                                                <h3>{item.content}</h3>
                                                <img src={`./images/main/section2/${item.images}`} alt={item.title} />
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className="swiper-nav">
                    {
                        Array(5).fill().map((_, idx) => (
                            <span
                                key={idx}
                                onClick={(e) => onClickPagingIcon(e, idx)}
                                className={`swiper-spot${spot[idx] ? ' on' : ''}`}>
                            </span>
                        ))
                    }
                </div> 


                <button className='prev-btn' onClick={onClickPrevBtn}>
                    <img src="./images/main/section2/prev_icon-type3-active.png" alt="" />
                </button>
                <button className='next-btn' onClick={onClickNextBtn}>
                    <img src="./images/main/section2/next_icon-type3-active.png" alt="" />
                </button>
            </div>
        </section>
    );
}