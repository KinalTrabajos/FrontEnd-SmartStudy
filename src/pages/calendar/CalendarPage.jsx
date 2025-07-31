import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonButton, IonIcon, IonItem, IonLabel, IonInput, IonTextarea, IonDatetime, IonButtons } from "@ionic/react";
import { useGetEvents } from "../../shared/hooks/event/useGetEvents";
import { create, trash, reorderFourOutline } from 'ionicons/icons';
import { FormCreateEvent } from "../../components/Calendar/FormCreateEvent";
import { useForm, Controller } from 'react-hook-form';
import { useCreateEvent } from "../../shared/hooks/event/useCreateEvent";

export const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const { getEvents, events } = useGetEvents();
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const { createEvent } = useCreateEvent();
    const [userLogged] = useState(() => JSON.parse(localStorage.getItem('user')))
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString());

    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            title: '',
            description: '',
            dateStart: new Date().toISOString(),
            user: userLogged.id
        },
    });

    useEffect(() => {
        getEvents()
    }, [])

    const handleEventCreate = async () => {
        await getEvents()
    }

    const tileContent = ({ date }) => {
        const dayEvents = events.filter(
            (event) => new Date(event.dateStart).toDateString() === date.toDateString()
        );

        return dayEvents.length > 0 ? (
            <span style={{ color: "red", fontSize: "1.2em" }} >*</span>
        ) : null
    }

    const handleDateClick = (selectedDate) => {
        setDate(selectedDate);
        const dayEvents = events.filter(
            (event) => new Date(event.dateStart).toDateString() === selectedDate.toDateString()
        );
        setSelectedEvents(dayEvents);
        setShowModal(true)
    }

    const onSubmit = async (data) => {
        try {
            await createEvent(data);
            reset();
            setSelectedDate('');
        } catch (error) {
            console.error("Error creando evento:", error);
        }
    }

    const handleDismiss = () => {
        reset();
        setSelectedDate('');
    }

    return (
        <IonPage>

            <h1 className="text-4xl font-bold text-center mb-6 text-blue-800">Mi Calendario</h1>
            <IonContent className="ion-padding">
                <Calendar
                    onChange={handleDateClick}
                    value={date}
                    tileContent={tileContent}
                />


                <IonContent className="ion-padding">
                    <IonItem>
                        <IonLabel position="stacked">Titulo del evento</IonLabel>
                        <IonInput placeholder="Ej: Examen de Matematicas" {...register('title', { required: true })} />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Descripción</IonLabel>
                        <IonTextarea placeholder="Detalles del evento" {...register('description')} />
                    </IonItem>

                    <IonItem>
                        <IonLabel position="stacked">Fecha del Evento</IonLabel>
                        <Controller
                            name="dateStart"
                            control={control}
                            render={({ field }) => (
                                <>
                                    <IonDatetime
                                        presentation="date"
                                        value={field.value}
                                        min={new Date().toISOString().split('T')[0]}
                                        onIonChange={(e) => {
                                            field.onChange(e.detail.value);
                                            setSelectedDate(e.detail.value);
                                        }}
                                        style={{ width: '100%' }}
                                    />
                                    {selectedDate && (
                                        <p className="text-sm mt-2">
                                            Fecha seleccionada:{" "}
                                            <strong>
                                                {new Date(selectedDate).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </strong>
                                        </p>
                                    )}
                                </>
                            )}
                        />
                    </IonItem>
                    <IonButton
                        onClick={handleSubmit(onSubmit)}
                        expand="block"
                        className="mb-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl shadow-xl transition-transform transform hover:scale-105"
                    >
                        <IonIcon slot="start" icon={create} />
                        Crear nueva tarea
                    </IonButton>
                </IonContent>

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
                                    <h3>{ev.title}</h3>
                                    <h4>{ev.description}</h4>
                                    <h4>{ev.dateStart}</h4>
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