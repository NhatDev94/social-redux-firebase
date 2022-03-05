import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import AddPost from '../../components/AddPost/AddPost';


import './header.scss'

function Header(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const bg = { backgroundImage: `url(${props.currentUser && props.currentUser.photoURL})` }
    const showCreatePostBox = () => {
        dispatch({
            type: 'SHOW_CREATE_POST_BOX',
            payload: true
        })
    }

    const signOut = () => {
        window.localStorage.setItem('social-redux-user', JSON.stringify(null))
        dispatch({
            type: 'DELETE_CURRENT_USER',
            payload: null
        })
        navigate('/login')
    }

    return (
        <div className='header'>
            <div className='header__content flex'>
                <h1 className='logo'>Social</h1>
                <div className='header__navbar flex'>
                    <div>
                        <i
                            className="create-post fa-solid fa-circle-plus"
                            onClick={showCreatePostBox}
                        ></i>
                    </div>
                    <Link
                        to=""
                        className='header__avatar'
                        style={bg}
                    ></Link>
                    <i
                        className="fa-solid fa-arrow-right-from-bracket"
                        onClick={signOut}
                    ></i>
                </div>
            </div>
        </div>
    )
}

export default Header