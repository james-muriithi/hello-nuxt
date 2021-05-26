<template>
  <section class="posts-list">
      <PostPreview
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :previewText="post.previewText"
      :title="post.title"
      :isAdmin="isAdmin"
      :thumbnail="post.thumbnail"
      />
    </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview';

export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.posts-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
