import React, { useState } from 'react';
import './scss/Sub10LoginComponent.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoginAction } from '../../../store/login';
import { useNavigate } from 'react-router-dom';

export default function Sub10LoginComponent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [mem, stateMem] = useState(false);

    const [state, setState] = useState({
        아이디:'',
        비밀번호: ''
    });

    const onClickMemBtn=(e)=>{
        e.preventDefault();
        stateMem(false);
    }

    const onClickNonmemBtn=(e)=>{
        e.preventDefault();
        stateMem(true);
    }

    const onChangeUserId=(e)=>{
        setState({
            ...state,
            아이디: e.target.value
        })
    }

    // 비밀번호 입력
    const onChangeUserPw=(e)=>{
        setState({
            ...state,
            비밀번호: e.target.value
        })
    }

    const onClickLogin=(e)=>{
        e.preventDefault();
        if(state.아이디===''){
            alert('아이디를 입력하세요!');
        }
        else if(state.비밀번호===''){
            alert('비밀번호를 입력하세요!');
        }
        else {
            let formData = new FormData();
            formData.append('user_id', state.아이디);
            formData.append('user_pw', state.비밀번호);

            axios({
                url: '/frisbee/login.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{               
                // console.log( res.data );
                // console.log( res.data.아이디 );
                if(state.아이디===res.data.아이디){
                    // 로그인 만료일 1일 설정
                    let expires = new Date();
                    expires.setDate(expires.getDate() + 1);
    
                    const obj = {
                        userId: res.data.아이디,
                        exp: expires.getTime()
                    }
                    localStorage.setItem('LOGIN_INFO', JSON.stringify(obj));
                    dispatch(setLoginAction(obj));
                    navigate('/main');
                }
                else {
                    alert('아이디와 비밀번호를 확인해주세요.');
                }
            })
            .catch((err)=>{
                console.log('axios 전송 실패!');
            });
        }
    }

    const onClickSearch=(e)=>{
        e.preventDefault();
        alert('해당 기능은 준비중입니다.');
    }

    return (
        <main id='sub10Login' className='sub'>
            <div className="container">
                <div className="title">
                    <h1>로그인</h1>
                </div>
                <div className="login-container">
                    <div className="mem-btn-box">
                        <button onClick={onClickMemBtn} className={`member-btn${mem?' on':''}`}>프리스비 회원</button>
                        <button onClick={onClickNonmemBtn} className={`nonmember-btn${mem?' on':''}`}>비회원 주문조회</button>
                    </div>
                    <div className="login-wrap">
                        <div className={`member-wrap${mem?' on':''}`}>
                            <div className="login-box">
                                <div className="login-inner">
                                    <form>
                                        <div className="login">
                                            <div className="idpw id-box">
                                                <img src="./images/sub/sub10/admin_icon-off.png" alt="" />
                                                <input 
                                                    type="text" 
                                                    name='user_id' 
                                                    id='userId' 
                                                    placeholder='아이디'
                                                    onChange={onChangeUserId}
                                                    value={state.아이디}

                                                />
                                            </div>
                                            <div className="idpw pw-box">
                                                <img src="./images/sub/sub10/lock_icon-off.png" alt="" />
                                                <input 
                                                    type="password" 
                                                    name='user_pw' 
                                                    id='userPw' 
                                                    placeholder='비밀번호' 
                                                    onChange={onChangeUserPw}
                                                    value={state.비밀번호}
                                                />
                                            </div>
                                        </div>
                                        <div className="login-save">
                                            <label>
                                                <input type="checkbox" name="saveId" id="saveId" />
                                                <span>아이디 저장</span>
                                            </label>
                                            <label>
                                                <input type="checkbox" name="autoLogin" id="autoLogin" />
                                                <span>자동 로그인</span>
                                            </label>
                                        </div>
                                    </form>
                                    <div className="login-btn-box">
                                        <button onClick={onClickLogin}>로그인</button>
                                    </div>
                                </div>
                            </div>
                            <div className="etc-box">
                                <div className="find-box">
                                    <a onClick={onClickSearch} href="!#">아이디 찾기</a>
                                    <i>|</i>
                                    <a onClick={onClickSearch} href="!#">비밀번호 찾기</a>
                                    <i>|</i>
                                    <Link to="/sub11Signup">회원가입</Link>
                                </div>
                                <div className="kakao-btn-box">
                                    <a href="https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fis_popup%3Dfalse%26ka%3Dsdk%252F1.43.5%2520os%252Fjavascript%2520sdk_type%252Fjavascript%2520lang%252Fko-KR%2520device%252FWin32%2520origin%252Fhttps%25253A%25252F%25252Fwww.frisbeekorea.com%26auth_tran_id%3Dtao90y9o5eq1c48b4f1ed3656f47681d75bcc5d9955m68wfngt%26response_type%3Dcode%26state%3D%257B%2522originUrl%2522%253A%2522https%25253A%25252F%25252Fwww.frisbeekorea.com%25252Fshop%25252Fmember%25252Flogin.do%2522%252C%2522frisbeekey%2522%253A%25221l33c1q6pifd82hr1e18%2522%257D%26redirect_uri%3Dhttp%253A%252F%252Fwww.frisbeekorea.com%253A9090%252Fkkosync%252Fv1%252Fkakao_oauth%26client_id%3D1c48b4f1ed3656f47681d75bcc5d9955%26through_account%3Dtrue&talk_login=hidden#login">
                                        <img src="./images/sub/sub10/kakao_logo.png" alt="" />
                                        <span>카카오로 시작하기</span>
                                    </a>
                                </div>
                                <div className="or-box">
                                    <p>or</p>
                                </div>
                                <div className="sns-btn-box">
                                    <a href="https://www.frisbeekorea.com/shop/member/register-detail.do?snsType=naver">
                                        <img src="./images/sub/sub10/naver_icon.png" alt="" />
                                    </a>
                                    <a href="https://appleid.apple.com/auth/authorize?client_id=com.frisbee.loginid2&redirect_uri=https%3A%2F%2Fwww.frisbeekorea.com%2Fshop%2Fsns%2Fapple.do&response_type=code%20id_token&state=authorized&scope=name%20email&response_mode=form_post&frame_id=&m=22&v=1.5.2">
                                        <img src="./images/sub/sub10/apple_icon.png" alt="" />
                                    </a>
                                    <a href="https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?client_id=640018570900-8tq29f1uf2c9936jmp7g0uufh301dhlv.apps.googleusercontent.com&scope=profile%20email&redirect_uri=https%3A%2F%2Fwww.frisbeekorea.com%2Fshop%2Fmember%2Fex-google-login.do&state=%7B%22sid%22%3A1%2C%22cdl%22%3Anull%2C%22st%22%3A%22fa44f29f8487faa4427c77e0d15f5901f8086f243d00b9d559843bd6432b4eef%22%2C%22ses%22%3A%22323a031874f447209c8b8190adfeaac3%22%7D&response_type=code&service=lso&o2v=1&ddm=1&flowName=GeneralOAuthFlow">
                                        <img src="./images/sub/sub10/google_icon.png" alt="" />
                                    </a>
                                </div>
                                <div className="info-box">
                                    <strong>기존 회원 안내사항</strong>
                                    <p>
                                        1. 비밀번호 찾기에서 비밀번호 재설정 후 로그인 가능합니다.<br />
                                        2. 주문내역, 적립금 내역, 문의 내역등은 삭제되어 확인이 불가능합니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={`nonmember-wrap${mem?' on':''}`}>
                            <div className="order-info-box">
                                <div className="order-info-inner">
                                    <form>
                                        <div className="order-info">
                                            <input type="text" placeholder='주문번호 입력' />
                                            <input type="text" placeholder='주문자명 입력' />
                                        </div>
                                    </form>
                                    <div className="submit-btn-box">
                                        <button>확인</button>
                                    </div>
                                    <div className="info-box">
                                        <p>※ 주문번호를 잊으신 경우, 프리스비 고객센터로 문의해주시기 바랍니다.</p>
                                    </div>
                                    <div className="bar"></div>
                                    <div className="signup-box">
                                        <span>아직 프리스비 회원이 아니신가요?</span>
                                        <Link to="/sub11Signup">회원가입</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}