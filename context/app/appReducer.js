import { 
    CREAR_ENLACE_EXITO, 
    LIMPIAR_ALERTA, 
    LIMPIAR_STATE, 
    MOSTRAR_ALERTA,
    SUBIR_ARCHIVO, 
    SUBIR_ARCHIVO_ERROR, 
    SUBIR_ARCHIVO_EXITO,
    AGREGAR_DESCARGAS,
    AGREGAR_PASSWORD 
} from "../../types";

const reducer = (state, action) => {
    switch(action.type){
        case MOSTRAR_ALERTA:
            return{
                ...state,
                mensajeArchivo: action.payload
            }
        case LIMPIAR_ALERTA:
            return{
                ...state,
                mensajeArchivo: ''
            }
        case SUBIR_ARCHIVO: 
            return{
                ...state,
                isCargando: true
            }
        case SUBIR_ARCHIVO_EXITO:
            return{
                ...state,
                nombreOriginal: action.payload.nombreOriginal,
                nombreHash: action.payload.nombreHash,
                isCargando: false
            }
        case SUBIR_ARCHIVO_ERROR:
            return{
                ...state,
                mensajeArchivo: action.payload,
                isCargando: false
            }
        case CREAR_ENLACE_EXITO:
            return{
                ...state,
                url: action.payload
            }
        case LIMPIAR_STATE:
            return{
                ...state,
                mensajeArchivo: '',
                nombreHash:'',
                nombreOriginal:'',
                isCargando: false,
                descargas: 1,
                password: '',
                autor: null,
                url: '',
            }
        case AGREGAR_PASSWORD:
            return{
                ...state,
                password: action.payload
            }
        case AGREGAR_DESCARGAS:
            return{
                ...state,
                descargas: action.payload
            }
        default:
            return state;
    }
}
export default reducer;