import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { IonAlert, IonToast } from "@ionic/react";
import 'react-datepicker/dist/react-datepicker.css';
import { globe } from "ionicons/icons";

export const TaskForm = ({mode: 'create'}) => {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
    const [taskData, setTaskData] = useState(null);

    const onSubmit = async (datos) => {
        if (new Date(datos.startDate) <= new Date(datos.endDate)) {
            <IonAlert
                trigger="present-alert"
                header="Fechas Invalidas"
                subHeader="Verifique las fechas"
                message="La fecha de finalizacion tiene que ser posterior a la de inicio"
                buttons={['Action']}
            ></IonAlert>
            return;
        }

        try {
            if(mode === 'create'){
                console.log(datos);
                <IonToast message="Tarea creada exitosamente!!" duration={3000} icon={globe}></IonToast>
            }else{
                console.log("datos actializados", datos);
                <IonToast message="Tarea actualizada exitosamente!!" duration={3000} icon={globe}></IonToast>
            }
        } catch (error) {
            console.error("Error al crear la tarea", error);
            <IonToast 
                message="Error al crear la tarea "
                onDidDismiss={()=> setIsOpen(false)}
                duration={5000}
            ></IonToast>
        }
    }

    return(
        
    )

}
