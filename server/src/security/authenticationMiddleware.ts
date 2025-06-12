import { NextFunction, Request, Response } from 'express'
import { ResultsWrapper } from '../utils/ResultsWrapper';
import { ErrorUnauthenticatedUser } from '../error/ErrorUnauthenticatedUser';
import jwt, { Algorithm } from 'jsonwebtoken';
import { ErrorInvalidCredentials } from '../error/ErrorInvalidCredentials';


interface TokenPayload {
  data: {userId: string}
  exp: number
}


export async function symmetricAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    const userOrError = await checkJwt(process.env.JWT_SECRET!, undefined, req.cookies.authToken)
    
    if (userOrError.isSucess) {
        req.userId =  userOrError.getValue()
        next()
    } else res.status(userOrError.getError().statusCode).send(userOrError.getError())
}

async function checkJwt(privateKey: string | Buffer, algorithm?: { algorithms: Algorithm[] }, token?: string): Promise<ResultsWrapper<string>> {
    if (!token) return ResultsWrapper.fail(new ErrorUnauthenticatedUser('Token not provided'))
    const [scheme, jwtToken] = token.split(' ');
    if (scheme !== 'Bearer' || !jwtToken) return ResultsWrapper.fail(new ErrorUnauthenticatedUser('Invalid token format'))

    try {
        const payload = jwt.verify(jwtToken, privateKey, algorithm) as TokenPayload
        if (!payload.data.userId) return ResultsWrapper.fail(new ErrorInvalidCredentials())
        
        return ResultsWrapper.ok(payload.data.userId)
    } catch (error) {
        return ResultsWrapper.fail(new ErrorUnauthenticatedUser("Invalid token"))
    }
}
