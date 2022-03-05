import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Post from '../../components/Post/Post';
import Header from '../../components/Header/Header';
import AddPost from '../../components/AddPost/AddPost';
import { useDispatch, useSelector } from 'react-redux';
import { postRef, userRef } from '../../firebase/firebase';
import { onValue } from 'firebase/database';


import './home.scss'
import Account from '../../components/Account/Account';

function Home(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSignIn = JSON.parse(window.localStorage.getItem('social-redux-user'))

    const currentUser = useSelector(state => state.userReducer.currentUser)
    const postsObject = useSelector(state => state.postReducer.posts)
    const posts = postsObject ? Object.values(postsObject) : []
    const listUser = useSelector(state => state.userReducer.listUser)

    useEffect(() => {
        if (!isSignIn) {
            navigate('/login')
            return
        }

        onValue(userRef, snapshot => {
            const res = snapshot.val()
            dispatch({
                type: 'GET_LIST_USER',
                payload: res ? Object.values(res) : []
            })
        })

        onValue(postRef, snapshot => {
            const res = snapshot.val()
            dispatch({
                type: 'GET_POSTS',
                payload: res
            })
        })

    }, [])

    return (
        <div className='home'>
            <Header currentUser={currentUser} />
            <AddPost />
            <div className='home__content flex'>
                <div className='home__left'>
                    {
                        posts && posts.map((post, index) => {
                            return <Post post={post} key={index} />
                        })
                    }
                </div>
                <div className='home__right'>
                    <div className='friend-suggest'>
                        <div className='friend-suggest__header flex'>
                            <h4>Gợi ý cho bạn</h4>
                            <Link to='/'>Xem tấc cả</Link>
                        </div>
                        <div className='friend-suggest__list'>
                            {
                                listUser && listUser.map((user, index) => {
                                    if (user.uid !== currentUser.uid) {
                                        return <Account user={user} key={index} />
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home