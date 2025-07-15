import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { IonInput, IonText, IonItem, IonLabel, IonButton } from "@ionic/react";
import { IonPage, IonContent } from "@ionic/react";
import { IonAlert, IonToast } from "@ionic/react";
import 'react-datepicker/dist/react-datepicker.css';
import { globe } from "ionicons/icons";

export const TaskForm = ({ mode: 'create'}) => {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
    const [taskData, setTaskData] = useState(null);

    useEffect(() => {
        if (mode === 'create') {
            setValue('task', id);
        } else if (mode === 'edit') {
            const loadTask = async () => {
                try {
                    //traer la informacion del la tarea
                    console.log('Traer la informacion de la tarea')
                } catch (e) {
                    console.error('Error to loading the task', e)
                }
            };
            loadTask();
        }
    }, [id, setValue, model]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            for (const field in errors) {
                <IonAlert>
                    trigger="present-alert"
                    header="Fechas Invalidas"
                    subHeader="Verifique las fechas"
                    message="La fecha de finalizacion tiene que ser posterior a la de inicio"
                    buttons={['Action']}
                </IonAlert>
            }
        }
    }, [errors, IonToast])

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
            if (mode === 'create') {
                console.log(datos);
                <IonToast message="Tarea creada exitosamente!!" duration={3000} icon={globe}></IonToast>
            } else {
                console.log("datos actializados", datos);
                <IonToast message="Tarea actualizada exitosamente!!" duration={3000} icon={globe}></IonToast>
            }
        } catch (error) {
            console.error("Error al crear la tarea", error);
            <IonToast
                message="Error al crear la tarea "
                onDidDismiss={() => setIsOpen(false)}
                duration={5000}
            ></IonToast>
        }
    }

    return (
        <IonPage>
            <IonContent class="ion-paddind">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonItem>
                        <IonLabel position="floating">Titulo de la Tarea </IonLabel>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <IonInput
                                    value={field.value}
                                    onIonChange={(e) => field.onChange(e.detail.value)}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                    </IonItem>
                    {errors.name && (
                        <IonText>
                            <p>{errors.name.message}</p>
                        </IonText>
                    )}
                    <IonItem>
                        <IonLabel position="floating">Descrition</IonLabel>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <IonInput
                                    value={field.value}
                                    onIonChange={(e) => field.onChange(e.detail.value)}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                    </IonItem>
                    {errors.name && (
                        <IonText color={"danger"}>
                            <p>{errors.descripcion.message}</p>
                        </IonText>
                    )}
                    <IonItem>
                        <IonLabel position="floating">Limit Date</IonLabel>
                        <Controller
                            name="LimitDate"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText="Select Limit date"
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="yyyy-MM-dd"
                                    minDate={new Date()}
                                />
                            )}
                        />
                    </IonItem>
                    {errors.limitDate && (
                        <IonText>
                            <p>{errors.limitDate.message}</p>
                        </IonText>
                    )}
                    <IonItem>
                        <IonLabel position="floating">Importancia</IonLabel>
                        <Controller
                            name="importancy"
                            control={control}
                            render={({field}) => (
                                <IonInput
                                    value={field.value}
                                    onIonChange={(e) => field.onChange(e.detail.value)}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                    </IonItem>
                    {errors.importancy && (
                        <IonText>
                            <p>{errors.importancy.message}</p>
                        </IonText>
                    )}
                    <IonButton type="submit" expand="block">
                        {mode === 'edit' ? 'Actualizar Task' : "Crear"}
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )

}
