<template>
  <div class="home-page">
    <section class="intro">Get the latest tech news</section>
    <posts-list :posts="posts" />
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.getters.posts
    },
  },
  // asyncData(_, callback){
  //   setTimeout(function(){
  //     callback(null, {
  //       posts : [
  //       {
  //         id: '1',
  //         title: 'Post Title',
  //         previewText: 'lorem ipsum',
  //         thumbnail: 'https://blog.hootsuite.com/wp-content/uploads/2021/03/how-to-post-on-instagram-from-PC.jpg'
  //       }
  //     ]
  //     })
  //   },2000)
  // }
  // data(){
  //   return {

  //   }
  // }
}
</script>

<style scoped>
.intro {
  height: 30px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}
</style>
