
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse, NextApiHandler} from 'next';

export const connect = (handler: NextApiHandler) => async (
    req: NextApiRequest,
    res: NextApiResponse
    ) => {
        console.log('MongoDB readyState', mongoose.connections[0].readyState);
        if (mongoose.connections[0].readyState) {
            return handler(req, res)
        }

        const DB_CONNECTION_STRING = 'mongodb://localhost:27017/87aoj-gerenciador-tarefas';
        mongoose.connection.on('connected', ()=> console.log('Conectado no banco de dados'))
        mongoose.connection.on('error', err => console.log('Erro ao conectar no banco de dados',err))

        await mongoose.connect(DB_CONNECTION_STRING);
        return handler(req, res);
    }
