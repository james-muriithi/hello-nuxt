<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <admin-post-form @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '~/components/Admin/AdminPostForm.vue'

export default {
  components: {
    AdminPostForm,
  },
  methods: {
    async onSubmitted(postData) {
      await this.$store.dispatch('addPost', postData);
      this.$router.push('/admin')
    },
  },
  middleware: 'auth'
}
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>

