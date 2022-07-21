import axios from 'axios'
import router from '@/router';
export default {
    async editPost({ commit }, post) {
        const editedPost = await axios.put(`${process.env.VUE_APP_RESOURCE_URL}/posts/${post.id}`, post);
        commit('setSinglePost', editedPost.data)
        return editedPost;
    },
    async addPost(context, post) {
        const newPost = await axios.post(`${process.env.VUE_APP_RESOURCE_URL}/posts`, post);
        return newPost;
    },
    async deletePost(context, postID) {
        const deletedPost = await axios.delete(`${process.env.VUE_APP_RESOURCE_URL}/posts/${postID}`);
        if (Object.keys(deletedPost.data).length === 0) router.push({ name: 'PostList' })
    },
    async getSinglePost({ commit }, postID) {
        const post = await axios.get(`${process.env.VUE_APP_RESOURCE_URL}/posts/${postID}`);
        const comments = await axios.get(`${process.env.VUE_APP_RESOURCE_URL}/comments?postId=${postID}`);
        commit('setSinglePost', post.data)
        commit('setPostComments', comments.data)
    },
    async getAllPosts({ commit }) {
        const posts = await axios.get(`${process.env.VUE_APP_RESOURCE_URL}/posts`);
        commit('setALLPosts', posts.data)
    },
    // async getAllComments({commit},postID){
    //     const comments = await axios.get(`${process.env.VUE_APP_RESOURCE_URL}/comments?postId=${postID}`);
    //     commit('setPostComments', comments.data)
    // }
}