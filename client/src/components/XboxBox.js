import React from 'react'
import { Flex, Box, Badge, Button, Text, Progress, Image } from "@chakra-ui/react";
function XboxBox(props) {
  console.log("PROPS.DATA", props.data)
  function ValidateXboxModel(model) {
    console.log("model", model)
    if (model.toUpperCase() === 'TRINITY' || model.toUpperCase() === 'CORONA')
      return <Image height="100px" src="/xboxslim.jpg" alt="image" />
    else {
      return <Image height="100px" src="/xboxphat.jpg" alt="image" />
    }
  }
  function GenereateXboxViews(data, index) {
    return (
      <div>
        <Box p="10px" borderStyle="solid" borderColor="black">
          <Flex>
            <Box>
              <Badge borderRadius="full" px="5" colorScheme="teal" fontSize="2xl" >
                Xbox Ip: {!data.system ? "Loading.." : data.systemlink.xboxip}
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="l"
                ml="2">
                Serial: {!data.system ? "Loading.." : data.system.serial + " ID: " + data.system.consoleid}
                <Text color="black" fontSize="10px">{!data.system.version ? "Loading.." : "Build Version:" + " " + data.system.version.build}</Text>
                <Text color="black" fontSize="10px">{!data.system.console ? "Loading.." : "Motherboard:" + " " + data.system.console.motherboard}</Text>
              </Box>
            </Box>
            <Box ml="2" textAlign="right" >
              {!data.system.console ? "" : ValidateXboxModel(data.system.console.motherboard)}
            </Box>
          </Flex>
        </Box>
        <Box p="10px" borderStyle="solid" borderColor="black">
          <Box
            color="blackAlpha.500"
            fontWeight="semibold"
            letterSpacing="wide"
            ml="2">
            RAM: {!data.memory ? "Loading.." :
              "Total" + " " + data.memory.total / (1024 * 1024) + " Mb " +
              "Used" + " " + data.memory.used / (1024 * 1024) + " Mb " +
              "Free" + " " + data.memory.free / (1024 * 1024) + " Mb "}
            <Progress hasStripe value={data.memory.used / data.memory.total * 100} />
            {/* <Image w="100px" src="https://www.pngitem.com/pimgs/m/10-107213_xbox-360-slim-png-transparent-png.png" /> */}
          </Box>
          <Box
            color="blue.300"
            fontWeight="semibold"
            fontSize="2xl"
            ml="2">
            Title Running:<a target="_blank" href={!data.systemlink.xboxip ? "Loading.." : "http://" + data.systemlink.xboxip + ":9999"}>{!data.live.error ? data.live.fulltitle : "Click here to trigger cache"}</a>
          </Box>
          <Box
            color="red.300"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="l"
            ml="2">
            Temp: {!data.temperature ? "Loading.." :
              "CPU" + " " + data.temperature.cpu + " " +
              "GPU" + " " + data.temperature.gpu + " " +
              "Memory" + " " + data.temperature.memory + " " +
              "Case" + " " + data.temperature.case
            }
          </Box>
        </Box>
        <Box p="20px" borderStyle="solid" borderColor="black">
          <Button backgroundColor="red.400" color="white" size="md" onClick={(e) => props.RemoveXbox(index)}>Remove</Button>
        </Box>
      </div >
    )
  }
  return (<> {props.data ? props.data.map((xbox, index) => {
    return GenereateXboxViews(xbox.data, index)
  }) : ""}</>)
}

export default XboxBox
