import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  IonIcon,
  IonButtons,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAlert
} from '@ionic/react';
import { create, trash, reorderFourOutline } from 'ionicons/icons';
import { FormTaskModal } from '../../components/Tasks/FormModalTask';
import { CameraModal } from '../../components/Tasks/TakePhotoTask';
import { useGetTask } from '../../shared/hooks/tasks/useGetTask';
import { useDeleteTask } from '../../shared/hooks/tasks/useDeleteTask';

export const TaskPage = () => {
  const { getTasks, tasks } = useGetTask();
  const { deleteTask } = useDeleteTask();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  const handleTaskCreate = async () => {
    await getTasks();
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    await getTasks();
  };

  const toggleTaskCompletion = (taskId) => {
    setSelectedTaskId(taskId);
    setIsCameraOpen(true);
  };

  return (
    <div className="p-6 animate-fade-in" style={{ backgroundColor: 'var(--ion-color-light)', minHeight: '100vh' }}>
      <h1
        className="text-4xl font-bold text-center mb-6"
        style={{ color: 'var(--ion-color-primary)' }}
      >
        Mis Tareas
      </h1>

      {/* Botón Crear Tarea */}
      <IonButton
        onClick={() => setIsOpen(true)}
        expand="block"
        style={{
          background: 'linear-gradient(90deg, var(--ion-color-primary), var(--ion-color-dark))',
          color: 'var(--ion-color-light)',
          fontWeight: '600',
          borderRadius: '12px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}
      >
        <IonIcon slot="start" icon={create} />
        Crear nueva tarea
      </IonButton>

      {/* Lista de Tareas */}
      <IonList
        style={{
          background: 'var(--ion-color-white)',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          marginTop: '20px'
        }}
      >
        {!isDisabled && (
          <div
            style={{
              backgroundColor: 'var(--ion-color-light)',
              color: 'var(--ion-color-primary)',
              fontWeight: '500',
              padding: '8px 16px',
              fontSize: '14px'
            }}
          >
            Arrastra para reordenar.
          </div>
        )}

        <IonReorderGroup disabled={isDisabled}>
          {tasks.length === 0 ? (
            <IonItem style={{ background: 'var(--ion-color-light)' }}>
              <IonLabel style={{ color: 'var(--ion-color-dark)', textAlign: 'center' }}>
                No hay tareas. ¡Crea una!
              </IonLabel>
            </IonItem>
          ) : (
            tasks.map((task) => (
              <IonItem
                key={task._id}
                style={{
                  background: 'var(--ion-color-white)',
                  transition: 'transform 0.2s ease',
                  opacity: task.completed ? '0.6' : '1'
                }}
                className="hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 flex-grow">
                  <input
                    type="checkbox"
                    checked={task.taskStatus === 'Completed'}
                    onChange={() => toggleTaskCompletion(task._id)}
                    style={{
                      accentColor: 'var(--ion-color-primary)',
                      height: '20px',
                      width: '20px'
                    }}
                  />
                  <IonLabel
                    style={{
                      color: task.completed ? 'var(--ion-color-medium)' : 'var(--ion-color-dark)',
                      textDecoration: task.completed ? 'line-through' : 'none'
                    }}
                  >
                    {task.taskName}
                  </IonLabel>
                  <IonLabel
                    style={{
                      color: task.completed ? 'var(--ion-color-medium)' : 'var(--ion-color-dark)',
                      textDecoration: task.completed ? 'line-through' : 'none'
                    }}
                  >
                    {task.taskDescription}
                  </IonLabel>
                  <IonLabel
                    style={{
                      color: task.completed ? 'var(--ion-color-medium)' : 'var(--ion-color-dark)',
                      textDecoration: task.completed ? 'line-through' : 'none'
                    }}
                  >
                    {task.dueDate}
                  </IonLabel>
                  <IonLabel
                    style={{
                      color: task.completed ? 'var(--ion-color-medium)' : 'var(--ion-color-dark)',
                      textDecoration: task.completed ? 'line-through' : 'none'
                    }}
                  >
                    {task.priority}
                  </IonLabel>
                </div>

                <IonButtons slot="end" className="flex items-center gap-2">
                  <IonButton
                    id="delete-alert"
                    fill="clear"
                    style={{ color: 'red' }}
                    onClick={() => {
                      setSelectedTaskId(task._id);
                      setShowAlert(true);
                    }}
                  >
                    <IonIcon icon={trash} slot="icon-only" />
                  </IonButton>

                  <IonButton
                    fill="clear"
                    style={{ color: 'var(--ion-color-primary)' }}
                    onClick={() => {
                      setTaskToEdit(task);
                      setIsOpen(true);
                    }}
                  >
                    Editar
                  </IonButton>

                  {!isDisabled && (
                    <IonReorder slot="end">
                      <IonIcon icon={reorderFourOutline} style={{ color: 'var(--ion-color-accent)' }} />
                    </IonReorder>
                  )}
                </IonButtons>
              </IonItem>
            ))
          )}
        </IonReorderGroup>
      </IonList>

      {/* Alert */}
      <IonAlert
        isOpen={showAlert}
        header="¿Desea eliminar esta tarea?"
        message="Esta acción no se puede deshacer."
        cssClass="custom-alert"
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'alert-button-cancel',
          },
          {
            text: 'Confirmar',
            role: 'confirm',
            cssClass: 'alert-button-confirm',
            handler: () => handleDeleteTask(selectedTaskId),
          },
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />

      {/* Modales */}
      <FormTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onTaskCreated={handleTaskCreate}
        taskToEdit={taskToEdit}
      />
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        taskId={selectedTaskId}
        onTaskCreated={handleTaskCreate}
      />
    </div>
  );
};
