import { comments, isAuth, Error, type PR, type BR, type RP, type CommentType, type Comment, adminComments, type AdminData } from "./stores";
import axios from './axios';
import { get } from "svelte/store";
import { goto } from "$app/navigation";

//再読み込み対策でユーザー情報をローカルストレージから取ってくる
//ユーザー情報がなければログインページへ
const getLocalStorage = () => {
    if (get(isAuth)) return;

    const user = localStorage.getItem('token');
    if (user) {
        isAuth.set({
            username: user,
        });
    }
};

//コメント情報を取りにいく
export const getComments = async() => {
    debugger;
    if (get(comments).length) return;
    getLocalStorage();
    if (!get(isAuth)) return;

    try {
        const res = await axios.get('/api/v1/view');
        comments.set(res.data.datas);
    } catch (error: any) {
        switch (error.reponse?.status) {
            //トークン期限切れの場合はログインページへ
            case 403:
            case 401:
                isAuth.set(null);
                Error.set(error.response?.data.message);
                break;
            default:
                Error.set(error.response?.data.message);
                break;
        }
    }
};

export const getAuth = async(username: string, password: string) => {
    try {
        const res = await axios.post('/api/v1/login', {
            username: username,
            password: password,
        });
        isAuth.set({
            username: res.data.user,
        });
        localStorage.setItem('token', res.data.user);
        //ログイン成功したらコメントを取る
        await getComments();
        goto('/');
    } catch (error: any) {
        Error.set(error.response?.data.message);
        goto('/login');
    }
};

export const deleteAuth = async() => {
    if (!confirm('ログアウトしますか？')) return;

    try {
        const res = await axios.delete('/api/v1/logout');
        alert(res.data.message);
        localStorage.clear();
        isAuth.set(null);
    } catch (error: any) {
        alert(error.toString());
    }
};

//-----CUD------
export const CREATEHandler = async(data: PR | BR | RP, type: CommentType) => {
    debugger;
    try {
        const res = await axios.post(`/api/v1/${type}`, data);
        //responseのdataにdocumentIdが返ってくるのでそれをcommentsに追加する
        const new_data: PR | BR | RP = res.data.data;
        comments.set([...get(comments), new_data]);
        alert(res.data.message);
        goto('/');
    } catch (error: any) {
        switch (error.response?.status) {
            case 403:
            case 401:
                isAuth.set(null);
                alert(error.response?.data.message);
                break;
            default:
                alert(error.response?.data.message);
                break;         
        }
    }
};

export const UPDATEHandler = async(data: PR | BR | RP, type: CommentType, id: string) => {
    try {
        const res = await axios.put(`/api/v1/${type}`, {...data, id: id});
        const new_comments: Comment[] = get(comments);
        const i: number = new_comments.findIndex(elem => String(elem._id) === id);
        new_comments[i] = data;
        comments.set(new_comments);
        alert(res.data.message);
        goto('/');
    } catch (error: any) {
        switch (error.response?.status) {
            case 403:
            case 401:
                isAuth.set(null);
                alert(error.response?.data.message);
                break;
            default:
                alert(error.response?.data.message);
                break;         
        }
    }
};

export const DELETEHandler = async(id: string, type: CommentType) => {
    if (!confirm('本当に削除しますか？')) return;

    try {
        const res = await axios.delete(`/api/v1/${type}/${id}`);
        const new_comments: Comment[] = get(comments);
        const i: number = new_comments.findIndex(elem => String(elem._id) === id);
        new_comments.splice(i, 1);
        comments.set(new_comments);
        alert(res.data.message);
        goto('/');
    } catch (error: any) {
        switch (error.response?.status) {
            case 403:
            case 401:
                isAuth.set(null);
                alert(error.response?.data.message);
                break;
            default:
                alert(error.response?.data.message);
                break;         
        }
    }
};

//-----Admin------

export const adminGETHandler = async() => {
    try {
        const res = await axios.get('/api/v1/admin');
        adminComments.set(res.data.datas);
        console.log(get(adminComments));
    } catch (error: any) {
        switch (error.response?.status) {
            case 403:
                isAuth.set(null);
                alert(error.response?.data.message);
                break;
            case 401:
                alert(error?.response.data.message);
                goto('/');
                break;
            default:
                alert(error?.response.data.message);
                break;
        }
    }
};

export const adminPOSTHandler = async(data: AdminData) => {
    try {
        const res = await axios.post('/api/v1/admin', data);
        alert(res.data.message);
    } catch (error: any) {
        switch (error.response?.status) {
            case 403:
                isAuth.set(null);
                alert(error.response?.data.message);
                break;
            case 401:
                alert(error?.response.data.message);
                goto('/');
                break;
            default:
                alert(error?.response.data.message);
                break;
        }    
    }
};