import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addNewComment } from '../../firebase/firebase';

import './post.scss'

function Post(props) {
    const [input, setInput] = useState('')
    const postsObject = useSelector(state => state.postReducer.posts)
    // postObject = {'property': object}
    const currentUser = useSelector(state => state.userReducer.currentUser)

    const url = props.post.author.photoURL
    const bg = { backgroundImage: `url(${url})` }

    const createNewComment = () => {
        const newComment = {
            uid: currentUser.uid,
            author: currentUser.displayName,
            content: input
        }

        for (const property in postsObject) {
            if (postsObject[property].postId === props.post.postId) {
                postsObject[property].comments = [...postsObject[property].comments, newComment]
                addNewComment(postsObject[property], property)
            }
        }
        setInput('')
    }
    const focus = (e) => {
        const postEl = e.target.closest('.post')
        const inputEl = postEl.querySelector('.add-comment-input')
        inputEl.focus()
    }

    return (
        <div className='post'>
            <div className='post__header flex'>
                <div className='post__author flex'>
                    <div
                        className='avatar'
                        style={bg}
                    ></div>
                    <h4 className='name'>{props.post.author.displayName}</h4>
                </div>
                <div className='post__header--action'>
                    <i className="fa-solid fa-ellipsis"></i>
                </div>
            </div>
            <div className={props.post.photoURL ? 'post__img' : 'hide'}>
                <img src={props.post.photoURL} />
            </div>
            <div className='post__action'>
                <i className="fa-brands fa-gratipay"></i>
                <i className="fa-solid fa-comment" onClick={e => focus(e)}></i>
                <i className="fa-solid fa-share-nodes"></i>
            </div>
            <p className='post__like-number'>0 nguoi thich</p>
            <div className='post__list-comment'>
                {
                    props.post.comments && props.post.comments.map((comment, index) => {
                        return <div className='comment flex' key={index}>
                            <h4 className='comment__author'>{comment.author}</h4>
                            <p className='comment__content'>{comment.content}</p>
                        </div>
                    })
                }
            </div>
            <div className='post__add'>
                <input
                    className='add-comment-input'
                    placeholder='Them binh luan...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={e => e.key === 'Enter' && createNewComment()}
                />
                <p onClick={createNewComment}>Dang</p>
            </div>
        </div>
    )
}

export default Post