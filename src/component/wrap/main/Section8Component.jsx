import React from 'react';
import './scss/Section8Component.scss'
import axios from 'axios';

export default function Section8Component() {
    
    const [state, setState] = React.useState({
        title1: '',
        title2: '',
        샵1: '',
        product: [],
        sectionName: 'section8'
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
                    샵1: res.data[sectionName].샵1,
                    샵2: res.data[sectionName].샵2,
                    샵3: res.data[sectionName].샵3,
                    product: res.data[sectionName].product,
                })
            }
        })
        .catch((err)=>{
            console.timeLog(err);
        })
    },[sectionName, state])


    return (
        <section id="section8">
            <div className="col-container">
                <div className="col-left">
                    <div className="section-l-title">
                        <h3>{state.title1}<br />{state.title2}</h3>
                    </div>
                    <div className="section-l-bottom">
                        <p><span>{state.샵1}</span></p>
                        <p><span>{state.샵2}</span></p>
                        <p><span>{state.샵3}</span></p>
                    </div>
                </div>

                <div className="col-right">
                    <div className="container">
                        <ul>
                            {
                                state.product.map((item, idx)=>{
                                    return (
                                        <li key={item.상품이미지}>
                                            <div className="product-box">
                                                <div className="item-box">
                                                    <img src={`./images/main/${sectionName}/${item.상품이미지}`} alt="section8-img1" />
                                                    <div className="text-box">   
                                                        <h4>
                                                            <a href="!#">{item.상품명}</a>
                                                        </h4>
                                                        <p>{item.정가.toLocaleString('ko-KR')}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}