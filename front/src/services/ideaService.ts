import axios from "axios"
import type { IdeaListingParam, typeNotification } from "./customTypes"
import type { Comment, Idea, NewComment, NewIdea, Pagination } from "./models"
const apiConfig = import.meta.env.VITE_API_URL;


export async function loadHighlightIdeas(error: typeNotification){
    try {
        const response = await axios.get<Idea[]>(`${apiConfig}/idea/highligh`, {withCredentials: true});
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            error("Não foi possível listar ideias em destaque", "Tente novamente mais tarde")
        } else error("Erro inesperado", "Algo deu errado. Tente novamente.");
        return [];
    }
}

export async function createIdea(idea: NewIdea, error: typeNotification){
    try {
        const response = await axios.post<Idea>(`${apiConfig}/idea`, idea, {withCredentials: true});
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            error("Não foi possível criar ideias", "Tente novamente mais tarde")
        } else error("Erro inesperado", "Algo deu errado. Tente novamente.");
        return null;
    }
}

export async function voteOnIdea(ideaId: number, notificationSuccess: typeNotification, error: typeNotification): Promise<boolean>{
    try {
        await axios.post<Idea>(`${apiConfig}/idea/vote`, {ideaId: ideaId}, {withCredentials: true});
        notificationSuccess("Se voto foi registrado !")
        return true;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            if(err.status == 409) {error("Ops..", "Você já votou nessa ideia"); return true}
            else error("Não foi possível registrar seu voto", "Tente novamente mais tarde")
        } else error("Erro inesperado", "Algo deu errado. Tente novamente.");

        return false;
    }
}

export async function loadIdeas(error: typeNotification, page: number, params: IdeaListingParam): Promise<Pagination<Idea> | null>{
    try {
        let url = `${apiConfig}/idea?orderBy=${params.orderBy}&page=${page}&limit=50`
        if(params.titleSearch) url = url.concat(`&title=${params.titleSearch}`)
        const ideas = await axios.get<Pagination<Idea>>(url, {withCredentials: true});
        return ideas.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            error("Não foi possível listar ideias", "Tente novamente mais tarde")
        } else error("Erro inesperado", "Algo deu errado. Tente novamente.");

        return null;
    }
}


export async function createComment(comment: NewComment, success: typeNotification, error: typeNotification): Promise<Comment | null>{
    try {
        const response = await axios.post<Comment>(`${apiConfig}/idea/comment`, comment, {withCredentials: true});
        success("Seu comentário foi registrado")
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            error("Não foi possível criar ideias", "Tente novamente mais tarde")
        } else error("Erro inesperado", "Algo deu errado. Tente novamente.");
        return null;
    }
}


export async function findIdea(ideaId: number, error: typeNotification){
    try {
        const response = await axios.get<Idea>(`${apiConfig}/idea/${ideaId}`, {withCredentials: true});
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            error("Não foi possível encontrar ideia", "Tente novamente mais tarde")
        } else error("Erro inesperado", "Algo deu errado. Tente novamente.");
        return null;
    }
}

export async function loadComments(error: typeNotification, page: number, ideaId: number): Promise<Pagination<Comment> | null>{
    try {
        const comments = await axios.get<Pagination<Comment>>(`${apiConfig}/idea/comments/${ideaId}?page=${page}&limit=50`, {withCredentials: true});
        return comments.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            error("Não foi possível listar comentários", "Tente novamente mais tarde")
        } else error("Erro inesperado", "Algo deu errado. Tente novamente.");

        return null;
    }
}