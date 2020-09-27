import { LIMPIAR_ALERTA, MOSTRAR_ALERTA,SUBIR_ARCHIVO, SUBIR_ARCHIVO_ERROR, SUBIR_ARCHIVO_EXITO } from "../../types";

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
        default:
            return state;
    }
}
export default reducer;