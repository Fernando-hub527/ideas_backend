import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Link,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import { NotificationError } from '../components/generics/notify/Notify';
import { loginUser } from '../services/userService';
import { createCookie } from '../utils/cookies';
import routesConfig from '../routes/routesConfig';
import { useNavigate } from 'react-router';
import { DescriptionAnimation } from '../components/login/DescriptionAnimation';

export function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const nav = useNavigate()

    const validUser = () => {
        const err = { email: "", password: "" }
        if (!email) err.email = 'Email é obrigatório';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = 'Email inválido';
        
        if (!password)  err.password = 'Senha é obrigatória';
        else if (password.length < 6)  err.password = 'Mínimo de 6 caracteres';
        
        setErrors(err);
        return !err.email && !err.password;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validCredentials = validUser()
        if(!validCredentials) return

        const response = await loginUser(email, password, notifyError)
        if(!response) return

        createCookie("user", response.name, 1)
        nav(routesConfig.home)
    };

    const notifyError = (title: string, message ?: string) => {
        toast.error(()=> <NotificationError title = {title} msg = {message}/>)
    }
    return (
    
        <Flex minH="100vh" minW={{base: "100vw", md: "full"}} alignItems={{base: 'center', md: "normal"}} 
            justifyContent={{base: 'center', md: "normal"}} direction={{ base: 'column', md: 'row' }} position="relative">
            <Toaster />
            <DescriptionAnimation />

            <Box
                zIndex={10} maxW="md" w="full" bg="gray.100" p={6} borderRadius="3xl" boxShadow="lg" flex={1} 
                position={{ base: 'relative', md: 'fixed' }}  top={{ base: '0', md: '15vh' }} right={{ base: '0', md: '15vw' }}
                mx={{ base: 4, md: 0 }} mt={{ base: 8, md: 0 }} maxH={"max-content"} as='form' onSubmit={handleSubmit}
            >
            <Stack spacing={4}>
                <Heading fontSize="3xl" textAlign="center">Entrar</Heading>
                <FormControl id="email" isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                        <Input type="email" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <InputRightElement> <Icon as={FaUser} color="gray.400" /> </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

            <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel>Senha</FormLabel>
                <InputGroup> 
                    <Input type="password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button type='submit' colorScheme="blue" w="full">Fazer login</Button>
            <Text textAlign="center" fontSize="sm" color="gray.500">OU</Text>
            <Button isDisabled variant="outline" w="full">Entrar com outros</Button>
            <Text textAlign="center" fontSize="sm">
                Não tem uma conta? <Link onClick={() => nav(routesConfig.register)} color="blue.500">Cadastre-se</Link>
            </Text>
            </Stack>
        </Box>
        </Flex>
    );
}