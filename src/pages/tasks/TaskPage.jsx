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

} from '@ionic/react';
import { create, trash, reorderFourOutline } from 'ionicons/icons';
import {  FormTaskModal } from './FormModalTask';
import { useGetTask } from '../../shared/hooks/tasks/useGetTask';

export const TaskPage = () => {
  const { getTasks, tasks} = useGetTask();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getTasks()
  },[])

  const toggleReorder = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-800">Mis Tareas</h1>

      <IonButton
        onClick={() => setIsOpen(true)}
        expand="block"
        className="mb-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl shadow-xl transition-transform transform hover:scale-105"
      >
        <IonIcon slot="start" icon={create} />
        Crear nueva tarea
      </IonButton>

      <IonList className="bg-white rounded-2xl shadow-xl divide-y divide-gray-200">
        {!isDisabled && (
          <div className="py-2 px-4 text-sm text-blue-600 bg-blue-50 font-medium">
            Arrastra para reordenar.
          </div>
        )}

        <IonReorderGroup disabled={isDisabled} >
          {tasks.length === 0 ? (
            <IonItem className="py-4 text-center text-gray-500">
              <IonLabel>No hay tareas. ¡Crea una!</IonLabel>
            </IonItem>
          ) : (
            tasks.map(task => (
              <IonItem
                key={task._id}
                className={`px-4 py-3 flex items-center justify-between transition-transform transform hover:scale-105 ${task.completed ? 'opacity-50' : ''
                  }`}
              >
                <div className="flex items-center gap-3 flex-grow">
                  <input
                    type="checkbox"
                    checked={task.taskStatus}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <IonLabel className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.taskName}
                  </IonLabel>
                  <IonLabel className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.taskDescription}
                  </IonLabel>
                  <IonLabel className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.dueDate}
                  </IonLabel>
                  <IonLabel className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.priority}
                  </IonLabel>
                </div>

                <IonButtons slot="end" className="flex items-center gap-2">
                  <IonButton
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                    fill="clear"
                    className="text-red-500 hover:text-red-700"
                  >
                    <IonIcon icon={trash} slot="icon-only" />
                  </IonButton>

                  {!isDisabled && (
                    <IonReorder slot="end">
                      <IonIcon icon={reorderFourOutline} className="text-gray-400 hover:text-gray-600" />
                    </IonReorder>
                  )}
                </IonButtons>
              </IonItem>
            ))
          )}
        </IonReorderGroup>
      </IonList>

      <IonButton
        onClick={toggleReorder}
        expand="block"
        fill="outline"
        className="mt-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-xl transition-transform hover:scale-105"
      >
        <IonIcon slot="start" icon={reorderFourOutline} />
        {isDisabled ? 'Habilitar Reordenar' : 'Deshabilitar Reordenar'}
      </IonButton>

      <FormTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    </div>
  );
};



//https://chatgpt.com/share/68661e91-4598-800e-986d-a81e5f7af6db