import React from 'react';
import './scss/Sub6Component.scss';
import axios from 'axios';
import {useEffect, useState, useRef} from 'react';


export default  function Sub6Component() {

    //// [1] 슬라이드, spot 좌우페이지 //////////////////////////////
    const slideWrap = useRef();
    
    const [spot, setSpot] = useState([Array(8).fill(false)]);
    const [cnt, setCnt] = useState(0);

    //// [2] 페이지 네이션 ////////////////////////////////////////////
    const [pageView] = useState(9);           // 한화면 보여줄 상품 갯수
    const [pageCurrent, setPageCurrent] = useState(1); // 현재 페이지 번호
    const [pageNumber, setPageNumber] = useState([]);  // 페이지 번호[]
    const [pageTotal, setpPgeTotal]  = useState(0);    // 전체 페이지 갯수[]
    const [pageArray, setPageArray] = useState([]);    // [false, false, ... ]


    //// [1,2] data > sub > sub.json 연결 ////////////////
    const [state, setState] = useState({
        cumunity: [],
        photo: [],
        subName: 'sub6'
    });
    const {subName} = state;
    
    //// [1,2] data > sub > sub.json 연결 //////////////////////////////
    useEffect(()=>{
        axios({
            url:'./data/sub/sub6.json',
            method: 'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    cumunity: res.data[subName].cumunity,
                    photo: res.data[subName].photo
                })
            }
        })
        .catch((err)=>{
            console.log(err);
            return;
        })
    }, [subName, state])
    //// [1,2] ////////////////////// //////////////////////////////

    //// [1] ////////////////////// //////////////////////////////
    const onClickViewCumunity=(e, cumunity, cumunityImg)=>{
        e.preventDefault();
        let 커뮤니티 = cumunity;
        cumunity = {
            ...커뮤니티,
            커뮤이미지: cumunityImg
        }
    }
    //// [1] ////////////////////// //////////////////////////////

    //// [2] ////////////////////// //////////////////////////////
    useEffect(()=>{    
        if(state.photo.length > 0){
            let imsi = [];
            let page = [];
            let pageArr = [];
            let num = 0;
            // 한페이지에 보여줄 photo 갯수 9 pageView
            // 전체 photo 갯수  state.photo.length
            num = Math.ceil(state.photo.length / pageView);  // 총 페이지 수
            imsi = Array(num).fill(0);  // 5개 [0,0,0,0,0]
            pageArr = Array(num).fill(false); //  [false,false,false,false,false]
            pageArr[0] = true;  // 로딩시 첫번재 페이지 true
            // 페이지번호 배열 넣기 
            // 리듀스 사용 하기
            imsi.reduce((acc, item, num)=> 
                page[num] = acc + 1 
            , 0)

            setPageNumber(page);   // 페이지 번호 저장
            setpPgeTotal(num);     // 총 페이지 수, 페이지 번호 컬러 변경
            // setPageArray(pageArr); // 페이지 번호 컬러 변경 addClass
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    // 페이지번호 컬러 자동 변경 감시자 
    // 현재페이지 변경되면 동작(로딩시,이전, 다음, 현재클릭)
    useEffect(()=>{
        let pageArr = Array(pageTotal).fill(false);
        pageArr[pageCurrent-1] = true;
        setPageArray(pageArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageCurrent]); // 페이지버튼의 컬러 변경은 현재페이지 번호를 의존성 배열 사용
    //// [2] ////////////////////// //////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////
///// [1] <ul. slide-wrap> ///////////////////////////////////////////////////////////////////////////

    // [1] 슬라이드 좌우버튼
    const onClickNextBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);
    };
    const onClickPrevBtn=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
    };

    // [1] 슬라이드, 좌우화살버튼
    useEffect(()=>{

        if(cnt>9){
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.left = `${-100 * 0}%`; 
            setTimeout(()=>{
                setCnt(1)
            },10)
        }
        else if(cnt<0){
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.left = `${-100 * 9}%`; 
            setTimeout(()=>{
                setCnt(9-1)
            },10)
        }
        else{
            slideWrap.current.style.transition = 'all 0.3s ease-in-out';
            slideWrap.current.style.left = `${-100 * cnt}%`;   
        } 

        // spot 해당 점일경우 검정막대로 보이기
        let imsi = Array(9).fill(false);
        imsi[cnt===9?0:cnt] = true;
        setSpot(imsi);
        
    },[cnt]);

    // [1] spot 클릭으로 슬라이드 넘기기
    const onClickSpot=(e, idx)=>{
        e.preventDefault();
        setCnt(idx);
    };
///// [1] <ul. slide-wrap> //////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////
///// [2] ///////////////////////////////////////////////////////////////////////////
    // 현재 페이지 번호 클릭 이벤트
    const onClickPage=(e, num, idx)=>{
        e.preventDefault();
        setPageCurrent( num ); // 페이지 이동 (현재페이지)       
    };

    // 이전 페이지 이동
    const onClickPrev=(e)=>{
        e.preventDefault();
        setPageCurrent( pageCurrent-1 <= 1 ? 1 : pageCurrent-1 );
    };

    // 다음 페이지 이동
    const onClickNext=(e)=>{
        e.preventDefault();
        setPageCurrent( pageCurrent+1 >= pageTotal ? pageTotal : pageCurrent+1 );
    };
///// [2] ///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////




    return (
        <main id='sub6' className='sub'>
            <section id="section_sub6">
                <div className="top">
                    <h3>community</h3>
                    <button>사진 올리기</button>
                </div>
                <div className="slide-container">
                    <div className="slide-view">
                {/* // [1] 시작 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        <ul ref={slideWrap} className="slide-wrap">
                            {
                                state.cumunity.map((item, idx)=>{
                                    return (
                                    <li className={`slide slide${idx+1}`} key={item.code}>
                                        <div className="center">
                                            <a href="!#" className="slide-link" onClick={(e)=>onClickViewCumunity(e, item)}>
                                                <div className="img-box">
                                                    <img src={`./images/sub/${subName}/${item.image}`} alt={item.no} />
                                                </div>
                                                <div className="slide-text-box">
                                                    <div className="text">
                                                        <h3>{item.title}</h3>
                                                        <p>{item.작성자}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </li>
                                    )
                                })
                            }                        
                        </ul>
                        
                        <div className="page-num">
                            {  
                                state.cumunity.map((item, idx)=>
                                idx<=8 &&
                                    <span key={item.no} onClick={(e)=>onClickSpot(e, idx)} className={`swiper-spot${spot[idx]? ' on':''}`}></span>
                                )
                            }
                        </div>
                            
                        {/* 좌우화살버튼 배치 */}
                        <a href="!#" onClick={onClickNextBtn} className='slide-btn-next'><img src="./images/sub/sub6/next_icon-type3-active.png" alt="오른쪽 화살표" /></a>
                        <a href="!#" onClick={onClickPrevBtn} className='slide-btn-prev'><img src="./images/sub/sub6/next_icon-type3-active.png" alt="왼쪽 화살표" /></a>
                {/* // [1] 여기까지 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


                {/* // [2] 시작 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}        
                        <div className="bottom">
                            <ul>
                                {
                                    // eslint-disable-next-line array-callback-return
                                    state.photo.map((item, idx)=>{
                                        if(Math.ceil((idx+1)/pageView) === pageCurrent){
                                            return (
                                                <li key={item.no}>
                                                    <a href="!#">
                                                        <div className="photo-box">
                                                            <img src={`./images/sub/${subName}/${item.image}`} alt={item.memo} />
                                                        </div>
                                                        <div className="desc-box">
                                                            <p>{item.작성자}</p>
                                                            <span>{item.memo}</span>
                                                        </div>
                                                    </a>
                                                    <div className="board-line"></div>
                                                    <div className="icon-box">
                                                        <div className="icon-love">
                                                            <button><img src="./images/sub/sub6/heartbig_off.png" alt="좋아요" /></button>
                                                            <span>{item.좋아요}</span>
                                                        </div>
                                                        <div className="icon-bubble">
                                                            <a href="!#"><img src="./images/sub/sub6/bubble-icon.png" alt="댓글" /></a>
                                                            <span>{item.댓글}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>

                            {/* 페이지 넘버 버튼 */}
                            <div className="page-num">
                                <a href="!#" onClick={onClickPrev} className='page-prev act'><img src="./images/sub/sub4/sub4_prev_icon.png" alt="prev_icon" /></a>
                                {    
                                    pageNumber.map((item, idx)=>
                                        <a href="!#" key={item}  data-key={item} onClick={(e)=>onClickPage(e, item, idx)} className={`pages${pageArray[idx] ? ' on':''}`}>
                                            {item}
                                        </a>
                                    )
                                }
                                <a href="!#" onClick={onClickNext} className='page-next act'><img src="./images/sub/sub4/sub4_next_icon.png" alt="next_icon" /></a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
