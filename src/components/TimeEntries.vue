<template>
  <div>
    <button v-if="$route.path !== '/time-entries/log-time'" v-link="'/time-entries/log-time'" class="btn btn-primary">
      创建
    </button>
    <div v-if="$route.path === '/time-entries/log-time'">
      <h3>创建</h3>
    </div>

    <hr>

    <!-- 下级视图 -->
    <router-view></router-view>

    <div class="time-entries">
      <p v-if="!timeEntries.length"><strong>还没有任何任务</strong></p>

      <div class="list-group">
        <!-- v-for -->
        <a class="list-group-item" v-for="timeEntry in timeEntries">
          <div class="row">

            <div class="col-sm-2 user-details">
              <img src="https://carpentercloud.github.io/static/images/gravatar.jpg" class="avatar img-circle img-responsive" />
              <p class="text-center">
                <strong>
                  {{ timeEntry.name }}
                </strong>
              </p>
            </div>

            <div class="col-sm-2 text-center time-block">
              <h3 class="list-group-item-text total-time">
                <i class="glyphicon glyphicon-time"></i>
                {{ timeEntry.totalTime }}
              </h3>
              <p class="label label-primary text-center">
                <i class="glyphicon glyphicon-calendar"></i>
                {{ timeEntry.date }}
              </p>
            </div>

            <div class="col-sm-7 comment-section">
              <p>{{ timeEntry.comment}}</p>
            </div>

            <div class="col-sm-1">
              <button class="btn btn-xs btn-danger delete-button" @click="deleteTimeEntry(timeEntry)">X</button>
            </div>

          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    route: {
      data () {
        this.$http.get('http://localhost:8888/time-entries')
          .then(function (ret) {
            this.timeEntries = ret.data
          })
          .then(function (err) {
            console.log(err)
          })
      }
    },
    data () {
      // 事先模拟一个数据
      // let existingEntry = {
      //   user: {
      //     name: '二傻',
      //     email: 'haha@qq.com',
      //     image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
      //   },
      //   comment: '我的一个备注，你的回话凌乱着，在这个时刻 我想起喷泉旁的白鸽，甜蜜散落了',
      //   totalTime: 1.5,
      //   date: '2016-09-06'
      // }
      return {
        // timeEntries: [existingEntry]
        timeEntries: []
      }
    },
    methods: {
      deleteTimeEntry (timeEntry) {
        // 删除某项计划
        let index = this.timeEntries.indexOf(timeEntry)
        let _id = this.timeEntries[index]._id
        if (window.confirm('确认删除?')) {
          this.$http.delete('http://localhost:8888/delete/' + _id)
            .then(function (ret) {
              console.log(ret)
            })
            .then(function (err) {
              console.log(err)
            })
          this.timeEntries.splice(index, 1)
          this.$dispatch('deleteTime', timeEntry)
        }
      }
    },
    events: {
      timeUpdate (timeEntry) {
        this.timeEntries.push(timeEntry)
        // 继续派发
        return true
      }
    }
  }
</script>
<style>
.avatar { height: 75px; margin: 0 auto; margin-top: 10px; margin-bottom: 10px; }
.user-details { background-color: #f5f5f5; border-right: 1px solid #ddd; margin: -10px 0; }
.time-block { padding: 10px; }
.comment-section { padding: 20px; }
</style>
