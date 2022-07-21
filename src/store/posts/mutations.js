export default {
    setALLPosts(state, posts) {
        state.posts = posts
    },
    setSinglePost(state, post) {
        state.singlePost = post
    },
    setPostComments(state,comments){
        state.comments = comments
    }
}