import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

/**
 * Login React component
 */
export default (props) => {
    console.log(props);
    // State Hooks
    const[email, setEmail] = useState(''); 
    const[password, setPassword] = useState('');
    
    return (

      <Container>
        <Form>
            <FormGroup>
                <h2>Login</h2>
            </FormGroup>
            <FormGroup>
                <Label for="Email">Email</Label>
                <Input type="email" name="email" id="Email" value={email} placeholder="email" 
                onInput={(e)=>{setEmail(e.currentTarget.value)}}/>
            </FormGroup>
            <FormGroup>
                <Label for="Password">Password</Label>
                <Input type="password" name="password" id="Password" value={password} placeholder="password" 
                onInput={(e)=>{setPassword(e.currentTarget.value)}}/>
            </FormGroup>
            <FormGroup>
                <Button color="primary"
                  onClick={handleLogin.bind(props,email,password)}>
                  Login</Button>
            </FormGroup>
            <FormGroup>
                <hr/>
            </FormGroup>
            <FormGroup>
                <Link to="register" color="primary">Register</Link>
            </FormGroup>
        </Form>
       </Container>
   );
};

function handleLogin(email,password){
    fetch('https://6005117e75860e0017c5c126.mockapi.io/api/v1/users?email='+email+'&password='+password)
    .then(res=>res.json())
    .then(data => {
        if(data[0].password === password) {
            localStorage.setItem('loggedInStatus',true);
            localStorage.setItem('userData',JSON.stringify(data[0]));
            this.history.go('/home')
        } else {
            alert("invalid credentials");
        }
    });
}