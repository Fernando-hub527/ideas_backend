import { useParams } from "react-router";
import { DetailsIdea } from "../components/ideas/DetailsIdea";
import { CommentItem } from "../components/ideas/Comment";
import type { Comment as CommentType, Idea as IdeaType, Pagination } from "../services/models";
import { useEffect, useRef, useState } from "react";
import { createComment, findIdea, loadComments } from "../services/ideaService";
import toast from "react-hot-toast";
import { NotificationError } from "../components/generics/notify/Notify";
import { Box, Button, Heading, Spinner, Textarea } from "@chakra-ui/react";
import { InfiniteScroll } from "../components/generics/InfiniteScroll";

export function Idea(){
    const param = useParams()
    const [idea, setIdea] = useState<IdeaType>()
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [comments, setComments] = useState<Pagination<CommentType>>({currentPage: 0, totalPages: 0, itemsPerPage: 0, totalItems: 0, data: []})
    const commentInput = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        async function loadIdea(){
            const ideaId = param["idea"]
            if(!ideaId) return notificationError("Não foi possível localizar ideia", "tente novamente mais tarde")
            setLoading(true)
            const response = await findIdea(Number(ideaId), notificationError)
            setLoading(false)
            if (!response) return 
            setIdea(response)
        }
        loadIdea()  
    }, [param])
 
    useEffect(() => {
        const loadData = async () => {
            loadComments(()=>{}, page, Number(param["idea"]))
                .then((response) => {
                    if (!response) return
                    setComments((comments) => {
                        response.data = [...comments.data, ...response.data]
                        return response
                    })
                })
                .catch(() => notificationError("Não foi possível carregar mais ideias", "tente novamente mais tarde"))
        };
        loadData();
    }, [page]);

    const notificationError = (title: string, message ?: string) => {
        toast.error(()=> <NotificationError title = {title} msg = {message}/>)
    }
    const notifySuccess = (msg: string) =>  toast.success(msg)

    const sendComment = async () => {
        if (! commentInput || !commentInput.current || !commentInput.current.value) return
        const comment = await createComment({comment: commentInput.current.value, ideaId: Number(param["idea"])}, notifySuccess, notificationError)
        commentInput.current.value = ""
        if (!comment) return
        setComments((coments) => {
            coments.data.unshift(comment)
            return {...coments} 
        })
    }

    return (
        <>
            {loading && (
                <Box
                    position="fixed" top={0} w="100vw" h="100vh" bg="rgba(255, 255, 255, 0.0)"  zIndex={9999}
                    display="flex" alignItems="center" justifyContent="center">
                <Spinner size="xl" color="blue.500" />
                </Box>
            )}     
            {idea && <DetailsIdea idea={idea}/>}
            <Box maxW="3xl" mx="auto" p={4} mt={"10"}>
                <Heading size="md" mb={4}> Comentários </Heading>
                <Textarea ref={commentInput} maxLength={500} name="description" placeholder="Digite a descrição" borderColor={"blackAlpha.300"}/>
                <Button onClick={sendComment} size={"sm"} fontSize="12" colorScheme='blue' mt={2} fontWeight={"normal"} type="submit"> Enviar </Button>
            </Box>
            

            <InfiniteScroll<CommentType> setPage={setPage} content={comments} ScrolledComponent = {CommentItem} emitEvent={()=>{}}/>
        </>
    )
}