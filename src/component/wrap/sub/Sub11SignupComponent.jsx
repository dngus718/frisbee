import React, { useState } from 'react';
import './scss/Sub11SignupComponent.scss';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

export default function Sub11SignupComponent() {

    const navigate = useNavigate();
    const [state, setState] = useState({
        이름: '',
        이름_가이드텍스트: '',
        이름유효성검사: null,
        성별: '남자',
        생년월일: '',
        생년월일_가이드텍스트: '',
        생년월일유효성검사: null,
        아이디: '',
        아이디_가이드텍스트: '',
        아이디유효성검사: null,
        아이디중복검사: null,
        비밀번호1: '',
        비밀번호2: '',
        비밀번호_가이드텍스트: '',
        비밀번호유효성검사: null,
        이메일: '',
        이메일_가이드텍스트: '',
        이메일유효성검사: null,
        이메일중복검사: null,
        휴대폰: '',
        휴대폰_가이드텍스트: '',
        휴대폰유효성검사: null
    });

    // 1. 이름
    // 공백
    // 1자 ~ 20자
    // 특수문자 입력 안되게
    // [`~!#$%^&*()-_=+\\|[{\]}'";:/?.>,<]
    // => '이름을 입력해주세요.'
    const onChangeName=(e)=>{
        let 이름 = '';
        let 이름_가이드텍스트 = '';
        let regExp = /[`~!#$%^&*()-_=+\\|[{\]}'";:/?.>,<]/g;
        let 이름유효성검사 = null;

        이름 = e.target.value.replace(regExp, '');
        if(이름===''){
            이름_가이드텍스트 = '이름을 입력해주세요.';
            이름유효성검사 = false;
        }
        else{
            이름_가이드텍스트 = '';
            이름유효성검사 = true;
        }
        setState({
            ...state,
            이름: 이름,
            이름_가이드텍스트: 이름_가이드텍스트,
            이름유효성검사: 이름유효성검사
        })
    }

    // 2. 성별
    // 기본 남자 선택되어있음
    const onChangeGender=(e)=>{
        setState({
            ...state,
            성별: e.target.value
        })
    }

    // 3. 생년월일
    // 공백
    // 8자
    // 연도 1920 - 2011
    // 월 01 - 12
    // 일 01 - 31
    // => '생년월일을 입력해주세요.'
    const onChangeBirth=(e)=>{
        let 생년월일 = '';
        let 생년월일_가이드텍스트 = '';
        let regExp1 = /[^0-9]/g;
        let regExp2 = /^(19[2-9][0-9]|200[0-9]|2010|2011)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/g;
        let 생년월일유효성검사 = null;

        생년월일 = e.target.value.replace(regExp1, '');
        if(생년월일==='' || !regExp2.test(생년월일)){
            생년월일_가이드텍스트 = '생년월일을 입력해주세요.';
            생년월일유효성검사 = false;
        }
        else{
            생년월일_가이드텍스트 = '';
            생년월일유효성검사 = true;
        }
        setState({
            ...state,
            생년월일: 생년월일,
            생년월일_가이드텍스트: 생년월일_가이드텍스트,
            생년월일유효성검사: 생년월일유효성검사
        })
    }

    // 4. 아이디
    // 공백
    // => '아이디를 입력해주세요.'
    // 영문 or 숫자
    // 5 ~ 20자
    // => '아이디형식이 올바르지 않습니다.'
    const onChangeId=(e)=>{
        let 아이디 = e.target.value;
        let 아이디_가이드텍스트 = '';
        let regExp1 = /^(.){5,20}$/g;
        let regExp2 = /^[A-Za-z0-9]+$/g;
        let regExp3 = /[~`!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/]/g;
        let 아이디유효성검사 = null;
        let 아이디중복검사 = null;

        아이디 = 아이디.replace(regExp3, '');

        if(아이디===''){
            아이디_가이드텍스트 = '아이디를 입력해주세요.';
            아이디유효성검사= false;
            아이디중복검사= false;
        }
        else if(regExp1.test(아이디)===false || regExp2.test(아이디)===false){
            아이디_가이드텍스트 = '아이디형식이 올바르지 않습니다.';
            아이디유효성검사= false;
            아이디중복검사= false;
        }
        else {
            아이디_가이드텍스트 = '';
            아이디유효성검사= true;
            아이디중복검사= true;
        }
        
        setState({
            ...state,
            아이디: 아이디,
            아이디_가이드텍스트: 아이디_가이드텍스트,
            아이디유효성검사: 아이디유효성검사,
            아이디중복검사: 아이디중복검사
        })
    }

    // 아이디 중복확인
    // => '아이디 중복확인을 해주세요.'
    // onClick, php?
    const onClickIdCheck=(e)=>{
        e.preventDefault();

        let 아이디_가이드텍스트 = '';
        let 아이디유효성검사 = null;
        let 아이디중복검사 = null;

        if (state.아이디 === '') {
            setState({
                ...state,
                아이디_가이드텍스트: '아이디를 입력해주세요.',
                아이디유효성검사: false,
                아이디중복검사: false
            });
            return;
        }

        const formData = new FormData();
        formData.append('user_id', state.아이디);

        axios({
            url: '/frisbee/id_check.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            console.log( Number(res.data) )
            if(Number(res.data)===1){
                아이디_가이드텍스트 = '사용 불가능한 아이디입니다.';
                아이디유효성검사 = false;
                아이디중복검사 = false;
            }
            else{
                if(state.아이디유효성검사===true){
                    아이디_가이드텍스트 = '사용 가능한 아이디입니다.';
                    아이디유효성검사 = true;
                    아이디중복검사 = true;
                } 
                else{
                    아이디_가이드텍스트 = '사용 불가능한 아이디입니다.';
                    아이디유효성검사= false;
                    아이디중복검사 = false;
                }              
            }
            setState({
                ...state,
                아이디_가이드텍스트: 아이디_가이드텍스트,
                아이디유효성검사: 아이디유효성검사,
                아이디중복검사: 아이디중복검사
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    // 5. 비밀번호
    // 공백
    // => '비밀번호가 일치하지 않습니다.'
    // 8자 이상 20자 이하
    // 영문 대/소문자,숫자,특수문자 중 2가지 조합
    // 영문 대/소문자,숫자
    // 영문 대/소문자,특수문자
    // 숫자,특수문자
    // => '비밀번호형식이 올바르지 않습니다.'
    const onChangePw1=(e)=>{
        let 비밀번호1 = e.target.value;
        let 비밀번호_가이드텍스트 = '';
        const regExp1 = /^(.){8,20}$/g;
        const regExp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()-_=+[\]{}\\|;:'",.<>/?])+)|((?=.*[0-9])+(?=.*[`~!@#$%^&*()-_=+[\]{}\\|;:'",.<>/?])+)/g;
        let 비밀번호유효성검사 = null;

        if(비밀번호1===''){
            비밀번호_가이드텍스트 = '비밀번호가 일치하지 않습니다.';
            비밀번호유효성검사 = false;
        }
        else if(regExp1.test(비밀번호1)===false || regExp2.test(비밀번호1)===false){
            비밀번호_가이드텍스트 = '비밀번호형식이 올바르지 않습니다.';
            비밀번호유효성검사 = false;
        }
        else {
            비밀번호_가이드텍스트 = '';
            비밀번호유효성검사 = true;
        }

        setState({
            ...state,
            비밀번호1: 비밀번호1,
            비밀번호_가이드텍스트: 비밀번호_가이드텍스트,
            비밀번호유효성검사: 비밀번호유효성검사
        })
    }

    // 6. 비밀번호 확인
    // 공백
    // 일치하지 않으면
    // => '비밀번호가 일치하지 않습니다.'
    const onChangePw2=(e)=>{
        let 비밀번호2 = e.target.value;
        let 비밀번호_가이드텍스트 = '';
        let 비밀번호유효성검사 = null;

        if(state.비밀번호1 === 비밀번호2){
            비밀번호_가이드텍스트 = '';
            비밀번호유효성검사 = true;
        }
        else {
            비밀번호_가이드텍스트 = '비밀번호가 일치하지 않습니다.';
            비밀번호유효성검사 = false;
        }

        setState({
            ...state,
            비밀번호2: 비밀번호2,
            비밀번호_가이드텍스트: 비밀번호_가이드텍스트,
            비밀번호유효성검사: 비밀번호유효성검사
        })
    }

    // 7. 이메일
    // 공백
    // 이메일 형식 아니면
    // => '이메일 형식이 올바르지 않습니다.'
    const onChangeEmail = (e) => {
        let 이메일 = e.target.value;
        let 이메일_가이드텍스트 = '';        
        let regExp = /^[a-zA-Z0-9가-힣._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let 이메일유효성검사 = null;
        let 이메일중복검사 = null;
    
        if (이메일 === '' || regExp.test(이메일)===false) {
            이메일_가이드텍스트 = '이메일 형식이 올바르지 않습니다.';
            이메일유효성검사 = false;
            이메일중복검사 = false;
        } 
        else {
            이메일_가이드텍스트 = '';
            이메일유효성검사 = true;
            이메일중복검사 = true;
        }
    
        setState({
            ...state,
            이메일: 이메일,
            이메일_가이드텍스트: 이메일_가이드텍스트,
            이메일유효성검사: 이메일유효성검사,
            이메일중복검사: 이메일중복검사
        });
    };

    const onBlurEmail=()=>{
        let 이메일_가이드텍스트='';
        let 이메일유효성검사 = null;
        let 이메일중복검사 = null;

        if (state.이메일 === '') {
            setState({
                ...state,
                이메일_가이드텍스트: '이메일 형식이 올바르지 않습니다.',
                이메일유효성검사: false,
                이메일중복검사: false
            });
            return;
        }

        const formData = new FormData();
        formData.append('user_email', state.이메일);

        axios({
            url: '/frisbee/email_check.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            console.log( Number(res.data) )
            if(Number(res.data)===1){
                이메일_가이드텍스트 = '사용 불가능한 이메일입니다.';
                이메일유효성검사 = false;
                이메일중복검사 = false;
            }
            else {
                if(state.이메일유효성검사===true){
                    이메일_가이드텍스트 = '사용 가능한 이메일입니다.';
                    이메일유효성검사 = true;
                    이메일중복검사 = true;
                } 
                else{
                    이메일_가이드텍스트 = '이메일 형식이 올바르지 않습니다.';
                    이메일유효성검사= false;
                    이메일중복검사 = false;
                }
            }
            setState({
                ...state,
                이메일_가이드텍스트: 이메일_가이드텍스트,
                이메일유효성검사: 이메일유효성검사,
                이메일중복검사: 이메일중복검사
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
    // 8. 휴대폰번호
    // 공백
    // 숫자만 입력
    // 문자 특수문자 입력 안되게
    // => '휴대폰 번호를 입력해 주세요.'
    const onChangeHp=(e)=>{
        let 휴대폰 = e.target.value;
        let 휴대폰_가이드텍스트 = '';        
        const regExp1 = /[^0-9]/g;
        const regExp2 = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g;
        let 휴대폰유효성검사 = null;
        
        휴대폰 = e.target.value.replace(regExp1, '');

        if(regExp2.test(휴대폰)===false){
            휴대폰_가이드텍스트 = '휴대폰 번호를 입력해 주세요.';
            휴대폰유효성검사 = false;
        }
        else {
            휴대폰_가이드텍스트 = '';
            휴대폰유효성검사 = true;
        }

        setState({
            ...state,
            휴대폰: 휴대폰,
            휴대폰_가이드텍스트: 휴대폰_가이드텍스트,
            휴대폰유효성검사: 휴대폰유효성검사
        })
    }

    // 전송데이터 7개
    // 전송버튼 클릭이벤트
    const onSubmitSignup=(e)=>{
        e.preventDefault();

        // 1) 유효성검사
        if(state.이름유효성검사!==true){
            alert('이름을 입력해주세요.');
        }
        else if(state.생년월일유효성검사!==true){
            alert('생년월일을 입력해주세요.');
        }
        else if(state.아이디유효성검사!==true){
            alert('아이디를 입력해주세요.');
        }
        else if(state.아이디중복검사!==true){
            alert('아이디 중복확인을 해주세요.');
        }
        else if(state.비밀번호유효성검사!==true){
            alert('비밀번호를 입력해주세요.');
        }
        else if(state.이메일유효성검사!==true){
            alert('이메일을 입력해주세요.');
        }
        else if(state.이메일중복검사!==true){
            alert('이메일 중복확인을 해주세요.');
        }
        else if(state.휴대폰유효성검사!==true){
            alert('휴대폰번호를 입력해주세요.');
        }
        else {
            // 2) 닷홈에서 테이블 생성
            // 3) (입력_테스트_테이블저장.php) => insert_signup.php

            // 5) let formData
            let formData = new FormData();
            formData.append('user_name', state.이름);
            formData.append('user_gender', state.성별);
            formData.append('user_birth', state.생년월일);
            formData.append('user_id', state.아이디);
            formData.append('user_pw', CryptoJS.AES.encrypt(state.비밀번호1, 'shhh123').toString());
            formData.append('user_email', state.이메일);
            formData.append('user_hp', state.휴대폰);
            
            // 4) axios
            axios({
                url:'/frisbee/insert_signup.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(Number(res.data)===1){                   
                    alert(`${state.이름}님 회원가입을 축하드립니다.`);
                    navigate('/main');
                }
                else{
                    alert('회원가입정보를 확인하고 다시 시도해 주세요');
                }
            })
            .catch((err)=>{
                console.log(err);
            })

            // 6) package.json proxy
            // 7) 비밀번호 암호화 npm i crypto-js

            // 암호화 하기전 비밀번호1 정보
            console.log('state.비밀번호1 ', state.비밀번호1 );
            
            // 7-1) 비밀번호 암호화
            const 비밀번호_암호화된것 = CryptoJS.AES.encrypt(state.비밀번호1, 'shhh123');
            console.log('비밀번호_암호화된것 ', 비밀번호_암호화된것 );
            console.log('비밀번호_암호화된것 ', 비밀번호_암호화된것.toString() );

            // 7-2) 비밀번호 복호화
            const 비밀번호_복호화된것 = CryptoJS.AES.decrypt(state.비밀번호1, 'shhh123');
            console.log('비밀번호_복호화된것 ', 비밀번호_복호화된것 );
            // 완전한 문자 데이터로 인코딩 변환
            console.log('비밀번호_복호화된것 ', 비밀번호_복호화된것.toString(CryptoJS.enc.Utf8) );
        }
    }

    return (
        <main id='sub11Signup' className='sub'>
            <div className="container">
                <div className="signup-wrap">
                    <div className="title">
                        <h1>회원정보 입력</h1>
                    </div>
                    <form onSubmit={onSubmitSignup} autoComplete='off'>
                        <div className="info-wrap">
                            <ul>
                                <li>
                                    <div>
                                        <label htmlFor="userName">
                                            <span>이름</span>
                                            <i>*</i>
                                        </label>
                                        <input 
                                            maxLength={20}
                                            type="text"
                                            id='userName'
                                            name='userName'
                                            placeholder='이름 입력'
                                            onChange={onChangeName}
                                            value={state.이름}
                                            autoComplete='off'
                                        />
                                        <div className="guide-text">
                                            <p>{state.이름_가이드텍스트}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <label htmlFor="userGender">
                                            <span>성별</span>
                                            <i>*</i>
                                        </label>
                                        <div className="radio-box">
                                            <label>
                                                <input 
                                                    type="radio" 
                                                    id='userMale'
                                                    name='userGender'
                                                    value="남자"
                                                    checked={state.성별.includes('남자')}
                                                    onChange={onChangeGender}
                                                />
                                                <strong>남자</strong>
                                            </label>
                                            <label>
                                                <input 
                                                    type="radio" 
                                                    id='userFemale'
                                                    name='userGender'
                                                    value="여자"
                                                    checked={state.성별.includes('여자')}
                                                    onChange={onChangeGender}
                                                />
                                                <strong>여자</strong>
                                            </label>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <label htmlFor="userBirth">
                                            <span>생년월일</span>
                                            <i>*</i>
                                        </label>
                                        <input 
                                            maxLength={8}
                                            type="text"
                                            id='userBirth'
                                            name='userBirth'
                                            placeholder='8글자 입력 ex) 19950203'
                                            onChange={onChangeBirth}
                                            value={state.생년월일}
                                        />
                                        <div className="guide-text">
                                            <p>{state.생년월일_가이드텍스트}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='id-box'>
                                        <label htmlFor="userId">
                                            <span>아이디</span>
                                            <i>*</i>
                                        </label>
                                        <input 
                                            maxLength={20}
                                            type="text"
                                            id='userId'
                                            name='userId'
                                            placeholder='아이디 입력 (영문, 숫자 사용 5~20자)'
                                            onChange={onChangeId}
                                            value={state.아이디}
                                            autoComplete='off'
                                        />
                                        <button onClick={onClickIdCheck}>아이디 중복확인</button>
                                        <div className="guide-text">
                                            <p>{state.아이디_가이드텍스트}</p>
                                        </div>
                                    </div>
                                </li>
                                <li className='pw-box box1'>
                                    <div>
                                        <label htmlFor="userPw1">
                                            <span>비밀번호</span>
                                            <i>*</i>
                                        </label>
                                        <input 
                                            maxLength={20}
                                            type="password"
                                            id='userPw1'
                                            name='userPw1'
                                            placeholder='비밀번호 입력 (8자 이상 영문 대/소문자,숫자,특수문자 조합)'
                                            onChange={onChangePw1}
                                            value={state.비밀번호1}
                                            autoComplete='off'
                                        />
                                    </div>
                                </li>
                                <li className='pw-box box2'>
                                    <div>
                                        <label htmlFor="userPw2">
                                            <span>비밀번호확인</span>
                                            <i>*</i>
                                        </label>
                                        <input 
                                            maxLength={20}
                                            type="password"
                                            id='userPw2'
                                            name='userPw2'
                                            placeholder='비밀번호 재입력'
                                            onChange={onChangePw2}
                                            value={state.비밀번호2}
                                            autoComplete='off'
                                        />
                                        <div className="guide-text">
                                            <p>{state.비밀번호_가이드텍스트}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <label htmlFor="userEmail">
                                            <span>이메일</span>
                                            <i>*</i>
                                        </label>
                                        <input 
                                            type="email"
                                            id='userEmail'
                                            name='userEmail'
                                            placeholder='이메일 입력 (example@gmail.com)'
                                            onChange={onChangeEmail}
                                            value={state.이메일}
                                            onBlur={onBlurEmail}
                                        />
                                        <div className="guide-text">
                                            <p>{state.이메일_가이드텍스트}</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <label htmlFor="userHp">
                                            <span>휴대폰번호</span>
                                            <i>*</i>
                                        </label>
                                        <input 
                                            maxLength={11}
                                            type="text"
                                            id='userHp'
                                            name='userHp'
                                            placeholder='휴대폰번호만 입력'
                                            onChange={onChangeHp}
                                            value={state.휴대폰}
                                        />
                                        <div className="guide-text">
                                            <p>{state.휴대폰_가이드텍스트}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="btn-box">
                            <button className='signup-btn' type='submit'>가입하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}