import { useContext, useState } from 'react';
import Alerta from '../../components/Alerta';
import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';
import appContext from '../../context/app/appContext';


export async function getServerSideProps({params}){
    //consigue los props y los pasa al componente principal
    const {enlace} = params;
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
    return{
        props: {
            enlace: resultado.data
        }
    }
}

export async function getServerSidePaths(){
    //genera los posibles paths para next, se usa paths -> params para mostrar las urls con su id
    //falback es para mostrar o una pagina ,o un 404
    //fallbak y paths son obligatorios, path puede ser un array o un string
    const respuesta = await clienteAxios.get('/api/enlaces');
    return{
        paths:[ 
            respuesta.data.enlaces.map(enlace=>({
                params: {enlace: enlace.url}
            }))
        ],
        fallback: false,
    }
}

const Enlace = ({enlace}) => {
    const [tienePassword, setTienePassword] = useState(enlace.password);
    const [password, setPassword] = useState('');
    const [enlaceState, setEnlace] = useState(enlace);
    const AppContext = useContext(appContext);
    const {mostrarAlerta, mensajeArchivo} = AppContext;

    const verificarPassword = async e => {
        e.preventDefault();
        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, {password});
            setTienePassword(resultado.data.password);    
            setEnlace(resultado.data);
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }
    }

    return(
        <Layout>
            {
                tienePassword ?(
                    <>
                        <p>Este enlace esta protegido por un password</p>
                        {
                            mensajeArchivo && <Alerta/>
                        }
                        <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form 
                                    onSubmit={verificarPassword}
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4">
                                    <div className="mb-4">
                                        <label htmlFor="password" className="block text-black text-sm font-bold mb-2">Contraseña</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline focus:outline-none" 
                                            id="password"
                                            value={password}
                                            onChange={e=>setPassword(e.target.value)}
                                        />
                                    </div>
                                    <input type="submit" value="Validar contraseña" className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"/>
                                </form>
                            </div>
                        </div>
                    </>
                ) :(
                    <>
                        <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
                        <div className="flex items-center justify-center mt-10">
                            <a 
                                href={`${process.env.backendURL}/api/archivos/${enlaceState.archivo}`} 
                                
                                className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                            >
                                Aqui
                            </a>
                        </div>
                    </>
                )
            }
            
        </Layout>
    )
}

export default Enlace;