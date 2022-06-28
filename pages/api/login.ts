import type { NextApiRequest, NextApiResponse } from 'next'
import { DefaultMsgResponse } from '../../types/DefaulMsgResponse';
import { connect } from '../../middlewares/connectMongoDB';
import { UserModel } from '../../models/userModel';

type Body = {
    login: string
    password: string
}

const loginWithSuccess = (res: NextApiResponse<DefaultMsgResponse>) => res.status(200).json({ msg: 'Login success' });
const userOrPasswordInvalid = (res: NextApiResponse<DefaultMsgResponse>) => res.status(400).json({ error: 'Usuario ou senha inválido'});
const invalidMethod = (res: NextApiResponse<DefaultMsgResponse>) => res.status(405).json({ error: 'Metodo informado nao é permitido!' });

const verifyUserAndPassword = async ({ login, password }: Body): boolean => {
    const result = await UserModel.find({ login, password});
    return !!result.length;
}

const loginEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultMsgResponse>
) => {
    if (req.method === 'POST') {
        const { login, password } = req.body;

        return await verifyUserAndPassword({ login, password })
            ? loginWithSuccess(res)
            : userOrPasswordInvalid(res)
    }

    return invalidMethod(res)
}

export default connect(loginEndpoint);
