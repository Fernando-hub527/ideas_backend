const apiConfig = import.meta.env.VITE_API_URL;
import type { typeNotification } from "./customTypes";
import type { User } from "./models";
import axios from "axios";

export async function createUser(user: User, error: typeNotification): Promise<User | null>{
    try {
        const response = await axios.post<User>(`${apiConfig}/user/`, {
            email: user.email,  password: user.password, name: user.name
        }, {withCredentials: true,});
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            if(err.status == 409) error("Não foi possível criar sua conta", "Seu usuário já está cadastrado")
            else error("Falha no cadastro autenticação", err.response?.data?.message || "Tente novamente mais tarde")
        } else error("Erro inesperado", "Algo deu errado. Tente novamente.");

        return null;
    }
}

// todo: Add refreshToken routine
export async function loginUser(email: string, password: string, error: typeNotification): Promise<User | null>{
    try {
        const response = await axios.post<User>(`${apiConfig}/user/login`, {
            email,
            password,
        }, {withCredentials: true,});
        return response.data;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            if(err.status == 401) error("Falha na autenticação", "Usuário ou senha inválida")
            else error("Falha na autenticação", err.response?.data?.message || "Erro ao fazer login")
        } else error("Erro inesperado", "Algo deu errado. Tente novamente.");

        return null;
    }
}