import React, {useState, useEffect} from 'react';

import '../styles/QnAStyle.css';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Fragment } from 'react-is';

const useStyles = makeStyles((theme) => ({

    root: {
      width: '100%',
    },

    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexShrink: 0,
    },

    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
    },

}));

const QnA = ({ history }) => {

    if(sessionStorage.getItem("sessionInfo") == null) {
        history.push("/signInPage");
    }

    const [trigger, setTrigger] = useState('');
    const [qnaList, setQnaList] = useState([{
        seq : 0,
        id : '',
        name : '',
        title : '',
        contents : '',
        answer : '',
        pass : '',
        registerDate : ''
    }])

    useEffect(async() => {

        axios.post('/api/Manage/RetrieveQnA').then((response) => {

            if(response.data.length > 0) {

                setTrigger('items');
                const _qna = response.data.map((qna) => ({
                    seq : qna.seq,
                    id : qna.id,
                    name : qna.name,
                    title : qna.title,
                    contents : qna.contents,
                    answer : qna.answer,
                    pass : qna.pass,
                    registerDate : qna.registerDate,
                }));

                setQnaList(_qna);

            } else {
                setTrigger('none');
            }

        })
    
    }, []);

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel, id) => (event, isExpanded) => {

        // 여기에 modal popup 만들어서 pass 입력. 분기문 써서 success되면 setExpanded open
        var signedId = sessionStorage.getItem("id");
        var auth = sessionStorage.getItem("auth");
        if(signedId == id || auth == "manager") {
            setExpanded(isExpanded ? panel : false);
        } else {
            alert("질문자 본인만 열람할 수 있습니다.");
        }
        
    
    };

    var questionsSeq = [];
    var questioner = [];

    var modifySeq = [];
    var questionerHasAnswer = [];


    const addQuestion = () => {
        history.push('/addQuestion');
    }



    const addAnswer = () => {

        var answerTrigger = 'none';
        
        for(var qSeq in questionsSeq) {

            var answerInput = document.getElementById('answer' + questionsSeq[qSeq]).value;

            if(answerInput != '') {

                answerTrigger = 'ans';

                var seq = questionsSeq[qSeq];
                var id = questioner[qSeq];

                axios.post('/api/Manage/AddAnswer', null, { params : {
                    seq,
                    answerInput,
                    id
                }}).then((response) => {
                    if(response.data == 'success') {
                        alert("답변을 등록했습니다.");
                        document.location.href = "/qna";
                    }
                })
        
            }    
        }

        if(answerTrigger == 'none') {
            alert("답변해라 재환아");
        }
    }

    const modifyAnswer = () => {

        for(var modifySelect in modifySeq){

            if(document.getElementById('checking' + modifySeq[modifySelect]).checked){

                var modifyInput = document.getElementById('answered' + modifySeq[modifySelect]).value;
                var seq = modifySeq[modifySelect];
                var id = questionerHasAnswer[modifySelect];

                axios.post('/api/Manage/ModifyAnswer', null, { params : {
                    seq,
                    modifyInput,
                    id
                }}).then((response) => {
                    if(response.data == 'success') {
                        alert("답변을 수정했습니다.");
                        document.location.href = "/qna";
                    }
                })

            }

        }
    }

    var auth = sessionStorage.getItem('auth');

    const ForManagers = ({askSeq, askId}) => {

        questionsSeq.push(askSeq);
        questioner.push(askId);

        if(auth == "manager") {

            return (
                <div className = 'answerContainer'>
                    <textarea class = "managersAnswer" id = {'answer' + askSeq}/>
                    <button class = 'answerButton' onClick = {addAnswer}> Reply </button>
                </div>
            )

        } else {

            return (
                <Fragment>

                </Fragment>
            );

        }

    }

    const ForManagersHasAnswer = ({ask, askSeq, askId}) => {

        modifySeq.push(askSeq);
        questionerHasAnswer.push(askId);

        if(auth == "manager") {

            return (
                <div className = 'answerContainer'>
                    <h5 style = {{ marginLeft : "20px"}}> Answer : </h5>
                    <textarea class = 'managersAnswer' id = {'answered' + askSeq}>
                        {ask}
                    </textarea>

                    <button class = 'answerButton'  style = {{ float : 'right'}} onClick = {modifyAnswer}> Modify </button>

                    <label class = 'checker' for = {"checking" + askSeq} style = {{ float : 'right', marginRight : '5px'}} >
                        <input type="checkbox" id = {"checking" + askSeq} class = 'checkInput' />
                        <span class="checkmark" ></span>
                    </label>

                    
                </div>
            )

        } else {

            return (
                <div className = 'answerContainer'>
                    <h5 style = {{ marginLeft : "15px"}}> Answer : </h5>
                    <pre class = 'answer'>
                        <p>{ask}</p>
                    </pre>
                </div>
            )
        }
    }

    return (

        <div>
            <div class = 'QnATop' style = {{ borderBottom : '2px solid black'}}>
                    <h4 style = {{ float : 'left', }}>QnA</h4> 

                    <h4 class = "addQuestion" onClick = {addQuestion}> + Q </h4>
            </div>

            <div class = 'QnAContainer'>

                {
                    qnaList.map((qna, index) => {

                        var text = qna.contents.replace(/<br\s*\/?>/img, '\r\n');

                        if(qna.answer == null) {

                            return(

                                <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index, qna.id)}>

                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    style = {{ borderLeft : "0.5rem solid orange"}}
                                    >
                                        <Typography className={classes.heading} style = {{ width : '100px'}}>{qna.registerDate}</Typography>
                                        <Typography className={classes.heading} style = {{ width : '300px'}}>{qna.name} [{qna.id}]</Typography>
                                        <Typography className={classes.secondaryHeading} style = {{ width : '400px'}}>{qna.title}</Typography>

                                    </AccordionSummary>
                                    
                                    <AccordionDetails style = {{ backgroundColor : 'white', border : '1px solid black'}}>

                                        <Typography style = {{ height : '350px'}}>
                                            <pre>
                                                <p>{text}</p>
                                            </pre>
                                        </Typography>
                                        
                                    </AccordionDetails>
                                    
                                    <ForManagers askSeq = {qna.seq} askId = {qna.id}/>

                                </Accordion>
                            );

                        } else if(qna.answer != '') {

                            return(

                                <Accordion expanded={expanded === 'panel' + index} id = {'panel' + index} seq = {qna.seq} onChange={handleChange('panel' + index, qna.id)}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    style = {{ borderLeft : "0.5rem solid black"}}
                                    >
                                        <Typography className={classes.heading} style = {{ width : '100px'}}>{qna.registerDate}</Typography>
                                        <Typography className={classes.heading} style = {{ width : '300px'}}>{qna.name} [{qna.id}]</Typography>
                                        <Typography className={classes.secondaryHeading} style = {{ width : '600px'}}>{qna.title}</Typography>
                                    </AccordionSummary>
                                    
                                    <AccordionDetails style = {{ backgroundColor : 'white', border : '1px solid black'}}>
                                        <Typography style = {{ height : '350px'}}>
                                            <pre>
                                                <p>{text}</p>
                                            </pre>
                                        </Typography>
                                        
                                    </AccordionDetails>
                                    
                                    <ForManagersHasAnswer askSeq = {qna.seq} ask = {qna.answer} askId = {qna.id}/>
                                    
                                </Accordion>
                            );
                        }
                    })
                }
            </div>

        </div>
    );

}

export default QnA;