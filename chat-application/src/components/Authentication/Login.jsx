import React, { useState } from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement,Button,useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChatState } from "../../Context/ChatProvider";

function Login() {

    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const[show,setShow]=useState(false);
     const[loading,setLoading]=useState(false)
     const toast = useToast()
    const history =useNavigate();
      const { setUser } = ChatState();


    const handleClick=()=>{
        setShow(!show)
    }

    const submitHandler=async()=>{
        setLoading(true)
        if(!email || !password){
            toast({
                title:"Please filed the all data",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top",
            })
            setLoading(false)
            return;
        }
        try {
            const config={
                Headers:{
                    "Content-Type":"application/json"
                }
            }
            console.log("test data")
            const   { data } = await axios.post("http://localhost:5000/api/user/login",{
                email,password
            },config)
            // const data = await response.json();
            toast({
                title:"Login success",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"top",
            })
            const valueData= data
            console.log(valueData,"valueData")
            setUser(data);
            localStorage.setItem("userInfo",JSON.stringify(data))
            setLoading(false)
            history("/chats")
        } catch (error) {
            toast({
                title:"Error Occured",
                description:error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"top",
            })
            setLoading(false)
            return;
        }
    }

  return (
    <div>
         <VStack spacing='5px'>
        <FormControl id='email' isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
                <Input type={show?"text":"password"} placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/>
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show?"Hide":"Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

      
                <Button colorScheme='blue' width='100%' color="white" style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>
                   Log IN
                </Button>
                <Button variant='solid'colorScheme='red' color="white" width='100%' style={{marginTop:15}} onClick={()=>{setEmail("axios.@axios.com");setPassword("12345678")}}>
                   Get User Credential
                </Button>

    </VStack>
    </div>
  )
}

export default Login