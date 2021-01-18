import React, { useContext, useState } from "react";
import axios from 'axios';
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Col} from 'reactstrap';
import PropTypes from 'prop-types';
import { UserContext } from "../../context/UserContext";

const updateCart = (id, operation, product, userContext) => {
    let url = 'https://6005117e75860e0017c5c126.mockapi.io/api/v1/users/'+id;
    let added = true;
    let { userData, setUserData } = userContext;
    userData.cart.map((prod)=>{
        if(prod.code === product.code){
            operation=='add' ? prod.quantity += 1 : prod.quantity -= 1;
            product.quantity = prod.quantity;
            added = false;
        }
    });
    if(added){
        product.quantity = 1;
        userData.cart.push(product);
    }
    let cart = userData.cart;
    axios.put(url, {'cart': cart})
    .then(
        ({data: updatedUserData}) => {
        alert(operation == 'add' ? `${product.name} is added to your shopping cart, quantity ${product.quantity}` 
        : `${product.name} is removed from your shopping cart, quantity ${product.quantity}`);
        setUserData(updatedUserData);
        
    }).catch(
        ()=> alert('something went wrong, please try again')
    );
};

export function Tile (props) {
    const { userData, setUserData } = useContext(UserContext);
    const cartArr = userData.cart;
    cartArr.forEach(cartEl => {
        if(cartEl.code == props.product.code){
            props.product.quantity = cartEl.quantity; 
        }
    });
    const [product, updateProductState] = useState(props.product); // hook
    return (
        <Col sm="4" key={product.code}>
            <Card>
                <CardImg top width="100%" src={product.image} alt={product.name} />
                <CardBody>
                    <CardTitle tag="h5">{product.name}</CardTitle>
                    <CardText>Code: {product.code}</CardText>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Price: {product.price}</CardSubtitle>

                    {
                        (product.quantity) ? 
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                            Quantity: {product.quantity}
                        </CardSubtitle>: ''
                    }
                    <Button color="success" className="mr-2" onClick={()=>{ 
                        updateProductState({...product, quantity:product.quantity+1}); 
                        updateCart(props.id,'add', {...product}, {userData, setUserData}) 
                        }}>
                        Add
                    </Button>

                    {
                        (product.quantity) ? 
                        <Button color="danger" onClick={()=>{ 
                        updateProductState({...product, quantity:product.quantity-1}); 
                        updateCart(props.id,'remove', {...product}, {userData, setUserData}) 
                        }}>
                        Remove
                        </Button> : ''
                    }
                </CardBody>
            </Card>
        </Col>
    );
}

Tile.propTypes = {
    id: PropTypes.string,
    product: PropTypes.shape({
        image: PropTypes.string,
        code: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.string
    })
}