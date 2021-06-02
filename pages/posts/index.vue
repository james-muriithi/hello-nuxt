<template>
  <div class="posts-page">
    <posts-list :posts="posts" />
  </div>
</template>

<script>
export default {
  // fetch(context) {
  // return new Promise((resolve) => {
  //   setTimeout(function () {
  //     resolve({
  //       posts: [
  //         {
  //           id: '1',
  //           title: 'Post Title',
  //           previewText: 'lorem ipsum',
  //           thumbnail:
  //             'https://blog.hootsuite.com/wp-content/uploads/2021/03/how-to-post-on-instagram-from-PC.jpg',
  //         },
  //       ],
  //     })
  //   }, 2000)
  // })
  //   .then((data) => {
  //     context.store.dispatch('setPosts', data.posts)
  //   })
  //   .catch((e) => {
  //     context.error(e)
  //   })
  // },
  computed: {
    posts() {
      return this.$store.getters.posts
    },
  },
}
</script>
