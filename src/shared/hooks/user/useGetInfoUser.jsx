import { useState, useCallback } from "react";
import { getInformationUser as getUserRequest } from "../../../services/api";

export const useInfomationUser = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useCallback memoriza la función para evitar re-creaciones innecesarias
    const getUserInfo = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getUserRequest();

            // Verificamos si hay un error en la respuesta
            if (response.error) {
                // Si la respuesta tiene un error, lanzamos un error personalizado
                const errorMessage = response.error.response?.data?.msg || 'Error al obtener los datos del usuario.';
                throw new Error(errorMessage);
            }
            
            // Accedemos al array 'users' y tomamos el primer elemento
            // Se asume que siempre habrá al menos un usuario en el array
            const user = response.data.users[0];
            
            setUserDetails(user);
            return user; // Devolvemos el usuario para que el componente pueda usarlo
        } catch (err) {
            console.error("Error en getUserInfo:", err);
            setError(err.message || 'Error desconocido.');
            // Vuelve a lanzar el error para que el componente que llama lo pueda manejar
            throw err; 
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        getUserInfo,
        userDetails,
        loading,
        error
    };
};