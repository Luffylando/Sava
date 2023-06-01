import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

interface TTag {
    TagID: number,
    Title: string,
}

const SERVER_URL = process.env.REACT_APP_API_URL;

const Tags = () => {
    const [tags, setTags] = useState([]);

    const deleteTag = async (id: number) => {
        try {
            await axios.delete(`${SERVER_URL}/tags/${id}`);
            setTags(tags.filter((val: TTag) => val.TagID !== id));
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        const getTags = async () => {
            const result = await axios.get(
                `${SERVER_URL}/tags`
            );
            setTags(result.data);
        };
        getTags();
    }, []);

    return (
        <div className="column justify-center align-center">
            <h1 className="text-center text-5xl my-14">Tags</h1>

            <div className="flex align-center justify-center">

                <div className="column">
                    <div className="text-right">
                        <button className="w-100 text-right border-2 rounded-sm my-4 px-4 py-1 bg-green-600 text-white">
                            <Link to={`/tags/create`}> Create new Tag</Link>
                        </button>
                    </div>
                    {tags.length ?
                        <table className="table-fixed">
                            <thead>
                                <tr>
                                    <th className="border border-slate-300">Id</th>
                                    <th className="border border-slate-300">Title</th>
                                    <th className="border border-slate-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tags.map((tag: TTag) => {
                                    return (
                                        <tr key={tag.TagID}>
                                            <td className="border border-slate-300 px-4 w-auto">{tag.TagID}</td>
                                            <td className="border border-slate-300 px-4 w-auto">
                                                <Link to={`/tags/${tag.TagID}`} className="underline text-blue-700">{tag.Title}</Link>
                                            </td>
                                            <td className="border border-slate-300 px-4 h-10 w-20">
                                                <div className="flex">
                                                    <Link to={`/tags/edit/${tag.TagID}`} className="bg-blue-500 text-white px-4 rounded-sm mr-1 text-white-700">Edit</Link>
                                                    <div onClick={() => deleteTag(tag.TagID)} className="cursor-pointer bg-red-500 text-white px-4 rounded-sm ml-1">Delete</div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        :
                        <p>No data in Tags table.</p>
                    }
                </div>
            </div>

        </div>
    )
}

export default Tags;