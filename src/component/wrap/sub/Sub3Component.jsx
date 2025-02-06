import React, { useEffect, useState } from 'react';
import './scss/Sub3Component.scss';
import axios from 'axios';

export default function Sub3Component() {
    const [state, setState] = useState({
        banner: [],
    });

    const [pageView] = useState(15);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageTotal, setPageTotal] = useState(0);
    const [currentPageData, setCurrentPageData] = useState([]);

    useEffect(() => {
        axios({
            url: './data/sub/sub3.json',
            method: 'GET',
        })
            .then((res) => {
                if (res.status === 200) {
                    setState({
                        ...state,
                        banner: res.data.sub3.banner,
                    });
                    setPageTotal(Math.ceil(res.data.sub3.banner.length / pageView));
                }
            })
            .catch((err) => {
                console.error(err);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageView]);

    useEffect(() => {
        const startIdx = (pageCurrent - 1) * pageView;
        const endIdx = startIdx + pageView;
        setCurrentPageData(state.banner.slice(startIdx, endIdx));
    }, [state.banner, pageCurrent, pageView]);

    const onClickPrevBtn = (e) => {
        e.preventDefault();
        setPageCurrent((prev) => Math.max(prev - 1, 1));
    };

    const onClickNextBtn = (e) => {
        e.preventDefault();
        setPageCurrent((prev) => Math.min(prev + 1, pageTotal));
    };

    const onClickPageNum = (e, pageNum) => {
        e.preventDefault();
        setPageCurrent(pageNum);
        window.scrollTo({top:0});
    };

    return (
        <main id="sub3" className="sub">
            <div className="container">
                <div className="title">
                    <h2>MD’s Pick</h2>
                </div>
                <div className="banner_container">
                    <ul>
                        {currentPageData.map((item) => (
                            <li key={item.no || `banner-${Math.random()}`}>
                                <div className="img_box">
                                    <a href="!#">
                                        <img
                                            src={`./images/sub/sub3/${item.images}`}
                                            alt={item.title}
                                        />
                                    </a>
                                </div>
                                <div className="text_box">
                                    <h3>{item.title}</h3>
                                    <p>{item.date}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="paging_btn">
                    <a href="!#" className="prev_btn" onClick={onClickPrevBtn}>
                        <img src="./images/sub/sub3/prev_icon.png" alt="이전" />
                    </a>
                    {Array.from({ length: pageTotal }, (_, idx) => idx + 1).map((pageNum) => (
                        <a
                            href="!#"
                            key={pageNum}
                            className={`paging_num ${pageCurrent === pageNum ? 'on' : ''}`}
                            onClick={(e) => onClickPageNum(e, pageNum)}
                        >
                            <h2>{pageNum}</h2>
                        </a>
                    ))}
                    <a href="!#" className="next_btn" onClick={onClickNextBtn}>
                        <img src="./images/sub/sub3/next_icon.png" alt="다음" />
                    </a>
                </div>
            </div>
        </main>
    );
}
