import React, { useState,  } from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { useCreateTask } from '../../shared/hooks/tasks/useCrateTask';

export const FormTaskModal = ({ isOpen, onClose }) => {
    const { createTask } = useCreateTask();
    const [userLogged] = useState(() => JSON.parse(localStorage.getItem('user')));

    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            taskName: '',
            taskDescription: '',
            dueDate: '',
            priority: '',
            category: '64b9f8f2e3a7e123456789ab',
            user: userLogged.id,
        },
    });
    const [selectedDate, setSelectedDate] = useState('');

    const onSubmit = (data) => {
        createTask(data);
        console.log('Tarea creada:', data);
        reset();
        setSelectedDate('');
        onClose();
    };

    const handleDismiss = () => {
        reset();
        setSelectedDate('');
        onClose();
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={handleDismiss}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={handleDismiss}>Cancelar</IonButton>
                    </IonButtons>
                    <IonTitle>Nueva Tarea</IonTitle>
                    <IonButtons slot="end">
                        <IonButton strong={true} onClick={handleSubmit(onSubmit)}>
                            Guardar
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Nombre de la tarea</IonLabel>
                    <IonInput placeholder="Ej: Hacer compras" {...register('taskName', { required: true })} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Descripción</IonLabel>
                    <IonTextarea placeholder="Detalles de la tarea" {...register('taskDescription')} />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Fecha límite</IonLabel>
                    <Controller
                        name="dueDate"
                        control={control}
                        render={({ field }) => (
                            <>
                                <IonDatetime
                                    presentation="date"
                                    value={field.value}
                                    onIonChange={(e) => {
                                        field.onChange(e.detail.value);
                                        setSelectedDate(e.detail.value);
                                    }}
                                />
                                {selectedDate && (
                                    <p className="text-sm mt-2">Fecha seleccionada: <strong>{new Date(selectedDate).toLocaleDateString()}</strong></p>
                                )}
                            </>
                        )}
                    />
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Prioridad</IonLabel>
                    <IonSelect placeholder="Seleccionar" {...register('priority')}>
                        <IonSelectOption value="Important">Importante</IonSelectOption>
                        <IonSelectOption value="Medium">Media</IonSelectOption>
                        <IonSelectOption value="Normal">Baja</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem>
                    <IonLabel position="stacked">Categoría</IonLabel>
                    <IonInput placeholder="Ej: Trabajo, Personal" {...register('category')} />
                </IonItem>
            </IonContent>
        </IonModal>
    );
};
