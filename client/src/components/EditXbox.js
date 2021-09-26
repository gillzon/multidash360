import React, { useState } from 'react'

import { Flex, Box, Badge, Input, Button, Text, Progress } from "@chakra-ui/react";
function EditXbox(props) {
    const [ip, setIp] = useState()
    return (
        <div>
            <Flex color="white">
                <Box p="20px" borderStyle="solid" borderColor="black">
                    <Input color="black" placeholder="Ip address to xbox" name="ip" value={ip} onChange={(e) => setIp(e.target.value)} />
                </Box>
                <Box p="20px" borderStyle="solid" borderColor="black">
                    <Button backgroundColor="green" size="md" onClick={(e) => props.AddXbox(ip)}>
                        Add
                    </Button>
                </Box>
            </Flex>
        </div>
    )
}

export default EditXbox
