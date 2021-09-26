import React from 'react'
import { Flex, Box, Badge } from "@chakra-ui/react";
function XboxBox(props) {
  console.log("PROPS.DATA",props.data)
  function GenereateXboxViews(data) {
    console.log("data", data)
    return (
      <div>
        <Box maxW="xxl" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box p="6">
            <Box alignItems="baseline">
              <Badge borderRadius="full" px="5" colorScheme="teal">
                Serial: {!data.system ? "Loading.." : data.system.serial}
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="l"
                textTransform="uppercase"
                ml="2"
              >
                Console Id: {!data.system ? "Loading.." : data.system.consoleid}
              </Box>
              <Box
                color="blue.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="l"
                textTransform="uppercase"
                ml="2"
              >
                Title Running: {!data.live ? "Loading.." : data.live.fulltitle}
              </Box>
              <Box
                color="red.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="l"
                textTransform="uppercase"
                ml="2"
              >
                Temp: {!data.temperature ? "Loading.." :
                  "CPU" + " " + data.temperature.cpu + " " +
                  "GPU" + " " + data.temperature.gpu + " " +
                  "Memory" + " " + data.temperature.memory + " " +
                  "Case" + " " + data.temperature.case
                }
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    )
  }
  return (<> {props.data ? props.data.map(xbox => {
    return  GenereateXboxViews(xbox.data)
  }) : ""}</>)
}

export default XboxBox
