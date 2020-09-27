import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';
export async function getStaticProps(){

}

export async function getStaticPath(){
    const respuesta = await clienteAxios.post('/api/enlaces');
}

const Enlace = ({}) => {
    return(
        <Layout>
            <p>Desde enlace.js</p>
        </Layout>
    )
}

export default Enlace;