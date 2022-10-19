import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import Home from './components/Home'
import UserService from "./services/UserService";

const App: FC = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <div style={{textAlign: 'center', marginTop: '400px'}}>Загрузка...</div>
    }

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm/>
            </div>
        );
    }

    return (
        <div>
            <Home />
        </div>
    );
};

export default observer(App);
