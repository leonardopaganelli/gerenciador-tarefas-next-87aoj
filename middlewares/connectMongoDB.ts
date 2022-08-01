
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import { DefaultResponseMsg } from '../types/DefaultResponseMsg';

export const connect = (handler: NextApiHandler) => async (
    req: NextApiRequest,
    res: NextApiResponse<DefaultResponseMsg>
    ) => {
        console.log('MongoDB readyState', mongoose.connections[0].readyState);
        if (mongoose.connections[0].readyState) {
            return handler(req, res)
        }
        const {DB_CONNECTION_STRING} = process.env;
        if(!DB_CONNECTION_STRING){
            return res.status(500).json({ error : "ENV Database connection não informada"});
        }
    
        mongoose.connection.on('connected', ()=> console.log('Conectado no banco de dados'))
        mongoose.connection.on('error', err => console.log('Erro ao conectar no banco de dados',err))

        await mongoose.connect(DB_CONNECTION_STRING);
        return handler(req, res);
    }
