import  {React, useState, useEffect} from 'react';
import axios from 'axios';
import './scss/Section6Component.scss';

export default function Section6Component() {

        
    const [state, setState] = useState({
        banner:[],
        section6:'section6'
    });

    const {section6} = state;

    useEffect(()=>{
        axios({
            url:'./data/main/main.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    banner: res.data[section6].banner
                })
            }
        })
        .catch((err)=>{
            console.log(err);
            return;
        })
    },[section6, state])

    return (
        <section id='section6'>
            <div className="event_container">
                <ul>
                    {
                        state.banner.map((item)=>{
                            return(
                                <li key={item.no}>
                                    <div className="img_box">
                                        <a href="!#">
                                            <img src={`./images/main/${section6}/${item.images}`} alt={item.title} />
                                        </a>
                                    </div>
                                    <div className="text_box">
                                        <a href="!#">
                                            <h3>{item.title}</h3>
                                            <p>{item.content}</p>
                                        </a>
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