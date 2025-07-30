import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState } from 'react';
import {
    IonModal,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
} from '@ionic/react';
import { useUpdateTask } from '../../shared/hooks/tasks/useUpdateTask';


export const CameraModal = ({ isOpen, onClose, taskId, onTaskCreated }) => {
    const [photo, setPhoto] = useState(null);

    const { updateTask } = useUpdateTask();

    const takePhoto = async () => {
        const image = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
        });

        setPhoto(image.webPath)
    }

    const savePhoto = async () => {
        updateTask(taskId, {
            imageUrl: photo,
            taskStatus: 'Completed'
        })

        await onTaskCreated()
        onClose()
    }

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tomar Foto</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>Cerrar</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                {!photo ? (
                    <IonButton expand="block" onClick={takePhoto}>
                        📸 Tomar Foto
                    </IonButton>
                ) : (
                    <>
                        <img src={photo} alt="Foto" style={{ width: '100%', borderRadius: '10px' }} />
                        <IonButton expand="block" onClick={savePhoto} className="mt-3">
                            Guardar Foto
                        </IonButton>
                    </>
                )}
            </IonContent>
        </IonModal>
    )
}