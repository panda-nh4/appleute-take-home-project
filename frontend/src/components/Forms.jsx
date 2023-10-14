import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
const Forms = ({children}) => {
  return (
    <Container style={{marginTop:"10%"}}>
      <Row className='justify-content-center mt-5'>
        <Col xs={12} md={6} className='card p-5'>
            {children}
        </Col>
      </Row>
    </Container>
  )
}

export default Forms
