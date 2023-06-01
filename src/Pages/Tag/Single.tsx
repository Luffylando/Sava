import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';

interface TTag {
    TagID: number,
    Title: string
}

const SERVER_URL = process.env.REACT_APP_API_URL;

const SingleTag = () => {
    const [tag, setTag] = useState<TTag>();
    const { id } = useParams();
    const navigate = useNavigate();

    const deleteTag = async (id: number) => {
        try {
            await axios.delete(`${SERVER_URL}/tags/${id}`);
            navigate('/tags');
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        try {
            const getTag = async () => {
                const result = await axios.get(`${SERVER_URL}/tags/${id}`)
                setTag(result.data.tag);
            }
            getTag();
        } catch (error) {
            throw new Error('404');
        }
    }, [id])

    return (
        <div className="column justify-center align-center">
            <h1 className="text-center text-5xl my-14">Tag</h1>
            <div className="column border px-20 py-10 rounded-md">
                {tag ?
                    <>
                        <div className="flex mb-4">
                            <p className="text-2xl bold">TagID:</p><p className="text-xl bold flex ml-4"> {tag?.TagID}</p>
                        </div>
                        <div className="flex mb-4">
                            <p className="text-2xl bold">Title:</p><p className="text-xl bold flex align-center justify-center ml-4"> {tag?.Title}</p>
                        </div>

                        <div className="flex">
                            <Link to={`/tags/edit/${tag?.TagID}`} className="bg-blue-500 text-white w-20 px-4 py-1 text-center rounded-sm mr-1 text-white-700">Edit</Link>
                            <div onClick={() => deleteTag(tag.TagID)} className="cursor-pointer bg-red-500 text-white w-20 px-4 h-8 py-1 text-center rounded-sm mr-1 text-white-700">Delete</div>
                        </div>
                    </>
                    :
                    <p>Error, resource does not exist</p>
                }
            </div>
        </div>
    )
}

export default SingleTag;