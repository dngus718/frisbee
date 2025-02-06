import React from 'react';
import './scss/Section7Component.scss'
import axios from 'axios';

export default function Section7Component() {

    const [state, setState] = React.useState({
        title1: '',
        title2: '',
        product: [],
        sectionName: 'section7'
    });
    const {sectionName} = state;

    React.useEffect(()=>{
        axios({
            url:'./data/main/main.json',
            method: 'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    title1: res.data[sectionName].title1,
                    title2: res.data[sectionName].title2,
                    product: res.data[sectionName].product,
                })
            }
        })
        .catch((err)=>{
            console.timeLog(err);
        })
    },[sectionName, state])


    return (
        <section id="section7">
            <div className="section-title">
                <div className="col-left">
                    <h5>{state.title1}</h5>
                    <h3>{state.title2}</h3>
                </div>
                <div className="col-right">
                    <a href="!#">
                    </a>
                </div>

            </div>
            <div className="container">
                <ul>
                    {
                        state.product.map((item, idx)=>{
                            return (
                                <li key={item.상품이미지}>
                                    <div className="item-box box">
                                        <div className="product-item-box">
                                            <a href="!#"><img src={`./images/main/${sectionName}/${item.상품이미지}`} alt="section7-img1" /></a>
                                        </div>
                                        <div className="item-text-box">
                                            <h4>
                                                <a href="!#">{item.상품명}</a>
                                            </h4>
                                            <p>{item.정가.toLocaleString('ko-KR')}</p>
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
