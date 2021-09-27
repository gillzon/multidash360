import React, { useState } from 'react'

import { Flex, Box, Badge, Input, Button, Text, Progress } from "@chakra-ui/react";
function EditXbox(props) {
    const [ip, setIp] = useState()



    return (
        <div>
            <Box p="20px" borderStyle="solid" borderColor="black">
                <Input size="md" color="black" placeholder="Ip address to xbox" name="ip" value={ip} onChange={(e) => setIp(e.target.value)} />
                <Text m="2px" color="red.500">{props.validateIp}</Text>
            </Box>
            <Box p="20px" borderStyle="solid" borderColor="black">
                <Button backgroundColor="green" color="white" size="md" onClick={(e) => props.AddXbox(ip)} >
                    Add
                </Button>
            </Box>
        </div>
    )
}

export default EditXbox
