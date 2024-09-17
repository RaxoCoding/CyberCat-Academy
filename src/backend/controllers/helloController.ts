import { NextApiRequest, NextApiResponse } from 'next'

export const helloController = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Hello from the backend!' })
}