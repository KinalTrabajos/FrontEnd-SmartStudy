import { useForm, Controller } from "react-hook-form";
import { IonInput, IonText, IonItem, IonLabel, IonButton } from "@ionic/react";
import { IonPage, IonContent } from "@ionic/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
    email: yup.string().required("Requerido"),
    password: yup.string().required("Requerido"),
})

export const LoginForm = () => {
    const {  handleSubmit, control, formState: { errors } } = useForm({resolver:yupResolver(schema)});
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        console.log(data);
    };

    return(
        <IonPage>
            <IonContent className="ion-padding">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonItem>
                        <IonLabel position="floating" >Correo</IonLabel>
                        <Controller
                            name="email"
                            control={control}
                            render={({field}) => (
                                <IonInput
                                    value={field.value}
                                    onIonChange={(e) => field.onChange(e.detail.value)}
                                    onBlur={field.onBlur}  
                                />
                            )}
                        />
                    </IonItem>
                    {errors.name && (
                        <IonText color={"danger"}>
                            <p>{errors.name.message}</p>
                        </IonText>
                    )}

                    <IonItem>
                        <IonLabel>Password</IonLabel>
                        <Controller
                            name="password"
                            control={control}
                            render={({field}) => (
                                <IonInput
                                    value={field.value}
                                    onIonChange={(e) => field.onChange(e.detail.value)}
                                    onBlur={field.onBlur}  
                                />
                            )}
                        />
                    </IonItem>
                    {errors.password && (
                        <IonText color={"danger"}>
                            <p>{errors.password.message}</p>
                        </IonText>
                    )}
                    <IonButton type="submit" expand="block" onClick={() => navigate("/dashboard")}>Login</IonButton>
                    <IonText>
                        No tienes cuenta?{""}
                        <IonButton onClick={() => navigate("/register")} expand="block">
                            Registrate
                        </IonButton>
                    </IonText>
                </form>
            </IonContent>
        </IonPage>
    )


}