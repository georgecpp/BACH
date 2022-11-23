import {Card, Modal,Button,Row,Col} from 'react-bootstrap'

import { useState } from 'react';
import { useDispatch } from 'react-redux';
export default function Produs({name,price,picture,details}) 
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const dispatch=useDispatch();


    return <>
    <Card style={{ width: '18rem',margin:20,border:"3px solid black",borderRadius:"5%"}} onClick={()=>{
        handleShow();
    }}>
    <Card.Img variant="top" style={{marginTop:10}} src={picture} />
    <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text style={{fontSize:20,color:"red"}}>
        {price} ether
        </Card.Text>
    </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
            <Col>
            <img src={picture} style={{width:200,height:200}}></img>

            </Col>
            <Col>
            <h3>{price} ether</h3>
            <p>{details}</p>
            </Col>
     
        </Row>       
        </Modal.Body>
        <Modal.Footer>
        <Button  onClick={()=>{
           dispatch({type:"ADD_PRODUS",payload:{name,price,picture,details}});
           handleClose();
        }}>Adauga in cos</Button>
        <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>
    </>
}