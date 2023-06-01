import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import dayjs from 'dayjs';
import Select from 'react-select'

interface TArticle {
    ArticleID: number,
    PublishDate: string,
    Title: string,
    Reporter?: string,
    Body: string,
    CategoryID: number
    Category?: {
        CategoryID: number,
        Title: string
    }
    Tags?: {
        TagID: number,
        Title: string
    }[]
}

const SERVER_URL = process.env.REACT_APP_API_URL;

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);

    const deleteArticle = async (id: number) => {
        try {
            const deleted = await axios.delete(`${SERVER_URL}/articles/${id}`);
            setArticles(articles.filter((val: TArticle) => val.ArticleID !== id));
            return ({ deleted });
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        const getArticles = async () => {
            const result = await axios.get(
                `${SERVER_URL}/articles`
            );
            setArticles(result.data);
        };

        const getCategories = async () => {
            const result = await axios.get(
                `${SERVER_URL}/categories`
            );
            setCategories(result.data);
        };
        const getTags = async () => {
            const result = await axios.get(
                `${SERVER_URL}/tags`
            );
            setTags(result.data);
        };
        getTags();
        getCategories();
        getArticles();
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

    const handleCategorySelect = async (e: any, inputName: string) => {
        if (inputName === 'category') {
            setSelectedCategory(e.value);
            const result = await axios.get(`${SERVER_URL}/articles?category=${e.value}`)
            setArticles(result.data)
        } else {
            setSelectedTag(e.value);
            const result = await axios.get(`${SERVER_URL}/articles?tag=${e.value}`)
            setArticles(result.data)
        }
    };

    return (
        <div className="column justify-center align-center">
            <h1 className="text-center text-5xl my-14">Articles</h1>
            <div className="flex align-center justify-center">
                <div className="column">
                    <div>
                        <Select
                            options={categoriesOption}
                            onChange={(e) => handleCategorySelect(e, 'category')}
                            value={categoriesOption.filter(function (cat: any) {
                                return cat.value === selectedCategory
                            })}
                            placeholder="Search by Category"
                            className="mb-4"
                        />
                        <Select
                            options={tagsOptions}
                            onChange={(e) => handleCategorySelect(e, 'tag')}
                            value={tagsOptions.filter(function (tag: any) {
                                return tag.value === selectedTag
                            })}
                            placeholder="Search by Tag"
                        />
                    </div>
                    <div className="text-right flex">

                        <button className="w-100 text-right border-2 rounded-sm my-4 px-4 py-1 bg-green-600 text-white">
                            <Link to={`/articles/create`}> Create new Article</Link>
                        </button>
                    </div>

                    {articles.length ?
                        <table className="table-auto mb-24">
                            <thead>
                                <tr>
                                    <th className="border border-slate-300">Id</th>
                                    <th className="border border-slate-300">Title</th>
                                    <th className="border border-slate-300">Reporter</th>
                                    <th className="border border-slate-300">Category</th>
                                    <th className="border border-slate-300">Tags</th>
                                    <th className="border border-slate-300">PublishDate</th>
                                    <th className="border border-slate-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {articles.map((article: TArticle) => {
                                    return (
                                        <tr key={article.ArticleID}>
                                            <td className="border border-slate-300 px-4 w-auto">{article.ArticleID}</td>
                                            <td className="border border-slate-300 px-4 w-auto">
                                                <Link to={`/articles/${article.ArticleID}`} className="underline text-blue-700">{article.Title}</Link>
                                            </td>

                                            <td className="border border-slate-300 px-4 w-auto">
                                                {article.Reporter && article.Reporter}
                                            </td>
                                            <td className="border border-slate-300 px-4 w-auto">
                                                {article?.Category?.Title ?
                                                    <Link className="underline text-blue-700" to={`/categories/${article.Category.CategoryID}`}>{article.Category.Title}</Link>
                                                    :
                                                    <p>/</p>
                                                }
                                            </td>
                                            <td className="border border-slate-300 px-4 w-auto">
                                                {article?.Tags?.length ? article?.Tags?.map((tag, i) => {
                                                    if (i + 1 === article?.Tags?.length) {
                                                        return (
                                                            <Link key={tag.TagID} className="underline text-blue-700" to={`/tags/${tag.TagID}`}>{tag.Title}</Link>
                                                        )
                                                    } else {
                                                        return (
                                                            <Link key={tag.TagID} className="underline text-blue-700" to={`/tags/${tag.TagID}`}>{tag.Title}, </Link>
                                                        )

                                                    }
                                                })
                                                    :
                                                    <p>/</p>
                                                }
                                            </td>

                                            <td className="border border-slate-300 px-4 w-auto">
                                                {dayjs(article.PublishDate).format('DD/MM/YYYY')}
                                            </td>
                                            <td className="border border-slate-300 px-4 h-10 w-20">
                                                <div className="flex">
                                                    <Link to={`/articles/edit/${article.ArticleID}`} className="bg-blue-500 text-white px-4 rounded-sm mr-1 text-white-700">Edit</Link>
                                                    <div onClick={() => deleteArticle(article.ArticleID)} className="cursor-pointer bg-red-500 text-white px-4 rounded-sm ml-1">Delete</div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        :
                        <p>No data in Articles table.</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Articles;