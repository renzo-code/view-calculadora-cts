import React from 'react'

import styled from 'styled-components'

const Header = () => {
  return(
    <Content>
      <WrapperImg>
        <Logo src='./images/LRespeciales.png'/>
      </WrapperImg>
    </Content>
  )
}

export default Header

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* max-width: 1440px; */
  width: 100%;
  /* margin: 0 auto; */
  height: 80px;
  background-color: #EEEEEE;
  border-bottom: red solid 5px;
`
const WrapperImg = styled.div`
  height: auto;
  width: 210px;
  margin-left: 20px;

  @media (max-width: 470px){
    width: 210px;
    margin-left: 10px;
  }
`
const Logo = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`