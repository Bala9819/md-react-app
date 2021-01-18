import React, { Component } from "react";
import { Container } from "reactstrap";
import List from "../components/List/List";
class Home extends Component {
    render(){
        return (
            <Container>
                <List/>
            </Container>
        );
    }
}

export default Home;