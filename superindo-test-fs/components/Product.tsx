import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectProduct, clearSelectedProduct } from "@/selectedProductSlice";

function Products({ products }: any) {
    // const classes: any = useStyles();
    const dispatch = useDispatch();
    const selectedProduct = useSelector((state: any) => state.selectedProduct);

    const handleAddToCart = (index: any) => {
        let newCart = [];
        newCart.push(products[index]);
        dispatch(selectProduct(newCart));
    };
    ("====================================");
    selectedProduct;
    ("====================================");
    return (
        <Card elevation={0} style={{ maxWidth: "100%", boxShadow: "none" }}>
            <CardMedia
                style={{
                    height: 200,
                }}
                image={"vercel.svg"}
                title={products.name}
            />
            <CardContent>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                    <Typography fontSize='18px' gutterBottom>
                        {products.name}
                    </Typography>
                    <Typography fontSize='18px' color='textSecondary'>
                        Rp. {products.price}
                    </Typography>
                </div>
                <Button
                    onClick={handleAddToCart}
                    style={{
                        backgroundColor: "blanchedalmond",
                    }}>
                    Add to Cart
                </Button>
                <Typography fontSize='14px' color='textSecondary'>
                    {products.category}
                </Typography>
            </CardContent>
            {/* <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions> */}
        </Card>
    );
}

export default Products;
