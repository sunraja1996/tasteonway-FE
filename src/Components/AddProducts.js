import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { env } from '../environment';
import { useNavigate } from 'react-router-dom';

function AddProducts() {
  const [name, setName] = useState('');
  const [prices, setPrices] = useState([
    { size: 'small', price: '' },
    { size: 'medium', price: '' },
    { size: 'large', price: '' },
  ]);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Veg');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${env.apiurl}/pizzaburgers/addproduct`, {
        name,
        prices,
        category,
        image,
        description,
      });

      if (response.status === 200) {
        alert('Product added successfully!');
        navigate('/dashboard');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  const addPrice = () => {
    setPrices([...prices, { size: '', price: '' }]);
  };

  return (
    <div className='mt-3 d-flex justify-content-center'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicname'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicimage'>
          <Form.Label>Image</Form.Label>
          <Form.Control type='text' placeholder='Image(Url)' value={image} onChange={(e) => setImage(e.target.value)} />
        </Form.Group>
        <Row>
          {prices.map((price, index) => (
            <Col key={index}>
              <Form.Group className='mb-3' controlId={`formBasic${price.size}`}>
                <Form.Label>{price.size}</Form.Label>
                <Form.Control
                  type='text'
                  placeholder={`Price(${price.size})`}
                  value={price.price}
                  onChange={(e) =>
                    setPrices([
                      ...prices.slice(0, index),
                      { size: price.size, price: e.target.value },
                      ...prices.slice(index + 1),
                    ])
                  }
                />
              </Form.Group>
            </Col>
          ))}
        </Row>
        {/* Add button to add another price */}
        <Button variant='secondary' onClick={addPrice}>
          Add another price
        </Button>

        <div style={{ textAlign: 'center' }}>
          <Button className='m-2' variant='primary' type='submit'>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddProducts;
