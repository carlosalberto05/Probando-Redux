import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {obtenerPokemonesAccion, siguientePokemonAccion, anteriorPokemonAccion, unPokemonDetalleAccion} from "../redux/pokeDucks"
import Detalle from './Detalle'

const Pokemones = () => {
    const dispatch = useDispatch()
    const pokemones = useSelector(store => store.pokemones.results)
    console.log(pokemones)
    const next = useSelector(store => store.pokemones.next)
    const previous =useSelector(store => store.pokemones.previous)

    return (
        <div className="row mt-5">

            <div className="col-md-6">

            <h3>Lista de pokemones</h3>
            

            <ul className="list-group mt-4">
                    {
                        pokemones.map((item) => {
                            return (
                                <li key={item.name} className="list-group-item text-uppercase">
                                    {item.name}
                                    <button className="btn btn-dark btn-sm float-right"
                                    onClick={() =>dispatch(unPokemonDetalleAccion(item.url))}
                                    >
                                    Info</button>
                                </li>
                            )  
                        })
                    }
                </ul>

            <div className="d-flex justify-content-between mt-4">
            {
                pokemones.length === 0 &&   
                <button onClick={() => dispatch(obtenerPokemonesAccion())} className="btn btn-dark">Get Pokemón</button>
            }
            {
                next &&   
                <button onClick={() => dispatch(siguientePokemonAccion())} className="btn btn-dark">Siguiente</button>
            }
            {
                previous && 
                <button onClick={() => dispatch(anteriorPokemonAccion( ))} className="btn btn-dark">Anterior</button>
            }
            </div>
            

            </div>
            <div className="col-md-6">
                <h3 className="text-center">Detalle Pokemón</h3>
                <Detalle />
            </div>
        </div>
    )
}

export default Pokemones
