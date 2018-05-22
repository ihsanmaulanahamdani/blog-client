<template>
  <div class="content">
    <div v-for="(article, index) in articles" :key="index" class="flexbox">
      <div class="card text-center gap">
        <div class="card-header">
          <div v-if="id === article.author._id">
            <div style="float: left; cursor: pointer;" @click="editDataArticle(article)"><i class="fas fa-edit"></i></div>
            <button type="button" class="close" @click="removeArticle(article._id)" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {{ article.title }}
        </div>
        <div class="card-body">
          <p class="card-text" style="text-align: justify;">{{ article.content }}</p>
        </div>
        <div class="card-footer text-muted">
          {{ article.updatedAt }}
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id')
    }
  },
  computed: {
    ...mapState([
      'articles'
    ])
  },
  methods: {
    ...mapActions([
      'getAllArticles'
    ]),
    removeArticle (id) {
      this.$store.dispatch('deleteArticle', id)
    },
    editDataArticle (article) {
      this.$store.commit('editArticle', article)
      this.$router.push('/edit')
    }
  },
  mounted () {
    this.getAllArticles()
  }
}
</script>

<style scoped>
.gap {
  margin: 10px 5rem;
  width: 50rem;
}
</style>
