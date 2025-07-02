import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import MenuTabs from './components/Tabs/Tabs';

setupIonicReact();

function App() {
  return (
    <IonApp>
        <MenuTabs />
    </IonApp>
  );
}

export default App;
