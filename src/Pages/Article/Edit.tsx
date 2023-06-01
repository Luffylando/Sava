
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select'

type FormValues = {
    title: string;
    reporter?: string;
    body?: string;
    Category?: any;
    Tags?: any;
    CategoryID?: number;
};

const SERVER_URL = process.env.REACT_APP_API_URL;


const EditArticle = () => {
    const [article, setArticle] = useState<any>()
    const [category, setCategory] = useState<any>([])
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState<any>([])
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const navigate = useNavigate();
    const { id } = useParams();

    const onSubmit = handleSubmit(async (data) => {
        const parsedData = {
            title: data.title || article.Title,
            reporter: data.reporter || article.Reporter,
            body: data.body || article.Body,
            categoryId: category || article.Category.CategoryID,
            tags: selectedTags.length ? selectedTags.map((tags: any) => tags.value) : []
        }

        await axios.patch(`${SERVER_URL}/articles/${id}`, parsedData);
        return navigate(`/articles/${id}`);

    });

    useEffect(() => {
        const editArticle = async () => {
            const result = await axios.get(`${SERVER_URL}/articles/${id}`);
            setArticle(result.data.article);
            setCategory(result.data.article.Category.CategoryID)
            setSelectedTags(result.data.article.Tags.map((tag: any) => {
                return { value: tag.TagID, label: tag.Title }
            }))

        }
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
        editArticle();

    }, [id])

    const categoriesOption = categories.map((cat: any) => {
        return {
            label: cat.Title,
            value: cat.CategoryID,
        }
    })
    const tagsOptions = tags.map((tag: any) => {
        return {
            label: tag.Title,
            value: tag.TagID,
        }
    })

    const handleTypeSelect = (e: any) => {
        setCategory(e.value);
    };

    return (
        <div className="column justify-center align-center">
            <h1 className="text-center text-5xl my-14">Edit Article</h1>

            <form onSubmit={onSubmit}>
                <div className="flex flex-col border py-10 px-4 align-center justify-center">
                    <div className="flex  align-center justify-center">
                        <div className="flex flex-col">
                            <div className="mb-2">
                                <label className="text-xs mb-1 w-80 flex">Title</label>
                                <input className="border pl-1 w-80 text-sm focus:border-slate-600 focus:border-1 !outline-none"
                                    {...register("title")}
                                    placeholder="Enter Title"
                                    defaultValue={article?.Title}
                                />
                                {errors?.title && <p>{errors.title.message}</p>}
                            </div>
                            <div className="mb-2">
                                <label className="text-xs mb-1 w-80 flex">Reporter</label>
                                <input className="border pl-1 w-80 text-sm focus:border-slate-600 focus:border-1 !outline-none"
                                    {...register("reporter")}
                                    placeholder="Enter Reporter"
                                    defaultValue={article?.Reporter}
                                />
                                {errors?.reporter && <p>{errors.reporter.message}</p>}
                            </div>
                            <div className="mb-2">
                                <label className="text-xs mb-1 w-80 flex">Body</label>
                                <textarea className="border pl-1 w-80 text-sm focus:border-slate-600 focus:border-1 !outline-none"
                                    {...register("body")}
                                    placeholder="Enter Body"
                                    defaultValue={article?.Body}
                                />
                                {errors?.title && <p>{errors.title.message}</p>}
                            </div>
                            {categories &&
                                <div className="mb-2">
                                    <label className="text-xs mb-1 w-80 flex">Pick Category</label>
                                    <Select
                                        options={categoriesOption}
                                        onChange={handleTypeSelect}
                                        value={categoriesOption.filter(function (cat: any) {
                                            return cat.value === category
                                        })}
                                        defaultValue={category}
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
                        <input className="bg-green-600 mt-4 text-white px-4 py-1 w-40" type="submit" value="Edit" />
                    </div>
                </div>
            </form >
        </div >
    )
}

export default EditArticle;