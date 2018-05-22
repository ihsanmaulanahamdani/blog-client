<template>
  <div class="edit flexbox">
    <form class="box">
      <div class="form-group">
        <label for="inputEmail">Title</label>
        <input type="text" class="form-control" v-model="title">
      </div>
      <div class="form-group">
        <label for="inputContent">Content</label>
        <textarea rows="5" type="text" class="form-control" v-model="content"></textarea>
      </div>
      <div class="form-group">
        <button type="button" style="float: right;" @click="edit" class="btn btn-outline-success" data-dismiss="modal">EDIT POST</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  computed: {
    ...mapState([
      'article'
    ])
  },
  methods: {
    edit () {
      let articleUpdate = {
        id: this.article._id,
        title: this.title,
        content: this.content
      }
      this.$store.dispatch('updateArticle', articleUpdate)

      this.$router.push('/')
    }
  },
  created () {
    this.title = this.article.title
    this.content = this.article.content
  }
}
</script>

<style scoped>
.box {
  margin: 5rem;
  width: 50rem;
  border: 1px solid black;
  padding: 15px;
  border-radius: 5px;
}
</style>
