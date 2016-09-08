<template>
  <div class="form-horizontal">
    <div class="form-group">
      <div class="col-sm-4">
        <label>昵称</label>
        <input type="text" class="form-control" v-model="timeEntry.name" placeholder="Name" />
      </div>
      <div class="col-sm-4">
        <label>日期</label>
        <input type="date" class="form-control" v-model="timeEntry.date" placeholder="Date" />
      </div>
      <div class="col-sm-4">
        <label>时间</label>
        <input type="number" class="form-control" v-model="timeEntry.totalTime" placeholder="Hours" />
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-12">
        <label>备注</label>
        <textarea type="text" class="form-control" v-model="timeEntry.comment" placeholder="Comment"></textarea>
      </div>
    </div>
    <button class="btn btn-primary" @click="save()">保存</button>
    <button class="btn btn-danger" v-link="'/time-entries'">取消</button>
    <hr>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        timeEntry: {
          // user: {
          //   name: '杰伦',
          //   email: 'jay@lol.com',
          //   image: 'https://carpentercloud.github.io/static/images/gravatar.jpg'
          // }
        }
      }
    },
    methods: {
      save () {
        this.$http.post('http://localhost:8888/create', {
          comment: this.timeEntry.comment,
          totalTime: this.timeEntry.totalTime,
          date: this.timeEntry.date,
          name: this.timeEntry.name
        }).then(function (ret) {
          console.log(ret)
          let timeEntry = this.timeEntry
          console.log(timeEntry)
          this.$dispatch('timeUpdate', timeEntry)
          this.timeEntry = {}
        })
      }
    }
  }
</script>
