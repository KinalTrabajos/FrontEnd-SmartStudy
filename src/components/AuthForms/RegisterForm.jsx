import { useForm, Controller } from "react-hook-form";
import { IonInput, IonText, IonItem, IonLabel, IonButton } from "@ionic/react";
import { IonPage, IonContent } from "@ionic/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("El nombre es Requerido"),
    username: yup.string().required("El nombre de usuario es Requerido"),
    email: yup.string().required("El correo es Requerido"),
    password: yup.string().required("La contraseña es Requerida"),
})

export const RegisterForm = () => {
    const {  handleSubmit, control, formState: { errors } } = useForm({resolver:yupResolver(schema)});

    const onSubmit = async (data) => {
        console.log(data);
    }

    return(
        <IonPage>
            <IonContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <IonItem>
                        <IonLabel>Nombre</IonLabel>
                        <Controller
                            name="name"
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
                        <IonLabel>Username</IonLabel>
                        <Controller
                            name="username"
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
                    {errors.username && (
                        <IonText color={"danger"}>
                            <p>{errors.username.message}</p>
                        </IonText>
                    )}
                    <IonItem>
                        <IonLabel>Email</IonLabel>
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
                    {errors.email && (
                        <IonText color={"danger"}>
                            <p>{errors.email.message}</p>
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
                    <IonButton type="submit" expand="block">Register</IonButton>
                    <IonText>
                        Ya tienes cuenta?{""}
                        <IonButton onClick={() => window.location.href = "/login"} expand="block">
                            Login
                        </IonButton>
                    </IonText>
                </form>
            </IonContent>
        </IonPage>
    )

}