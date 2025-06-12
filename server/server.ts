import "./tracing"
import "./types/index"
import { AplicationManager } from './startApp/appStart'

const application = new AplicationManager()
application.start(3034)
    .then(() => console.log("APlicação disponível na porta 3034"))
    .catch((err) => console.log(`Não foi possível iniciar a aplicação: \n${err}`))


