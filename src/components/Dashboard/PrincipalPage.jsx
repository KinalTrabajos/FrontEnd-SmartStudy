import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent
} from "@ionic/react";

export const PrincipalPage = () => {
  return (
    <div id="menu-content" className="bg-gradient-to-br from-indigo-50 to-purple-100 text-gray-800 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-12 lg:p-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 mb-4 leading-tight">
            SmartStudy
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            Organiza tu vida, <span className="text-purple-600">alcanza tus metas.</span>
          </p>
        </header>

        <section className="mb-12 text-center">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            ¡Bienvenido a <span className="font-semibold text-indigo-600">SmartStudy</span>! Tu solución definitiva para mantener tus tareas bajo control y tu agenda perfectamente organizada. Deja atrás el estrés de olvidar pendientes y da la bienvenida a la claridad y la productividad.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">

          <div className="bg-indigo-50 p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
            <div className="text-indigo-500 text-4xl mb-4">
              
              <i className="fas fa-tasks"></i>
            </div>
            <h3 className="text-2xl font-bold text-indigo-700 mb-2">Gestión Inteligente de Tareas</h3>
            <p className="text-gray-600">
              Crea, prioriza y haz seguimiento a tus tareas sin esfuerzo. Define fechas límite, configura recordatorios y categoriza tus pendientes para una máxima productividad.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
            <div className="text-purple-500 text-4xl mb-4">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3 className="text-2xl font-bold text-purple-700 mb-2">Vista de Calendario Intuitiva</h3>
            <p className="text-gray-600">
              Visualiza tu horario de un vistazo. Añade eventos, citas y fechas importantes directamente a tu calendario de forma rápida y sencilla.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
            <div className="text-green-500 text-4xl mb-4">
              <i className="fas fa-sync-alt"></i>
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">Sincronización Perfecta</h3>
            <p className="text-gray-600">
              Accede a tus tareas y eventos desde cualquier lugar y en cualquier momento. Tu información siempre estará actualizada en todos tus dispositivos.
            </p>
          </div>

          <div className="bg-yellow-50 p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
            <div className="text-yellow-500 text-4xl mb-4">
              <i className="fas fa-palette"></i>
            </div>
            <h3 className="text-2xl font-bold text-yellow-700 mb-2">Diseño Hermoso y Sencillo</h3>
            <p className="text-gray-600">
              Disfruta de una interfaz limpia, intuitiva y fácil de usar, diseñada para mejorar tu enfoque y minimizar las distracciones.
            </p>
          </div>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            ¡Mira lo que puedes lograr!
          </h2>
          <div className="bg-gray-100 rounded-2xl p-8 border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[250px] md:min-h-[350px] text-gray-500 text-lg md:text-xl italic">

          </div>
          <p className="mt-4 text-gray-500 text-sm">
            (Espacio para capturas de pantalla o un video demo de tu aplicación)
          </p>
        </section>

        <section className="mb-12 text-center">
          <p className="text-md text-gray-500">
           Nuestra aplicación te ofrece una experiencia rápida, fluida y confiable, diseñada para adaptarse perfectamente a tu estilo de vida digital.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            ¿Listo para tomar el control de tu tiempo?
          </h2>
          <a href="#" className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xl md:text-2xl font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out btn-hover">
            ¡Empezar ahora!
          </a>
        </section>
      </div>
    </div>
  );
};
