import { createRoot } from 'react-dom/client'
import routes from "./routes/routes.tsx"
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'

import {
  RouterProvider,
} from "react-router";

createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <RouterProvider router={routes}/>
  </ChakraProvider>
)
