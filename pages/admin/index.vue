<template>
  <div class="admin-page">
    <section class="new-post">
      <app-button @click="$router.push('/admin/new-post')">Create Post</app-button>
    </section>
    <section class="existsing-posts">
      <h1>existsing posts</h1>
      <posts-list :posts="posts" isAdmin />
    </section>
  </div>
</template>
<script>
export default {
  computed: {
    posts() {
      return this.$store.getters.posts
    },
  },
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
