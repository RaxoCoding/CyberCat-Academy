import { NextApiRequest, NextApiResponse } from 'next'
import { helloController } from '@/backend/controllers/helloController'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return helloController(req, res)
  }
  res.status(405).json({ message: 'Method not allowed' })
}