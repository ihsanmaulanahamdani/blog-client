<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-info d-flex justify-content-between">
    <a class="remove-underline text-white" data-toggle="modal" data-target="#modalPostArticle"><i class="fas fa-location-arrow"></i> POST</a>
        <div class="modal fade" id="modalPostArticle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-location-arrow"></i> Post Article</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="inputEmail">Title</label>
                  <input type="text" class="form-control" v-model="title" placeholder="Enter title">
                </div>
                <div class="form-group">
                  <label for="inputContent">Content</label>
                  <textarea rows="5" type="text" class="form-control" v-model="content" placeholder="Write your article here"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-success" @click="postingArticle" data-dismiss="modal">POST</button>
            </div>
          </div>
        </div>
      </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
      </ul>
      <div v-if="isLogin">
        <Logout/>
      </div>
      <div v-else>
        <Login/>
      </div>
    </div>
  </nav>
</template>

<script>
import Login from '@/components/Login.vue'
import Logout from '@/components/Logout.vue'

export default {
  data () {
    return {
      token: localStorage.getItem('token'),
      role: localStorage.getItem('role'),
      isLogin: false,
      title: '',
      content: ''
    }
  },
  components: {
    Login,
    Logout
  },
  methods: {
    postingArticle () {
      let objArticle = {
        title: this.title,
        author: localStorage.getItem('id'),
        content: this.content
      }

      this.title = ''
      this.content = ''

      this.$store.dispatch('postArticle', objArticle)
    }
  },
  created () {
    if (this.token) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>
