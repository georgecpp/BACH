import React from 'react';
import FacebookLogin from 'react-facebook-login';
import * as Icons from 'react-bootstrap-icons';
import { FacebookProvider, LoginButton } from 'react-facebook';
function  MyComponent  (){
   const handleResponse = (data) => {
        console.log(data);

        
      }
     
      const handleError = (error) => {
        //this.setState({ error });
      }

    return (
        <FacebookProvider appId="851147946285073">
        <LoginButton
          scope="email"
          onCompleted={handleResponse}
          onError={handleError}
        >
          <span>Login via Facebook</span>
        </LoginButton>
      </FacebookProvider>
    )
}
 
export default MyComponent;