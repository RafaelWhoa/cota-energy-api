import crypto from "crypto";

/**
 * Hash the password using crypto.pbkdf2Sync
 * @param password to be hashed
 * @returns {string} hashed password
 */
export const hashPassword = (password) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return [salt, hash].join("$");
}

/**
 * Verify the password using crypto.pbkdf2Sync
 * @param password to be verified
 * @param combined - salt and hash combined
 * @returns {boolean} true if password is verified, false otherwise
 */
export const verifyPassword = (password, combined) => {
    const [salt, originalHash] = combined.split("$");
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hash === originalHash;
}