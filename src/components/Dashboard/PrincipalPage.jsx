import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent
} from "@ionic/react";

export const PrincipalPage = () => {
  return (
    <IonPage id="menu-content"> 
      <IonContent className="ion-padding">
        <h1>Bienvenido a la página principal</h1>
      </IonContent>
    </IonPage>
  );
};
