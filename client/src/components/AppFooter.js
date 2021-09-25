import React from "react";
import { Flex, Text, HStack } from "@chakra-ui/react";

export default function AppFooter() {
  return (
    <Flex
      bg="white"
      width="100%"
      justifyContent="center"
      alignItems="center"
      direction="column"
      boxShadow="0 -1px 6px -1px rgba(0, 0, 0, 0.1)"
      padding={4}
    >
      <HStack spacing={8} mb={8}>
        <Text color="gray.400">Multidash360</Text>
        <Text color="gray.400">Powered by SystemLinks Partys!</Text>
      </HStack>
      <Flex width="100%" justifyContent="center" wrap="wrap">
        <Text width="50%" textAlign="center" color="gray.600" fontSize="sm">
          Last Login 15.12.2020 - 14:00 | Data last updated on 16.12.20202 -
          22:00
        </Text>
      </Flex>
    </Flex>
  );
};