import crypto from "crypto";

export const hashPassword = (password) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return [salt, hash].join("$");
}

export const verifyPassword = (password, combined) => {
    const [salt, originalHash] = combined.split("$");
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hash === originalHash;
}