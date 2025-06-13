import {
  Box,
  Flex,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import type { IdeaListingParam } from "../../services/customTypes";

export function SearchBar({listingParam, setListingParam}: {listingParam: IdeaListingParam, setListingParam: (param: IdeaListingParam) => void}) {

  const sendListParam = (ordeyBy: "most_voted" | "latest", title: string) => {
    setListingParam({orderBy: ordeyBy, titleSearch: title})
  }

  return (
    <Flex alignSelf="start" direction={{ base: "column", md: "row" }} justify="space-between"
      align="center" width={{ base: "100%", md: "40%" }} marginTop="10" marginLeft={{ base: 0, md: "200px" }}
      py={4} gap={4}
    >
      <Flex gap={{base: 45, md: 4}} align="end">
        <Box  
          cursor="pointer" fontWeight={listingParam.orderBy === "most_voted" ? "bold" : "normal"}
          color={listingParam.orderBy === "most_voted" ? "black" : "gray.500"}
          borderBottom={listingParam.orderBy === "most_voted" ? "2px solid black" : "none"} pb={1}
          onClick={() => sendListParam("most_voted", listingParam.titleSearch)}
        >
          Mais Votadas
        </Box>
        <Box
          cursor="pointer"  fontWeight={listingParam.orderBy === "latest" ? "bold" : "normal"}
          color={listingParam.orderBy === "latest" ? "black" : "gray.500"}
          borderBottom={listingParam.orderBy === "latest" ? "2px solid black" : "none"} pb={1}
          onClick={() => sendListParam("latest", listingParam.titleSearch)}
        >
          Mais Recentes
        </Box>
      </Flex>
      <Input
        placeholder="Buscar por título"
        maxW={{ base: "70%", md: "300px" }}
        color="gray"
        bg={useColorModeValue("gray.200", "gray.100")}
        borderRadius="xl"
        onChange={(event) => sendListParam(listingParam.orderBy, event.currentTarget.value)}
      />
    </Flex>

  );
}
