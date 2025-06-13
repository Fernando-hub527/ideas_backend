import {
  Box,
  Flex,
  Text,
  Heading,
  HStack,
} from "@chakra-ui/react";

import type { Idea } from "../../services/models";

export function DetailsIdea(props: { idea: Idea }) {
    return (
        <Box maxW="3xl" mx="auto" p={4}>
            <Heading size="md" mb={4}> Resumo da Ideia </Heading>

            <Flex direction="column" p={6} bg={"gray.100"} borderRadius="3xl">
                <Flex align="center" gap={3} mb={2} wrap={{ base: "wrap", md: "nowrap" }} >
                    <Box minW="32px" w="32px" h="32px" rounded="full" overflow="hidden" border="2px" borderColor="white" >
                        <img src={`https://i.pravatar.cc/32?img=${props.idea.id}`}
                        alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Box>
                <Heading size="md">{props.idea.title}</Heading>
                </Flex>

                <Text fontSize="sm" color="gray.600" mb={4}> {props.idea.description} </Text>

            </Flex>

            <Box mt={6}>
                <Heading size="sm" mb={5}>Informações</Heading>
                <HStack gap={4} flexWrap={{ base: "wrap", md: "nowrap" }}>
                    <Text fontSize="sm" color="gray.600"> Categoria: {props.idea.category} </Text>
                    <Text fontSize="sm" color="gray.600"> Criado por: {props.idea.author.name} </Text>
                    <Text fontSize="sm" color="gray.600"> Criado em: {new Date(props.idea.createdAt).toLocaleDateString()} </Text>
                    <Text fontSize="sm" color="gray.600"> Votos: {props.idea.votes} </Text>
                </HStack>
            </Box>
        </Box>
    );
}
