import { Flex, Text, Box } from "@chakra-ui/react";
import type { Comment } from "../../services/models";

export function CommentItem(props: {contentData: Comment}){
    return (
    <Flex w={"3xl"} maxW="3xl" mx="auto" justify="left" 
        align="flex-start" gap={4} p={2} wrap={{ base: "wrap", md: "nowrap" }} >
        <Box minW="32px" w="32px" h="32px" rounded="full" overflow="hidden" border="2px" borderColor="white" >
            <img src={`https://i.pravatar.cc/32?img=${props.contentData.author.id}`}
            alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="sm"> {props.contentData.author.name} </Text>
          <Text fontSize="sm" color="gray.500"> {props.contentData.comment} </Text>
        </Box>
    </Flex>
    )
}