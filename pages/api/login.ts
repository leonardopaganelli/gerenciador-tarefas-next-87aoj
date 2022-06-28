import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  msg?: string
  error?: string
}

type Body = {
    login: string
    password: string
}

const loginWithSuccess = (res: NextApiResponse<Data>) => res.status(200).json({ msg: 'Login success' });
const userOrPasswordInvalid = (res: NextApiResponse<Data>) => res.status(400).json({ error: 'Usuario ou senha inválido'});
const invalidMethod = (res: NextApiResponse<Data>) => res.status(405).json({ error: 'Metodo informado nao é permitido!' });

const verifyUserAndPassword = ({ login, password }: Body) => login === "leonardo.paganelli@outlook.com" && password === "123"

export default (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
    if (req.method === 'POST') {
        const { login, password } = req.body;

        return verifyUserAndPassword({ login, password })
            ? loginWithSuccess(res)
            : userOrPasswordInvalid(res)
    }

    return invalidMethod(res)
}
