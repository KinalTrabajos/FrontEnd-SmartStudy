import React, { useState, useEffect } from 'react';
import {
    IonContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonInput,
    IonAlert,
    IonTextarea,
    IonSpinner
} from '@ionic/react';
import { trashOutline, pencilOutline, createOutline } from 'ionicons/icons';
import { useGetProducts } from '../../shared/hooks/products/useGetProducts';
import { useConfirmPurchase } from '../../shared/hooks/products/useConfirmPurchase';
import { useCreateProduct } from '../../shared/hooks/products/useCreateProduct';
import { useDeleteProduct } from '../../shared/hooks/products/useDeleteProduct';
import { useUpdateProduct } from '../../shared/hooks/products/useUpdateProduct';
import { useShoppingCart } from '../../shared/hooks/products/useShoppingCart';

export const ProductsPage = () => {
    // Extraemos los estados de carga y error del hook useGetProducts
    const { products, isLoading: productsLoading, error: productsError, getProducts } = useGetProducts();
    const { createProduct } = useCreateProduct();
    const { deleteProduct } = useDeleteProduct();
    const { updateProduct } = useUpdateProduct();
    const { cart, isLoading: cartLoading, addProductToCart } = useShoppingCart();
    const { confirmPurchase } = useConfirmPurchase();

    const [userLogged, setUserLogged] = useState(null);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) setUserLogged(user);
        } catch (e) {
            console.error("Error parsing user from localStorage", e);
        }
    }, []);

    // Llama a getProducts una vez al cargar el componente
    useEffect(() => {
        getProducts();
    }, [getProducts]); // Añadimos getProducts como dependencia para asegurar que se vuelva a llamar si la función cambia (aunque en este caso no lo hará).

    const isAdmin = userLogged?.role === 'ADMIN_ROLE';

    const calculateTotal = () => {
        if (!cart || !cart.keeperProduct) return 0;
        return cart.keeperProduct
            .reduce((total, item) => total + (item.product?.pricePoints || 0) * item.amountProduct, 0)
            .toFixed(2);
    };

    const handleConfirmPurchase = async () => {
        if (!userLogged) {
            setAlertMessage('Debes iniciar sesión para realizar una compra.');
            setShowAlert(true);
            return;
        }

        const totalPoints = parseFloat(calculateTotal());

        if (userLogged.points < totalPoints) {
            setAlertMessage('No tienes suficientes puntos para realizar esta compra.');
            setShowAlert(true);
            return;
        }

        const success = await confirmPurchase(cart);
        if (success) {
            setAlertMessage(`¡Compra exitosa! Se han descontado ${totalPoints} puntos de tu cuenta.`);
            setShowAlert(true);
            setIsCartModalOpen(false);
        } else {
            setAlertMessage('Ocurrió un error al procesar la compra.');
            setShowAlert(true);
        }
    };

    const handleAddProduct = async (newProduct) => {
        await createProduct(newProduct);
        await getProducts(); // Recarga los productos después de crear uno nuevo
        setIsAddProductModalOpen(false);
    };

    const handleUpdateProduct = async (updatedProduct) => {
        await updateProduct(updatedProduct._id, updatedProduct);
        await getProducts(); // Recarga los productos después de actualizar uno
        setIsUpdateProductModalOpen(false);
    };

    const handleDeleteProduct = async (productId) => {
        await deleteProduct(productId);
        await getProducts(); // Recarga los productos después de eliminar uno
    };

    const openUpdateModal = (product) => {
        setProductToUpdate(product);
        setIsUpdateProductModalOpen(true);
    };

    // Renderizado condicional basado en los estados del hook
    if (productsLoading) {
        return (
            <IonContent className="ion-padding flex flex-col justify-center items-center h-full">
                <IonSpinner name="crescent" color="tertiary" />
                <p className="mt-4 text-center text-gray-500">Cargando productos...</p>
            </IonContent>
        );
    }

    if (productsError) {
        return (
            <IonContent className="ion-padding flex justify-center items-center h-full">
                <p className="text-red-500 text-center">Error al cargar productos: {productsError}</p>
            </IonContent>
        );
    }

    // Si no hay productos y no hay errores ni carga, muestra un mensaje
    if (!products || products.length === 0) {
        return (
            <IonContent className="ion-padding flex justify-center items-center h-full">
                <p className="text-lg text-gray-500 text-center">No hay productos disponibles.</p>
            </IonContent>
        );
    }

    // Renderizado principal si los datos están disponibles
    return (
        <IonContent>
            <div className="p-4">
                <h1 className="text-4xl font-bold text-center my-6">Productos</h1>

                {isAdmin && (
                    <div className="mb-4 flex justify-center">
                        <IonButton
                            expand="block"
                            onClick={() => setIsAddProductModalOpen(true)}
                            className="max-w-sm"
                        >
                            <IonIcon icon={createOutline} slot="start" />
                            Agregar Nuevo Producto
                        </IonButton>
                    </div>
                )}

                <IonGrid>
                    <IonRow>
                        {products.map((product) => (
                            <IonCol size="12" sizeMd="6" sizeLg="4" key={product._id}>
                                <IonCard className="shadow-lg rounded-2xl overflow-hidden">
                                    <IonCardHeader>
                                        <IonCardTitle className="text-xl">{product.nameProduct}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        <p className="text-lg font-bold mb-2">💰 {product.pricePoints.toFixed(2)} puntos</p>
                                        <p className="text-sm mb-4 text-gray-600">{product.descriptionProduct}</p>
                                        <div className="flex gap-2">
                                            <IonButton
                                                expand="block"
                                                onClick={() => addProductToCart(product._id, 1)}
                                                disabled={cartLoading}
                                            >
                                                Agregar al Carrito
                                            </IonButton>
                                            {isAdmin && (
                                                <>
                                                    <IonButton onClick={() => openUpdateModal(product)} color="warning">
                                                        <IonIcon icon={pencilOutline} />
                                                    </IonButton>
                                                    <IonButton onClick={() => handleDeleteProduct(product._id)} color="danger">
                                                        <IonIcon icon={trashOutline} />
                                                    </IonButton>
                                                </>
                                            )}
                                        </div>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>

                <div className="fixed bottom-4 right-4 z-10">
                    <IonButton
                        onClick={() => setIsCartModalOpen(true)}
                        color="secondary"
                        className="w-16 h-16 rounded-full shadow-lg"
                    >
                        🛒
                    </IonButton>
                </div>

                <IonModal isOpen={isCartModalOpen} onDidDismiss={() => setIsCartModalOpen(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Carrito de Compras</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsCartModalOpen(false)}>Cerrar</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        {cart?.keeperProduct && cart.keeperProduct.length > 0 ? (
                            <>
                                <IonList>
                                    {cart.keeperProduct.map((item) => (
                                        <IonItem key={item.product?._id || item._id}>
                                            <img src={item.product?.imageUrl || 'https://via.placeholder.com/150'} className="w-12 h-12 mr-4" alt={item.product?.nameProduct} />
                                            <IonLabel>
                                                <h3>{item.product?.nameProduct}</h3>
                                                <p>Cantidad: {item.amountProduct}</p>
                                                <p>Precio: ${((item.product?.pricePoints || 0) * item.amountProduct).toFixed(2)}</p>
                                            </IonLabel>
                                            <IonButton slot="end" fill="clear" color="danger">
                                                <IonIcon icon={trashOutline} />
                                            </IonButton>
                                        </IonItem>
                                    ))}
                                </IonList>
                                <div className="mt-4 text-right">
                                    <p className="text-xl font-bold">Total a pagar: ${calculateTotal()}</p>
                                    {userLogged?.points && <p className="text-sm text-gray-500">Tus puntos: {userLogged.points.toFixed(2)}</p>}
                                </div>
                                <IonButton expand="block" className="mt-4" onClick={handleConfirmPurchase}>
                                    Confirmar Compra
                                </IonButton>
                            </>
                        ) : (
                            <div className="text-center mt-8">
                                <p className="text-lg text-gray-500">Tu carrito está vacío.</p>
                            </div>
                        )}
                    </IonContent>
                </IonModal>

                <IonModal isOpen={isAddProductModalOpen} onDidDismiss={() => setIsAddProductModalOpen(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Agregar Nuevo Producto</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsAddProductModalOpen(false)}>Cerrar</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target;
                                const newProduct = {
                                    name: form.name.value,
                                    price: parseFloat(form.price.value),
                                    description: form.description.value,
                                };
                                handleAddProduct(newProduct);
                                form.reset();
                            }}
                        >
                            <IonList>
                                <IonItem>
                                    <IonLabel position="floating">Nombre del Producto</IonLabel>
                                    <IonInput name="name" type="text" required></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Precio</IonLabel>
                                    <IonInput name="price" type="number" step="0.01" required></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Descripción</IonLabel>
                                    <IonTextarea name="description"></IonTextarea>
                                </IonItem>
                            </IonList>
                            <IonButton type="submit" expand="block" className="mt-6">
                                Guardar Producto
                            </IonButton>
                        </form>
                    </IonContent>
                </IonModal>

                <IonModal isOpen={isUpdateProductModalOpen} onDidDismiss={() => setIsUpdateProductModalOpen(false)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Editar Producto</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setIsUpdateProductModalOpen(false)}>Cerrar</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        {productToUpdate && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.target;
                                    const updatedProduct = {
                                        ...productToUpdate,
                                        nameProduct: form.name.value,
                                        pricePoints: parseFloat(form.price.value),
                                        descriptionProduct: form.description.value,
                                    };
                                    handleUpdateProduct(updatedProduct);
                                }}
                            >
                                <IonList>
                                    <IonItem>
                                        <IonLabel position="floating">Nombre del Producto</IonLabel>
                                        <IonInput name="name" type="text" defaultValue={productToUpdate.nameProduct} required></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Precio</IonLabel>
                                        <IonInput name="price" type="number" step="0.01" defaultValue={productToUpdate.pricePoints} required></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Descripción</IonLabel>
                                        <IonTextarea name="description" defaultValue={productToUpdate.descriptionProduct}></IonTextarea>
                                    </IonItem>
                                </IonList>
                                <IonButton type="submit" expand="block" className="mt-6">
                                    Guardar Cambios
                                </IonButton>
                            </form>
                        )}
                    </IonContent>
                </IonModal>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Mensaje"
                    message={alertMessage}
                    buttons={['OK']}
                />
            </div>
        </IonContent>
    );
};