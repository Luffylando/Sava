
import { useEffect, useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

type FormValues = {
    title: string;
};

type TCategory = {
    CategoryID: number,
    Title: string
}
const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.title ? values : {},
        errors: !values.title
            ? {
                title: {
                    type: 'required',
                    message: 'This is required.',
                },
            }
            : {},
    };
};

const SERVER_URL = process.env.REACT_APP_API_URL;

const EditCategory = () => {
    const [category, setCategory] = useState<TCategory>()
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const navigate = useNavigate();
    const { id } = useParams();

    const onSubmit = handleSubmit(async (data) => {
        await axios.patch(`${SERVER_URL}/categories/${id}`, data);
        return navigate(`/categories/${id}`);

    });

    useEffect(() => {
        const editCategory = async () => {
            const result = await axios.get(`${SERVER_URL}/categories/${id}`);
            setCategory(result.data.category);
        }
        editCategory();
    }, [id])

    return (
        <div className="column justify-center align-center">
            <h1 className="text-center text-5xl my-14">Edit Category</h1>

            <form onSubmit={onSubmit}>
                <div className="flex flex-col border py-10 px-20 align-center justify-center">
                    <div className="flex  align-center justify-center">
                        <div className="flex flex-col">
                            <label className="text-xs mb-1 w-20 flex">Title</label>
                            <input
                                className="border pl-1 w-20 text-sm focus:border-slate-600 focus:border-1 !outline-none"
                                {...register("title")}
                                placeholder="Enter Title"
                                defaultValue={category?.Title}
                            />
                            {errors?.title && <p>{errors.title.message}</p>}
                        </div>
                    </div>
                    <div className="flex align-center justify-center">
                        <input className="bg-green-600 mt-4 text-white px-4 py-1 w-40 cursor-pointer" type="submit" value="Update" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditCategory;