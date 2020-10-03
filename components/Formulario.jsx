import React, { useContext, useState } from 'react'
import appContext from '../context/app/appContext';

const Formulario = () => {
    const [tienePassword, setTienePassword] = useState(false);
    
    const AppContext = useContext(appContext);
    const {agregarPassword, setDescargas} = AppContext;
    
    return (
        <div className="w-full mt-20">
            <div className="">
                <label className="text-lg text-gray-800">
                    Eliminar tras:
                </label>
                <select 
                    onChange={e=>setDescargas(parseInt(e.target.value))}
                    className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500">
                    <option value="" defaultValue disabled>-- Seleccione --</option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descargas</option>
                    <option value="10">10 Descargas</option>
                </select>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2" htmlFor="hasPassCheck">
                        Proteger con contraseña
                    </label>
                    <input id="hasPassCheck" type="checkbox" onChange={()=>setTienePassword(!tienePassword)} name="" id=""/>
                </div>
                {tienePassword &&
                    <input 
                        type="password" 
                        name="" 
                        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500" 
                        id=""
                        onChange={e=>agregarPassword(e.target.value)}
                    />
                }
            </div>
        </div>
    )
}

export default Formulario
