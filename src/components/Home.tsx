import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import '../styles.css';
import {IUser} from "../models/IUser";
import UserService from "../services/UserService";
import PostService from "../services/PostService";
import {IPost} from "../models/IPost";
import PostForm from './PostForm';
import { Link } from "react-router-dom";


function Post(props:any) {
  return (
    <div className='postWrapper'>
      <h2 className='postTitle'>{props.post.title}</h2>
      <p className='postText'>{props.post.text}</p>
  </div>
  )
}

const Home: FC = () => {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);
  const [postFormOpen, setPostFormOpen] = useState(false)
  const [posts, setPosts] = useState<IPost[]>([])

  async function getUsers() {
    try {
        const response = await UserService.fetchUsers();
        setUsers(response.data);
    } catch (e) {
        console.log(e);
    }
  }

  async function getPosts() {
    try {
      const response = await PostService.getPosts();
      setPosts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPosts()
  })

  return (
    <div>
      <header>
        <nav>
            <input type="checkbox" id="checkbox-menu"/>
            <label htmlFor="checkbox-menu">
            <ul className={"menu touch"}>
              <li><a className="logo" href="/">Avangard</a></li>
              <li><a onClick={() => setPostFormOpen(!postFormOpen)} href="#">Написать пост</a></li>
              <li><Link to={'/avgchess'}>avg.chess</Link></li>
              <li><Link to={'/pinguin'}>Пингвины на льду (beta)</Link></li>
              <li><Link to={'/me'} className="contacts">Моя страница</Link></li>
              <li><a onClick={() => store.logout()} href="#">Выйти</a></li>
            </ul>
            <span className="toggle">ico</span>
            </label>
        </nav>
      </header>
    {
      postFormOpen && (
        <div className='overlay'>
          <div className='modal'>
            <svg className='svg' onClick={() => setPostFormOpen(!postFormOpen)} height="10" viewBox="0 0 200 200" width="10">
              <title />
              <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
            </svg>
            <h3>Создать пост</h3>
            <PostForm />
          </div>
      </div>
      )
    }
    {
    <div className='postList'>
      <ul>
        {
          posts.map(post => <Post post={post}/>)
        }
        </ul>
    </div>
    }
    </div>
  );
};

export default observer(Home);
