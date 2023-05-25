import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username, items } = JSON.parse(req.body);
    let message = `User order from "${username}":\n`;
    for (const item in items) {
        message += `\t${item + 1}: ${items[item]}\n`
    }
    const webhook = 'https://discord.com/api/webhooks/1111284665198837874/6pngT1eND80PkNOpIkR8dveDwsGoraBkQHWmrPQZHeWe1qkpwdS0GiCdH3u-AQ30O0Wl'
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