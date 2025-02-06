import React from 'react';
import './scss/Sub4Component.scss';


export default  function Sub4Component() {
    return (
        <main id='sub4' className='sub'>
            <div className="container">
                <div className="content">
                    <div className="title">
                        <h3>Brand Shop</h3>
                    </div>
                    <div className="brand-wrap">
                        <div className="brand-img-wrap">
                            <div className="img-list">
                                <div className="img-list-item">
                                    <a href="!#" title='TETHER TOOLS'>
                                        <img src="./images/sub/sub4/brand-img1.jpg" alt="TETHER TOOLS" />
                                    </a>
                                </div>
                                <div className="img-list-item">
                                    <a href="!#" title='BELUGA'>
                                        <img src="./images/sub/sub4/brand-img2.jpg" alt="BELUGA" />
                                    </a>
                                </div>
                                <div className="img-list-item">
                                    <a href="!#" title='CalDigit'>
                                        <img src="./images/sub/sub4/brand-img3.jpg" alt="CalDigit" />
                                    </a>
                                </div>
                                <div className="img-list-item">
                                    <a href="!#" title='UNIVERSAL AUDIO'>
                                        <img src="./images/sub/sub4/brand-img4.jpg" alt="UNIVERSAL AUDIO" />
                                    </a>
                                </div>
                                <div className="img-list-item">
                                    <a href="!#" title='AUSTRIAN AUDIO'>
                                        <img src="./images/sub/sub4/brand-img5.jpg" alt="AUSTRIAN AUDIO" />
                                    </a>
                                </div>
                                <div className="img-list-item">
                                    <a href="!#" title='audio pro'>
                                        <img src="./images/sub/sub4/brand-img6.jpg" alt="audio pro" />
                                    </a>
                                </div>
                            </div>
                            <div className="page-box">
                                <button className='pages-prev act'>
                                    <img src="./images/sub/sub4/sub4_prev_icon.png" alt="prev_icon" />
                                </button>
                                <button className='pages-num'>1</button>
                                <button className='pages-next act'>
                                    <img src="./images/sub/sub4/sub4_next_icon.png" alt="next_icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

