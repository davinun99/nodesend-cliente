import { 
    USUARIO_AUTENTICADO, 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA, LOGIN_ERROR, LOGIN_EXITOSO
} from "../../types";

const reducerFunction = (state, action) => {
    switch(action.type){
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload
            };
        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:    
            return {
                ...state,
                mensaje: action.payload
            };
        case LIMPIAR_ALERTA:
            return{
                ...state,
                mensaje: null
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('rnd_token', action.payload);
            return{
                ...state,
                isAutenticado: true,
                token: action.payload
            }
        default:
            return state;
    }
};
export default reducerFunction;