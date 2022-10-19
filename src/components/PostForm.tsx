import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const PostForm: FC = () => {
    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [sended, setSended] = useState<boolean>(false)
    const {store} = useContext(Context);
    const id = String(new Date())

    return (
        <div>
            <input
                onChange={e => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder='Заголовок'
            />
            <input
                onChange={e => setText(e.target.value)}
                value={text}
                type="text"
                placeholder='Текст'
            />
            <button onClick={() => {
                store.pushPosts(id, title, text)
                setSended(true)
            }}>
            Опубликовать пост
            </button>
            {sended ? <p>Отправлено</p> : ''}
        </div>
    );
};

export default observer(PostForm);
