import axios from "axios";

const domain = process.env.NEXT_PUBLIC_DOMAIN

export async function getContent(url: string): Promise<string> {
    const resp = await axios.get(`${domain}/api/text?url=${encodeURIComponent(url)}`)
    return resp.data.content
}

export async function genDigest(content: string) {
    const resp = await axios.post(`${domain}/api/completion`, {
        prompt: content
    })
    return resp.data
}