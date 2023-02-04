// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { pool } from 'config/db'
import { serialize } from 'cookie'
import { sign } from 'jsonwebtoken'

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const { id, pass } = req.body

    const [[[resp]]] = await pool.query('call SP_validacion_usuario (?,?)', [id, pass])

    if (resp) {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          resp
        },
        'Secreto'
      )

      const serialized = serialize('LoginToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: '/'
      })

      res.setHeader('Set-Cookie', serialized)

      return res.status(200).send(true)
    } else {
      return res.status(200).send(false)
    }
  } else {
    return res.status(405).end()
  }
}
