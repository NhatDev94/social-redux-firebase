import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost, getImgURL, upload } from '../../firebase/firebase';

import './addPost.scss'

function AddPost(props) {
    const [input, setInput] = useState('')
    const [imgReview, setImgReview] = useState(null)
    const dispatch = useDispatch()
    const isShowCreatePostBox = useSelector(state => state.postReducer.isCreatePost)
    const currentUser = useSelector(state => state.userReducer.currentUser)

    const hideCreatePostBox = () => {
        dispatch({
            type: 'HIDE_CREATE_POST_BOX',
            payload: false
        })
        let list = new DataTransfer();
        const file = new File([], 'image')
        list.items.add(file)
        let myFileList = list.files;
        document.querySelector('#post-img').files = myFileList
    }

    const inputTextHandle = (value) => {
        setInput(value)
    }

    const createNewPost = async () => {
        const file = document.querySelector('#post-img').files[0]
        await upload(file)
        const post = {
            postId: Math.random(),
            author: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
            },
            photoURL: file ? await getImgURL(file.name) : null,
            likes: [],
            comments: [{
                uid: currentUser.uid,
                author: currentUser.displayName,
                content: input
            }],
            time: new Date()
        }
        addNewPost(post)
        setInput('')
        setImgReview(null)
        hideCreatePostBox()
    }

    const uploadHandle = (file) => {
        const url = URL.createObjectURL(file)
        setImgReview(url)
    }

    return (
        <div className={isShowCreatePostBox ? 'add-post' : 'hide'}>
            <div className='add-post__content flex'>
                <h4>Tao bai viet moi</h4>
                <img className={imgReview ? 'img' : 'hide'} src={imgReview} />
                <textarea
                    placeholder='Ban dang nghi gi...?'
                    value={input}
                    onChange={(e) => inputTextHandle(e.target.value)}
                    rows='3'
                />
                <div className='add-post__submit flex'>
                    <label htmlFor='post-img'>
                        <i className="fa-solid fa-images"></i>
                    </label>
                    <input
                        className='hide'
                        id='post-img'
                        type='file'
                        onChange={e => uploadHandle(e.target.files[0])}
                    />
                    <button
                        onClick={createNewPost}
                    >Dang</button>
                </div>
            </div>
            <div
                className='add-post__overlay'
                onClick={hideCreatePostBox}
            ></div>
        </div>
    )
}

export default AddPost