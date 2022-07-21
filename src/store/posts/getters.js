export default {
    getPosts(state) {
        return state.posts
    },
    getPost(state) {
        return state.singlePost
    },
    getPostComments(state){
        return state.comments
    }
}