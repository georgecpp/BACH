import {Row,Col,Modal,Button,Container,Spinner} from 'react-bootstrap';
import { TransactionContext } from '../../Transanctions/TransactionProvider';
import { useState,useEffect } from 'react';
import { useContext } from "react";
import * as Icons from 'react-bootstrap-icons';
import { shopAddress } from '../../utils/constants';
import { useSelector,useDispatch } from 'react-redux';
export default function ModalCart({modalShow,setModalShow}){
    const { currentAccount, connectWallet, handleChange, sendTransaction, formData,isLoading } = useContext(TransactionContext);
    

    const products=useSelector(state=>state.products);
    const dispatch=useDispatch();

    const buy=()=>{
        let price=0;
        let name='';

        console.log(products);
        products.map((product,idx)=>{
            price+=product.price;
            if(idx===products.length-1)
                name+=product.name;
            else
                name+=product.name+',';
        })
        console.log(price);
        console.log(name);
        dispatch({type:'EMPTY_PRODUSE'});
        let formData={
            amount:price.toString(),
            addressTo:shopAddress,
            keyword:name,
            message:name
        }
        sendTransaction(formData);
       

    }

    const modalBody=()=>{
        console.log(currentAccount);
        if(!currentAccount){
            return <Button style={{margin:10}} onClick={()=>{
                connectWallet();
                
            }}>
                Connect your wallet first
            </Button>
        }
        else{
            return <Container>
            {
                products.map((product,idx)=>{
                    return <Row key={product.id}>
                        <Col>
                            <img src={product.picture} style={{width:80,height:80,margin:5,border:'1px solid black',borderRadius:"50%"}}/>
                        </Col>
                        <Col style={{margin:10,fontSize:10}}>
                            <h4>{product.name}</h4>
                            <Row>
                            <Col>
                            <Row>
                            <h5>{product.price}</h5>
                            </Row>
                            </Col>
                            <Col>
                            <Icons.Coin size={25}></Icons.Coin>
                            </Col>
                            </Row>
                        </Col>
                    </Row>
                }
                )
            }
            
            </Container>
        }
    }

    useEffect(()=>{
        console.log(currentAccount)
    },[])

    return <>
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign:'center'}}>
                {modalBody()}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
                Close
            </Button>
            {isLoading?<Spinner animation="border" variant="primary" />:
                        <Button onClick={()=>{
                            buy();
                            setModalShow(false);
                        }}>Buy</Button>
                        }
            </Modal.Footer>
        </Modal>
    </>
}