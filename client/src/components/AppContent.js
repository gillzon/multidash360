import React from "react";
import { Container, Box, Badge, Spinner, Flex } from "@chakra-ui/react";
import XboxBox from './XboxBox'
import EditXbox from "./EditXbox";
export default function AppContent(props) {
  return (<>
    <div maxW="2023px">
      <EditXbox AddXbox={props.AddXbox} validateIp={props.validateIp} />
      <Flex display={{ base: "block", md: "flex", lg: "flex" }}>
        {props.data[0] ? <><XboxBox data={props.data} RemoveXbox={props.RemoveXbox} /></> : <Box textAlign="center"><Spinner
          thickness="10px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#2ca243"
          size="xl"
        /></Box>}</Flex></div></>
  );
};