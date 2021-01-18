import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
 
 /**
  * Register React component
  */
 class Register extends Component {
   constructor(){
       super();
       this.state = {
            users: {
                id: '',
                username: '',
                email: '',
                password: '',
                cart: []
            }
       };
   }

   handleRegister = () => {
       axios.post('https://6005117e75860e0017c5c126.mockapi.io/api/v1/users',this.state.users)
       .then(()=>{
        alert('User registered');
       this.props.history.push('/login');
       })
       .catch((e)=>{
        alert('Something went wrong, please try again later',e);
       })
   };
 
   render() {
     return (
         <Container>
            <Form>
                <FormGroup>
                    <h2>Register</h2>
                </FormGroup>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="username" name="username" id="username" value={this.state.users.username} placeholder="Username" 
                        onInput={(e)=>(this.setState({users:{ ...this.state.users, username: e.currentTarget.value}}))}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" value={this.state.users.email} placeholder="Email" 
                        onInput={(e)=>(this.setState({users:{ ...this.state.users, email: e.currentTarget.value}}))}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" value={this.state.users.password} placeholder="Password" 
                        onInput={(e)=>(this.setState({users:{ ...this.state.users, password: e.currentTarget.value}}))}
                    />
                </FormGroup>
                <FormGroup>
                    <Button color="primary" onClick={this.handleRegister.bind(this)}>Register</Button>
                </FormGroup>
                <FormGroup>
                    <hr/>
                </FormGroup>
                <FormGroup>
                    <Link to="login" color="primary">Login</Link>
                </FormGroup>
            </Form>
        </Container>
    );
   }
   
 }
 
 export default Register;
 