import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSpinner,
  IonToast
} from '@ionic/react';
import { closeCircleOutline, save } from 'ionicons/icons';

export const ProfileUpdateModal = ({ currentUser, onUpdate, onError, onClose }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: currentUser
  });
  const [loading, setLoading] = useState(false);
  const [showModalToast, setShowModalToast] = useState(false);
  const [modalToastMessage, setModalToastMessage] = useState('');

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    setLoading(true);

    const isPasswordCorrect = data.currentPassword === 'contrasena123';
    if (!isPasswordCorrect) {
      setModalToastMessage('Contraseña actual incorrecta.');
      setShowModalToast(true);
      setLoading(false);
      return;
    }

    try {
      // Lógica de llamada a la API para actualizar el perfil
      console.log('Datos a actualizar:', data);

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const updatedUser = {
        ...currentUser,
        name: data.name,
        username: data.username,
        email: data.email,
      };

      onUpdate(updatedUser);
    } catch (error) {
      onError('Error al actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Actualizar Perfil</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon icon={closeCircleOutline} size="large" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList lines="none" className="bg-transparent">
            <IonItem className="rounded-lg mb-2" style={{ "--background": "var(--ion-color-white)" }}>
              <IonLabel position="floating">Nombre</IonLabel>
              <IonInput 
                type="text" 
                {...register('name', { required: true, maxLength: 25 })}
              />
            </IonItem>
            {errors.name && <p className="error-message">El nombre es requerido y no debe exceder los 25 caracteres.</p>}

            <IonItem className="rounded-lg mb-2" style={{ "--background": "var(--ion-color-white)" }}>
              <IonLabel position="floating">Nombre de Usuario</IonLabel>
              <IonInput 
                type="text" 
                {...register('username', { required: true })}
              />
            </IonItem>
            {errors.username && <p className="error-message">El nombre de usuario es requerido.</p>}

            <IonItem className="rounded-lg mb-2" style={{ "--background": "var(--ion-color-white)" }}>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput 
                type="email" 
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              />
            </IonItem>
            {errors.email && <p className="error-message">El email es requerido y debe ser válido.</p>}

            <h2 className="font-semibold text-lg mt-6" style={{ color: "var(--ion-color-dark)" }}>Cambiar Contraseña</h2>
            
            <IonItem className="rounded-lg mb-2" style={{ "--background": "var(--ion-color-white)" }}>
              <IonLabel position="floating">Contraseña Actual</IonLabel>
              <IonInput 
                type="password" 
                {...register('currentPassword', { required: true })}
              />
            </IonItem>
            {errors.currentPassword && <p className="error-message">La contraseña actual es requerida.</p>}

            <IonItem className="rounded-lg mb-2" style={{ "--background": "var(--ion-color-white)" }}>
              <IonLabel position="floating">Nueva Contraseña</IonLabel>
              <IonInput 
                type="password" 
                {...register('newPassword', { 
                  minLength: { value: 10, message: 'La contraseña debe tener al menos 10 caracteres.' }
                })}
              />
            </IonItem>
            {errors.newPassword && <p className="error-message">{errors.newPassword.message}</p>}

            <IonItem className="rounded-lg" style={{ "--background": "var(--ion-color-white)" }}>
              <IonLabel position="floating">Confirmar Nueva Contraseña</IonLabel>
              <IonInput 
                type="password" 
                {...register('confirmNewPassword', { 
                  validate: value => value === newPassword || 'Las contraseñas no coinciden.'
                })}
              />
            </IonItem>
            {errors.confirmNewPassword && <p className="error-message">{errors.confirmNewPassword.message}</p>}
          </IonList>
          
          <IonButton 
            expand="full" 
            type="submit" 
            className="ion-margin-top" 
            disabled={loading}
            style={{
              "--background": "var(--ion-color-tertiary)",
              "--border-radius": "12px",
              "--box-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            }}
          >
            {loading ? <IonSpinner name="crescent" /> : <IonIcon slot="start" icon={save} />}
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </IonButton>
        </form>

        <IonToast
          isOpen={showModalToast}
          onDidDismiss={() => setShowModalToast(false)}
          message={modalToastMessage}
          duration={3000}
          color="danger"
        />
      </IonContent>
    </>
  );
};