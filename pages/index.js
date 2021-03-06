import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';
import Link from 'next/link';
import Dropzone from '../components/Dropzone';
import Alerta from '../components/Alerta';
import appContext from '../context/app/appContext';


const Index = () => {
    //extraer el usuario autenticado
    const AuthContext = useContext(authContext);
    const {usuarioAutenticado} = AuthContext;
    //extraer mensaje de error de archivo
    const AppContext = useContext(appContext);
    const {mensajeArchivo, url} = AppContext;

    useEffect(()=>{
        const token = localStorage.getItem('rnd_token');
        if (token) {
            usuarioAutenticado();    
        }
        
    },[])
    return (
        <Layout>
            <div className="md:w4/5 xl:w-3/5 mx-auto mb-32">
                { url ?
                    <>
                        <p className="text-center text-2xl mt-10">
                            <span className="font-bold text-red-700 text-3xl uppercase">Tu URL es </span>{`${process.env.frontEndURL}/enlaces/${url}`}
                        </p>
                        <button 
                            type="button" 
                            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
                            onClick={()=> navigator.clipboard.writeText(`${process.env.frontEndURL}/enlaces/${url}`)}
                        >
                            Copiar enlace
                        </button>
                    </>
                :
                (<>
                    {mensajeArchivo &&
                        <Alerta/>
                    }
                    <div className="lg:flex md:shadow-lg pg-5 bg-white rounded-lg py-10">
                        
                        <Dropzone/>
                        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                            <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                                Compartir archivos de forma sencilla y privada
                            </h2>    
                            <p className="text-lg leading-loose">
                                <span className="text-red-500 font-bold">
                                    ReactNodeSend 
                                </span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto dicta numquam libero ratione fuga minima aspernatur, maxime voluptas consectetur incidunt autem impedit laboriosam, 
                                nesciunt voluptate exercitationem odio quo similique repudiandae. 
                            </p>
                            <Link href="/crearcuenta">
                                <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta</a>
                            </Link>
                        </div>
                    </div>
                </>)
                }
            </div>
            
        </Layout>
    )
}

export default Index;
