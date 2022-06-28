import type { NextApiRequest, NextApiResponse } from 'next'
import { DefaultMsgResponse } from '../../types/DefaulMsgResponse';
import { UserModel } from '../../models/userModel';
import { connect } from '../../middlewares/connectMongoDB';

interface BodyPayload {
    name: string,
    email: string,
    password:string
}

const invalidMethod = (res: NextApiResponse) => res.status(405).json({ error: 'Metodo informado nao é permitido!' });

const validateName = (name: string) => !name || name.trim().length < 2;
const validateEmail = (email: string) => !email || email.trim().length < 5 || !email.includes('@') || !email.includes('.');
const validatePassword = (password: string) => !password || password.trim().length < 6;

const validateBody = ({ name, email, password}: BodyPayload): string => {
    if (validateName(name)) {
       return 'Nome não é válido'
    }

    if (validateEmail(email)) {
        return 'Email não é válido'
    }

    if (validatePassword(password)) {
        return 'Senha deve ter pelo menos 6 caracteres'
    }

    return '';
}

const registerEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse<DefaultMsgResponse>
) => {
    try {

        if (req.method === 'POST') {
            const { name, email, password }: BodyPayload = req.body;

            const errorMessage = validateBody({ name, email, password });

            if (errorMessage) {
                return res.status(400).json({ error: errorMessage })
            }

            const user = { name, email, password }
            await UserModel.create(user)
            return res.status(200).json({ msg: 'Usuario criado com sucesso!'})
        }
        
        return invalidMethod(res);
    } catch(e) {
        console.error('Error on create user:', e);
        res.status(500).json({ error: 'Não foi possivel cadastrar usuário, entre em contato com o administrador do sistema' })
    }
}

export default connect(registerEndpoint);
