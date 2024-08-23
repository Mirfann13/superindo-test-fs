import Image from "next/image";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Grid } from "@mui/material";
import Products from "@/components/Product";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "@/apiSlice";
import { useRouter } from "next/router";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { selectProduct, clearSelectedProduct } from "@/selectedProductSlice";
import Modal from "@mui/material/Modal";
import Receipt from "@/components/receipt";
import Box from "@mui/material/Box";
import { useReactToPrint } from "react-to-print";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

type dataUser = {
    nama: string;
    role: string;
    email: string;
    token: string;
};

export default function Home() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state: any) => state.apiData);
    const [cartItems, setCartItems] = useState<any>([]);
    const [receiptOpen, setReceiptOpen] = useState(false);
    const selectedProduct = useSelector((state: any) => state.selectedProduct);
    const [dataUser, setDataUser] = useState<dataUser>();

    const componentRef: any = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) router.push("/login");
        dispatch(fetchApiData());
    }, []);

    const handleAddToCart = (clickedItem: any) => {
        setCartItems((prev: any) => {
            const isItemInCart = prev.find((item: any) => item.id === clickedItem.id);

            if (isItemInCart) {
                return prev.map((item: any) =>
                    item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
                );
            }

            return [...prev, { ...clickedItem, amount: 1 }];
        });
    };

    const handleRemoveFromCart = (id: number) => {
        id;
        setCartItems((prev: any) =>
            prev.reduce((acc: any, item: any) => {
                if (item.id === id) {
                    if (item.amount === 1) {
                        dispatch(selectProduct(acc.filter((cartItem: any) => cartItem.id !== id)));
                        return acc.filter((cartItem: any) => cartItem.id !== id);
                    } else {
                        const updatedItem = { ...item, amount: item.amount - 1 };
                        dispatch(
                            selectProduct([
                                ...acc.filter((cartItem: any) => cartItem.id !== id),
                                updatedItem,
                            ])
                        );
                        return [...acc.filter((cartItem: any) => cartItem.id !== id), updatedItem];
                    }
                } else {
                    dispatch(selectProduct([...acc, item]));
                    return [...acc, item];
                }
            }, [])
        );
    };

    useEffect(() => {
        const data = JSON.parse(`${localStorage.getItem("dataUser")}`);
        setDataUser(data);
        dispatch(selectProduct(cartItems));
    }, [cartItems]);

    cartItems;
    selectedProduct;
    ("====================================");

    return (
        <div>
            <Modal open={receiptOpen} onClose={() => setReceiptOpen(false)}>
                <Box sx={style}>
                    <div ref={componentRef}>
                        <Receipt />
                    </div>
                    <div className='w-full  flex justify-center'>
                        <button
                            className='text-sky-500 border p-3 m-2 rounded shadow-xl bg-yellow-100'
                            onClick={handlePrint}>
                            Cetak Receipt
                        </button>
                    </div>
                </Box>
            </Modal>
            <div className='min-h-full'>
                <Navbar
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                    cartItems={cartItems}
                    setReceiptOpen={setReceiptOpen}
                />

                <header className='bg-white shadow'>
                    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                        <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Product</h1>
                    </div>
                </header>
                <main>
                    <Grid
                        container
                        padding={"10px"}
                        justifyContent={"center"}
                        spacing={4}
                        width={"100%"}>
                        {data.map((product: any, index: number) => (
                            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                <Card elevation={0} style={{ maxWidth: "100%", boxShadow: "none" }}>
                                    <CardMedia
                                        style={{
                                            height: 200,
                                        }}
                                        image={product.image_location}
                                        title={product.name}
                                    />
                                    <CardContent>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}>
                                            <Typography fontSize='18px' gutterBottom>
                                                {product.name}
                                            </Typography>
                                            <Typography fontSize='18px' color='textSecondary'>
                                                Rp. {product.price}
                                            </Typography>
                                        </div>
                                        {dataUser?.role === "customer" && (
                                            <Button
                                                onClick={() => handleAddToCart(product)}
                                                style={{
                                                    backgroundColor: "blanchedalmond",
                                                }}>
                                                Add to Cart
                                            </Button>
                                        )}

                                        <Typography fontSize='14px' color='textSecondary'>
                                            {product.category}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </main>
            </div>
        </div>
    );
}
