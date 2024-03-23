import React, { useState } from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement,Button ,useToast} from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {

    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const[confirmpassword,setConfirmpassword]=useState();
    const[pic,setPic]=useState();
    const[show,setShow]=useState(false);
    const[loading,setLoading]=useState(false)
    const toast = useToast()
    const history =useNavigate();

    console.log(name,email,password,confirmpassword,pic,"name,email,password,confirmpassword,pic")

    const handleClick=()=>{
        setShow(!show)
    }

    const postDetails=(pics)=>{
        setLoading(true)
        console.log(typeof(pics),pics,"test1")
        if(pics===undefined){
            toast({
                title:"Please select an image",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top",
            })
            return;
        }
        console.log("test2")
        if(pics.type ==="image/jpeg" || pics.type==="image/png"){
            console.log("test3")
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","chat-app");
            data.append("Cloud_name","dyekscdns");
            console.log("append")
            //https://console.cloudinary.com/console/c-8e37408269bd3e181c67a8727d8101
            //https://api.cloudinary.com/v1_1/dyekscdns
            //CLOUDINARY_URL=cloudinary://375739398974461:dF-JRpnl0OqYzIwTvlGkPoOHr-M@dyekscdns
            fetch("https://api.cloudinary.com/v1_1/dyekscdns/image/upload",{ 
                method:"post",
                body:data,
            }).then((res)=> res.json())
            .then(data=>{
                console.log(data,"test4")
                setPic(data.url.toString());
                console.log(data.url.toString(),"data.url.toString()");
                setLoading(false);
            }).catch((err)=>{
                console.log(err,"err")
                setLoading(false)
            })
        }else{
            console.log("test5")
            toast({
                title:"Please select an image",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top"
            })
            setLoading(false)
            return;
        }
    }
    const submitHandler=async()=>{
        setLoading(true)
        if(!name || !email || !password || !confirmpassword){
            toast({
                title:"Please select enter all data",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top",
            })
            setLoading(false)
            return;
        }
        if(password != confirmpassword){
            toast({
                title:"Please select excet password",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top",
            })
            return;
        }
        try {
            const config={
                Headers:{
                    "Content-Type":"application/json"
                }
            }
            console.log("104")
            const  response = await axios.post("http://localhost:5000/api/user",{
                name,email,password,pic
            },config)
            console.log(response,"response of data")
            // const data = await response.json();
            if(response!==undefined){toast({
                title:"Successfully connected",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"top",
            })}
            console.log(response,"after sing up response")
            localStorage.setItem("userInfo",JSON.stringify(response.data))
            console.log(" localStorage.setItem(userInfo,JSON.stringify(response))",localStorage.setItem("userInfo",JSON.stringify(response.data)))
            setLoading(false)
            history("/")
        } catch (error) {
            toast({
                title:"Error Occured",
                description:error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"top",
            })
            return;
        }
    }


    return (
    <VStack spacing='5px'>
        <FormControl id='first-name' isRequired>
            <FormLabel>
                Name
            </FormLabel>
            <Input placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)}/>
        </FormControl>

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

        <FormControl id='password' isRequired>
                    <FormLabel>
                        Confirm Password
                    </FormLabel>
                    <InputGroup>
                        <Input type={show?"text":"password"} placeholder='Enter Your Confirm Password' onChange={(e)=>setConfirmpassword(e.target.value)}/>
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show?"Hide":"Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>


                <FormControl id='pic' isRequired>
                    <FormLabel>
                        Upload Your Picture
                    </FormLabel>
                        <Input type="file" p={1.5} accept="image/*" placeholder='Enter Your Password' onChange={(e)=>postDetails(e.target.files[0])}/>
                </FormControl>
                
                <Button colorScheme='blue' width='100%' style={{marginTop:15}} onClick={submitHandler} isLoading={loading}>
                    Sing Up
                </Button>

    </VStack>
  )
}

export default Signup