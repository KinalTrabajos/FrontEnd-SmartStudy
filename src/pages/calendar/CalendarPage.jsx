import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonButton } from "@ionic/react";

export const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState(
        [
            { "id": 1, "titulo": "Reunión", "fecha": "2025-07-30" },
            { "id": 2, "titulo": "Entrega Proyecto", "fecha": "2025-08-02" }
        ]
    );
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const tileContent = ({ date }) => {
        const dayEvents = events.filter(
            (event) => new Date(event.fechaInicio).toDateString() === date.toDateString()
        );

        return dayEvents.length > 0 ? (
            <span style={{ color: "red", fontSize: "1.2em" }} >*</span>
        ) : null
    }

    const handleDateClick = (selectedDate) => {
        setDate(selectedDate);
        const dayEvents = events.filter(
            (event) => new Date(event.fechaInicio).toDateString() === selectedDate.toDateString()
        );
        setSelectedEvents(dayEvents);
        setShowModal(true)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Calendario de Eventos</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <Calendar
                    onChange={handleDateClick}
                    value={date}
                    tileContent={tileContent}
                />

                {/* Modal para mostrar eventos */}
                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Eventos del {date.toDateString()}</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        {selectedEvents.length > 0 ? (
                            selectedEvents.map((ev) => (
                                <div key={ev.id}>
                                    <h3>{ev.titulo}</h3>
                                </div>
                            ))
                        ) : (
                            <p>No hay eventos para este día.</p>
                        )}
                        <IonButton expand="block" onClick={() => setShowModal(false)}>
                            Cerrar
                        </IonButton>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    )
}