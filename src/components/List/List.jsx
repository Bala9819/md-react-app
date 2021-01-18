import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tile } from './Tile';
import { Row } from 'reactstrap';

/**
 * List React component
 */
class List extends Component {

  constructor(){
      super();
      this.state = {
          productList: [],
          userData: JSON.parse(localStorage.getItem('userData'))
      }
      this.setProductListState();
  }

  setProductListState = () => {
    fetch('https://meijerdigital.azurewebsites.net/api/interview')
    .then(response => response.json())
    .then((data) => {
        // console.log(data);
        this.setState({productList:data});
    });
  };

  render() {
    return (
        <Row>
            {
                this.state.productList.map((product) => {return <Tile id={this.state.userData.id} product={product} key={product.code}/>})
            }
        </Row>
   );
  }
  
}

List.propTypes = {
    children: PropTypes.element.isRequired
}

export default List;
