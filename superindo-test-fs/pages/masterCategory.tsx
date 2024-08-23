import { Navbar } from "@/components/Navbar";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

type Category = {
    id: number;
    name: string;
    active: boolean;
};

export default function MasterCategory({ }: Props) {
    const nameRef = useRef<HTMLInputElement>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [activeStatus, setActiveStatus] = useState<string>("true");

    const router = useRouter();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const values = {
            name: nameRef.current?.value,
            active: activeStatus === "true",
            updated_user: "admin",
            updated_date: new Date(),
            created_user: "admin",
            created_date: new Date().valueOf(),
        };
        const valuesUp = {
            name: nameRef.current?.value,
            active: activeStatus === "true",
            updated_user: "admin",
            updated_date: new Date(),
            created_user: "admin",
        };

        if (selectedCategoryId) {
            axios
                .put(`/api/masterCategory?id=${selectedCategoryId}`, values)
                .then(() => {
                    fetchCategories();
                    resetForm();
                })
                .catch((err) => console.error(err));
        } else {
            axios
                .post("/api/masterCategory", values)
                .then(() => {
                    fetchCategories();
                    resetForm();
                })
                .catch((err) => console.error(err));
        }
    };

    const handleSelectCategory = (id: number) => {
        const selectedCategory = categories.find((category) => category.id === id);
        if (selectedCategory) {
            setSelectedCategoryId(id);
            nameRef.current!.value = selectedCategory.name;
            setActiveStatus(selectedCategory.active ? "true" : "false");
        }
    };

    const handleDelete = (id: number) => {
        axios
            .delete(`/api/masterCategory?id=${id}`)
            .then(() => {
                fetchCategories();
                resetForm();
            })
            .catch((err) => console.error(err));
    };

    const fetchCategories = () => {
        axios
            .get("/api/masterCategory")
            .then((res) => setCategories(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) router.push("/login");
        fetchCategories();
    }, []);

    const resetForm = () => {
        nameRef.current!.value = "";
        setActiveStatus("true");
        setSelectedCategoryId(null);
    };

    return (
        <div>
            <Navbar />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Master Category
                    </h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                            <h2 className="">Manage Categories</h2>

                            <div>
                                <form onSubmit={handleSubmit} className="">
                                    <div className="p-2">
                                        <label
                                            htmlFor="category"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Category Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                ref={nameRef}
                                                id="category"
                                                name="category"
                                                type="text"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <label>
                                            Status
                                            <select
                                                name="selectedRole"
                                                value={activeStatus}
                                                onChange={(e) => setActiveStatus(e.target.value)}
                                            >
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </label>
                                    </div>
                                    <button type="submit" className="p-2 bg-blue-500 text-white">
                                        {selectedCategoryId ? "Update Category" : "Add Category"}
                                    </button>
                                    {selectedCategoryId && (
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
                                <h3 className="text-lg font-medium">Category List</h3>
                                <ul>
                                    {categories.map((category) => (
                                        <li key={category.id} className="flex justify-between items-center">
                                            <span>{category.name}</span>
                                            <div>
                                                <button
                                                    onClick={() => handleSelectCategory(category.id)}
                                                    className="p-2 bg-yellow-500 text-white"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category.id)}
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
