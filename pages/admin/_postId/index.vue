<template>
  <div class="admin-new-post-page">
    <section class="update-form">
      <admin-post-form :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '~/components/Admin/AdminPostForm.vue'
import axios from 'axios';

export default {
  components: {
    AdminPostForm,
  },
  asyncData(context) {
    return axios
      .get(
        `https://hello-nuxt-254-default-rtdb.firebaseio.com/posts/${context.params.postId}.json`
      )
      .then((res) => res.data)
      .then((data) => {
        return {
          loadedPost : {...data, id: context.params.postId}
        }
      })
      .catch((e) => context.error(e))
  },
  methods: {
    async onSubmitted(editedPost){
      await this.$store.dispatch('editPost', editedPost)
      this.$router.push('/admin')
    }
  },
  middleware: ['check-auth','auth']
}
</script>


<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
