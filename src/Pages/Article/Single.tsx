import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import axios from 'axios';

interface TArticle {
    ArticleID: number,
    PublishDate: string,
    Title: string,
    Reporter?: string,
    Body: string,
    CategoryID: number
    Tags?: {
        TagID: number,
        Title: string
    }[],
    Category?: {
        CategoryID: number,
        Title: string
    }
}

const SERVER_URL = process.env.REACT_APP_API_URL;

const SingleArticle = () => {
    const [article, setArticle] = useState<TArticle>();
    const { id } = useParams();
    const navigate = useNavigate();

    const deleteArticle = async (id: number) => {
        try {
            await axios.delete(`${SERVER_URL}/articles/${id}`);
            navigate('/articles');
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        try {
            const getArticle = async () => {
                const result = await axios.get(`${SERVER_URL}/articles/${id}`)
                setArticle(result.data.article);
            }
            getArticle();
        } catch (error) {
            throw new Error('404');
        }
    }, [id])

    return (
        <div className="column justify-center align-center">
            <h1 className="text-center text-5xl my-14">Article</h1>
            <div className="column border px-20 py-10 rounded-md">
                {article ?
                    <>
                        <div className="flex mb-4">
                            <p className="text-2xl bold">ArticleID:</p><p className="text-xl bold flex ml-4"> {article?.ArticleID}</p>
                        </div>
                        <div className="flex mb-4">
                            <p className="text-2xl bold">Title:</p><p className="text-xl bold flex align-center justify-center ml-4"> {article?.Title}</p>
                        </div>
                        {article.Reporter &&
                            <div className="flex mb-4">
                                <p className="text-2xl bold">Reporter:</p><p className="text-xl bold flex align-center justify-center ml-4"> {article?.Reporter}</p>
                            </div>
                        }
                        {article.Body &&
                            <div className="flex mb-4">
                                <p className="text-2xl bold">Body:</p><p className="text-xl bold flex align-center justify-center ml-4"> {article?.Body}</p>
                            </div>
                        }
                        {article.Tags &&
                            <div className="flex mb-4">
                                <p className="text-2xl bold">Tags:</p><p className="text-xl bold flex align-center justify-center ml-4">

                                    {article?.Tags?.length ? article?.Tags?.map((tag, i) => {
                                        if (i + 1 === article?.Tags?.length) {
                                            return (
                                                <Link key={tag.TagID} className="underline text-blue-700" to={`/tags/${tag.TagID}`}>{tag.Title}</Link>
                                            )
                                        } else {
                                            return (
                                                <Link key={tag.TagID} className="underline text-blue-700" to={`/tags/${tag.TagID}`}>{tag.Title},</Link>
                                            )

                                        }
                                    })
                                        :
                                        <p>/</p>
                                    }
                                </p>
                            </div>
                        }

                        {article.Category &&
                            <div className="flex mb-4">
                                <p className="text-2xl bold">Category:</p><p className="text-xl bold flex align-center justify-center ml-4">

                                    {article.Category ?
                                        <Link className="underline text-blue-700" to={`/categories/${article.Category.CategoryID}`}>{article.Category.Title}</Link>
                                        :
                                        <p>/</p>
                                    }
                                </p>
                            </div>
                        }

                        <div className="flex mb-4">
                            <p className="text-2xl bold">Publish Date:</p><p className="text-xl bold flex align-center justify-center ml-4">
                                {dayjs(article?.PublishDate).format('DD/MM/YYYY')}
                            </p>
                        </div>


                        <div className="flex">
                            <Link to={`/articles/edit/${article?.ArticleID}`} className="bg-blue-500 text-white w-20 px-4 py-1 text-center rounded-sm mr-1 text-white-700">Edit</Link>
                            <div onClick={() => deleteArticle(article.ArticleID)} className="cursor-pointer bg-red-500 text-white w-20 px-4 h-8 py-1 text-center rounded-sm mr-1 text-white-700">Delete</div>
                        </div>
                    </>
                    :
                    <p>Error, resource does not exist</p>
                }
            </div>
        </div >
    )
}

export default SingleArticle;