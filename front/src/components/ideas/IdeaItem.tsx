import { HStack, Box, IconButton, Text } from "@chakra-ui/react";
import { FaRegThumbsUp, FaRegComment } from "react-icons/fa";
import type { Idea } from "../../services/models";
import routesConfig from "../../routes/routesConfig";
import { voteOnIdea } from "../../services/ideaService";
import { NotificationError } from "../generics/notify/Notify";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useState } from "react";

export function IdeaItem(props: {contentData: Idea, emitEvent: (event: "toLike", value: unknown) => void}) {
    const navigate = useNavigate();
    const [like, toLike] = useState(props.contentData.liked)

    const createComment = () => {
        navigate(routesConfig.ideas.replace(":idea", props.contentData.id.toString()))
    }

    const registerVote = async () =>{
        const state = await voteOnIdea(props.contentData.id, notificationSuccess, notificationError)
        if (state) {
            toLike(true)
            props.emitEvent("toLike", props.contentData.id)
        }
    }

    const notificationError = (title: string, message ?: string) => {
        toast.error(()=> <NotificationError title = {title} msg = {message}/>)
    }
    const notificationSuccess = (msg: string) =>  toast.success(msg)


  return (
    <HStack
      key={props.contentData.id} w={{ base: "100%", md: "72vw" }} h={{ base: "auto", md: "90px" }} p={4} bg="gray.50"
      borderRadius="lg" justifyContent={{ base: "flex-start", md: "space-between" }} spacing={4}
      alignItems={{ base: "flex-start", md: "center" }} flexDir={{ base: "column", md: "row" }} 
    >
      <HStack align="start" spacing={4} w="full">
        <Box minW="32px" w="32px" h="32px" rounded="full" overflow="hidden" border="2px" borderColor="white" >
          <img
            src={`https://i.pravatar.cc/33?img=${props.contentData.id}`}alt="Avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>

        <Box overflow="hidden" flex={1}>
          <Text noOfLines={1} fontWeight="semibold" fontSize={{ base: "sm", md: "md" }}> {props.contentData.title} </Text>
          <Text noOfLines={1} fontSize={{ base: "xs", md: "sm" }} color="gray.500"> {props.contentData.description} </Text>
        </Box>
      </HStack>

      <HStack spacing={2} pt={{ base: 2, md: 0 }}>
        <IconButton
          isDisabled={like}
          onClick={registerVote}
          icon={<FaRegThumbsUp />}
          aria-label="Curtir"
          size="sm"
          variant="ghost"
        />
        <IconButton
          onClick={createComment}
          icon={<FaRegComment />}
          aria-label="Comentar"
          size="sm"
          variant="ghost"
        />
      </HStack>
    </HStack>
  );
}
