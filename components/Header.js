import React, { useContext, useEffect } from 'react';

import Link from 'next/link'
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import {useRouter} from 'next/router';

const Header = () => {
    const AuthContext = useContext(authContext);
    const {usuario, usuarioAutenticado, logout} = AuthContext;

    const AppContext = useContext(appContext);
    const {limpiarState} = AppContext;

    const router = useRouter();

    useEffect(()=>{
        usuarioAutenticado();
    },[]);
    function redireccionar(){
        limpiarState();
        router.push('/');
    }
    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            
            <img 
                onClick={()=>redireccionar()} 
                src="/logo.svg" className="w-64 mb-8 md:mb-0 cursor-pointer" alt="Logo"/>
            
            <div>
                {
                    usuario ? (
                        <div className="flex items-center">
                            <p className="mr-2">Hola {usuario.nombre}</p>
                            <button 
                                className="bg-black px-5 py-3 rounded text-white font-bold uppercase"
                                onClick={()=>logout()}
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2">Iniciar Sesión</a>
                            </Link>
                            <Link href="/crearcuenta">
                                <a className="bg-black px-5 py-3 rounded text-white font-bold uppercase">Crear cuenta</a>
                            </Link>
                        </>
                    )
                }
                
            </div>
        </header>
    )
}

export default Header;
