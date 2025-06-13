import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Stack,
  Text,
  Link,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { NotificationError } from '../components/generics/notify/Notify';
import { createUser } from '../services/userService';
import routesConfig from '../routes/routesConfig';
import { useNavigate } from 'react-router';
import { DescriptionAnimation } from '../components/login/DescriptionAnimation';

export function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', name: '' });
    const nav = useNavigate()

    const validUser = () => {
        const err = { email: "", password: "", name: "" }
        
        if (!name) err.name = 'Nome é obrigatória';
        else if (name.length > 60)  err.name = 'Máximo de 60 caracteres';

        if (!email) err.email = 'Email é obrigatório';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.email = 'Email inválido';
        
        if (!password)  err.password = 'Senha é obrigatória';
        else if (password.length < 6)  err.password = 'Mínimo de 6 caracteres';
        
        setErrors(err);
        return !err.email && !err.password && !err.name;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validCredentials = validUser()
        if(!validCredentials) return

        const response = await createUser({name: name, password: password, email: email}, notifyError)
        if(!response) return

        toast.success("Sua conta foi criada")
        nav(routesConfig.login)
    };

    const notifyError = (title: string, message ?: string) => {
        toast.error(()=> <NotificationError title = {title} msg = {message}/>)
    }

    return (
        <Flex minH="100vh" minW={{base: "100vw", md: "full"}} alignItems={{base: 'center', md: "normal"}} 
            justifyContent={{base: 'center', md: "normal"}} direction={{ base: 'column', md: 'row' }} position="relative">
            <Toaster />
            <DescriptionAnimation />


            <Stack spacing={4}
                zIndex={10} maxW="md" w="full" bg="gray.100" p={6} borderRadius="3xl" boxShadow="lg" flex={1} 
                position={{ base: 'relative', md: 'fixed' }}  top={{ base: '0', md: '15vh' }} right={{ base: '0', md: '15vw' }}
                mx={{ base: 4, md: 0 }} mt={{ base: 8, md: -10 }} maxH={"mdax-content"} as='form' onSubmit={handleSubmit}>
                <Heading fontSize="3xl" textAlign="center">Crie sua conta</Heading>

                <FormControl id="name" isInvalid={!!errors.name}>
                    <FormLabel>Nome</FormLabel>
                    <InputGroup> 
                        <Input type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)}/>
                    </InputGroup>
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl id="email" isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                        <Input type="email" placeholder="Seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
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

                <Button type='submit' colorScheme="blue" w="full">Registre-se</Button>
                <Text textAlign="center" fontSize="sm" color="gray.500">OU</Text>
                <Button isDisabled variant="outline" w="full">Cadastra-se com outros</Button>
                <Text textAlign="center" fontSize="sm">
                    Já tem uma conta? <Link onClick={() => nav(routesConfig.login)} color="blue.500">Faça login</Link>
                </Text>
            </Stack>
        </Flex>
    );
}