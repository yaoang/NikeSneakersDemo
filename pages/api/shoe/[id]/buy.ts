import prisma from '../../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  if (req.method === 'POST') {
    try {
        const result = await buyShoe(req);
        res.status(result.status).json({
            message: result.message,
            data: result
        });
    } catch (err:any) {
      console.error(err)
      res.status(500).json({
        message: err.message
      })
    }
  } else {
    res.status(401).json({
      message: `HTTP method ${req.method} is not supported.`
    });
  }
}

async function buyShoe(req:NextApiRequest): Promise<any> {
    // Get shoeID;
    if (typeof req.query.id !== 'string' && typeof req.query.id !== 'number') {
        throw new Error('Invalid parameter `id`.');
    }
    const shoeId = req.query.id;

    // Get quality;
    if (typeof req.query.quality !== 'string' && typeof req.query.quality !== 'number') {
        throw new Error('Invalid parameter `num`.');
    }
    const quality = Math.floor(Number(req.query.quality));
    if (quality <= 0) {
        throw new Error('Parameter `quality` must greater than zero.');
    }

    // TODO: get user ID from context.
    if (typeof req.query.userId !== 'string' && typeof req.query.userId !== 'number') {
        throw new Error('Invalid parameter `userId`.');
    }
    const userId = BigInt(req.query.userId);

    try {
        const result = await prisma.$transaction(async prisma => {
            // Found the shoe that the user want to purchase.
            const shoe = await prisma.shoes.findFirst({
                where: {
                    id: shoeId
                },    
            });

            if (shoe === undefined || shoe === null) {
                throw new Error(`Can not found the shoe <${shoeId}> that you want to buy.`);
            }

            // Check if has enough shoes for the user purchase.
            const stock = shoe.stock;
            if (quality > stock) {
                throw new Error(`Didn't have enough stock of shoes <${shoeId}> for your purchase.`);
            }

            // Cost the user balance to buy the book.
            const cost = shoe?.price.mul(quality).toNumber();
            const purchaser = await prisma.user.update({
                data: {
                    balance: {
                        decrement: cost,
                    },
                },
                where: {
                    id: userId,
                },
            });
            if (purchaser.balance.lt(0)) {
                throw new Error(`User <${userId}> doesn't have enough money to buy shoe <${shoeId}>, which need to cost ${cost}.`)
            }

            // Update the shoe stock.
            const newShoe = await prisma.shoes.update({
                data: {
                    stock: {
                        decrement: 1,
                    }
                },
                where: {
                    id: shoeId
                }
            });
            if (newShoe.stock < 0) {
                throw new Error(`The shoe ${newShoe.stock} is out of stock.`);
            }

            // Generate a new order to record.
            const order = prisma.order.create({
                data: {
                    userId: userId,
                    shoeId: shoeId,
                    quality: quality
                }
            })

            return {
                userId: userId,
                shoeID: shoeId,
                shoeTitle: shoe.title,
                cost: cost,
                remaining: purchaser.balance,
                orderId: order
            };
        });
        return {
            status: 200,
            message: `User <${userId}> buy ${quality} shoes <${shoeId}> successfully, cost: ${result.cost}, remain: ${result.remaining} .`,
            data: result
        };
    } catch(err: any) {
        console.error(err);
        return {
            status: 500,
            message: `Failed to buy shoe ${shoeId} for user ${userId}: ${err.message}`
        };
    }
}