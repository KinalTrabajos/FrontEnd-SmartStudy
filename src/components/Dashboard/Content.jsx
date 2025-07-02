import { IonPage, IonContent, IonRouterOutlet } from "@ionic/react";
import { Route, } from 'react-router-dom';

import { PrincipalPage } from "./PrincipalPage";
import { TaskPage } from "../../pages/tasks/TaskPage";

const Content = () => {
    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding">
                <IonRouterOutlet>
                    <Route path="/" exact component={PrincipalPage}/>
                    <Route path="/tasks" component={TaskPage}/>
                </IonRouterOutlet>
            </IonContent>
        </IonPage>
    )
}

export default Content;