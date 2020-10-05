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
const POKE_INFO_EXITO = 'POKE_INFO_EXITO'

//reducers
export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case OBTENER_POKEMOS_EXITO:
            return {...state, ...action.payload}
        case SIGUIENTE_POKEMOS_EXITO:
            return {...state, ...action.payload}
        case POKE_INFO_EXITO:
            return {...state, unPokemon: action.payload}
        default: 
            return state
    }
}

//acciones
export const unPokemonDetalleAccion = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async(dispatch) => {

    if(localStorage.getItem(url)){
        dispatch({
            type: POKE_INFO_EXITO,
            payload:JSON.parse(localStorage.getItem(url))
        })
        console.log("Datos desde el local storage")
        return
    }
    
    try {
        console.log("Desde la api")
      const res = await axios.get(url)  
    //   console.log(res.data)
      dispatch({
          type: POKE_INFO_EXITO,
          payload:{
              nombre: res.data.name,
              ancho: res.data.weight,
              alto: res.data.height,
              foto: res.data.sprites.front_default
          }
      })
      localStorage.setItem(url, JSON.stringify({
        nombre: res.data.name,
        ancho: res.data.weight,
        alto: res.data.height,
        foto: res.data.sprites.front_default
      }))
    } catch (error) {
        console.log(error)
    }
}

export const obtenerPokemonesAccion = () => async(dispatch) => {
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
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
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

    if(localStorage.getItem(next)){
        console.log("Datos siguiente guardados en local")
        dispatch({
            type: OBTENER_POKEMOS_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return
    }

    try {
        console.log("datos desde la api")
        const res = await axios.get(next)
        dispatch({
            type: SIGUIENTE_POKEMOS_EXITO,
            payload: res.data
        })
        localStorage.setItem(next, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const anteriorPokemonAccion = () => async(dispatch, getState) => {
    const {previous} = getState().pokemones

    if(localStorage.getItem(previous)){
        console.log("Datos siguiente guardados en local")
        dispatch({
            type: OBTENER_POKEMOS_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return
    }
    try {
        const res = await axios.get(previous)
        dispatch({
            type: SIGUIENTE_POKEMOS_EXITO,
            payload: res.data
        })
        localStorage.setItem(previous, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
    }
}