import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, SwipeableDrawer, Button, Container } from "@mui/material";
import axios from "axios";
import { transactions } from "@/transactionsSlice";

type Props = {};

export default function Cart({ addToCart, removeFromCart, cartItems, setReceiptOpen }: any) {
    const dispatch = useDispatch();
    const selectedProduct = useSelector((state: any) => state.selectedProduct);

    const calculateTotal = (items: any) =>
        items.reduce((acc: any, item: any) => acc + item.amount * item.price, 0);

    const handleSubmit = (e: React.SyntheticEvent) => {
        const dataUser = JSON.parse(`${localStorage.getItem("dataUser")}`);
        e.preventDefault();
        const values = {
            transaction_no: "",
            total_amount: calculateTotal(selectedProduct),
            active: true,
            created_user: dataUser.role,
            created_date: new Date(),
            updated_user: dataUser.role,
            updated_date: new Date(),
        };
        axios
            .post("http://localhost:4000/api/transactions", values)
            .then((res) => {
                ("====================================");
                res;
                ("====================================");
                dispatch(transactions(res.data));
                setReceiptOpen(true);
            })
            .catch((err) => {
                err;
            });
    };

    return (
        <>
            <Container
                sx={{
                    width: "400px",
                    padding: "20px",
                }}>
                <div className='w-full'>
                    {!cartItems ? <p>No Items in Cart.</p> : null}
                    {cartItems?.map((item: any) => (
                        <div className='flex justify-between '>
                            <div className='w-60'>
                                <h3>{item.name}</h3>
                                <div className='flex justify-between '>
                                    <p>Price: Rp{item.price}</p>
                                    <p>Total: Rp{(item.amount * item.price).toFixed(2)}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <Button
                                        style={{
                                            backgroundColor: "blanchedalmond",
                                            color: "Highlight",
                                        }}
                                        size='small'
                                        disableElevation
                                        variant='contained'
                                        onClick={() => removeFromCart(item.id)}>
                                        -
                                    </Button>
                                    <p>{item.amount}</p>
                                    <Button
                                        style={{
                                            backgroundColor: "blanchedalmond",
                                            color: "Highlight",
                                        }}
                                        size='small'
                                        disableElevation
                                        variant='contained'
                                        onClick={() => addToCart(item)}>
                                        +
                                    </Button>
                                </div>
                            </div>
                            <img
                                className='w-20 object-cover ml-10'
                                src={item.image_location}
                                alt={item.title}
                            />
                        </div>
                    ))}
                    <h2>Total: Rp {selectedProduct ? `${calculateTotal(selectedProduct)}` : 0}</h2>
                    <Button onClick={handleSubmit}>Order</Button>
                </div>
            </Container>
        </>
    );
}
