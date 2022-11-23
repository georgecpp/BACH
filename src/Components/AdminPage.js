import { Container,Row,Col,Button ,Table} from "react-bootstrap";
import axios from "axios";
import { TransactionContext } from '../Transanctions/TransactionProvider';
import { useState,useEffect,useContext } from 'react';
import {url} from '../utils/constants';
export default function AdminPage( ){

    const {   transactionCount,transactions,currentAccount, connectWallet, handleChange, sendTransaction, formData,isLoading,setAdminAccount } = useContext(TransactionContext);    
    const [feedBack,setFeedBack]=useState({totalUsers:2,sentimentOverall:'Happines'});
    const getFeedback=()=>{
        axios.get(url+'/admin/feedback').then(res=>{
            console.log("feedback",res.data);
            console.log(res.data);
           setFeedBack({totalUsers:res.data.users,sentimentOverall:res.data.overallFeedback});
        }).catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getFeedback();
        setAdminAccount("0xF3d235408900e0024882C90f3614D10D93b16fCa");
        console.log(currentAccount);
        console.log(transactionCount);
        console.log(transactions);
    },[])
    return <Container style={{textAlign:'center',color:'white'}}>
        <Row>
            <Container>
                <Row>
                    <h1 style={{color:"white",textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000",fontSize:40,fontWeight:'bold'}}>Admin Page</h1>
                </Row>
                <br></br>
               <Row>
                    <h3 style={{color:"white",textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000",fontSize:40,fontWeight:'bold'}}>Tranzactions</h3>            
                </Row>
                <br></br>
                <Row>
                <br></br>
                <Table striped bordered variant="dark" hover style={{textAlign:'center',color:'white'}}>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Address from</th>
                        <th>Name of products</th>
                        <th>Timestamp</th>
                        <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction,index)=>{
                            return <tr key={index}>
                                <td>{index}</td>
                                <td>{transaction.addressFrom}</td>
                                <td>{transaction.message}</td>
                                <td>{transaction.timestamp}</td>
                                <td>{transaction.amount}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                </Row>
            </Container>
        </Row>
        <hr style={{height:'2px'}}></hr>
        <Row>
                <h3>Feedback</h3>
            </Row>
            <br></br>
        <Row>
           
            <Col>
                <Row>
                    <Col>
                        <h4>Total users</h4>
                    </Col>
                    <Col>
                        <h4>{feedBack.totalUsers}</h4>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row>
                    <Col>
                        <h4>Sentiment Overall</h4>
                    </Col>
                    <Col>
                        <h4>{feedBack.sentimentOverall}</h4>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}