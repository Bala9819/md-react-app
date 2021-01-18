import React, { useContext } from 'react';
import { Badge, Button, Navbar, NavbarBrand } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

export default (props) => {
    const { loggedInstatus, userData } = useContext(UserContext);
    console.log(loggedInstatus);
    const loggedInStatus = localStorage.getItem('loggedInStatus');
    const history = useHistory();
    return (
        <Navbar color="primary" className="mb-5" light>
            <NavbarBrand href="home" style={{color: "white"}} className="mr-auto font-weight-bold" >Meijer Demo</NavbarBrand>
            {
                (loggedInStatus == "true") ? 
                (
                    <>
                        <span className='mr-4 text-white position-relative'>
                            <FontAwesomeIcon icon={faShoppingCart}/>
                            <Badge className="ml-1 cartNumber">{
                                cartValue(userData)
                            }</Badge>
                        </span>
                        <Button onClick={handleLogout.bind(this, history)}>Logout</Button>
                    </>
                ) 
                : 
                null
            }
        </Navbar>
    )
}

function cartValue(userData){
    const quantityArr = userData.cart.map((ele)=>(ele.quantity));
    return quantityArr.reduce((a, b) => a + b, 0);
}

function handleLogout(history) {
    localStorage.removeItem('userData');
    localStorage.removeItem('loggedInStatus');
    history.go('/login');
}