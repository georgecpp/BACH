import {Col,Container,Row,Carousel} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import Produs from "./Product";
import axios from 'axios';
import {url} from '../utils/constants';
export default function ProductsPage() {

   const [produse,setProduse]=useState([{name:"Zahar",price:"0.001",picture:''}]);
   const getAllProduse=()=>{
        axios.get(url+"/products/").then(res=>{
            console.log(res.data);
            //map through the array of products
            let p=[];
            res.data.map(produs=>{
                p.push({name:produs.title,price:produs.price/10000,picture:produs.img});
            })
            setProduse(p);
        }).catch(err=>{
            console.log(err);
        })
        
    }
    useEffect(()=>{
        getAllProduse();
    },[])
  return <>
        <Container>
        <Col>
            <Row className="justify-content-md-center">
            <h1 style={{color:"white",textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000",fontSize:70,fontWeight:'bold',margin:20}}>Groceries Products</h1>
            
            </Row>
            <hr style={{color:"white",height:3,margin:20,width:"100%"}}></hr>
            <Row style={{border:""}}>
                {produse.map((produs,index)=>{
                    return <Produs price={produs.price} name={produs.name} picture={produs.picture} details={produs.description}></Produs>
                })
            }
            </Row>
        </Col>
        </Container>
    </>
}