import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.footer`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 50px;
`

class Footer extends Component {
  render() {
    return (
      <Container>
        &copy; Georgy Lepsaya
      </Container>
    )
  }
}

export default Footer