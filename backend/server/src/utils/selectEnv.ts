export type typeEnv = "prod" | "development" | "test"

/**
 * @description Função responsável por encontrar o arquivo env de acordo com o parâmetro enviado
 * @param ambiente Uma string que define em qual ambiente a aplicação irá rodar 
 * @returns Uma string com o caminho do arquivo env adequado ao ambiente atual
 */
export function selectEnv (ambiente: typeEnv) {
  if (ambiente === 'prod') return 'prod'
  else if (ambiente === 'development') return './server/env/dev/.env'
  else if (ambiente === 'test') return './server/env/test/.env'
}