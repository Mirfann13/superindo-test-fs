import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";

type Variant = {
    id: number;
    name: string;
    qty: number;
    price: number;
    image_location: string;
    product_id: number;
};

export default function MasterVariant() {
    const [products, setProducts] = useState<any[]>([]);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [editingVariant, setEditingVariant] = useState<Variant | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [resizedImage, setResizedImage] = useState<string | null>(null);
    const [productId, setProductId] = useState<number | undefined>();

    const nameRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const maxWidth = 800;
    const maxFileSize = 10240; // 10 KB

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    let newWidth = img.width;
                    let newHeight = img.height;

                    if (img.width > maxWidth) {
                        newWidth = maxWidth;
                        newHeight = (img.height * maxWidth) / img.width;
                    }

                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = newWidth;
                    canvas.height = newHeight;

                    ctx?.drawImage(img, 0, 0, newWidth, newHeight);

                    let quality = 0.7;
                    let dataUrl = canvas.toDataURL("image/jpeg", quality);

                    while (dataUrl.length > maxFileSize) {
                        quality -= 0.1;
                        dataUrl = canvas.toDataURL("image/jpeg", quality);
                    }

                    setImage(reader.result as string);
                    setResizedImage(dataUrl);
                };

                img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchVariants = () => {
        axios.get("/api/masterVariant")
            .then(res => setVariants(res.data))
            .catch(err => console.error(err));
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const values = {
            name: nameRef.current?.value,
            qty: Number(quantityRef.current?.value),
            price: Number(priceRef.current?.value),
            image_location: resizedImage,
            product_id: productId,
            active: true,
            updated_user: "admin",
            updated_date: new Date(),
            created_user: "admin",
            created_date: new Date().valueOf(),
        };

        if (editingVariant) {
            axios.put(`/api/masterVariant?id=${editingVariant.id}`, values)
                .then(() => {
                    fetchVariants();
                    setEditingVariant(null);
                })
                .catch(err => console.error(err));
        } else {
            axios.post("/api/masterVariant", values)
                .then(() => fetchVariants())
                .catch(err => console.error(err));
        }
    };

    const handleEdit = (variant: Variant) => {
        setEditingVariant(variant);
        nameRef.current!.value = variant.name;
        quantityRef.current!.value = variant.qty.toString();
        priceRef.current!.value = variant.price.toString();
        setProductId(variant.product_id);
        setImage(variant.image_location);
    };

    const handleDelete = (id: number) => {
        axios.delete(`/api/masterVariant?id=${id}`)
            .then(() => fetchVariants())
            .catch(err => console.error(err));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) router.push("/login");

        axios.get("/api/masterProduct")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));

        fetchVariants();
    }, [router]);

    return (
        <div>
            <Navbar />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Master Variant</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                            <h2>{editingVariant ? "Edit Variant" : "Add Variant"}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="p-2">
                                    <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Product Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            ref={nameRef}
                                            id="productName"
                                            name="productName"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="p-2">
                                    <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                                        Quantity
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            ref={quantityRef}
                                            id="quantity"
                                            name="quantity"
                                            type="number"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="p-2">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        Price
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            ref={priceRef}
                                            id="price"
                                            name="price"
                                            type="number"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="p-2">
                                    <label htmlFor="inputImage" className="block text-sm font-medium leading-6 text-gray-900">
                                        Input Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                    {image && <img src={image} alt="Preview" />}
                                </div>
                                <div className="p-2">
                                    <label>
                                        Product
                                        <select
                                            onChange={(e) => setProductId(Number(e.target.value))}
                                            name="productSelect"
                                            className="ml-2"
                                        >
                                            {products.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-gray-300 p-3 rounded border-2"
                                >
                                    {editingVariant ? "Update Variant" : "Add Variant"}
                                </button>
                            </form>

                            <h2 className="mt-10">Existing Variants</h2>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {variants.map((variant) => (
                                        <tr key={variant.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {variant.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {variant.qty}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {variant.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => handleEdit(variant)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(variant.id)}
                                                    className="text-red-600 hover:text-red-900 ml-4"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
