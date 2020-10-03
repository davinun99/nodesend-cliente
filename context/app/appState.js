import React, { useReducer } from 'react';
import { 
    LIMPIAR_STATE,
    CREAR_ENLACE_EXITO, 
    LIMPIAR_ALERTA, 
    MOSTRAR_ALERTA, 
    SUBIR_ARCHIVO, 
    SUBIR_ARCHIVO_ERROR, 
    SUBIR_ARCHIVO_EXITO, 
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS 
} from '../../types';
import appContext from './appContext';
import appReducer from './appReducer';

import clienteAxios from '../../config/axios'

const appState = ({children}) => {
    
    const initialState = {
        mensajeArchivo: '',
        nombreHash:'',
        nombreOriginal:'',
        isCargando: false,
        descargas: 1,
        password: '',
        autor: null,
        url: '',
    }
    const [state, dispatch] = useReducer(appReducer, initialState);
    //muestra la alerta de tamaño
    const mostrarAlerta = msg => {
        //console.log(msg);
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            });
        }, 3000);
    }
    const subirArchivo = async(formData, nombreOriginal) =>{
        dispatch({
            type: SUBIR_ARCHIVO
        })
        try {
            const resultado = await clienteAxios.post('/api/archivos', formData);
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombreHash: resultado.data.archivo,
                    nombreOriginal: nombreOriginal
                }
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            });
        }
    }
    const crearEnlace = async() => {
        
        const data = {
            nombre: state.nombreHash,
            nombre_original: state.nombreOriginal,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor,
        }
        try {
            const respuesta = await clienteAxios.post('/api/enlaces', data);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: respuesta.data.msg
            })
        } catch (error) {
            console.log(error);
        }
    }
    const limpiarState = async() =>{
        dispatch({
            type: LIMPIAR_STATE
        })
    }
    const agregarPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        });
    }
    const setDescargas = descargas =>{
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        })
    }
    return (
        <appContext.Provider
            value={{
                mensajeArchivo: state.mensajeArchivo,
                nombreOriginal: state.nombreOriginal,
                nombreHash: state.nombreHash,
                isCargando: state.isCargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                setDescargas,
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default appState;