import { useState, useEffect } from "react";
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonTextarea,
} from '@ionic/react';
import { useForm, Controller } from "react-hook-form";
import { useCreateEvent } from "../../shared/hooks/event/useCreateEvent";

export const FormCreateEvent = ({ isOpen, onClose, onEventCreated }) => {
    const { createEvent } = useCreateEvent();
    const [userLogged] = useState(() => JSON.parse(localStorage.getItem('user')))
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString());

    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            title: '',
            description: '',
            dateStart: new Date().toISOString(),
            user: userLogged.id
        },
    });

    const onSubmit = async (data) => {
        try {
            await createEvent(data);
            if (onEventCreated) await onEventCreated();
            reset();
            setSelectedDate('');
            onClose();
        } catch (error) {
            console.error("Error creando evento:", error);
        }
    }

    const handleDismiss = () => {
        reset();
        setSelectedDate('');
        onClose();
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={handleDismiss}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={handleDismiss}>Cancelar</IonButton>
                    </IonButtons>
                    <IonTitle> Crear Evento</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={handleSubmit(onSubmit)}>
                            Guardar
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Titulo del evento</IonLabel>
                    <IonInput placeholder="Ej: Examen de Matematicas" {...register('title', { required: true })} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Descripción</IonLabel>
                    <IonTextarea placeholder="Detalles del evento" {...register('description')} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Fecha del Evento</IonLabel>
                    <Controller
                        name="dateStart"
                        control={control}
                        render={({ field }) => (
                            <>
                                <IonDatetime
                                    presentation="date"
                                    value={field.value}
                                    min={new Date().toISOString().split('T')[0]}
                                    onIonChange={(e) => {
                                        field.onChange(e.detail.value);
                                        setSelectedDate(e.detail.value);
                                    }}
                                    style={{ width: '100%' }}
                                />
                                {selectedDate && (
                                    <p className="text-sm mt-2">
                                        Fecha seleccionada:{" "}
                                        <strong>
                                            {new Date(selectedDate).toLocaleDateString('es-ES', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </strong>
                                    </p>
                                )}
                            </>
                        )}
                    />
                </IonItem>
            </IonContent>
        </IonModal>
    )
}