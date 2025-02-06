import React from 'react';
import './scss/Section9Component.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { modalOpenAction } from '../../../store/modalState';

export default function Section15Component() {

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        title1:'',
        product:[],
        sectionName: 'section15'
    });

    const {sectionName}=state;

    React.useEffect(()=>{
        axios({
            url:'./data/main/main.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){       // 응답 받으면
                setState({
                    ...state,
                    title1: res.data[sectionName].title1,
                    product: res.data[sectionName].product
                })
            }
        })
        .catch((err)=>{
            return;
        });
    },[sectionName, state]);

    const onClickOpenModal=(e)=>{
        e.preventDefault();
        // const obj = {
        //     modal: true
        // }
        dispatch(modalOpenAction(true));
    }

    return (
        <section id={sectionName}>
            <div className="title">
                <div className="col1">
                    <h2>{state.title1}</h2>
                </div>
                <div className="col2">
                    <a href="!#">더 많은 카테고리 상품 보기 {'>'}</a>
                </div>
            </div>
            <div className="content">
                <ul>
                    {
                        state.product.map((item, idx)=>{
                            return(
                                <li key={item.번호} className={`list list${idx+1}`}> {/* style에서 flex-flow:wrap; 쓰면 네개 밑에 네개 */}
                                    <div className="list-box">
                                        <div className="img-box">
                                            <a href="!#">
                                                <img src={`./images/main/${sectionName}/${item.상품이미지}`} alt="" />
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
                                                    <button onClick={onClickOpenModal}></button>
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
                        })
                    }
                </ul>
            </div>
        </section>
    );
}