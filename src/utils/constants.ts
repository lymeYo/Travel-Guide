export const API_KEY_IMAGES = '563492ad6f9170000100000116a275e462d64379a3003cced42cfdfd'
export const API_KEY_SPOTT =  '7b359d26a5msh76037d79133e7fcp11e7d6jsnbfc90c5e1d5d'
export const API_TOKEN_HOTELS =  '9e6e33b030dbd7711e2eb9b87ccd3e07'
export const API_KEY_SIGHTS =  '5ae2e3f221c38a28845f05b6692e253f1e111058702f77d090cdbfae  '

export interface requestError {
   message: string
   code: number
}

export interface actionInterface {
   type: string
   [key: string]: any
}