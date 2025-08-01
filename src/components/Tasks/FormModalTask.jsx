import React, { useState, useEffect } from 'react';
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
import { useUpdateTask } from '../../shared/hooks/tasks/useUpdateTask';

export const FormTaskModal = ({ isOpen, onClose, onTaskCreated, taskToEdit }) => {
    const { createTask } = useCreateTask();
    const { updateTask } = useUpdateTask();
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

    useEffect(() => {
        if (taskToEdit) {
            reset({
                taskName: taskToEdit.taskName || '',
                taskDescription: taskToEdit.taskDescription || '',
                dueDate: taskToEdit.dueDate || '',
                priority: taskToEdit.priority || '',
                category: taskToEdit.category || '',
            })
            setSelectedDate(taskToEdit.dueDate || '')
        } else {
            reset({
                taskName: '',
                taskDescription: '',
                dueDate: '',
                priority: '',
                category: '64b9f8f2e3a7e123456789ab',
                user: userLogged.id,
            });
            setSelectedDate('');
        }
    }, [taskToEdit, reset])

    const onSubmit = async (data) => {
        if (taskToEdit) {
            await updateTask(taskToEdit._id, data)
        } else {
            createTask(data);
        }
        if (onTaskCreated) {
            await onTaskCreated();
        }
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
                    <IonTitle>{taskToEdit ? 'Editar Tarea' : 'Crear Tarea'}</IonTitle>
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
