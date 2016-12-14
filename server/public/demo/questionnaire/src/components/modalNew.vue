<template>
  <div class="modal">
    <div class="modal-all" @click.self="modalHide">
      <div class="modal-content">
        <p class="modal-body">尊敬的用户，</p>
        <p class="modal-body">您确定要新建这份问卷吗？</p>
        <hr>
        <div class="modal-footer">    
          <button @click="modalHide">取消</button>
          <button @click="tryCreate" class="info">确定</button>       
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { createNaire } from '../vuex/actions'
  export default {
    vuex: {
      actions: {
        createNaire
      }
    },
    props: ['naire'],
    methods: {
      modalHide() {
        this.$dispatch('modalHide')
      },
      tryCreate() {
        this.createNaire(this.naire)
        this.$router.go({name: 'list'})
      }
    }
  }
</script>
