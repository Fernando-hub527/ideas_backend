import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HighlightIdeas } from "../components/ideas/HighlightIdeas";
import { SearchBar } from "../components/generics/SearchBar";
import { InfiniteScroll } from "../components/generics/InfiniteScroll";
import type { Idea, Pagination } from "../services/models";
import { loadIdeas } from "../services/ideaService";
import toast from "react-hot-toast";
import { NotificationError } from "../components/generics/notify/Notify";
import { IdeaItem } from "../components/ideas/IdeaItem";
import type { IdeaListingParam } from "../services/customTypes";

export function IdeasFeed() {
    const [loading, setLoading] = useState(false);
    const [listingParam, setListingParam] = useState<IdeaListingParam>({orderBy: "latest", titleSearch: ""})
    const [ideas, setIdeas] = useState<Pagination<Idea>>({currentPage: 0, totalPages: 0, itemsPerPage: 0, totalItems: 0, data: []});
    const [page, setPage] = useState(1);
        
    useEffect(() => {
        const loadData = async () => {
            loadIdeas(()=>{}, page, listingParam)
                .then((response) => {
                    if (!response) return
                    setIdeas((ideas) => {
                        response.data = [...ideas.data, ...response.data]
                        return response
                    })
                })
                .catch(() => notificationError("Não foi possível carregar mais ideias", "tente novamente mais tarde"))
        };
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            loadIdeas(()=>{}, 1, listingParam)
                .then((response) => setIdeas((response || ideas)))
                .catch(() => notificationError("Não foi possível carregar mais ideias", "tente novamente mais tarde"))
                .finally(() => setLoading(false))
            
        };
        loadData();
    }, [listingParam])

    const notificationError = (title: string, message?: string) => {
        toast.error(() => <NotificationError title={title} msg={message} />);
    };

    const setLiked = (ideaId: number) => {
        setIdeas((ideas) => {
            ideas.data = ideas.data.map(idea => {
                if (idea.id == ideaId) idea.liked = true
                return idea
            })
            return ideas
        })
    }

    const receiveEvent = (event: string, value: unknown) => {
        if(event == "toLike"){
            if(typeof value != "number") return
            setLiked(value)
        }
    }
  

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
        {loading && (
            <Box
                position="fixed" top={0} w="100vw" h="100vh" bg="rgba(255, 255, 255, 0.0)"  zIndex={9999}
                display="flex" alignItems="center" justifyContent="center"
            >
            <Spinner size="xl" color="blue.500" />
            </Box>
        )}

        <HighlightIdeas setLoading={setLoading} />

        <SearchBar listingParam = {listingParam} setListingParam = {(param: IdeaListingParam) => setListingParam(param)}/>
        <InfiniteScroll<Idea> setPage={setPage} content={ideas} ScrolledComponent = {IdeaItem} emitEvent={receiveEvent}/>
        </div>
    );
}
