
import prisma from '../../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from '@prisma/client';

export default async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    if (req.method === 'GET') {
        try {
            res.status(200).json(await getShoeRatings(req));
        } catch (err:any) {
            console.error(err)
            res.status(500).json({
                message: err.message
            })
        }
    } else if (req.method === 'POST') {
        try {
            await addShoeRating(req, res);
        } catch (err:any) {
            console.error(err)
            res.status(500).json({
                message: err.message
            })
        }
    } else if (req.method === 'DELETE') {
        try {
            await removeShoeRating(req, res);
        } catch (err:any) {
            console.error(err)
            res.status(500).json({
                message: err.message
            })
        }
    } else {
        res.status(401).json({
            message: `HTTP method ${req.method} is not supported`
        });
    }
}

async function getShoeRatings(req: NextApiRequest) {
    // Get shoeID;
    if (typeof req.query.id !== 'string' && typeof req.query.id !== 'number') {
        throw new Error('Invalid parameter `id`.');
    }
    const shoeId = req.query.id;

    // Querying with joins. (Many to one relation)
    const ratings: any[] = await prisma.rating.findMany({
        where: {
            shoeId
        },
        include: {
            user: {
                select: {
                    id: true,
                    nickname: true
                }
            }
        }
    });

    // Counting.
    const total = await prisma.rating.count({
        where: {
            shoeId: {
                equals: shoeId
            }
        },
    });

    return {
        content: ratings,
        total: total
    };
}

async function addShoeRating(req: NextApiRequest, res: NextApiResponse<any>) {
    // Get shoeID;
    if (typeof req.query.id !== 'string' && typeof req.query.id !== 'number') {
        throw new Error('Invalid parameter `id`.');
    }
    const shoeId = req.query.id;
    
    // Get Score.
    if (typeof req.body.score !== 'number') {
        throw new Error('Invalid parameter `score`.');
    }
    const score = parseInt(req.body.score);
    if (score < 0 || score > 5) {
        throw new Error('Parameter `score` must between 0 and 5.');
    }

    // Get random user ID.
    const users:any = await prisma.$queryRaw`
        SELECT id FROM users ORDER BY RAND() LIMIT 1;
    `;
    const user = users[0];
    if (user === undefined) {
        throw new Error('Can not find a user by random.');
    }
    console.log(`Get random user ID: ${user.id}.`);
    
    // Insert a new rating record.
    try {
        const resp = await prisma.rating.create({
            data: {
                shoeId: shoeId,
                userId: user.id,
                score: score,
                ratedAt: new Date()
            }
        });
        res.status(200).json({
            message: 'success',
            data: resp
        });
    } catch(err: any) {
        // Error handling.
        //
        // Reference: https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors
        // About P2002: https://www.prisma.io/docs/reference/api-reference/error-reference#p2002
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                res.status(200).json({
                    message: `User <${user.id}> has already rate for shoe <${shoeId}>.`
                });
            }
        } else {
            throw err
        }
    }
}

async function removeShoeRating(req: NextApiRequest, res: NextApiResponse<any>) {
    // Get shoeID;
    if (typeof req.query.id !== 'string' && typeof req.query.id !== 'number') {
        throw new Error('Invalid parameter `id`.');
    }
    const shoeId = req.query.id;
    
    // Get userID;
    if (typeof req.query.userId !== 'string' && typeof req.query.userId !== 'number') {
        throw new Error('Parameter `userId` must be provided.');
    }
    let userId = BigInt(req.query.userId);;

    // Delete a single rating record.
    // 
    // Reference: https://www.prisma.io/docs/concepts/components/prisma-client/crud#delete
    try {
        await prisma.rating.delete({
            where: {
                shoeId_userId: {
                    shoeId: shoeId,
                    userId: userId
                }
            }
        });
        res.status(200).json({
            message: 'success'
        });
    } catch(err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // About P2025: https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
            if (err.code === 'P2025') {
                res.status(200).json({
                    message: `Rating record to delete does not exist.`
                });
            }
        } else {
            throw err
        }
    }
}
