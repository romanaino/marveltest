const _URL = "https://gateway.marvel.com/v1/public/"
const _PUBLIC_KEY = "8975df8fe056f6bf56cf6042e2ce0c3d"
const _PRIVAT_KEY = "bd1a774eb3c188a4033ee81945b660e9268e205e"
const _TS = Date.now().toString()
const _HASH = CryptoJS.MD5(_TS + _PRIVAT_KEY + _PUBLIC_KEY).toString()
const _OPTION = `?ts=${_TS}&apikey=${_PUBLIC_KEY}&hash=${_HASH}`

export { _URL, _OPTION }

