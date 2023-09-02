import axios from "axios";

export async function getContent(url: string): Promise<string> {
    const resp = await axios.get(`/api/text?url=${encodeURIComponent(url)}`)
    return resp.data.content
}

export async function genDigest(content: string) {
    const resp = await axios.post("/api/completion", {
        prompt: content
    })
    return resp.data
}