import React, { useState } from 'react';
import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
} from '@ionic/react';

export const TaskPage = () => {
    const [isDisabled, setIsDisabled] = useState(true);

  function handleReorder(event) {

    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    event.detail.complete();
  }

  function toggleReorder() {
    setIsDisabled((current) => !current);
  }
    
    return(
        <>
      <IonList>
        <IonReorderGroup disabled={isDisabled} onIonItemReorder={handleReorder}>
          <IonItem>
            <IonLabel>Item 1</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>

          <IonItem>
            <IonLabel>Item 2</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>

          <IonItem>
            <IonLabel>Item 3</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>

          <IonItem>
            <IonLabel>Item 4</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>

          <IonItem>
            <IonLabel>Item 5</IonLabel>
            <IonReorder slot="end"></IonReorder>
          </IonItem>
        </IonReorderGroup>
      </IonList>

      {/* The reorder gesture is disabled by default, enable it to drag and drop items */}
      <IonButton onClick={toggleReorder}>Toggle Reorder</IonButton>
    </>
    )
}