import { useEffect, useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select'
import axios from 'axios';

type FormValues = {
    title: string;
    body: string;
    reporter: string;
    categoryId: number;
    tags: number[]
};

type TCategory = {
    CategoryID: number,
    Title: string
}
const SERVER_URL = process.env.REACT_APP_API_URL;

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

const CreateArticle = () => {
    const [categories, setCategories] = useState<TCategory[]>([]);
    const [category, setCategory] = useState(categories[0]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {
        const parsedData = {
            title: data.title,
            reporter: data.reporter,
            body: data.body,
            categoryId: category || categories[0]?.CategoryID || null,
            tags: selectedTags.length ? selectedTags.map((tags: any) => tags.value) : []
        }

        const result = await axios.post(`${SERVER_URL}/articles`, parsedData);
        const id = await result.data.article.ArticleID;
        return navigate(`/articles/${id}`);

    });

    useEffect(() => {
        const getCategories = async () => {
            const result = await axios.get(
                `${SERVER_URL}/categories`
            );
            setCategories(result.data);
        };
        const getTags = async () => {
            const result = await axios.get(
                `${SERVER_URL}/tags`
            )
            setTags(result.data);
        }
        getCategories();
        getTags();
    }, []);

    const categoriesOption = categories.map((cat: any) => {
        return {
            value: cat.CategoryID,
            label: cat.Title
        }
    })
    const tagsOptions = tags.map((tag: any) => {
        return {
            value: tag.TagID,
            label: tag.Title
        }
    })

    const handleTypeSelect = (e: any) => {
        setCategory(e.value);
    };

    return (
        <div className="column justify-center align-center">
            <h1 className="text-center text-5xl my-14">Create Article</h1>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col border py-10 px-4 align-center justify-center">
                    <div className="flex  align-center justify-center">
                        <div className="flex flex-col">
                            <div className="mb-2">
                                <label className="text-xs mb-1 w-80 flex">Title</label>
                                <input className="border pl-1 w-80 text-sm focus:border-slate-600 focus:border-1 !outline-none"
                                    {...register("title", { required: true })}
                                    placeholder="Enter Title" />
                                {errors?.title && <p>{errors.title.message}</p>}
                            </div>
                            <div className="mb-2">
                                <label className="text-xs mb-1 w-80 flex">Reporter</label>
                                <input className="border pl-1 w-80 text-sm focus:border-slate-600 focus:border-1 !outline-none"
                                    {...register("reporter", { required: true })}
                                    placeholder="Enter Reporter" />
                                {errors?.reporter && <p>{errors.reporter.message}</p>}
                            </div>
                            <div className="mb-2">
                                <label className="text-xs mb-1 w-80 flex">Body</label>
                                <textarea className="border pl-1 w-80 text-sm focus:border-slate-600 focus:border-1 !outline-none"
                                    {...register("body", { required: true })}
                                    placeholder="Enter Body" />
                                {errors?.title && <p>{errors.title.message}</p>}
                            </div>
                            {categories &&
                                <div className="mb-2">
                                    <label className="text-xs mb-1 w-80 flex">Pick Category</label>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                                    <Select
                                        options={categoriesOption}
                                        onChange={handleTypeSelect}
                                        value={categoriesOption.filter(function (cat: any) {
                                            return cat.value === category
                                        })}
                                    />
                                </div>
                            }
                            <div className="mb-2">
                                <label className="text-xs mb-1 w-80 flex">Pick Tags</label>
                                <MultiSelect
                                    options={tagsOptions}
                                    value={selectedTags}
                                    onChange={setSelectedTags}
                                    labelledBy={"Select"}
                                    isCreatable={true}
                                    disableSearch={true}
                                    hasSelectAll={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex align-center justify-center">
                        <input className="bg-green-600 mt-4 text-white px-4 py-1 w-40" type="submit" value="Create" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateArticle;