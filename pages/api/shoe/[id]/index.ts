
import prisma from '../../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';

const ALLOW_UPDATE_FIELDS = ['type', 'price', 'stock', 'publishedAt']

export default async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    switch(req.method) {
        case 'GET':
            try {
                res.status(200).json(await getBookDetail(req));
            } catch (err:any) {
                console.error(err)
                    res.status(500).json({
                    message: err.message
                });
            }
            break;
        case 'PUT':
            try {
                await updateBookDetail(req, res);
            } catch (err:any) {
                console.error(err)
                    res.status(500).json({
                    message: err.message
                });
            }
            break;
        default:
            res.status(401).json({
                message: `HTTP method ${req.method} is not supported.`
            });
    }
}

async function getBookDetail(req: NextApiRequest) {
    // Get shoeID;
    if (typeof req.query.id !== 'string' && typeof req.query.id !== 'number') {
        throw new Error('Invalid parameter `id`.');
    }
    const shoeId = req.query.id;

    // Get record by unique identifier.
    // Reference: https://www.prisma.io/docs/concepts/components/prisma-client/crud#get-record-by-compound-id-or-compound-unique-identifier
    const book: any = await prisma.shoes.findUnique({
        where: {
            id: shoeId
        }
    });

    // Aggregation.
    // Reference: https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing
    const averageRating = await prisma.rating.aggregate({
        _avg: {
            score: true
        },
        where: {
            shoeId: {
                equals: shoeId
            }
        },
    });
    book.averageRating = averageRating._avg.score;

    return book;
}

async function updateBookDetail(req: NextApiRequest, res: NextApiResponse<any>) {
    // Get shoeID;
    if (typeof req.query.id !== 'string' && typeof req.query.id !== 'number') {
        throw new Error('Invalid parameter `id`.');
    }
    const shoeId = req.query.id;

    if (req.body == null || typeof req.body !== 'object') {
        throw new Error('Invalid parameters.');
    }

    const updateData:any = {};
    for (const [key, value] of Object.entries(req.body)) {
        if (ALLOW_UPDATE_FIELDS.includes(key)) {
            updateData[key] = value;
        }
    }

    const result = await prisma.shoes.update({
        data: updateData,
        where: {
            id: shoeId
        }
    });

    res.status(200).json({
        message: 'success',
        data: result
    });
}