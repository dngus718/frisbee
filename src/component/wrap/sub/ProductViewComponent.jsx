import React,{useEffect, useState} from 'react';
import './scss/ProductViewComponent.scss';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../../store/cart';
import { setViewProductAction } from '../../../store/viewProduct';
import { modalOpenAction } from '../../../store/modalState';
export default function ProductViewComponent() {

    const dispatch = useDispatch();
    const [state, setState] = useState({
        '지금본상품': {
            '번호': '', 
            '브랜드': '',
            '상품명': '', 
            '정가': '', 
            '상품이미지': '', 
            '적립': '',
            '배송':  '', 
            '할인율': '',    
            'filter': '',
            '카테고리': '',
            '수량': 1
        }
    })

    useEffect(()=>{
        // localStorage.setItem('view_Product_list', JSON.stringify(viewProduct.최근본상품))
        if(localStorage.getItem('view_product')!==null){
            const result = JSON.parse(localStorage.getItem('view_product'));
            let obj = {
                지금본상품: result
            }

            setState({
                '지금본상품':{
                    ...state.지금본상품,
                    '번호': obj.지금본상품.번호, 
                    '브랜드': obj.지금본상품.브랜드,
                    '상품명': obj.지금본상품.상품명, 
                    '정가': obj.지금본상품.정가, 
                    '상품이미지': obj.지금본상품.상품이미지, 
                    '적립': obj.지금본상품.적립,
                    '배송':  obj.지금본상품.배송, 
                    '할인율': obj.지금본상품.할인율,    
                    'filter': obj.지금본상품.filter,
                    '카테고리': obj.지금본상품.카테고리
                }
            })

            let result2 = [];
                // 로커스토레이지 저장소
                if(localStorage.getItem('view_product_list')!==null ){
                    result2 = JSON.parse(localStorage.getItem('view_product_list'));                   
                }
                else{
                    result2 = []; // 빈배열 처리  
                }
                obj = {
                    ...obj,
                    최근본상품: result2
                }
                dispatch(setViewProductAction(obj))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onClickCartAppend=(e)=>{
        e.preventDefault();
        let temp = [];
        if(localStorage.getItem('CART')!==null) {
            temp = JSON.parse(localStorage.getItem('CART'));
        }
        else {
            temp = [];
        }
        // let imsi = temp.map((item)=>item.상품번호.includes(state.지금본상품.상품번호) ? true : false);

        // 장바구니 = [state.지금본상품, ...temp]
        // if(imsi.includes(true)===true){
        //     장바구니 = temp;
        // }
        // else {
        // }
        let 장바구니 = [{ ...state.지금본상품 }, ...temp];
    
        const obj = { 
            장바구니: 장바구니 
        };

        localStorage.setItem('CART', JSON.stringify(obj.장바구니));
        dispatch(cartAction(obj));
    }

    const onClickincrease = () => {
        setState(prevState => ({
            '지금본상품': {
                ...prevState.지금본상품,
                '수량': prevState.지금본상품.수량 + 1
            }
        }));
    };
    
    const onClickdecrease = () => {
        if (state.지금본상품.수량 > 1) {
            setState(prevState => ({
                '지금본상품': {
                    ...prevState.지금본상품,
                    '수량': prevState.지금본상품.수량 - 1
                }
            }));
        }
    };

    const onClickOpenModal=(e)=>{
        e.preventDefault();
        dispatch(modalOpenAction(true));
    }

    return (
        <main id='productViewPage' className='sub'>
            <section id="viewsection1">
                <div className="container">                   
                    <div className="content">
                        <div className="left-box">
                            <div className="gap">
                                <img src={state.지금본상품.상품이미지} alt="" />
                            </div>
                        </div>
                        <div className="right-box">
                            <div className="gap">
                                <div className="row1 row">
                                    <h6>Apple</h6>
                                    <div className="name-box">
                                        <h2>{state.지금본상품.상품명}</h2>
                                        <button>
                                            <img src="./images/sub/sub5/share-icon.png" alt="" />
                                        </button>
                                    </div>
                                    <div className="title-box">
                                        <div className="price-box">
                                            <h3>판매가</h3>
                                            <span>{Number(state.지금본상품.정가).toLocaleString('ko-KR')}</span>
                                            <strong>{Number(state.지금본상품.정가* (1 - state.지금본상품.할인율)).toLocaleString('ko-KR')}</strong><p>원</p>
                                            {state.지금본상품.할인율 > 0 && (
                                            <h4>{Math.round(state.지금본상품.할인율 * 100)}%</h4>
                                            )}
                                        </div>
                                        <div className="earn-box">
                                            <div className="sale-price">
                                                <h3>적립금</h3>
                                                <span>{Math.round((state.지금본상품.정가 * (1 - state.지금본상품.할인율)) * state.지금본상품.적립).toLocaleString('ko-KR')}원</span>
                                            </div>
                                            <div className="delivery">
                                                <h3>배송비</h3>
                                                <span>{state.지금본상품.배송}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row2 row">
                                        <ul>
                                            <li>
                                                <div className="gap">
                                                    <p>{state.지금본상품.상품명}</p>
                                                    <div className="num-count-box">
                                                        <div className="button-box">
                                                            <button onClick={onClickdecrease}>-</button>
                                                            <span>{state.지금본상품.수량}</span>
                                                            <button onClick={onClickincrease}>+</button>
                                                        </div>
                                                        <div className="button-price-box">
                                                            <strong>{Number(state.지금본상품.정가* (1 - state.지금본상품.할인율)).toLocaleString('ko-KR')}</strong><p>원</p>
                                                        </div>
                                                        <button className='close'>
                                                            <img src="./images/sub/sub5/close-icon.png" alt="" />
                                                        </button>
                                                    </div> 
                                                </div>
                                            </li>
                                        </ul>
                                </div>

                                <div className="row3 row">
                                    <div className="gap">
                                        <span>총 주문금액 :</span>
                                        <div className="total-price">
                                            <strong>{Number(state.지금본상품.정가 * (1 - state.지금본상품.할인율) * state.지금본상품.수량).toLocaleString('ko-KR')}</strong><p>원</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row4 row">
                                    <div className="gap">
                                        <button onClick={onClickCartAppend}>장바구니</button>
                                        <button>바로구매</button>
                                        <button onClick={onClickOpenModal}>
                                            <img src="./images/sub/sub5/bookmark.png" alt="" />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="viewsection2">
                <div className="viewcontainer">
                    <img src="./images/sub/sub5/viewproductimg1.jpg" alt="" />
                    <img src="./images/sub/sub5/viewproductimg2.jpg" alt="" />
                    <img src="./images/sub/sub5/viewproductimg3.jpg" alt="" />
                    <iframe 
                        width="1280" 
                        height="720" 
                        src="https://www.youtube-nocookie.com/embed/cpWtMKxNtoQ" 
                        title="YouTube video" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen>
                    </iframe>
                    <img src="./images/sub/sub5/viewproductimg4.png" alt="" />
                </div>
            </section>
        </main>
    );
}
