import { Box, Heading, Text } from "@chakra-ui/react";

export function DescriptionAnimation(){
    return(
        <>
            <Box
                flex={1} bgGradient="linear(to-br, blue.500, blue.900)" borderRadius={{ base: '0', md: '0vw 0vw 2000px 0vw' }}
                height={{ base: 'auto', md: '85vh', lg: '85vh' }}  width={{ base: '100%', md: '80vh', lg: '90vh'}}
                display={{base:"none", md: "flex"}} alignItems="flex-start" justifyContent="center"
                color="white" pt={10} zIndex={1} transition="all 0.3s ease"
            >
                <Box maxW={{ base: '90%', md: '30vw' }} mt={{ base: 0, md: '2vh', lg: '7vh' }} ml={{ base: 0, md: '-18vw', lg: '-10%' }}>
                    <Heading fontSize="5xl" mb={4}>App Ideas</Heading>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>Registre sua ideia</Text>
                    <Text fontSize="sm" textAlign={'justify'}>
                        Um aplicativo para você registrar suas ideias, permite curtir outras ideias e comentar ideias relevantes
                    </Text>
                </Box>
            </Box>
            <Box
                display={{ base: 'none', md: 'block' }} position="absolute" mt={{ md: '45vh', lg: '48vh' }}
                ml={{ md: '49vh', lg: '50vh' }} bgGradient="linear(to-br, blue.400, blue.800)"
                borderRadius="full" height={{ base: '0', md: '28vh', lg: '36vh' }}
                width={{ base: '0', md: '28vh', lg: '36vh' }} zIndex={2} transition="all 0.3s ease"
            />
            <Box
                display={{ base: 'none', md: 'block' }} position="absolute" bottom="0" left="0" 
                height={{ base: '0', md: '28vh', lg: '36vh' }} width={{ base: '0', md: '27vh', lg: '35vh' }}
                bgGradient="linear(to-br, blue.300, blue.900)" borderRadius="0vw 2000px 0vw 0vw" zIndex={2} transition="all 0.3s ease"
            />
        </>
    )
}