import { IUser } from '../Model/User'
import jwt from 'jsonwebtoken'
export const getTokens = (user: IUser) => {
  const accessToken = jwt.sign({userId:user.id,count:user.count},`process.env.SECRET_KEY`,{expiresIn:"15min"})
  const refreshToken = jwt.sign({ userId: user.id,count:user.count }, `process.env.SECRET_KEY`, { expiresIn: "7d", })
  return {
    accessToken,
    refreshToken
  }
}