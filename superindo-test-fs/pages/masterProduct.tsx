import React, { useRef, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";

type Product = {
    id: number;
    name: string;
    product_category_id: number;
    active: boolean;
    plu: string;
};

export default function MasterProduct() {
    const nameRef = useRef<HTMLInputElement>(null);
    const [dataCategory, setDataCategory] = useState<any[]>([]);
    const [dataProducts, setDataProducts] = useState<Product[]>([]);
    const [categoryId, setCategoryId] = useState<number | undefined>();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const router = useRouter();

    const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(Number(e.target.value));
    };

    const handleSelectProduct = (id: number) => {
        const selectedProduct = dataProducts.find((product) => product.id === id);
        if (selectedProduct) {
            setSelectedProductId(id);
            nameRef.current!.value = selectedProduct.name;
            setCategoryId(selectedProduct.product_category_id);
        }
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const values = {
            name: nameRef.current?.value,
            active: true,
            updated_user: "admin",
            updated_date: new Date(),
            created_user: "admin",
            created_date: new Date().valueOf(),
            product_category_id: categoryId,
            plu: "null",
        };

        if (selectedProductId) {
            axios
                .put(`/api/masterProduct?id=${selectedProductId}`, values)
                .then(() => {
                    fetchProducts();
                    resetForm();
                })
                .catch((err) => console.error(err));
        } else {
            axios
                .post("/api/masterProduct", values)
                .then(() => {
                    fetchProducts();
                    resetForm();
                })
                .catch((err) => console.error(err));
        }
    };

    const handleDelete = (id: number) => {
        axios
            .delete(`/api/masterProduct?id=${id}`)
            .then(() => {
                fetchProducts();
                resetForm();
            })
            .catch((err) => console.error(err));
    };

    const fetchProducts = () => {
        axios
            .get("/api/masterProduct")
            .then((res) => {
                setDataProducts(res.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) router.push("/login");

        axios
            .get("/api/masterCategory")
            .then((res) => setDataCategory(res.data))
            .catch((err) => console.error(err));

        fetchProducts();
    }, []);

    const resetForm = () => {
        nameRef.current!.value = "";
        setCategoryId(undefined);
        setSelectedProductId(null);
    };

    return (
        <div>
            <Navbar />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Master Product
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                            <h2 className="">Manage Products</h2>

                            <div>
                                <form onSubmit={handleSubmit} className="">
                                    <div className="p-2">
                                        <label
                                            htmlFor="product"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Product Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                ref={nameRef}
                                                id="product"
                                                name="product"
                                                type="text"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <label>
                                            Category
                                            <select
                                                onChange={handleSelectCategory}
                                                value={categoryId}
                                                name="selectCategoryProd"
                                            >
                                                <option value="">Select Category</option>
                                                {dataCategory.map((item: any) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                    <button type="submit" className="p-2 bg-blue-500 text-white">
                                        {selectedProductId ? "Update Product" : "Add Product"}
                                    </button>
                                    {selectedProductId && (
                                        <button
                                            type="button"
                                            onClick={() => resetForm()}
                                            className="p-2 ml-2 bg-gray-500 text-white"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </form>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-medium">Product List</h3>
                                <ul>
                                    {dataProducts.map((product) => (
                                        <li key={product.id} className="flex justify-between items-center">
                                            <span>{product.name}</span>
                                            <div>
                                                <button
                                                    onClick={() => handleSelectProduct(product.id)}
                                                    className="p-2 bg-yellow-500 text-white"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 ml-2 bg-red-500 text-white"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
