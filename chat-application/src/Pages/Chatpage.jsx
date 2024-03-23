import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
// import { Box } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';

function Chatpage() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const  {user} = ChatState();
  // console.log(user,"user value in chatpage")
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box display='flex' justifyContent="space-between" w='100%' h='91.5vh' p='10px'>
        {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>

    </div>
  )
}

export default Chatpage