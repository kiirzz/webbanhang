import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const CategoriesList = () => {
    const [category, setCategory] = useState();

    useEffect(() => {
        const fetchCategory = async() => {
            const result = await axios.get('/category/');
            setCategory(result.data);
        }

        fetchCategory();
    }, [])

    console.log(category);

    return(
        <div className="">
            {!category ?
                <div>Loading...</div>
                : <div className="categories_list">
                    <h2>Categories</h2>
                    <div className="categories_list-element-box">
                        {category.map((element) => (
                            <li className="categories_list-element">
                                <Link className="categories_list-link" to={`/category/${element.category_id}`}>{element.category_name}</Link>
                            </li>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default CategoriesList;
