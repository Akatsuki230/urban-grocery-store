import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username, items } = JSON.parse(req.body);
    // instead of printing 16x {index}. Fermented Barrel, we can print 1x Fermented Barrels 16x

    const items1: {[key: string]: number} = {}
    for (const item of items) {
        if (items1[item]) {
            items1[item] += 1
        } else {
            items1[item] = 1
        }
    }

    let message = `User order from "${username}":\n`;
    for (const item in items1) {
        message += `\t${items1[item]}x ${item}\n`
    }
    const webhook = process.env.DISCORD_WEBHOOK_URL as string;
    fetch(webhook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: message
        })
    })
    res.status(200).json({ message: 'Order sent!' })
}