import React from 'react'
import { Flex, Box, Badge } from "@chakra-ui/react";
function XboxBox(props) {
    console.log(props.data)
    return (
        <div>
            <Box maxW="xxl" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box p="6">
        <Box alignItems="baseline">
          <Badge borderRadius="full" px="5" colorScheme="teal">
            Serial: {!props.data.system ? "Loading.." : props.data.system.serial}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="l"
            textTransform="uppercase"
            ml="2"
          >
            Console Id: {!props.data.system ? "Loading.." : props.data.system.consoleid}
          </Box>
          <Box 
            color="blue.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="l"
            textTransform="uppercase"
            ml="2"
          >
            Title Running: {!props.data.title ? "Loading.." : props.data.title.fulltitle}
          </Box>
          <Box 
            color="red.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="l"
            textTransform="uppercase"
            ml="2"
          >
            Temp: {!props.data.temperature ? "Loading.." : 
            "CPU"+ " " + props.data.temperature.cpu + " " + 
            "GPU" + " " + props.data.temperature.gpu + " " + 
            "Memory" + " " + props.data.temperature.memory + " " + 
            "Case" + " " + props.data.temperature.case
            }
          </Box>
        </Box>
        </Box>
        </Box>
        </div>
    )
}

export default XboxBox
