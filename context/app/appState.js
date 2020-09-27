import React, { useReducer } from 'react';
import { LIMPIAR_ALERTA, MOSTRAR_ALERTA, SUBIR_ARCHIVO, SUBIR_ARCHIVO_ERROR, SUBIR_ARCHIVO_EXITO } from '../../types';
import appContext from './appContext';
import appReducer from './appReducer';

import clienteAxios from '../../config/axios'

const appState = ({children}) => {
    //muestra la alerta de tamaño
    const initialState = {
        mensajeArchivo: '',
        nombreHash:'',
        nombreOriginal:'',
        isCargando: false,
    }
    const [state, dispatch] = useReducer(appReducer, initialState);
    const mostrarAlerta = msg => {
        console.log(msg);
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
    return (
        <appContext.Provider
            value={{
                mensajeArchivo: state.mensajeArchivo,
                nombreOriginal: state.nombreOriginal,
                nombreHash: state.nombreHash,
                isCargando: state.isCargando,
                mostrarAlerta,
                subirArchivo
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default appState;