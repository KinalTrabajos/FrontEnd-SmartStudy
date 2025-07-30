import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


export const takePhotoTask = async() =>{
    const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 80,
    });
}