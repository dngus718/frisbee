import React, { useEffect } from 'react';
import './scss/HeaderComponent.scss'
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartAction } from '../../store/cart';
import { setLoginAction } from '../../store/login';
import axios from 'axios';

export default  function HeaderComponent() {

    const login = useSelector((state)=>state.login);
    const cart = useSelector((state)=> state.cart)
    const dispatch = useDispatch();
    const row2 = React.useRef();
    const nav = React.useRef();
    const [mbSub, setMbSub] = React.useState(false);
    const [mbSubSub, setMbSubSub] = React.useState(false);
    const [fixed, setFixed] = React.useState(false);
    const [isShow, setIsShow] = React.useState(false);
    const [anime, setAnime] = React.useState(false);
    const [subShow, setSubShow] = React.useState(Array(9).fill(true));

    const [state, setState] = React.useState({
        메인메뉴:{}
    })    

    useEffect(()=>{
        axios({
            url:'./data/header.json',
            method:'GET'
        })
        .then((res)=>{
            setState({
                메인메뉴: res.data.네비게이션.메인메뉴
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const onMouseEnterMenu=()=>{
        setIsShow(true);
        setAnime(true);
        if(fixed){
            nav.current.style.top = `${90}px`;
        }
        else{
            nav.current.style.top = `${90}px`;
        }
    }
    const onMouseLeaveMenu=()=>{
        setIsShow(false);
        setAnime(false);
    
    }


    useEffect(()=>{
        const row3Top = row2.current.offsetTop

        window.addEventListener('scroll',(e)=>{
            if(window.scrollY >= row3Top){
                setFixed(true)
            }
            else{
                setFixed(false)
            }   
        })
    },[])

    useEffect(()=>{
        const navFix = nav.current.offsetTop

        window.addEventListener('scroll',(e)=>{
            if(window.scrollY >= navFix){
                nav.current.style.position = 'absolute';
                nav.current.style.top = `${90}px`;
                
            }
            else{
                nav.current.style.position = 'absolute';
                nav.current.style.top = `${90}px`;
                
            }
        })
    },[])

    const onMouseEnterMoblieMenu=()=>{
        setMbSub(true);
        setMbSubSub(true);
    }
    const onMouseLeaveMoblieMenu=()=>{
        setMbSub(false);
        setMbSubSub(false);
    }


    useEffect(()=>{
        if(localStorage.getItem('CART')!==null){
            const temp = JSON.parse(localStorage.getItem('CART'));
            const obj = {
                장바구니 : temp
            }
            dispatch(cartAction(obj))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // 로그인 데이터 가져오기
    useEffect(()=>{
        try{
            if(localStorage.getItem('LOGIN_INFO')!==null){
                const res = JSON.parse(localStorage.getItem('LOGIN_INFO'));

                // 만료일 지나면 로그아웃
                let 아이디 = '';
                let 만료일 = '';
                if(new Date() > new Date(res.exp)){
                    아이디 = '';
                    만료일 = '';
                }
                else {
                    아이디 = res.userId;
                    만료일 = res.exp;
                }
                const obj = {
                    userId: 아이디,
                    exp: 만료일
                }
                dispatch(setLoginAction(obj));
            }
        }
        catch(err){
            return;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 로그아웃
    const onClickLogOut=(e)=>{
        e.preventDefault();
        localStorage.removeItem('LOGIN_INFO');
        const obj = {
            userId:'',
            exp:''
        }
        dispatch(setLoginAction(obj));
    }

    return (
        <>
        <header id='header'>
            <div className="row1-container">
                    <div className="row1">
                        <ul className='left-font'>
                            <li><a href="!#">보상판매</a></li>
                            <li><a href="!#">온라인 교육</a></li>
                            <li><a href="!#">매장안내</a></li>
                            <li><a href="!#">Apple 공인 서비스</a></li>
                        </ul>
                        <ul className='right-font'>
                            <li className='cart'>
                                <Link to="/sub8">
                                    <img src="./images/header/cart-icon.png" alt="" />
                                        {
                                            cart.장바구니.length > 0 &&
                                            <span>{cart.장바구니.length}</span>
                                        }
                                    <p>장바구니</p>
                                </Link>
                            </li>
                        {
                            login.userId==='' ?
                            <li><Link to="/sub9"><img src="./images/header/mypage-black.png" alt="" /><p>마이페이지</p></Link></li>
                            :
                            <li><a href="/sub9"><img src="./images/header/mypage-black.png" alt="" /><p>{login.userId}님!</p></a></li>
                        }
                        {
                            login.userId==='' ?
                            <li><Link to="/sub10Login"><img src="./images/header/login-black.png" alt="" /><p>로그인</p></Link></li>
                            :
                            <li><a href="!#" onClick={onClickLogOut}><img src="./images/header/login-black.png" alt="" />로그아웃</a></li>
                        }
                        </ul>
                    </div>
                </div>
            <div ref={row2} className={`row2-container${fixed?' on':''}`}>
                <div className="row2">
                    <div className={`col1${fixed?' on':''}`}>
                            <Link to="/main">
                                <img src="./images/header/logo_new.png" alt="" />
                            </Link>
                    </div>
                    <div className={`col2${fixed?' on':''}`} onMouseLeave={onMouseLeaveMenu}>
                        <div className="mobile-btn-box1">
                            <a href="!#" className= {`menu${anime?' on':''}`} onMouseEnter={onMouseEnterMenu}>
                                <i className='line line1'></i>
                                <i className='line line2'></i>
                                <i className='line line3'></i> 
                            </a>    
                        </div>       
                        <div className="mobile-btn-box2">
                            <a href="!#" className= {`menu${mbSub?' on':''}`} onMouseEnter={onMouseEnterMoblieMenu}>
                                <i className='line line1'></i>
                                <i className='line line2'></i>
                                <i className='line line3'></i> 
                            </a>    
                        </div>            
                        <a href="!#" className= {`cate${anime?' on':''}`} onMouseEnter={onMouseEnterMenu}>
                            CATEGORY
                        </a> 
                        <div   
                            ref={nav}
                            id="nav" 
                            className={isShow ? ' on':''} 
                            >
                            <ul>
                                {
                                Object.keys(state.메인메뉴).map((item, idx)=>
                                    <li key={item}>
                                        <a href="!#">
                                            {item}
                                        </a>                                       
                                        {
                                        subShow[idx] &&
                                        <div className= {`sub sub${idx+1}${setSubShow?' on':''}`}>
                                            <ul>
                                                {
                                                    state.메인메뉴[item].map((item2,idx2)=>
                                                        <li key={idx2}>
                                                        <span>
                                                            <a href="!#">{item2}</a>
                                                        </span>
                                                        </li>  
                                                    )                                                  
                                                }                                                                                                                                                                      
                                            </ul>
                                        </div>
                                        }
                                </li>  
                                )                                  
                                }                          
                            </ul>
                        </div>                               
                    </div>
                    <div className={`col3${fixed?' on':''}`}>
                        <div className="moblie-sub-sub-box">
                            <ul className= {`subMenuSee${mbSubSub?' on':''}`} onMouseLeave={onMouseLeaveMoblieMenu}>
                                <li><Link to="/sub1" onClick={() => window.scrollTo(0, 0)}>Apple</Link></li>
                                <li><Link to="/sub2" onClick={() => window.scrollTo(0, 0)}>New</Link></li>
                                <li><Link to="/sub3" onClick={() => window.scrollTo(0, 0)}>MD’s Pick</Link></li>
                                <li><Link to="/sub4" onClick={() => window.scrollTo(0, 0)}>Brand Shop</Link></li>
                                <li><Link to="/sub5" onClick={() => window.scrollTo(0, 0)}>Ranking</Link></li>
                                <li><Link to="/sub6" onClick={() => window.scrollTo(0, 0)}>Community</Link></li>
                                <li><Link to="/sub7" onClick={() => window.scrollTo(0, 0)}>Event</Link></li>
                            </ul>
                        </div>                        
                    </div>
                    <div className={`col4${fixed?' on':''}`}>
                        <a href="!#"><img src="./images/header/search_icon.png" alt="" /></a>
                    </div>
                </div>
            </div>
            
        </header>
        <Outlet/>
        </>
    );
}

