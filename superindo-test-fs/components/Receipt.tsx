import React from "react";
import { useDispatch, useSelector } from "react-redux";
type Props = {};

export default function Receipt({ }: Props) {
    const selectedProduct = useSelector((state: any) => state.selectedProduct);
    const transactionsProduct = useSelector((state: any) => state.transactions);

    return (
        <div className='flex justify-center'>
            <div className='block  p-6 shadow-lg bg-white m-auto'>
                <div className='pt-10 border-b-2 border-dashed border-black'>
                    <h1 className='text-xl mb-1 uppercase text-center '>
                        Receipt of Sale <span className='text-2xl block'>Superindo</span>
                    </h1>
                    <h2 className='text-sm text-gray-500 font-light'>
                        Address: Lorem Ipsum, 1234-5{" "}
                        <span className='block'>Tel: +1 012 345 67 89</span>
                    </h2>
                </div>
                <div className='mt-6'>
                    <div className='flex justify-center gap-x-6'>
                        <div className='date'>{`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`}</div>
                        <div className='time'>11:13:06 AM</div>
                    </div>

                    <div className='mt-6'>
                        <table className='w-full'>
                            <thead className='relative py-1'>
                                <th>QTY</th>
                                <th>ITEM</th>
                                <th>PRICE</th>
                            </thead>
                            <tbody>
                                {selectedProduct.map((data: any, index: any) => (
                                    <tr key={index}>
                                        <td>{data.amount}</td>
                                        <td>{data.name}</td>
                                        <td>{data.price}</td>
                                    </tr>
                                ))}
                            </tbody>

                            <tfoot className='relative'>
                                <tr>
                                    <td>Total</td>
                                    <td></td>
                                    <td>Rp {transactionsProduct.total_amount.toFixed("2")}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
