import axios from "axios"

//constantes
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}

//Types
const OBTENER_POKEMOS_EXITO = 'OBTENER_POKEMOS_EXITO'
const SIGUIENTE_POKEMOS_EXITO = 'SIGUIENTE_POKEMOS_EXITO'

//reducers
export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case OBTENER_POKEMOS_EXITO:
            return {...state, ...action.payload}
        case SIGUIENTE_POKEMOS_EXITO:
            return {...state, ...action.payload}
        default: 
            return state
    }
}

//acciones
export const obtenerPokemonesAccion = () => async(dispatch, getState) => {
    // // console.log('getState', getState().pokemones.offset)
    // const {offset} = getState().pokemones
    //Para pasar de una JSON a datos es parse 

    if(localStorage.getItem('offset=0')){
        console.log("datos guardados en local")
        dispatch({
            type: OBTENER_POKEMOS_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }

    try {
        console.log("Datos desde la api")
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
        console.log(res.data)
        dispatch({
            type: OBTENER_POKEMOS_EXITO,
            payload: res.data
        })
        //Para pasar un array a JSON es con stringify
        localStorage.setItem('offset=0', JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const siguientePokemonAccion = () => async(dispatch, getState) => {
    // const {offset} = getState().pokemones
    // const siguiente = offset + numero;
    const {next} = getState().pokemones
    try {
        const res = await axios.get(next)
        dispatch({
            type: SIGUIENTE_POKEMOS_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const anteriorPokemonAccion = () => async(dispatch, getState) => {
    const {previous} = getState().pokemones
    try {
        const res = await axios.get(previous)
        dispatch({
            type: SIGUIENTE_POKEMOS_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}