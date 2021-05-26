import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
    },
    getters: {
      posts(state){
        return state.posts
      }
    },
    mutations: {
      setPosts(state, posts){
        state.posts = posts
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context){
        return new Promise((resolve) => {
          setTimeout(function () {
            vuexContext.commit('setPosts', [
              {
                id: '1',
                title: 'Post Title',
                previewText: 'lorem ipsum',
                thumbnail:
                  'https://blog.hootsuite.com/wp-content/uploads/2021/03/how-to-post-on-instagram-from-PC.jpg',
              },
            ])
            resolve()
          }, 2000)
        })
      },
      setPosts(context, posts){
        context.commit('setPosts', posts);
      }
    }
  })
}

export default createStore;
