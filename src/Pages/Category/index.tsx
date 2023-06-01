import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

interface TCategory {
    CategoryID: number,
    Title: string,
}
const SERVER_URL = process.env.REACT_APP_API_URL;

const Categories = () => {
    const [categories, setCategories] = useState<TCategory[]>([]);

    const deleteCategory = async (id: number) => {
        try {
            await axios.delete(`${SERVER_URL}/categories/${id}`);
            setCategories(categories.filter((val: TCategory) => val.CategoryID !== id));
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        const getCategories = async () => {
            const result = await axios.get(
                `${SERVER_URL}/categories`
            );
            setCategories(result.data);
        };
        getCategories();
    }, []);

    return (
        <div className="column justify-center align-center">
            <h1 className="text-center text-5xl my-14">Categories</h1>

            <div className="flex align-center justify-center">

                <div className="column">
                    <div className="text-right">
                        <button className="w-100 text-right border-2 rounded-sm my-4 px-4 py-1 bg-green-600 text-white">
                            <Link to={`/categories/create`}> Create new Category</Link>
                        </button>
                    </div>
                    {categories.length ?
                        <table className="table-fixed">
                            <thead>
                                <tr>
                                    <th className="border border-slate-300">Id</th>
                                    <th className="border border-slate-300">Title</th>
                                    <th className="border border-slate-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category: TCategory) => {
                                    return (
                                        <tr key={category.CategoryID}>
                                            <td className="border border-slate-300 px-4 w-auto">{category.CategoryID}</td>
                                            <td className="border border-slate-300 px-4 w-auto">
                                                <Link to={`/categories/${category.CategoryID}`} className="underline text-blue-700">{category.Title}</Link>
                                            </td>
                                            <td className="border border-slate-300 px-4 h-10 w-20">
                                                <div className="flex">
                                                    <Link to={`/categories/edit/${category.CategoryID}`} className="bg-blue-500 text-white px-4 rounded-sm mr-1 text-white-700">Edit</Link>
                                                    <div onClick={() => deleteCategory(category.CategoryID)} className="cursor-pointer bg-red-500 text-white px-4 rounded-sm ml-1">Delete</div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        :
                        <p>No data in Categories table.</p>
                    }
                </div>
            </div>

        </div>
    )
}

export default Categories;