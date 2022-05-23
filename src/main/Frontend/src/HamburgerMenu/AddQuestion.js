import React, { useState } from 'react';

import axios from 'axios';
import { Fragment } from 'react-is';

import '../styles/AddQuestionStyle.css';

const AddQuestion = () => {

    const [question, setQuestion] = useState({
        questionTitle : '',
        questionContent : ''
    });

    const onChange = (e) => {

        const { value, name } = e.target;

        setQuestion({
            ...question,
            [name]:value
        });

        console.log(question.questionTitle);
    }

    const EnrollQuestion = () => {

        const {questionTitle, questionContent} = question;
        const id = sessionStorage.getItem('id');
        const name = sessionStorage.getItem('name');

        if(questionTitle == '' || questionContent == '') {
            alert('제목과 내용은 필수 입력사항 입니다.')
        } else {
            axios.post('/api/Manage/AddQuestion', null, { params : {
                questionTitle,
                questionContent,
                id,
                name
            }}).then((response) => {
                if(response.data == "success") {
                    alert("QnA에 질문이 등록되었습니다.");
                    document.location.href = "/qna";
                } else if(response.data == "failed") {
                    alert("ㄴㄴ  안됨");
                }   
            })
        }
    }

    return (

        <div class = 'questionContainer'>
            <h4>AddQuestion</h4>
            <hr style = {{ border : '0.5px solid black', marginTop : '-15px', width : '100%' }}/>

            <div class = "titleContainer">
                <h4 style = {{ float : 'left'}}> Title </h4>
                <input name = 'questionTitle' type = 'text' class = "titleInput" onChange = {onChange} />
                <button class = "noticeAddButton" onClick = {EnrollQuestion}> OK</button>
            </div>

            <div class = "contentsContainer">
                <h4 style = {{ float : "left"}} > Contents </h4>
                <textarea name = 'questionContent' type = 'text' class = 'contentsInput' cols="20" wrap="hard" onChange = {onChange}/>
            </div>
        </div>

    );
}

export default AddQuestion;