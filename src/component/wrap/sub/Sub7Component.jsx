/* eslint-disable react-hooks/exhaustive-deps */
import './scss/Sub7Component.scss'
import useCoustom01State from './use_coustom_hook/sub7/useCoustom01State';
import useCoustom02Axios from './use_coustom_hook/sub7/useCoustom02Axios';
import useCoustom03BtnClick from './use_coustom_hook/sub7/useCoustom03BtnClick';

export default function Sub7Component() {

    // useCoustom01State.js
    // 스테이트
    const com = useCoustom01State()
    const {
        state,
        setState
    } = com

    // useCoustom02Axios.js
    // 엑시오스
    useCoustom02Axios({state,setState})

    // useCoustom03BtnClick.js
    // 버튼 클릭 이벤트

    const showBtn = useCoustom03BtnClick();

    const{
        isShow,
        onClickOnline,
        onClickMarket
    } = showBtn

    return (
        <main id='sub7' className='sub'>
            <div className="container">
                <div className="title">
                    <h3>Event</h3>
                </div>
                <div className="event-menu">
                    <div className="btn-box">
                        <button className='Event-btn-online' onClick={onClickOnline}>
                            온라인 이벤트
                        </button>                   
                        <button className='Event-btn-market' onClick={onClickMarket}>
                            매장 이벤트
                        </button>      
                    </div>   
                </div>
                <div className="event-container">
                    <div className="event-top">
                        <div className="left">
                            <span>총 7건</span>
                        </div>
                        <div className="right">
                            <select name="eventList" id="eventList">
                                <option value="전체 이벤트">전체 이벤트</option>
                                <option value="진행중 이벤트">진행중 이벤트</option>
                                <option value="종료된 이벤트">종료된 이벤트</option>
                            </select>
                        </div>
                    </div>
                    <div className="event-list-container">
                        <div className= {`event-list-box${isShow?' on':''}`}>
                            <ul>
                                {
                                state.online.map((item)=>
                                    <li className='event event1' key={item.num}>
                                        <img src= {`${item.images}`} alt="" />                       
                                        <div className="text">
                                            <h3>{item.title}</h3>
                                            <p>{item.date}</p>
                                            <a href="!#">
                                                <span>이벤트 보기</span>
                                            </a>
                                        </div>
                                    </li>
                                )                                 
                                }
                            </ul>
                        </div>
                        <div className= {`market-list-box${isShow?' on':''}`}>
                            <ul>
                            {
                                state.market.map((item)=>
                                    <li className='event event' key={item.num}>
                                        <img src= {`${item.images}`} alt="" />                       
                                        <div className="text">
                                            <h3>{item.title}</h3>
                                            <p>{item.date}</p>
                                            <a href="!#">
                                                <span>이벤트 보기</span>
                                            </a>
                                        </div>
                                    </li>
                                )                                 
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="event-bottom">
                        <button><img src="./images/sub/sub7/prev_icon.png" alt="" /></button>
                        <button className='btnNum'>1</button>
                        <button><img src="./images/sub/sub7/next_icon.png" alt="" /></button>
                    </div>
                </div>
            </div>
        </main>
    );
}

