import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonModal,
    IonButton,
    IonIcon,
    IonButtons,
} from "@ionic/react";
import { useGetEvents } from "../../shared/hooks/event/useGetEvents";
import { create, pencil, closeCircleOutline } from "ionicons/icons";
import { FormCreateEvent } from "../../components/Calendar/FormCreateEvent";
import 'react-calendar/dist/Calendar.css';

export const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const { getEvents, events } = useGetEvents();
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);

    useEffect(() => {
        getEvents();
    }, []);

    const handleEventCreate = async () => {
        await getEvents();
        // Vuelve a establecer la fecha actual para que el modal se actualice
        // con los eventos de hoy después de crear uno
        handleDateClick(new Date());
    };

    const openModalEdit = (event) => {
        setShowModal(false);
        setEventToEdit(event);
        setIsOpenEdit(true);
    };

    const tileContent = ({ date, view }) => {
        if (view === "month") {
            const dayEvents = events.filter(
                (event) => new Date(event.dateStart).toDateString() === date.toDateString()
            );
            return dayEvents.length > 0 ? (
                <span
                    className="block w-2 h-2 mx-auto mt-1 rounded-full"
                    style={{ backgroundColor: "var(--ion-color-tertiary)" }}
                ></span>
            ) : null;
        }
    };

    const handleDateClick = (selectedDate) => {
        setDate(selectedDate);
        const dayEvents = events.filter(
            (event) => new Date(event.dateStart).toDateString() === selectedDate.toDateString()
        );
        setSelectedEvents(dayEvents);
        setShowModal(true);
    };

    return (
        <IonPage>
            <IonContent fullscreen className="ion-padding" style={{ "--background": "var(--ion-color-white)" }}>
                <div className="min-h-full px-4 py-6">
                    <h1 className="text-3xl font-bold text-center mb-6" style={{ color: "var(--ion-color-dark)" }}>
                        Calendario de Eventos
                    </h1>

                    <div className="flex justify-center mb-6">
                        <IonButton
                            onClick={() => setIsOpenCreate(true)}
                            className="w-full max-w-sm shadow-lg hover:scale-105 transition-transform"
                            style={{
                                "--background": "var(--ion-color-tertiary)",
                                "--border-radius": "12px",
                                "--box-shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                            }}
                        >
                            <IonIcon slot="start" icon={create} />
                            Crear nueva tarea
                        </IonButton>
                    </div>

                    <div className="p-4 rounded-xl shadow-xl border" style={{ backgroundColor: "var(--ion-color-light)", borderColor: "var(--ion-color-medium-shade)" }}>
                        <Calendar
                            onChange={handleDateClick}
                            value={date}
                            tileContent={tileContent}
                            className="w-full text-sm sm:text-base"
                        />
                    </div>
                </div>

                <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
                    <div className="bg-white rounded-xl max-w-lg mx-auto p-6 shadow-xl h-full flex flex-col" style={{ backgroundColor: "var(--ion-color-white)" }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-xl" style={{ color: "var(--ion-color-dark)" }}>
                                Eventos del {date.toLocaleDateString()}
                            </h2>
                            <IonButton onClick={() => setShowModal(false)} fill="clear" className="text-gray-500">
                                <IonIcon icon={closeCircleOutline} size="large" style={{ color: "var(--ion-color-medium-shade)" }} />
                            </IonButton>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2">
                            {selectedEvents.length > 0 ? (
                                selectedEvents.map((ev) => (
                                    <div
                                        key={ev._id}
                                        className="mb-4 rounded-xl shadow-md border-l-4 p-4 hover:scale-[1.02] transition-transform"
                                        style={{
                                            backgroundColor: "var(--ion-color-light)",
                                            borderColor: "var(--ion-color-tertiary)",
                                        }}
                                    >
                                        <h3 className="font-semibold text-lg" style={{ color: "var(--ion-color-dark)" }}>
                                            {ev.title}
                                        </h3>
                                        <p className="text-gray-600">{ev.description}</p>
                                        <p className="text-sm mt-1" style={{ color: "var(--ion-color-medium)" }}>
                                            {new Date(ev.dateStart).toLocaleDateString()}
                                        </p>
                                        <div className="mt-3 flex justify-end">
                                            <IonButton
                                                onClick={() => openModalEdit(ev)}
                                                fill="clear"
                                                className="text-blue-600"
                                                style={{ "--color": "var(--ion-color-tertiary)" }}
                                            >
                                                <IonIcon slot="start" icon={pencil} />
                                                Editar
                                            </IonButton>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-10" style={{ color: "var(--ion-color-medium)" }}>
                                    No hay eventos para este día.
                                </p>
                            )}
                        </div>
                    </div>
                </IonModal>

                <FormCreateEvent
                    isOpen={isOpenCreate}
                    onClose={() => setIsOpenCreate(false)}
                    onEventCreated={handleEventCreate}
                />
                <FormCreateEvent
                    isOpen={isOpenEdit}
                    onClose={() => setIsOpenEdit(false)}
                    onEventCreated={handleEventCreate}
                    eventToEdit={eventToEdit}
                />
            </IonContent>
        </IonPage>
    );
};