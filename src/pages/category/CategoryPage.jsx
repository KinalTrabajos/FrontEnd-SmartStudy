import React from 'react';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonSpinner, IonButton, IonIcon } from '@ionic/react';
import { useGetCategory } from '../../shared/hooks/category/useGetCategory';
import { useEffect, useState } from 'react';
import { create} from 'ionicons/icons';

export const CategoryPage = () => {
    const { categories, getCategory } = useGetCategory();
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            await getCategory()
            setLoading(false)
        };
        fetchCategories()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <IonSpinner name="crescent" />
                <p className="ml-3 text-lg">Cargando categorías...</p>
            </div>
        );
    }


    return (
        <div className="p-6 animate-fade-in">
            <h1 className="text-4xl font-bold text-center mb-6 text-blue-800">Categorias</h1>
            <IonButton
                onClick={() => setIsOpen(true)}
                expand="block"
                className="mb-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl shadow-xl transition-transform transform hover:scale-105"
            >
                <IonIcon slot="start" icon={create} />
                    Solicitar Categoria
            </IonButton>

            <IonAccordionGroup expand="inset">
                {(Array.isArray(categories) ? categories : []).map((category, index) => (
                    <IonAccordion key={index} value={`accordion-${index}`}>
                        <IonItem slot="header" color="light">
                            <IonLabel>{category.nameSubject}</IonLabel>
                        </IonItem>
                        <div className="ion-padding" slot="content">
                            {category.descriptionSubject}
                        </div>
                    </IonAccordion>
                ))}
            </IonAccordionGroup>
        </div>
    );
}

