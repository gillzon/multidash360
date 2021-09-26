import React from "react";
import { Container, Box, Badge, Spinner } from "@chakra-ui/react";
import XboxBox from './XboxBox'
import EditXbox from "./EditXbox";
export default function AppContent(props) {
  console.log("asdf", props.data)
  return (<>
    <div maxW="2023px">
      {props.data[0] ? <><EditXbox AddXbox={props.AddXbox} /><XboxBox data={props.data} RemoveXbox={props.RemoveXbox} /></> : <Spinner
        thickness="40px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />}</div></>
  );
};