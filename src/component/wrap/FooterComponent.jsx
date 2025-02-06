import React from 'react';
import './scss/FooterComponent.scss'

export default function FooterComponent() {
    return (
        <footer id="footer">
            <div className="container">
                <div className="row1">
                    <div className="col1">
                        <strong>고객센터 1599-1736</strong>
                        <p>오전 10시 - 오후 5시 /월요일 - 금요일 (공휴일 휴무)</p>
                        <p>Apple 공인 서비스 1688-0476</p>
                        <p>오전 10시 - 오후 5시 /월요일 - 금요일 (공휴일 휴무)</p>
                    </div>
                    <div className="col2">
                        <a href="!#">회사소개</a>
                        <a href="!#">이용약관</a>
                        <a href="!#">개인정보처리방침</a>
                    </div>
                </div>
                <div className="row2">
                    <ul>
                        <li>
                            <a href="!#">매장안내</a>
                            <ul>
                                <li><a className='info' href="!#">기업구매</a></li>
                                <li><a className='info' href="!#">Apple 공인 서비스</a></li>
                                <li><a className='info' href="!#">보상판매</a></li>
                                <li><a className='info' href="!#">사이트맵</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="!#">Frisbee</a>
                            <ul>
                                <li><a href="!#">멤버십 혜택안내</a></li>
                                <li><a href="!#">입점/광고 문의</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="!#">고객센터</a>
                            <ul>
                                <li><a href="!#">공지사항</a></li>
                                <li><a href="!#">자주하는 질문</a></li>
                                <li><a href="!#">1:1 문의</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="!#">교육신청</a>
                            <ul>
                                <li><a href="!#">교육</a></li>
                                <li><a href="!#">온라인 교육</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="!#">Social</a>
                            <ul className='sns-box'>
                                <li><a className='sns' href="https://blog.naver.com/frisbeeblog"><img src="./images/footer/sns-naver.png" alt="" /></a></li>
                                <li><a className='sns' href="https://www.facebook.com/frisbeekorea.co.kr"><img src="./images/footer/facebook.png" alt="" /></a></li>
                                <li><a className='sns' href="https://www.youtube.com/channel/UCT8eb6yYAl8j2Bk9wYjc8tg"><img src="./images/footer/youtube.png" alt="" /></a></li>
                                <li><a className='sns' href="https://www.instagram.com/frisbeekorea/"><img src="./images/footer/instagram.png" alt="" /></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="row3">
                    <div className="col1">
                        <ul>
                            <li>주식회사 갈라인터내셔널</li>
                            <li>대표이사 : 김정훈</li>
                            <li>주소 : 서울특별시 용산구 한강대로 283-8(금강토탈패션할인매장) 2층</li>
                            <li>개인정보보호책임자 : 김명석</li>
                            <li>사업자등록번호 : <a href="!#">201-86-09137</a></li>
                            <li>통신판매 2019-서울용산-1543</li>
                            <li>이메일 : frisbee@frisbeekorea.com</li>
                        </ul>
                    </div>
                    <div className="col2">
                        <p>Copyfight (C) www.frisbeekorea.com All right reserved.</p>
                        <img src="./images/footer/escrow-icon.png" alt="" />
                    </div>
                </div>
            </div>
        </footer>
    );
}