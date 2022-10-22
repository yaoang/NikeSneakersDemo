import { NextApiRequest, NextApiResponse } from 'next';
import { ShoeType } from '@prisma/client';

const shoeTypes = Object.values(ShoeType);

export default async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    if (req.method === 'GET') {
        res.status(200).json(shoeTypes);
    } else {
        res.status(401).json({
            message: `HTTP method ${req.method} is not supported.`
        });
    }
}
