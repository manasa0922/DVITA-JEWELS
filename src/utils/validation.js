export const isEmail = (v) => /^\S+@\S+\.\S+$/.test(v.trim())
export const isPhone = (v) => /^[+]?[\d\s-]{10,14}$/.test(v.trim())
export const isPin = (v) => /^\d{6}$/.test(v.trim())
