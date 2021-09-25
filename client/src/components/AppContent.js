import React from "react";
import { Flex, Box, Badge } from "@chakra-ui/react";
import XboxBox from './XboxBox'
export default function AppContent(props) {
    console.log("asdf",props.data)
  return (
        <XboxBox data={props.data}/>
  );
};