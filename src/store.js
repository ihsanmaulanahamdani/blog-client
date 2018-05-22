import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    article: {}
  },
  mutations: {
    getData (state, payload) {
      state.articles = payload
    },
    editArticle (state, payload) {
      state.article = payload
    }
  },
  actions: {
    postArticle ({ commit }, inputData) {
      axios
        .post('http://localhost:3000/articles', inputData, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          swal({
            position: 'center',
            type: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          axios
            .get('http://localhost:3000/articles', {
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(response => {
              commit('getData', response.data.articles)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllArticles ({ commit }) {
      axios
        .get('http://localhost:3000/articles', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          response.data.articles.forEach(article => {
            article.createdAt = article.createdAt.split('T')[0]
          })

          commit('getData', response.data.articles)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteArticle ({ commit }, id) {
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios
            .delete(`http://localhost:3000/articles/delete/${id}`, {
              headers: {
                token: localStorage.getItem('token'),
                author: localStorage.getItem('id')
              }
            })
            .then(response => {
              swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              axios
                .get('http://localhost:3000/articles', {
                  headers: {
                    token: localStorage.getItem('token')
                  }
                })
                .then(response => {
                  commit('getData', response.data.articles)
                })
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    updateArticle ({ commit }, objInput) {
      axios
        .put(`http://localhost:3000/articles/update/${objInput.id}`, {
          title: objInput.title,
          content: objInput.content
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          swal({
            position: 'center',
            type: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
