import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import { AccountCircleOutlined, ShoppingBagOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Popover from "@mui/material/Popover";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, SwipeableDrawer } from "@mui/material";
import Cart from "./Cart";

interface State extends SnackbarOrigin {
    open: boolean;
}

type Props = {};

type dataUSer = {
    email: string;
    role: string;
    token: string;
    userId: number;
};

export const Navbar = ({ addToCart, removeFromCart, cartItems, setReceiptOpen }: any) => {
    const [dataUser, setDataUser] = useState<dataUSer>();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const selectedProduct = useSelector((state: any) => state.selectedProduct);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getTotalItems = (items: any) =>
        items.reduce((acc: any, item: any) => acc + item.amount, 0);

    // const totalAmount = cartItems?.reduce((accumulator: any, currentValue: any): any => {
    //     return accumulator + currentValue.amount;
    // }, 0);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    useEffect(() => {
        const data: any = JSON.parse(`${localStorage.getItem("dataUser")}`);
        setDataUser(data);
    }, []);

    const handleSignOut = () => {
        localStorage.clear();
        location.reload();
    };
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {dataUser?.role === "customer" && (
                <SwipeableDrawer
                    anchor={"right"}
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    onOpen={() => setIsOpen(true)}>
                    <Cart
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        cartItems={cartItems}
                        setReceiptOpen={setReceiptOpen}
                    />
                </SwipeableDrawer>
            )}
            <nav className='bg-gray-800'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='flex h-16 items-center justify-between'>
                        <div className='flex items-center'>
                            <div className='flex-shrink-0'>
                                <img
                                    className='h-8 w-8'
                                    src='super-indo-logo-png-transparent.png'
                                    alt='Your Company'
                                />
                            </div>
                            <div className='hidden md:block'>
                                <div className='ml-10 flex items-baseline space-x-4'>
                                    <p
                                        onClick={() => router.push("/")}
                                        className=' text-white rounded-md px-3 py-2 text-sm font-medium'
                                        aria-current='page'>
                                        Product
                                    </p>
                                    {dataUser?.role === "admin" && (
                                        <>
                                            <p
                                                onClick={() => router.push("/masterProduct")}
                                                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                                                Master Product
                                            </p>
                                            <p
                                                onClick={() => router.push("/masterCategory")}
                                                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                                                Master Category
                                            </p>
                                            <p
                                                onClick={() => router.push("/masterVariant")}
                                                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                                                Master Variant
                                            </p>
                                            <p
                                                onClick={() => router.push("/masterTransaction")}
                                                className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
                                                Transaction
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='hidden md:block'>
                            <div className='ml-4 flex items-center md:ml-6 justify-between'>
                                {" "}
                                {dataUser?.role === "customer" && (
                                    <IconButton
                                        aria-label='Show cart items'
                                        color='inherit'
                                        onClick={() => setIsOpen(true)}>
                                        <Badge
                                            badgeContent={getTotalItems(cartItems)}
                                            color='error'>
                                            <ShoppingBagOutlined
                                                style={{
                                                    color: "white",
                                                }}
                                            />
                                        </Badge>
                                    </IconButton>
                                )}
                                <div>
                                    <IconButton onClick={handleClick}>
                                        <AccountCircleOutlined
                                            style={{
                                                color: "white",
                                            }}
                                        />
                                    </IconButton>

                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center",
                                        }}>
                                        <div className='mt-3 space-y-1 px-2 mb-3'>
                                            <a
                                                href='#'
                                                className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'>
                                                Your Profile
                                            </a>
                                            <a
                                                href='#'
                                                className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'>
                                                Settings
                                            </a>
                                            <p
                                                onClick={handleSignOut}
                                                className='block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white'>
                                                Sign out
                                            </p>
                                        </div>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
