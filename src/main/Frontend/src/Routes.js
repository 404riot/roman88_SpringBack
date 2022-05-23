import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MainTop from './components/MainTop';
import Contents from './components/Contents';
import Main from './components/Main';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';

import MyCart from './components/MyCart';
import Profile from './components/Profile';
import DetailContents from './components/DetailContents';

import Notice from './HamburgerMenu/Notice';
import About from './HamburgerMenu/About';
import Contact from './HamburgerMenu/Contact';

import BuyNow from './components/BuyNow';

import Footer from './components/Footer';

import MembersManage from './managers/MembersManage';

import './styles/FooterStyle.css';
import NoticeManage from './managers/NoticeManage';
import QnA from './HamburgerMenu/QnA';
import AddQuestion from './HamburgerMenu/AddQuestion';
import ContactEmail from './email/ContactEmail';

const Router = () => {

    return (
        <BrowserRouter>
        <MainTop />
            <Switch>
                <Route path = '/' exact component = {Main} />
                <Route path = '/detail/' component = {DetailContents} />
                <Route path = '/contents' component = {Contents} />

                <Route path = '/signUpPage' component = {SignUpPage} />
                <Route path = '/signInPage' component = {SignInPage} />

                <Route path = '/notice' component = {Notice} />
                <Route path = '/about' component = {About} />
                <Route path = '/contact' component = {Contact} />
                <Route path = '/qna' component = {QnA} />
                <Route path = '/addQuestion' component = {AddQuestion} />

                <Route path = '/profile' component = {Profile} />

                <Route path = '/MyCart' component = {MyCart} />
                <Route path = '/buy' component = {BuyNow} />

                <Route path = '/membersManage' component = {MembersManage} />
                <Route path = '/noticeManage' component = {NoticeManage} />
                <Route path = '/emailSend' component = {ContactEmail} />
            </Switch>

        <div class = 'Footer-container'>
            <Footer />  
        </div>

        </BrowserRouter>
    )
}

export default Router;