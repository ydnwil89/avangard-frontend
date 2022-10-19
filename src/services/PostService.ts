import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {IPost} from "../models/IPost";

export default class PostService {
  static async pushPosts(id:string, title:string, text:string): Promise<AxiosResponse<IPost[]>> {
      return $api.post<IPost[]>('/createPost', {id, title, text})
  }

  static async getPosts(): Promise<AxiosResponse<IPost[]>> {
    return $api.get<IPost[]>('/getPosts')
}
}