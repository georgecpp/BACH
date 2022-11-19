import {Navbar,Nav,Container,Button,Offcanvas,Form,FormControl,Row,Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import ModalLogin from './Modals/ModalLogin';
import * as Icons from 'react-bootstrap-icons'
import ModalCart from './Modals/ModalCart';
import { useContext } from "react";
import ModalFeedBack from './Modals/ModalFeedBack';
import logo from './logo_garuda.png';
import { TransactionContext } from '../Transanctions/TransactionProvider';
import HomeScreen from './HomeScreen';
export default function MyNavbar({}) {
  
  const {logOut} = useContext(TransactionContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showFeedBack, setShowFeedBack] = useState(false);
  let user=useSelector(state=>state.user);
  let dispatch=useDispatch(); 

  const renderProfile=()=>{
    if(user.isAuthenticated && user.user)
    {
      return <>
      <Row className="justify-content-center" >
        <Col  xs="3" md="3" lg="3"> 
          <img src={user.user.picture}  referrerpolicy="no-referrer" style={{width:50,height:50,borderRadius:"50%",border:"3px solid #ADD8E6"}}/>
        </Col>
          <Col  xs="auto" md="auto" lg="auto" >
            <h3 style={{color:'white',textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000",fontSize:40,fontWeight:'bold'}}> {user.user.name}</h3>
          </Col>
      </Row>
      </>
      }
      else
        return <h3 style={{color:'white',textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000",fontSize:40,fontWeight:'bold'}}>Login</h3>;
    }

  useEffect(()=>{
    console.log('user');
    console.log(user);
    },[]);
  return <>
  <Navbar bg="primary" variant="dark" expand={false} style={{backgroundColor:"#B7CADB"}}>
  <Container fluid >
  <Nav.Link style={{margin:10,padding:5,fontSize:40,fontWeight:'bold'}}
  onClick={()=>{
    console.log('home');
    dispatch({type:"SET_PAGE",payload:<HomeScreen />});
  }}
  ><img style={{height:70,width:70}} src={logo}></img></Nav.Link>
    <Navbar.Brand 
    onClick={()=>{
      console.log('home');
      dispatch({type:"SET_PAGE",payload:<HomeScreen />});
    }} style={{textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000",fontSize:40,fontWeight:'bold'}}>Garuda</Navbar.Brand>
    <Navbar.Toggle aria-controls="offcanvasNavbar" />
    <Navbar.Offcanvas   style={{backgroundColor:"#B7CADB",color:'white'}}
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
    >
      <Offcanvas.Header bg="primary" style={{color:'white'}} closeButton closeVariant='white'>
        <Offcanvas.Title id="offcanvasNavbarLabel">
          <h5  style={{color:'white',textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000",fontSize:40,fontWeight:'bold'}}>Menu </h5>
          </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body bg="primary" style={{textAlign:'center'}}>
        <Nav className="justify-content-end flex-grow-1 pe-3" variant='dark' bg="primary">
        <Nav.Link onClick={(e)=>{  
            if(!user.isAuthenticated)
                setShowLogin(true)
                
            }} style={{fontSize:30,color:'white'}} > 
            {renderProfile()}
            </Nav.Link>
       
            <hr style={{height:'2'}}></hr>
            <Nav.Link  onClick={(e)=>{
                setShowCart(true)
                }} >
                    <Row className="justify-content-center" >
                        <Col style={{padding:15,margin:0}} xs="2" md="2" lg="2">
                    <Icons.Basket2Fill style={{color:'white',border:'2px solid white',borderRadius:'50%',padding:2}} size={40}/>
                    </Col>
                    <Col style={{padding:10,margin:0}} xs="2" md="2" lg="2">
                    <h5 style={{color:'white',textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000",fontSize:40,fontWeight:'bold'}}>Cart</h5>
                    </Col>
                    </Row>
                    </Nav.Link>
                    <hr style={{height:'2'}}></hr>
              <Nav.Link  onClick={(e)=>{
                setShowFeedBack(true)
                }} >
                  <h3  style={{color:'white',textShadow:"-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000",fontSize:40,fontWeight:'bold'}}>Feedback</h3> 
              </Nav.Link>
              {
                user.isAuthenticated?
                <>
                <hr style={{height:'2'}}></hr>
                <Nav.Link  onClick={(e)=>{
                  dispatch({type:"LOGOUT_CURRENT_USER"});
                  logOut();
                } 
                } >
                  <h3 style={{color:'white'}}>Logout</h3>
                </Nav.Link>
                </>:<> </>
              }
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>
  <ModalLogin show={showLogin} setShow={setShowLogin}></ModalLogin>
  <ModalCart setModalShow={setShowCart} modalShow={showCart} ></ModalCart>
  <ModalFeedBack setModalShow={setShowFeedBack} modalShow={showFeedBack} ></ModalFeedBack>
</>
} 