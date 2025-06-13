import { Link, useNavigate } from "react-router";
import routes from "../../routes/routesConfig";
import { DefaultModal } from "./Modal";
import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import { FormIdea } from "../ideas/FormIdea";
import { createCookie } from "../../utils/cookies";

export function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();

    const handleLogout = () => {
        createCookie("user", "", -10)
        navigate(routes.login);
    };

    return (
        <>
            <header
                style={{ boxShadow: "0px 1px 5px 0px gray" }}
                className="z-1 w-full fixed left-0 top-0 bg-white px-4 py-2 flex justify-between">
                <div className="flex items-center gap-6">
                <span className="font-bold text-gray-700">Ideias</span>
                <nav className="flex gap-4 text-sm text-gray-700">
                    <Link className="hover:text-black" to={routes.home}>Feed</Link>
                </nav>
                </div>

                <div className="flex items-center gap-4">
                <Button rounded="2xl" bg="blue.600" color="white" height="9" fontSize="16" transition="all 0.5s"
                    borderRadius="md" fontWeight="medium"  _focus={{outline: "none" }} _hover={{ bg: "blue.700" }}
                    onClick={onOpen}>
                    Nova Ideia
                </Button>

                <Menu>
                    <MenuButton _focus={{outline: "none" }}>
                        <Avatar size="sm" src="https://i.pravatar.cc/32"/>
                    </MenuButton>
                    <MenuList>
                        <MenuItem  onClick={handleLogout}>Sair</MenuItem>
                    </MenuList>
                </Menu>
                </div>
            </header>
            <DefaultModal isOpen = {isOpen} onClose={onClose} title="Compartilhe sua ideia">
                <FormIdea onClose={onClose}/>    
            </DefaultModal> 
        </>
    );
}
