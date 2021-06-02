import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
      token: null,
    },
    getters: {
      posts(state) {
        return state.posts
      },
      isAuthenticated(state) {
        return !!state.token
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
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
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
            `https://hello-nuxt-254-default-rtdb.firebaseio.com/posts.json?auth=${vuexContext.state.token}`,
            { ...post, updateDate: new Date() }
          )
          .then((res) => res.data)
          .then((data) => {
            vuexContext.commit('addPost', { ...post, id: data.name })
          })
          .catch((e) => console.log(e))
      },
      editPost(vuexContext, post) {
        post = { ...post, updateDate: new Date() }

        return axios
          .put(
            `https://hello-nuxt-254-default-rtdb.firebaseio.com/posts/${post.id}.json?auth=${vuexContext.state.token}`,
            post
          )
          .then(() => {
            vuexContext.commit('editPost', post)
          })
          .catch((e) => console.log(e))
      },
      authenticateUser(vuexContext, authData) {
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.$config.FB_API_KEY}`

        if (!authData.isLogin) {
          url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.$config.FB_API_KEY}`
        }
        return axios
          .post(url, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then((res) => res.data)
          .then((data) => {
            vuexContext.commit('setToken', data.idToken)
            localStorage.setItem('token', data.idToken)
            localStorage.setItem(
              'tokenExpiration',
              new Date().getTime() + data.expiresIn * 1000
            )
            //cookie
            Cookie.set('jwt', data.idToken)
            Cookie.set(
              'expirationDate',
              new Date().getTime() + parseInt(data.expiresIn) * 1000
            )

            vuexContext.dispatch(
              'setLogoutTimer',
              parseInt(data.expiresIn) * 1000
            )
          })
          .catch((e) => {
            throw new Error(e)
          })
      },
      setLogoutTimer(vuexContext, duration) {
        setTimeout(() => {
          vuexContext.commit('clearToken')
        }, duration)
      },
      initAuth(vuexContext, req) {
        let token, expirationDate
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')

          if (new Date().getTime() > +expirationDate) {
            vuexContext.commit('clearToken')
            return
          }
        }
        vuexContext.dispatch(
          'setLogoutTimer',
          +expirationDate - new Date().getTime()
        )

        vuexContext.commit('setToken', token)
      },
      logout(vuexContent) {
        vuexContent.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      },
    },
  })
}

export default createStore
