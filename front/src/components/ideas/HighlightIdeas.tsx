import { useEffect, useState } from "react"
import { CardIdea } from "./CardIdea"
import { Box, Heading, HStack } from "@chakra-ui/react"
import { loadHighlightIdeas } from "../../services/ideaService"
import toast from "react-hot-toast"
import { NotificationError } from "../generics/notify/Notify"
import type { Idea } from "../../services/models";

export function HighlightIdeas(props: {setLoading: (loading: boolean) => void}){
    const [highlight, setHighlight] = useState(new Array<Idea>())

    useEffect(() => {
        async function loadData(){
            const ideas = await loadHighlightIdeas(notificationError)
            setHighlight(ideas)
        }
        loadData()
    }, [])

  
    const setLiked = (ideaId: number) => {
        setHighlight((ideas) => {
            ideas = ideas.map(idea => {
            if (idea.id == ideaId) idea.liked = true
                    return idea
            })
            return ideas
        })
    }
    const notificationError = (title: string, message ?: string) => {
        toast.error(()=> <NotificationError title = {title} msg = {message}/>)
    }

    const cardsHighlight = highlight.map((idea) => {
        return <CardIdea key={idea.id} setLoading = {props.setLoading} idea = {idea} toLike = {() => setLiked(idea.id)} />
    })

    return (
        <Box w={{ base: "full", md: "fit-content" }} px={{ base: 4, md: 8 }} >
            <Heading fontWeight="extrabold" fontSize={{ base: "lg", md: "2xl" }} color="blue.500" mb={4}>
                Ideias em Destaque
            </Heading>

            <Box overflowX="auto" py={2}
                css={{"&::-webkit-scrollbar": {height: "0px"}, scrollbarWidth: "none", }}
            >
                <HStack spacing={{ base: 4, md: 6, lg: 10 }} paddingLeft={5}  minW="max-content">
                    {cardsHighlight}
                </HStack>
            </Box>
        </Box>
    );
}