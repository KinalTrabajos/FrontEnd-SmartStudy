import React from 'react';
import { IonBackButton, IonButton, IonButtons, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import {  ellipsisHorizontal, ellipsisVertical, search, personCircle,  } from 'ionicons/icons';

function ToolBar() {
    return (
        <>
            <IonToolbar>
                <IonButtons slot="secondary">
                    <IonButton>
                        <IonIcon slot="icon-only" icon={personCircle}></IonIcon>
                    </IonButton>
                    <IonButton>
                        <IonIcon slot="icon-only" icon={search}></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonButtons slot="primary">
                    <IonButton>
                        <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>Icon Buttons</IonTitle>
            </IonToolbar>
        </>
    )
}

export default ToolBar;