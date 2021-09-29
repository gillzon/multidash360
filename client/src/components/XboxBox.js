import React from 'react'
import { Flex, Box, Badge, Button, Text, Progress, Image } from "@chakra-ui/react";
import { FaUser } from 'react-icons/fa';
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
  function GenerateScreenshots(filename, xboxip) {
    let url = `http://${xboxip}:9999/image/screencapture?uuid=${filename}`
    return <a style={{ 'paddingRight': '10px' }} target="_blank" href={url}><Image height="100px" src={url} alt="image" /></a>
  }
  function GenereateXboxViews(data, index) {
    return (
      <Box
        m="5px"
        borderStyle="solid"
        borderWidth="2px"
        borderColor="blackAlpha.300">
        <Box
          pl="10px"
          pt="5px"
          pr="10px"
          pb="5px"
          display={{ base: "block", md: "flex", lg: "flex" }}>
          <Flex display={{ base: "block", md: "flex", lg: "flex" }}>
            <Box>
              <Box color="gray.500"
                fontWeight="semibold"
                ml="2">
                <Text color="black" fontSize="28px">
                  IP: {!data.system ? "Loading.." : data.systemlink.xboxip}
                </Text>
              </Box>
              <Box
                color="black"
                fontSize="15px"
                ml="2">
                <Box>
                  <Text as="b">Serial:</Text> {!data.system ? "Loading.." : data.system.serial}
                </Box>
                <Box>
                  <Text as="b">Id: </Text>{!data.system ? "Loading.." : data.system.serial}
                </Box>
                <Box>
                  <Text color="black" as="b">Build Version: </Text>{!data.system.version ? "Loading.." : data.system.version.build}
                </Box>
                <Text color="black" as="b">Motherboard: </Text>{!data.system.console ? "Loading.." : data.system.console.motherboard}
              </Box>
            </Box>

            <Box textAlign="right" pl="20px">
              {!data.system.console ? "" : ValidateXboxModel(data.system.console.motherboard)}
            </Box>

          </Flex>

        </Box>
        <Box pl="10px" pt="5px" pr="10px" pb="5px" borderStyle="solid" borderColor="black">
          <Box display="flex" >
            <Box pt="5px"
              color="#2ca243"
              ml="2">
              {data.live.images ? <Image src={data.live.images.icon} alt="box icon" /> : "No image"}
            </Box>
            <Box
              color="black"
              fontWeight="semibold"
              fontSize="2xl"
              ml="2">
              <Text fontSize="28px"><b>Title Running:</b> </Text><a target="_blank" href={!data.systemlink.xboxip ? "Loading.." : "http://" + data.systemlink.xboxip + ":9999"}>{!data.live.error ? data.live.fulltitle : "Click here to trigger cache"}</a>
            </Box>
          </Box>
          <Box
            color="black"

            fontSize="l"
            ml="2">
            <Text as="b">Temp:</Text>
            <Text>{!data.temperature ? "Loading.." : data.temperature.cpu + "°C "}</Text>
            <Progress colorScheme="red" mb="5px" value={data.temperature.cpu} />
            <Text>{!data.temperature ? "Loading.." : data.temperature.gpu + "°C "}</Text>
            <Progress colorScheme="yellow" mb="5px" value={data.temperature.gpu} />
            <Text>{!data.temperature ? "Loading.." : data.temperature.memory + "°C "}</Text>
            <Progress colorScheme="orange" mb="5px" value={data.temperature.memory} />
          </Box>
          <Box
            color="black"
            ml="2">
            <Text as="b">RAM:</Text>
            <Text>Used: {!data.memory ? "Loading.." : data.memory.used / (1024 * 1024) + " Mb "}</Text>
            <Progress mb="5px" value={data.memory.used / data.memory.total * 100} />
            <Text>Free: {!data.memory ? "Loading.." : data.memory.free / (1024 * 1024) + " Mb "}</Text>
            <Progress colorScheme="green" color="green.300" value={data.memory.free / data.memory.total * 100} />
            {/* <Image w="100px" src="https://www.pngitem.com/pimgs/m/10-107213_xbox-360-slim-png-transparent-png.png" /> */}
          </Box>

        </Box>
        <Box pl="10px" pt="5px" pr="10px" pb="5px" borderStyle="solid" borderColor="black" >
          <Box color="black.400"
            display="flex"
            ml="2">
            <FaUser size="20px" />
            <Text size="10px"> Signed In</Text>
          </Box>
          <Box color="black"
            display="block"
            pr="20px"
            ml="2">
            {data.profile[0] ? data.profile.map(profile => {
              if (profile.signedin) {
                return <><Box> {profile.gamertag} ({profile.gamerscore} G)</Box> </>
              }
            }) : "No Profiles"}
          </Box>
        </Box>
        <Box pl="10px" pt="5px" pr="10px" pb="5px" borderStyle="solid" borderColor="black" >
          <Box color="red.300"
            pr="20px"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="l"
            display="flex"
            ml="2">
            {data.screenshots[0] ? data.screenshots.map(img => {
              console.log("img", img)
              return GenerateScreenshots(img.filename, data.systemlink.xboxip)
            }) : ""}
          </Box>
        </Box>
        <Box borderStyle="solid" borderColor="black" pl="15px" pt="5px" pr="10px" pb="5px">
          <Button backgroundColor="red.400" color="white" size="md" onClick={(e) => props.RemoveXbox(index)}>Remove</Button>
        </Box>
      </Box >
    )
  }
  return (<> {props.data ? props.data.map((xbox, index) => {
    return GenereateXboxViews(xbox.data, index)
  }) : ""}</>)
}

export default XboxBox
