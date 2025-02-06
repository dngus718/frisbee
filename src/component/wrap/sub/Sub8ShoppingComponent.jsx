import React, {useEffect, useState} from 'react'
import './scss/Sub8ShoppingComponent.scss'
import { useDispatch } from 'react-redux'
import { cartAction } from '../../../store/cart'


export default function Sub8ShoppingComponent() {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        장바구니: []
    });

    const [상품금액합계, set상품금액합계] = useState();
    const [상품할인금액합계, set상품할인금액합계] = useState();
    const [배송비합계, set상배송비합계] = useState();
    const [결재예정금액합계, set결재예정금액합계] = useState();
    const [체크리스트, set체크리스트] = useState([]);

    useEffect(()=>{
        if(localStorage.getItem('CART')!==null){            
            const CART = JSON.parse(localStorage.getItem('CART'));
            const 장바구니 = CART.map((item)=> ({
                ...item, 
                판매금액: Math.round(item.정가*(1-item.할인율)*item.수량),
                정가금액: Math.round(item.정가*item.수량),
                할인금액: Math.round((item.정가-(item.정가*(1-item.할인율)))*item.수량),
                배송비:   Math.round(item.정가*(1-item.할인율)) < 30000 ? 3000 : 0,
                배송비텍스트: Math.round(item.정가 * (1 - item.할인율)) < 30000 ? '3,000원' : '무료배송'
            }));

            const obj = {
                장바구니: 장바구니 
            }

            setState({
                장바구니: obj.장바구니
            })

            dispatch(cartAction(obj));
        }
    
    },[dispatch]);

    useEffect(()=>{
        const 상품금액합계 = state.장바구니.reduce((acc, item)=> acc + item.판매금액  , 0);
        const 상품할인금액합계 = state.장바구니.reduce((acc, item)=> acc + item.할인금액  , 0);
        const 배송비합계 = state.장바구니.reduce((acc, item)=> acc + item.배송비 , 0);
        const 결재예정금액합계 = 상품금액합계+배송비합계;

        set상품금액합계(상품금액합계);    
        set상품할인금액합계(상품할인금액합계);
        set상배송비합계(배송비합계);
        set결재예정금액합계(결재예정금액합계);

    },[state.장바구니])

    const onClickPlusBtn=(e, {번호, 상품명})=>{
        e.preventDefault();
        
        let 장바구니 = state.장바구니;
        장바구니 = 장바구니.map((item)=> (item.번호===번호 && item.상품명===상품명) ? 
            {
            ...item, 
            수량: (item.수량+1),                                        
            판매금액: Math.round(item.정가*(1-item.할인율)*(item.수량+1)),
            정가금액: Math.round(item.정가*(item.수량+1)),
            할인금액: Math.round((item.정가-(item.정가*(1-item.할인율)))*(item.수량+1)),
            배송비:   Math.round(item.정가*(1-item.할인율)*(item.수량+1)) < 30000 ? 3000 : 0,
            배송비텍스트: Math.round(item.정가 * (1 - item.할인율)) < 30000 ? '3,000원' : '무료배송'
            } 
            : 
            {...item});

            const obj = {
                장바구니: 장바구니 
            }

        setState({
            장바구니: obj.장바구니
        })

        dispatch(cartAction(obj));

        localStorage.setItem('CART', JSON.stringify(obj.장바구니)) 
    }

    const onClickMinusBtn=(e, {번호, 상품명})=>{
        e.preventDefault();
        
        let 장바구니 = state.장바구니;
        장바구니 = 장바구니.map((item)=> (item.번호===번호 && item.상품명===상품명) ? 
            {
            ...item, 
            수량: (item.수량-1<=1?1:item.수량-1),                                        
            판매금액: Math.round(item.정가*(1-item.할인율)*(item.수량-1<=1?1:item.수량-1)),
            정가금액: Math.round(item.정가*(item.수량-1<=1?1:item.수량-1)),
            할인금액: Math.round((item.정가-(item.정가*(1-item.할인율)))*(item.수량-1<=1?1:item.수량-1)),
            배송비:   Math.round(item.정가*(1-item.할인율)*(item.수량-1<=1?1:item.수량-1)) < 30000 ? 3000 : 0,
            배송비텍스트: Math.round(item.정가 * (1 - item.할인율)) < 30000 ? '3,000원' : '무료배송'
            } 
            : 
            {...item});

        const obj = {
            장바구니: 장바구니 
        }

        setState({
            장바구니: obj.장바구니
        })

        dispatch(cartAction(obj));

        localStorage.setItem('CART', JSON.stringify(obj.장바구니))  // []
    }

    const onChangeChecked=(e, {번호, 상품명})=>{
        let 체크항목 = 체크리스트

        if(e.target.checked){
            체크항목 = [...체크항목, {번호: 번호, 상품명:상품명}]
        }
        else{
            체크항목 = 체크항목.filter((item)=> !(item.번호===번호 && item.상품명===상품명))
        }
        set체크리스트(체크항목)
    }

    const onChangeCheckAll=(e)=>{
        let 체크항목 =[];
        if(e.target.checked){
            체크항목 = state.장바구니.map((item)=>({번호: item.번호, 상품명: item.상품명}))
        }
        else{
            체크항목 = [];
        }
        set체크리스트(체크항목);
    }

    const onClicDeleteSelect=(e)=>{
        e.preventDefault();
        let 장바구니 = state.장바구니
        체크리스트.map((삭제항목)=>
            장바구니 = 장바구니.filter((item)=> !(String(item.번호).includes(삭제항목.번호) && String(item.상품명).includes(삭제항목.상품명)))
        )

        const obj = {
            장바구니: 장바구니
        }
        setState({
            장바구니 : obj.장바구니
        })
        dispatch(cartAction(obj))

        localStorage.setItem('CART', JSON.stringify(obj.장바구니))
    }


    return (
        <div id='Sub8Shopping' className='sub'>
            <div className="title">
                <div className="container">
                    <h2>장바구니</h2>
                    <div className="stepLevel">
                        <ul>
                        <li>
                            <p>01</p>
                            <h4>장바구니</h4>
                        </li>
                        <li>
                            <p>02</p>
                            <h4>주문결제</h4>
                        </li>
                        <li>
                            <p>03</p>
                            <h4>주문완료</h4>
                        </li>
                        </ul>
                    </div>
                </div>           
            </div>
            <div className="content">
                <div className="left">
                    <div className="tt-box">
                        <label>
                            <input
                                type="checkbox"
                                name='allCheck'
                                id='allCheckTop'
                                value='allCheck'
                                onChange={onChangeCheckAll}
                                checked={체크리스트.length===state.장바구니.length}
                            />
                        </label>
                        <h2>전체선택</h2>
                    </div>
                    <div className="ct-box">
                        {
                            state.장바구니.length===0 ?
                            <span>
                                <p className='cart-none'>장바구니에 담긴 상품이 없습니다.</p>
                            </span>
                            :
                            <> 
                            {  /* Apple */
                            state.장바구니.filter((item)=>item.브랜드==='Apple').length > 0 &&
                            <div className="product-bx">                                                            
                                    <div className="brand-name">
                                        <p>프리스비 쇼핑몰</p>
                                    </div>                            
                                    <ul>                                                         
                                    {
                                        state.장바구니.filter((item)=>item.브랜드==='Apple').map((item,idx)=>                               
                                                <li key={`${item.번호}-${item.상품명}`} data-key={`${item.번호}-${item.상품명}`}>                                           
                                                    <div className="gap">
                                                        <div className="left-box">
                                                            <span>
                                                                <input
                                                                    type="checkbox" 
                                                                    name='frisebeeChk'
                                                                    id={`비frisebeeChk${idx}`}
                                                                    value={{번호:item.번호, 상품명:item.상품명}}
                                                                    onChange={(e)=>onChangeChecked(e, {번호: item.번호, 상품명:item.상품명})}
                                                                    checked={체크리스트.map((item2)=>(item2.번호===item.번호 && item2.상품명===item.상품명) ? true : false).includes(true)}
                                                                />
                                                            </span>
                                                        </div>
                                                        <div className="product-img-box">
                                                            <img src={item.상품이미지} alt="" />
                                                        </div>
                                                        <div className="product-list-box">
                                                            <h5>{item.브랜드}</h5>
                                                            <p>{item.상품명}</p>
                                                        </div>
                                                        <div className="product-num-box">
                                                        <ul>
                                                            <li><button onClick={(e)=>onClickMinusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='minus-btn'><img src="./images/sub/sub_shopping/icon_minus.svg" alt="" /></button></li>
                                                            <li><span>{item.수량}</span></li>
                                                            <li><button onClick={(e)=>onClickPlusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='plus-btn'><img src="./images/sub/sub_shopping/icon_plus.svg" alt="" /></button></li>
                                                        </ul> 
                                                        </div>
                                                        <div className="product-price-box">
                                                            <span>
                                                                <h4>{Number(item.판매금액).toLocaleString('ko-KR')}원</h4>                                                            
                                                            </span>
                                                            <div className="rightnow-btn">
                                                                <button>바로구매</button>
                                                            </div>                                                    
                                                        </div>
                                                        <div className="order-bx">
                                                            <div>배송비</div>
                                                            <div>
                                                                <p>{item.배송비텍스트}</p>
                                                            </div>
                                                        </div>                                       
                                                    </div>
                                                </li>                                 
                                        )
                                    }     
                                    </ul>
                            </div>  
                            } 

                            {  /* 무아스 */
                            state.장바구니.filter((item)=>item.브랜드==='무아스').length > 0 &&
                            <div className="product-bx">                                                            
                                    <div className="brand-name">
                                        <p>무아스</p>
                                    </div>                            
                                    <ul>                                                         
                                    {
                                        state.장바구니.filter((item)=>item.브랜드==='무아스').map((item,idx)=>                               
                                                <li key={`${item.번호}-${item.상품명}`} data-key={`${item.번호}-${item.상품명}`}>                                           
                                                    <div className="gap">
                                                        <div className="left-box">
                                                        <span>
                                                                <input
                                                                    type="checkbox" 
                                                                    name='frisebeeChk'
                                                                    id={`비frisebeeChk${idx}`}
                                                                    value={item.번호}
                                                                    onChange={(e)=>onChangeChecked(e, {번호: item.번호, 상품명:item.상품명})}
                                                                    checked={
                                                                        체크리스트.map((체크항목)=>
                                                                            체크항목.번호===item.번호 &&
                                                                            체크항목.상품명===item.상품명
                                                                        ).includes(true)
                                                                    }
                                                                />
                                                            </span>
                                                        </div>
                                                        <div className="product-img-box">
                                                            <img src={item.상품이미지} alt="" />
                                                        </div>
                                                        <div className="product-list-box">
                                                            <h5>{item.브랜드}</h5>
                                                            <p>{item.상품명}</p>
                                                        </div>
                                                        <div className="product-num-box">
                                                        <ul>
                                                            <li><button onClick={(e)=>onClickMinusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='minus-btn'><img src="./images/sub/sub_shopping/icon_minus.svg" alt="" /></button></li>
                                                            <li><span>{item.수량}</span></li>
                                                            <li><button onClick={(e)=>onClickPlusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='plus-btn'><img src="./images/sub/sub_shopping/icon_plus.svg" alt="" /></button></li>
                                                        </ul> 
                                                        </div>
                                                        <div className="product-price-box">
                                                            <span>
                                                                <h4>{Number(item.판매금액).toLocaleString('ko-KR')}</h4>
                                                                <p>원</p>
                                                            </span>
                                                            <div className="rightnow-btn">
                                                                <button>바로구매</button>
                                                            </div>                                                    
                                                        </div>
                                                        <div className="order-bx">
                                                            <div>배송비</div>
                                                            <div>
                                                                <p>{item.배송비텍스트}</p>
                                                            </div>
                                                        </div>                                       
                                                    </div>
                                                </li>                                 
                                        )
                                    }     
                                    </ul>
                            </div>  
                            } 

                            {  /* Focusrite */
                            state.장바구니.filter((item)=>item.브랜드==='[Focusrite]').length > 0 &&
                            <div className="product-bx">                                                            
                                    <div className="brand-name">
                                        <p>Focusrite</p>
                                    </div>                            
                                    <ul>                                                         
                                    {
                                        state.장바구니.filter((item)=>item.브랜드==='[Focusrite]').map((item,idx)=>                               
                                                <li key={`${item.번호}-${item.상품명}`} data-key={`${item.번호}-${item.상품명}`}>                                           
                                                    <div className="gap">
                                                        <div className="left-box">
                                                        <span>
                                                                <input
                                                                    type="checkbox" 
                                                                    name='frisebeeChk'
                                                                    id={`비frisebeeChk${idx}`}
                                                                    value={item.번호}
                                                                    onChange={(e)=>onChangeChecked(e, {번호: item.번호, 상품명:item.상품명})}
                                                                    checked={
                                                                        체크리스트.map((체크항목)=>
                                                                            체크항목.번호===item.번호 &&
                                                                            체크항목.상품명===item.상품명
                                                                        ).includes(true)
                                                                    }
                                                                />
                                                            </span>
                                                        </div>
                                                        <div className="product-img-box">
                                                            <img src={item.상품이미지} alt="" />
                                                        </div>
                                                        <div className="product-list-box">
                                                            <h5>{item.브랜드}</h5>
                                                            <p>{item.상품명}</p>
                                                        </div>
                                                        <div className="product-num-box">
                                                        <ul>
                                                            <li><button onClick={(e)=>onClickMinusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='minus-btn'><img src="./images/sub/sub_shopping/icon_minus.svg" alt="" /></button></li>
                                                            <li><span>{item.수량}</span></li>
                                                            <li><button onClick={(e)=>onClickPlusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='plus-btn'><img src="./images/sub/sub_shopping/icon_plus.svg" alt="" /></button></li>
                                                        </ul> 
                                                        </div>
                                                        <div className="product-price-box">
                                                            <span>
                                                                <h4>{Number(item.판매금액).toLocaleString('ko-KR')}</h4>
                                                                <p>원</p>
                                                            </span>
                                                            <div className="rightnow-btn">
                                                                <button>바로구매</button>
                                                            </div>                                                    
                                                        </div>
                                                        <div className="order-bx">
                                                            <div>배송비</div>
                                                            <div>
                                                                <p>{item.배송비텍스트}</p>
                                                            </div>
                                                        </div>                                       
                                                    </div>
                                                </li>                                 
                                        )
                                    }     
                                    </ul>
                            </div>  
                            } 

                            {  /* 카카오프렌즈 */
                            state.장바구니.filter((item)=>item.브랜드==='카카오프렌즈').length > 0 &&
                            <div className="product-bx">                                                            
                                    <div className="brand-name">
                                        <p>카카오프렌즈</p>
                                    </div>                            
                                    <ul>                                                         
                                    {
                                        state.장바구니.filter((item)=>item.브랜드==='카카오프렌즈').map((item,idx)=>                               
                                                <li key={`${item.번호}-${item.상품명}`} data-key={`${item.번호}-${item.상품명}`}>                                           
                                                    <div className="gap">
                                                        <div className="left-box">
                                                        <span>
                                                                <input
                                                                    type="checkbox" 
                                                                    name='frisebeeChk'
                                                                    id={`비frisebeeChk${idx}`}
                                                                    value={item.번호}
                                                                    onChange={(e)=>onChangeChecked(e, {번호: item.번호, 상품명:item.상품명})}
                                                                    checked={
                                                                        체크리스트.map((체크항목)=>
                                                                            체크항목.번호===item.번호 &&
                                                                            체크항목.상품명===item.상품명
                                                                        ).includes(true)
                                                                    }
                                                                />
                                                            </span>
                                                        </div>
                                                        <div className="product-img-box">
                                                            <img src={item.상품이미지} alt="" />
                                                        </div>
                                                        <div className="product-list-box">
                                                            <h5>{item.브랜드}</h5>
                                                            <p>{item.상품명}</p>
                                                        </div>
                                                        <div className="product-num-box">
                                                        <ul>
                                                            <li><button onClick={(e)=>onClickMinusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='minus-btn'><img src="./images/sub/sub_shopping/icon_minus.svg" alt="" /></button></li>
                                                            <li><span>{item.수량}</span></li>
                                                            <li><button onClick={(e)=>onClickPlusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='plus-btn'><img src="./images/sub/sub_shopping/icon_plus.svg" alt="" /></button></li>
                                                        </ul> 
                                                        </div>
                                                        <div className="product-price-box">
                                                            <span>
                                                                <h4>{Number(item.판매금액).toLocaleString('ko-KR')}</h4>
                                                                <p>원</p>
                                                            </span>
                                                            <div className="rightnow-btn">
                                                                <button>바로구매</button>
                                                            </div>                                                    
                                                        </div>
                                                        <div className="order-bx">
                                                            <div>배송비</div>
                                                            <div>
                                                                <p>{item.배송비텍스트}</p>
                                                            </div>
                                                        </div>                                       
                                                    </div>
                                                </li>                                 
                                        )
                                    }     
                                    </ul>
                            </div>  
                            } 

                            {  /* 에스티엠굿즈 */
                            state.장바구니.filter((item)=>item.브랜드==='에스티엠굿즈').length > 0 &&
                            <div className="product-bx">                                                            
                                    <div className="brand-name">
                                        <p>에스티엠굿즈</p>
                                    </div>                            
                                    <ul>                                                         
                                    {
                                        state.장바구니.filter((item)=>item.브랜드==='에스티엠굿즈').map((item,idx)=>                               
                                                <li key={`${item.번호}-${item.상품명}`} data-key={`${item.번호}-${item.상품명}`}>                                           
                                                    <div className="gap">
                                                        <div className="left-box">
                                                        <span>
                                                                <input
                                                                    type="checkbox" 
                                                                    name='frisebeeChk'
                                                                    id={`비frisebeeChk${idx}`}
                                                                    value={item.번호}
                                                                    onChange={(e)=>onChangeChecked(e, {번호: item.번호, 상품명:item.상품명})}
                                                                    checked={
                                                                        체크리스트.map((체크항목)=>
                                                                            체크항목.번호===item.번호 &&
                                                                            체크항목.상품명===item.상품명
                                                                        ).includes(true)
                                                                    }
                                                                />
                                                            </span>
                                                        </div>
                                                        <div className="product-img-box">
                                                            <img src={item.상품이미지} alt="" />
                                                        </div>
                                                        <div className="product-list-box">
                                                            <h5>{item.브랜드}</h5>
                                                            <p>{item.상품명}</p>
                                                        </div>
                                                        <div className="product-num-box">
                                                        <ul>
                                                            <li><button onClick={(e)=>onClickMinusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='minus-btn'><img src="./images/sub/sub_shopping/icon_minus.svg" alt="" /></button></li>
                                                            <li><span>{item.수량}</span></li>
                                                            <li><button onClick={(e)=>onClickPlusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='plus-btn'><img src="./images/sub/sub_shopping/icon_plus.svg" alt="" /></button></li>
                                                        </ul> 
                                                        </div>
                                                        <div className="product-price-box">
                                                            <span>
                                                                <h4>{Number(item.판매금액).toLocaleString('ko-KR')}</h4>
                                                                <p>원</p>
                                                            </span>
                                                            <div className="rightnow-btn">
                                                                <button>바로구매</button>
                                                            </div>                                                    
                                                        </div>
                                                        <div className="order-bx">
                                                            <div>배송비</div>
                                                            <div>
                                                                <p>{item.배송비텍스트}</p>
                                                            </div>
                                                        </div>                                       
                                                    </div>
                                                </li>                                 
                                        )
                                    }     
                                    </ul>
                            </div>  
                            } 

                            {  /* 오비키 */
                            state.장바구니.filter((item)=>item.브랜드==='오비키').length > 0 &&
                            <div className="product-bx">                                                            
                                    <div className="brand-name">
                                        <p>오비키</p>
                                    </div>                            
                                    <ul>                                                         
                                    {
                                        state.장바구니.filter((item)=>item.브랜드==='오비키').map((item,idx)=>                               
                                                <li key={`${item.번호}-${item.상품명}`} data-key={`${item.번호}-${item.상품명}`}>                                           
                                                    <div className="gap">
                                                        <div className="left-box">
                                                        <span>
                                                                <input
                                                                    type="checkbox" 
                                                                    name='frisebeeChk'
                                                                    id={`비frisebeeChk${idx}`}
                                                                    value={item.번호}
                                                                    onChange={(e)=>onChangeChecked(e, {번호: item.번호, 상품명:item.상품명})}
                                                                    checked={
                                                                        체크리스트.map((체크항목)=>
                                                                            체크항목.번호===item.번호 &&
                                                                            체크항목.상품명===item.상품명
                                                                        ).includes(true)
                                                                    }
                                                                />
                                                            </span>
                                                        </div>
                                                        <div className="product-img-box">
                                                            <img src={item.상품이미지} alt="" />
                                                        </div>
                                                        <div className="product-list-box">
                                                            <h5>{item.브랜드}</h5>
                                                            <p>{item.상품명}</p>
                                                        </div>
                                                        <div className="product-num-box">
                                                        <ul>
                                                            <li><button onClick={(e)=>onClickMinusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='minus-btn'><img src="./images/sub/sub_shopping/icon_minus.svg" alt="" /></button></li>
                                                            <li><span>{item.수량}</span></li>
                                                            <li><button onClick={(e)=>onClickPlusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='plus-btn'><img src="./images/sub/sub_shopping/icon_plus.svg" alt="" /></button></li>
                                                        </ul> 
                                                        </div>
                                                        <div className="product-price-box">
                                                            <span>
                                                                <h4>{Number(item.판매금액).toLocaleString('ko-KR')}</h4>
                                                                <p>원</p>
                                                            </span>
                                                            <div className="rightnow-btn">
                                                                <button>바로구매</button>
                                                            </div>                                                    
                                                        </div>
                                                        <div className="order-bx">
                                                            <div>배송비</div>
                                                            <div>
                                                                <p>{item.배송비텍스트}</p>
                                                            </div>
                                                        </div>                                       
                                                    </div>
                                                </li>                                 
                                        )
                                    }     
                                    </ul>
                            </div>  
                            }

                            {  /* 짱구는 못말려 */
                            state.장바구니.filter((item)=>item.브랜드==='짱구').length > 0 &&
                            <div className="product-bx">                                                            
                                    <div className="brand-name">
                                        <p>짱구는 못말려</p>
                                    </div>                            
                                    <ul>                                                         
                                    {
                                        state.장바구니.filter((item)=>item.브랜드==='짱구').map((item,idx)=>                               
                                                <li key={`${item.번호}-${item.상품명}`} data-key={`${item.번호}-${item.상품명}`}>                                           
                                                    <div className="gap">
                                                        <div className="left-box">
                                                        <span>
                                                                <input
                                                                    type="checkbox" 
                                                                    name='frisebeeChk'
                                                                    id={`비frisebeeChk${idx}`}
                                                                    value={item.번호}
                                                                    onChange={(e)=>onChangeChecked(e, {번호: item.번호, 상품명:item.상품명})}
                                                                    checked={
                                                                        체크리스트.map((체크항목)=>
                                                                            체크항목.번호===item.번호 &&
                                                                            체크항목.상품명===item.상품명
                                                                        ).includes(true)
                                                                    }
                                                                />
                                                            </span>
                                                        </div>
                                                        <div className="product-img-box">
                                                            <img src={item.상품이미지} alt="" />
                                                        </div>
                                                        <div className="product-list-box">
                                                            <h5>{item.브랜드}</h5>
                                                            <p>{item.상품명}</p>
                                                        </div>
                                                        <div className="product-num-box">
                                                        <ul>
                                                            <li><button onClick={(e)=>onClickMinusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='minus-btn'><img src="./images/sub/sub_shopping/icon_minus.svg" alt="" /></button></li>
                                                            <li><span>{item.수량}</span></li>
                                                            <li><button onClick={(e)=>onClickPlusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='plus-btn'><img src="./images/sub/sub_shopping/icon_plus.svg" alt="" /></button></li>
                                                        </ul> 
                                                        </div>
                                                        <div className="product-price-box">
                                                            <span>
                                                                <h4>{Number(item.판매금액).toLocaleString('ko-KR')}</h4>
                                                                <p>원</p>
                                                            </span>
                                                            <div className="rightnow-btn">
                                                                <button>바로구매</button>
                                                            </div>                                                    
                                                        </div>
                                                        <div className="order-bx">
                                                            <div>배송비</div>
                                                            <div>
                                                                <p>{item.배송비텍스트}</p>
                                                            </div>
                                                        </div>                                       
                                                    </div>
                                                </li>                                 
                                        )
                                    }     
                                    </ul>
                            </div>  
                            }           

                            {  /* 벨루가 */
                            state.장바구니.filter((item)=>item.브랜드==='벨루가').length > 0 &&
                            <div className="product-bx">                                                            
                                    <div className="brand-name">
                                        <p>벨루가</p>
                                    </div>                            
                                    <ul>                                                         
                                    {
                                        state.장바구니.filter((item)=>item.브랜드==='벨루가').map((item,idx)=>                               
                                                <li key={`${item.번호}-${item.상품명}`} data-key={`${item.번호}-${item.상품명}`}>                                           
                                                    <div className="gap">
                                                        <div className="left-box">
                                                        <span>
                                                                <input
                                                                    type="checkbox" 
                                                                    name='frisebeeChk'
                                                                    id={`비frisebeeChk${idx}`}
                                                                    value={item.번호}
                                                                    onChange={(e)=>onChangeChecked(e, {번호: item.번호, 상품명:item.상품명})}
                                                                    checked={
                                                                        체크리스트.map((체크항목)=>
                                                                            체크항목.번호===item.번호 &&
                                                                            체크항목.상품명===item.상품명
                                                                        ).includes(true)
                                                                    }
                                                                />
                                                            </span>
                                                        </div>
                                                        <div className="product-img-box">
                                                            <img src={item.상품이미지} alt="" />
                                                        </div>
                                                        <div className="product-list-box">
                                                            <h5>{item.브랜드}</h5>
                                                            <p>{item.상품명}</p>
                                                        </div>
                                                        <div className="product-num-box">
                                                        <ul>
                                                            <li><button onClick={(e)=>onClickMinusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='minus-btn'><img src="./images/sub/sub_shopping/icon_minus.svg" alt="" /></button></li>
                                                            <li><span>{item.수량}</span></li>
                                                            <li><button onClick={(e)=>onClickPlusBtn(e, {번호: item.번호, 상품명: item.상품명})} className='plus-btn'><img src="./images/sub/sub_shopping/icon_plus.svg" alt="" /></button></li>
                                                        </ul> 
                                                        </div>
                                                        <div className="product-price-box">
                                                            <span>
                                                                <h4>{Number(item.판매금액).toLocaleString('ko-KR')}</h4>
                                                                <p>원</p>
                                                            </span>
                                                            <div className="rightnow-btn">
                                                                <button>바로구매</button>
                                                            </div>                                                    
                                                        </div>
                                                        <div className="order-bx">
                                                            <div>배송비</div>
                                                            <div>
                                                                <p>{item.배송비텍스트}</p>
                                                            </div>
                                                        </div>                                       
                                                    </div>
                                                </li>                                 
                                        )
                                    }     
                                    </ul>
                            </div>  
                            }                        
                            </>
                        }
                    </div>
                    <div className="last-box">
                        <div className="btn-bx">
                            <button onClick={onClicDeleteSelect}>선택 상품 삭제</button>
                            <button>계속 쇼핑하기</button>
                        </div>
                        <p>※ 장바구니에 담긴 상품은 30일간 보관됩니다.</p>
                    </div>
                </div>
                <div className="right">
                    <div className="order">
                        <h2>주문금액</h2>
                        <ul>
                            <li><h4>상품금액</h4>
                            <div className="price-box">
                                    <p>{Number(상품금액합계).toLocaleString('ko-KR')}</p>
                                    <span>원</span>
                            </div>                           
                            </li>
                            <li>
                            <h4>할인금액</h4>
                            <div className="price-box">
                                    <p>{Number(상품할인금액합계).toLocaleString('ko-KR')}</p>
                                    <span>원</span>
                            </div>   
                            </li>
                            <li>
                            <h4>총 배송비</h4>
                            <div className="price-box">
                                    <p>{Number(배송비합계).toLocaleString('ko-KR')}</p>
                                    <span>원</span>
                            </div>   
                            </li>
                        </ul>
                        <div className="lasts-box">
                            <h4>총 결제금액</h4>
                            <div className="price-box">
                                <p>{Number(결재예정금액합계).toLocaleString('ko-KR')}</p>
                                <span>원</span>
                            </div>
                            
                        </div>
                    </div>
                    <div className="button-box">
                        <a href="!#">
                            <p>선택 상품 주문</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

