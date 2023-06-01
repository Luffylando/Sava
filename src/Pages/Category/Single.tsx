import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';

interface TCategory {
    CategoryID: number,
    Title: string
}
const SERVER_URL = process.env.REACT_APP_API_URL;

const SingleCategory = () => {
    const [category, setCategory] = useState<TCategory>();
    const { id } = useParams();
    const navigate = useNavigate();

    const deleteCategory = async (id: number) => {
        try {
            await axios.delete(`${SERVER_URL}/categories/${id}`);
            navigate('/categories');
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        try {
            const getCategory = async () => {
                const result = await axios.get(`${SERVER_URL}/categories/${id}`)
                setCategory(result.data.category);
            }
            getCategory();
        } catch (error) {
            throw new Error('404');
        }
    }, [id])

    return (
        <div className="column justify-center align-center">
            <h1 className="text-center text-5xl my-14">Category</h1>
            <div className="column border px-20 py-10 rounded-md">
                {category ?
                    <>
                        <div className="flex mb-4">
                            <p className="text-2xl bold">CategoryID:</p><p className="text-xl bold flex ml-4"> {category?.CategoryID}</p>
                        </div>
                        <div className="flex mb-4">
                            <p className="text-2xl bold">Title:</p><p className="text-xl bold flex align-center justify-center ml-4"> {category?.Title}</p>
                        </div>

                        <div className="flex">
                            <Link to={`/categories/edit/${category?.CategoryID}`} className="bg-blue-500 text-white w-20 px-4 py-1 text-center rounded-sm mr-1 text-white-700">Edit</Link>
                            <div onClick={() => deleteCategory(category.CategoryID)} className="cursor-pointer bg-red-500 text-white w-20 px-4 h-8 py-1 text-center rounded-sm mr-1 text-white-700">Delete</div>
                        </div>
                    </>
                    :
                    <p>Error, resource does not exist</p>
                }
            </div>
        </div>
    )
}

export default SingleCategory;