import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleSignIn, userRef, addNewUser, facebookSignIn } from '../../firebase/firebase';
import { onValue } from 'firebase/database';

import './login.scss'

function Login(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSignIn = JSON.parse(window.localStorage.getItem('social-redux-user'))

    useEffect(() => {
        if (isSignIn) {
            navigate('/')
        }
    }, [])

    const signIn = async (type) => {
        let res = null
        if (type === 'google') {
            res = await googleSignIn()
        }
        if (type === 'facebook') {
            res = await facebookSignIn()
        }
        const user = {
            uid: res.user.uid,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        }
        console.log(user);
        
        if (res._tokenResponse.isNewUser) {
            // luu vao data: listAccount neu lan dau dang nhap
            addNewUser(user)
        }
        
        window.localStorage.setItem('social-redux-user', JSON.stringify(user))
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: user
        })
        navigate('/')
    }

    return (
        <div className='login'>
            <button onClick={() => signIn('google')}>Sign with Google</button>
            <button onClick={() => signIn('facebook')}>Sign with FaceBook</button>

        </div>
    )
}

export default Login