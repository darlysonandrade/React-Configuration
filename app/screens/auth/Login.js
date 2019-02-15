/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input } from 'native-base'

class Login extends React.Component {
    render () {
        return (
          <Container>
               <Header />
               <Content>
                 <Form>
                   <Item>
                     <Input placeholder="Username" />
                   </Item>
                   <Item last>
                     <Input placeholder="Password" />

                   </Item>
                   <Item>
                     <Input placeholder="Userna me" />
                   </Item>
                 </Form>
               </Content>
          </Container>




        )
    }
}



export default connect(null, {})(Login)