import { getContent, genDigest } from "@/data/ai";
import { UpdData } from "@/data/data";
import { getAll, updateById } from "@/data/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
    const all = await getAll();
    let data = []
    for (let a of all) {
        if (a.digest !== null && a.digest !== '') {
            console.log(`${a.id} + ${a.title} digest is blank`)
            continue;
        }
        const content = await getContent(a.url);
        if (content === '' || content === null || content === undefined) {
            console.log(`${a.id} + ${a.title} content is blank`)
            continue;
        }
        const digest = await genDigest(content);
        console.log(digest);
        if (digest === '' || digest === null || digest === undefined) {
            console.log(`${a.id} + ${a.title} gen digest is blank`)
            continue;
        }
        const updData = { digest } as UpdData;
        await updateById(a.id!, updData);
        data.push({ id: a.id, digest: a.digest })
    }
    res.status(200).end(JSON.stringify(data));
}