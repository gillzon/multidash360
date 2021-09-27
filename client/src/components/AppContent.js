import React from "react";
import { Container, Box, Badge, Spinner } from "@chakra-ui/react";
import XboxBox from './XboxBox'
import EditXbox from "./EditXbox";
export default function AppContent(props) {
  return (<>
    <div maxW="2023px">
      <EditXbox AddXbox={props.AddXbox} validateIp={props.validateIp} />
      {props.data[0] ? <><XboxBox data={props.data} RemoveXbox={props.RemoveXbox} /></> : <Box textAlign="center"><Spinner
        thickness="10px"
        speed="0.65s"
        emptyColor="gray.200"
        color="green.500"
        size="xl"
      /></Box>}</div></>
  );
};