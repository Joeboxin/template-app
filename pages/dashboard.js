import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import { useStateContext } from '@/context/StateContext'
import { useRouter } from 'next/router'


const Dashboard = () => {

  const { user } = useStateContext()
  const [data, setData] = useState(null)

  const [age, setAge] = useState(21)
  const router = useRouter()

  function updateAge() {
    let currentAge = age
    currentAge = age + 1
    setAge(currentAge)
  }

  function useEffectFunction() {
    setTimeout( () => {
      setData(age*1000)
      }, 5000
    )
  }
  useEffect(useEffectFunction, [data])

  useEffect(() => {
    if(!user){
      router.push('/')
    }
    else{
      console.log('User is logged in')
    }
  }, user
)
  return (
    <Section>
      <TopHeader>
        Dashboard
        <p>Joey is {age} years old</p>
        <button onClick={() => updateAge()}>It's my birthday</button>
        {
          !data ? <p>Loading...</p> : <p>This is the data: {data}</p>
        }
      </TopHeader>



    </Section>
  )
}

// STYLED COMPONENTS
const Section = styled.section`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
`

const TopHeader = styled.h1`
font-size: 30px;
display: flex;

`


export default Dashboard