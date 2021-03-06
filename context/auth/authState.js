import React, {useReducer} from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import tokenAuth from '../../config/tokenAuth';
import { 
    USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA, LOGIN_ERROR, LOGIN_EXITOSO, CERRAR_SESION
} from '../../types';
import clienteAxios from '../../config/axios';

const AuthState = props => {
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('rnd_token'): '',
        isAutenticado: null,
        usuario: null,
        mensaje: null
    }
    const [state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async datos =>{
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            });   
        }
        //limpio la alerta dps de 3 seg
        setTimeout(()=>{
            dispatch({
                type: LIMPIAR_ALERTA
            })
        },3000)
    }
    const login = async(datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            });
            
        } catch (error) {
            let errorMsg = error.response ? error.response.data.msg : 'No hay conexion con el servidor';
            dispatch({
                type: LOGIN_ERROR,
                payload: errorMsg
            });
        }
        //limpio la alerta dps de 3 seg
        setTimeout(()=>{
            dispatch({
                type: LIMPIAR_ALERTA
            })
        },3000)
    }
    const usuarioAutenticado = async() => {
        tokenAuth( localStorage.getItem('rnd_token') );
        
        try {
            const respuesta = await clienteAxios('/api/auth');
            if (respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                });        
            }
        } catch (error) {
            
            let errorMsg = error.response ? error.response.data.msg : 'No hay conexion con el servidor';
            if(error.response.status === 403){
                logout();
            }else{
                dispatch({
                    type: LOGIN_ERROR,
                    payload: errorMsg
                });
            }
        }
        
    }
    const logout = ()=>{
        dispatch({
            type: CERRAR_SESION
        });
    }
    return(
        <authContext.Provider
            value={{
                token: state.token,
                isAutenticado: state.isAutenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                usuarioAutenticado,
                registrarUsuario,
                login,
                logout
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}
export default AuthState;