
import {Modal,Container,Row,Col,Tab,Button,Nav, Form} from 'react-bootstrap';
import axios from 'axios';
import {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import * as Icons from 'react-bootstrap-icons';
import {GoogleLogin}  from 'react-google-login';
import {url} from '../../utils/constants';
export default function ModalLogin({show,setShow})
{
    let dispatch=useDispatch();
    let user=useSelector(state=>state.user);
   

    const responseGoogle = (response) => {
        console.log(response);
        console.log(response.tokenObj);
        let token=response.tokenObj.access_token;
       axios.get('https://www.googleapis.com/fitness/v1/users/me/dataSources', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        ).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
        // let email=response.profileObj.email;
        // let name=response.profileObj.givenName+' '+response.profileObj.familyName;
        // let id=response.profileObj.googleId;
        // let picture=response.profileObj.imageUrl;
        // axios.post(url+"/auth/social-auth",{email,name,img:picture}).then(res=>{
        //     console.log(res.data);
        //     dispatch({type:'SET_CURRENT_USER',payload:{email,name,id,picture,type:'normal'}});
           
        //     console.log(user);
        //     setShow(false);
        // }).catch(err=>{
        //     console.log(err);
        //     alert(err);
        // })
        
      }
    const sendLogin=(e)=>
    {
        e.preventDefault();
        let form=e.target;
        let email=form[0].value;
        let password=form[1].value;
        console.log(email,password);
        // axios.post(url+"/auth/login/",{email,password}).then(res=>{
        //     console.log(res.data);
        //     //dispatch({type:"LOGIN",payload:res.data});
        //     dispatch({type:'SET_CURRENT_USER',payload:{email:res.data.email,name:res.data.name,id:res.data.id,picture:res.data.img,type:res.data.role}});
        //     }).catch(err=>{
        //         console.log(err);
        // })
        setShow(false);
    }
    return <>
    <Modal show={show} onHide={()=>{setShow(false)}}>
        <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
            <Row>
            <Col>
            <h3>Login</h3>
            <br></br>
            <Form onSubmit={sendLogin}>
            <Form.Control type="email" placeholder="Enter email" />
            <br></br>
            <Form.Control type="password" placeholder="Password" />
            <br></br>   
            <Button style={{margin:5}} variant="primary" type="submit">
                    Login
            </Button>
            <GoogleLogin
                clientId="163716166966-j4t8n46f0gq4beqokdtq0jrb6dbvuuov.apps.googleusercontent.com"
                buttonText=""
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                scope = { `https://www.googleapis.com/auth/fitness.blood_glucose.write https://www.googleapis.com/auth/fitness.location.write https://www.googleapis.com/auth/fitness.nutrition.write https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.sleep.write https://www.googleapis.com/auth/fitness.activity.write https://www.googleapis.com/auth/fitness.blood_pressure.write https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.heart_rate.write https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.reproductive_health.write https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.body.write https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.oxygen_saturation.write https://www.googleapis.com/auth/fitness.body_temperature.read`}
            />
            </Form>
            </Col>
            </Row>
            </Container>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={()=>{setShow(false)}}>Close</Button>
        </Modal.Footer>
    </Modal>
    </>        
}
