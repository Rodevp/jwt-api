import crypto from "crypto"


const SECRET: string = process.env.shh

export const ramdonCryp = () => crypto.randomBytes(128).toString("base64")

export const auth = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/'))
                 .update(SECRET)
                 .digest("hex")
}