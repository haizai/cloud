<template>
  <div class="modal">
    <div class="modal-all" @click.self="modalHide">
      <div class="modal-content">
        <p class="modal-body">尊敬的用户，</p>
        <p class="modal-body">您确定要提交这份问卷吗？</p>
        <hr>
        <div class="modal-footer">    
          <button @click="modalHide">取消</button>
          <button @click="trySubmit" class="info">确定</button>       
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { submitAns } from '../vuex/actions'
  export default {
    vuex: {
      actions: {
        submitAns
      }
    },
    props: ['ans'],
    methods: {
      modalHide() {
        this.$dispatch('modalHide')
      },
      trySubmit() {
        this.submitAns(this.$route.params.id, this.ans)
        this.$router.go({name: 'list'})
      }
    }
  }
</script>