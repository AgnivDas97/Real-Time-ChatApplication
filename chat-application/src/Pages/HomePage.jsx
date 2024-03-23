import React, { useEffect } from 'react'
import { Container,Box,Text,Tab,Tabs,TabList,TabPanel,TabPanels } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useNavigate } from 'react-router-dom'


function HomePage() {
  const history = useNavigate();
  useEffect(()=>{
      const userInfo = localStorage.getItem("userInfo")
       if(userInfo==undefined) { const user = JSON.parse(userInfo)
      console.log(user,"user data from home page")
        if(user){
            history("/chats")
        } }
        
    },[history])
  return (
    <Container maxW='xl' centerContent>
      <Box d='flex' justifyContent="center" p={3} bg={"white"} w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth='1px'>
        <Text>Chat Application</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius='lg' borderWidth="1px" color='black'>
        <Tabs variant='soft-rounded'>
          <TabList mb='1em'>
            <Tab width='50%'>Login</Tab>
            <Tab width='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage