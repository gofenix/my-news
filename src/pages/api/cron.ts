import { getContent, genDigest } from "@/data/ai";
import { UpdData } from "@/data/data";
import { getAll, updateById } from "@/data/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
    run()
    res.status(200).end("hell cron");
}

async function run() {
    const all = await getAll();
    for (let a of all) {
        if (a.digest !== null && a.digest !== '') {
            console.log(`${a.id} digest is ok`)
            continue;
        }
        console.log("start get content...")
        let content = await getContent(a.url);
        if (content === '' || content === null || content === undefined) {
            console.log(`${a.id} + ${a.title} content is empty`)
            continue;
        }
        console.log(`the content length is ${content.length}}`)
        if (content.length > 2000) {
            content = content.slice(0, 2000)
        }

        console.log("start get digest...")
        const digest = await genDigest(content);
        console.log(digest);
        if (digest === '' || digest === null || digest === undefined) {
            console.log(`${a.id} gen digest is empty`)
            continue;
        }

        console.log("start update...")
        const updData = { digest } as UpdData;
        await updateById(a.id!, updData);
        console.log(JSON.stringify({ id: a.id, digest: a.digest }))
    }
}