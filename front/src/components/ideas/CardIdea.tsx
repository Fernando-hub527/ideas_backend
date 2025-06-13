import { Box, Button, Heading, Text, VStack, Badge } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { voteOnIdea } from "../../services/ideaService";
import type { Idea } from "../../services/models";
import { NotificationError } from "../generics/notify/Notify";
import { useNavigate } from "react-router";
import routesConfig from "../../routes/routesConfig";

export function CardIdea(props: {idea: Idea, setLoading: (loading: boolean) => void, toLike: () => void}) {
    const navigate = useNavigate();

    const createComment = () => {
        navigate(routesConfig.ideas.replace(":idea", props.idea.id.toString()))
    }

    const registerVote = async () =>{
        props.setLoading(true)
        const state = await voteOnIdea(props.idea.id, notificationSuccess, notificationError)
        props.setLoading(false)
        if (state) {
            props.toLike()
        }
    }

    const notificationError = (title: string, message ?: string) => {
        toast.error(()=> <NotificationError title = {title} msg = {message}/>)
    }
    const notificationSuccess = (msg: string) =>  toast.success(msg)


    return (
        <Box 
            shadow={"0px 3px 10px 0px gray"} 
            bg="gray.200" 
            minW="250"
            maxW="280"
            height={"250"}
            borderRadius="2xl" p={5} w="20%"
            transition="all 0.3s ease"
            _hover={{transform: "translateY(5px)", shadow: "0px 0px 10px 0px gray"}}
        >
        <VStack align="start" spacing={6} width={"100%"}>
            <Badge colorScheme="blue">{props.idea.category}</Badge>
            <Heading size="md" noOfLines={2}> {props.idea.title}</Heading>
            <Text fontSize="sm" color="gray.500">{props.idea.description}</Text>

            <Box display="flex" gap={2} pt={2}>
            <Button onClick={registerVote} isDisabled = {props.idea.liked} _focus={{outline: "none" }} colorScheme="blue" size="sm"> Curtir </Button>
            <Button onClick={createComment} _focus={{outline: "none" }} colorScheme="blue" size="sm" variant="ghost"> Comentar </Button>
            </Box>
        </VStack>
        </Box>
  );
}
