import React from 'react';
import {
  IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage,
  IonTitle, IonToolbar, IonButton, IonIcon, IonFab, IonFabButton, IonFabList,
  IonItem, IonLabel, IonList, IonMenuToggle
} from '@ionic/react';

import {
  search, personCircle, chevronUpCircle,
  colorPalette, document, globe
} from 'ionicons/icons';

import { Outlet } from 'react-router-dom';

export const MenuComponent = () => {
  return (
    <>
      {/* Menú lateral */}
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menú</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/dashboard" routerDirection="none">
                <IonLabel>Inicio</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/dashboard/tasks" routerDirection="none">
                <IonLabel>Tareas</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/dashboard/configuracion" routerDirection="none">
                <IonLabel>Configuración</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/dashboard/calendar" routerDirection="none">
                <IonLabel>Calendario</IonLabel>
              </IonItem>
            </IonMenuToggle>
             <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/dashboard/category" routerDirection="none">
                <IonLabel>Categorias</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>

      {/* Layout principal */}
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Smart Study</IonTitle>
            <IonButtons slot="secondary">
              <IonButton>
                <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
              </IonButton>
              <IonButton>
                <IonIcon slot="icon-only" icon={search}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <Outlet />
        </IonContent>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={chevronUpCircle}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton>
              <IonIcon icon={document}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={colorPalette}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={globe}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonPage>
    </>
  );
};
