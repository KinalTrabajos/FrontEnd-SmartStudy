import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonToast,
  IonSpinner,
  IonIcon,
  IonModal,
  IonAlert
} from '@ionic/react';
import { create } from 'ionicons/icons';
import { useInfomationUser } from '../../shared/hooks/user/useGetInfoUser';
import { ProfileUpdateModal } from '../../components/Setting/ProfileUpdateModal';
import '../../theme/ProfilePage.css';

export const SettingPage = () => {
  const { userDetails, loading, error, getUserInfo } = useInfomationUser();
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const handleUpdateSuccess = (updatedData) => {
    // Aquí podrías actualizar el estado de la página si el hook no lo hace
    // o simplemente volver a cargar la información
    getUserInfo();
    setShowModal(false);
    setToastMessage('Perfil actualizado correctamente.');
    setShowToast(true);
  };

  const handleError = (message) => {
    setToastMessage(message || 'Error al actualizar el perfil.');
    setShowToast(true);
  };

  const renderUserInfo = () => (
    <div className="min-h-full px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6" style={{ color: "var(--ion-color-dark)" }}>
        Información de Usuario
      </h1>
      <div className="p-4 rounded-xl shadow-xl border" style={{ backgroundColor: "var(--ion-color-light)", borderColor: "var(--ion-color-medium-shade)" }}>
        <IonList lines="none" className="bg-transparent">
          <IonItem className="rounded-lg mb-2" style={{ "--background": "var(--ion-color-white)" }}>
            <IonLabel>Nombre</IonLabel>
            <p className="ion-text-right">{userDetails?.name}</p>
          </IonItem>
          <IonItem className="rounded-lg mb-2" style={{ "--background": "var(--ion-color-white)" }}>
            <IonLabel>Nombre de Usuario</IonLabel>
            <p className="ion-text-right">{userDetails?.username}</p>
          </IonItem>
          <IonItem className="rounded-lg mb-2" style={{ "--background": "var(--ion-color-white)" }}>
            <IonLabel>Email</IonLabel>
            <p className="ion-text-right">{userDetails?.email}</p>
          </IonItem>
          <IonItem className="rounded-lg mb-2" style={{ "--background": "var(--ion-color-white)" }}>
            <IonLabel>Puntos</IonLabel>
            <p className="ion-text-right">{userDetails?.points}</p>
          </IonItem>
          <IonItem className="rounded-lg" style={{ "--background": "var(--ion-color-white)" }}>
            <IonLabel>Rol</IonLabel>
            <p className="ion-text-right">{userDetails?.role}</p>
          </IonItem>
        </IonList>
      </div>
      <div className="flex justify-center mt-6">
        <IonButton
          onClick={() => setShowModal(true)}
          className="w-full max-w-sm shadow-lg hover:scale-105 transition-transform"
          style={{
            "--background": "var(--ion-color-tertiary)",
            "--border-radius": "12px",
            "--box-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          }}
        >
          <IonIcon slot="start" icon={create} />
          Editar Perfil
        </IonButton>
      </div>
    </div>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="profile-content">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-full">
            <IonSpinner name="crescent" color="tertiary" />
            <p className="mt-4 text-center" style={{ color: "var(--ion-color-medium)" }}>Cargando perfil...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="mt-4 text-center" style={{ color: "var(--ion-color-danger)" }}>
              {error}
            </p>
          </div>
        ) : userDetails ? (
          renderUserInfo()
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="mt-4 text-center" style={{ color: "var(--ion-color-medium)" }}>No se encontraron datos del usuario.</p>
          </div>
        )}

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          {userDetails && (
            <ProfileUpdateModal
              currentUser={userDetails}
              onUpdate={handleUpdateSuccess}
              onError={handleError}
              onClose={() => setShowModal(false)}
            />
          )}
        </IonModal>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastMessage.includes('Error') ? 'danger' : 'success'}
        />
      </IonContent>
    </IonPage>
  );
};