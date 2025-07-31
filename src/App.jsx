// App.jsx
import React from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MenuComponent } from './components/Menu/MenuComponent';
import { PrincipalPage } from './components/Dashboard/PrincipalPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { TaskPage } from './pages/tasks/TaskPage';
import { TaskForm } from './components/Tasks/TaskForm';
import { PublicationPage } from './pages/Publicationes/PublicationPage';
import { ComentsPage } from './pages/Coment/ComentsPage';

setupIonicReact();

function App() {
  return (
    <IonApp>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ Rutas protegidas/anidadas dentro de dashboard */}
        <Route path="/dashboard" element={<MenuComponent />}>
          <Route index element={<PrincipalPage />} />
          <Route path='tasks' element={<TaskPage />} />
          <Route path='tasks/create' element={<TaskForm mode='create'/>}/>
          <Route path='publication' element={<PublicationPage/>} />
          <Route path='comentario' element={<ComentsPage/>} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </IonApp>
  );
}

export default App;
