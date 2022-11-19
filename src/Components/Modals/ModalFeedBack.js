import {Row,Col,Modal,Button,Container,Spinner} from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios'
import Webcam from "react-webcam";
import { useState,useEffect,useRef } from 'react';
import { useContext } from "react";
import {url} from '../../utils/constants';
export default function ModalFeedBack({modalShow,setModalShow}){

    const webcamRef = useRef(null);
    const [feedback,setFeedback]=useState(false);
    const [feedbackText,setFeedbackText]=useState('');
    const sendFeedback=()=>{
        const imageSrc = webcamRef.current.getScreenshot();
        //send image to server
        axios.post(url+"/feedback",{imgs:[imageSrc],size:1}).then(res=>{
            console.log(res.data);
            setFeedbackText(res.data);
        }).catch(err=>{
            console.log(err);
        })
        setFeedback(true);
    }
    const videoConstraints = {
        width: 200,
        height: 200,
        facingMode: "user"
      };
    const modalBody=()=>{
        if(!feedback){
            return <Container>
                <Row>
                    <h5>Please make a picture to send your feedback for our shop</h5>
                </Row>
                <Row>
                    <Col>
                <Webcam style={{border:"2px solid black",borderRadius:"5px"}}
                    audio={false}
                    height={200}
                    screenshotFormat="image/jpeg"
                    width={200}
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                >
                </Webcam>
                    </Col>
                </Row>
            </Container>
        }
        else{
            return <Container>
     
            <h3>Thanks for your feedback</h3>
            <br></br>
            <h5>{feedbackText}</h5>
            </Container>
        }
    }

    useEffect(()=>{
        
    },[])

    return <>
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Feedback</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign:'center'}}>
                {modalBody()}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
                Close
            </Button>
            {!feedback? <Button onClick={()=>{
                          sendFeedback();
                        }}>Send</Button>:<></>
                    }
            </Modal.Footer>
        </Modal>
    </>

}