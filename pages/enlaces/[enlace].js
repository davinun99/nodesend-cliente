import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';


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
    return(
        <Layout>
            <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
            <div className="flex items-center justify-center mt-10">
                <a 
                    href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`} 
                    
                    className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                >
                    Aqui
                </a>
            </div>
        </Layout>
    )
}

export default Enlace;