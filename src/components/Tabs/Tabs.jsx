import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonRouterOutlet
} from '@ionic/react';
import { playCircle, radio, library, search } from 'ionicons/icons';
import { Routes, Route, Navigate } from 'react-router-dom';

import { TaskPage } from '../../pages/tasks/TaskPage';
import { PrincipalPage } from '../../components/Dashboard/PrincipalPage'; 

const MenuTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Routes>
          <Route path="/" element={<PrincipalPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          {/* Agrega más rutas según tus páginas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/">
          <IonIcon icon={playCircle} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tasks" href="/tasks">
          <IonIcon icon={radio} />
          <IonLabel>Tasks</IonLabel>
        </IonTabButton>
        <IonTabButton tab="library" href="/library">
          <IonIcon icon={library} />
          <IonLabel>Library</IonLabel>
        </IonTabButton>
        <IonTabButton tab="search" href="/search">
          <IonIcon icon={search} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MenuTabs;
