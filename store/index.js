import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
    },
    getters: {
      posts(state) {
        return state.posts
      },
    },
    mutations: {
      setPosts(state, posts) {
        state.posts = posts
      },
      addPost(state, post) {
        state.posts.unshift(post)
      },
      editPost(state, post) {
        const postIndex = state.posts.findIndex((p) => p.id == post.id)
        state.posts[postIndex] = post
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get('https://hello-nuxt-254-default-rtdb.firebaseio.com/posts.json')
          .then((res) => res.data)
          .then((data) => {
            let postsArray = []
            for (const key in data) {
              postsArray.push({ ...data[key], id: key })
            }

            vuexContext.commit('setPosts', postsArray)
          })
          .catch((e) => context.error(e))

        // return new Promise((resolve) => {
        //   setTimeout(function () {
        //     vuexContext.commit('setPosts', [
        //       {
        //         id: '1',
        //         title: 'Post Title',
        //         previewText: 'lorem ipsum',
        //         thumbnail:
        //           'https://blog.hootsuite.com/wp-content/uploads/2021/03/how-to-post-on-instagram-from-PC.jpg',
        //       },
        //     ])
        //     resolve()
        //   }, 2000)
        // })
      },
      setPosts(context, posts) {
        context.commit('setPosts', posts)
      },
      addPost(vuexContext, post) {
        return axios
          .post(
            `https://hello-nuxt-254-default-rtdb.firebaseio.com/posts.json`,
            { ...post, updateDate: new Date() }
          )
          .then((res) => res.data)
          .then((data) => {
            vuexContext.commit('addPost', { ...post, id: data.name })
          })
          .catch((e) => console.log(e))
      },
      editPost(vuexContext, post) {
        post = {...post, updateDate: new Date()};

        return axios
          .put(
            `https://hello-nuxt-254-default-rtdb.firebaseio.com/posts/${post.id}.json`,
            post
          )
          .then(() => {
            vuexContext.commit('editPost', post)
          })
          .catch((e) => console.log(e))
      },
    },
  })
}

export default createStore
