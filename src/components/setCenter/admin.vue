<template>
  <div class="admin">
    <el-card class="box-card">
      <div class="block">
        <el-avatar :size="180" :src="circleUrl" shape="square"></el-avatar>
      </div>
      <div class="name">{{name}}&nbsp;
        <el-button type="text" icon="el-icon-edit" @click="visible=true">修改</el-button>
      </div>
    </el-card>


    <el-dialog title="编辑资料" :visible.sync="visible" center>
      <el-form :model="form" :label-width="'80px'" class="form-content" style="width:450px">
        <el-form-item label="姓名:">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像:">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'admin',
    data () {
      return {
        visible: false,
        form: {
          name: this.$store.state.base.name
        },
        imageUrl: this.$store.state.base.imageURL
      }
    },
    computed: {
      circleUrl () {
        return this.$store.state.base.imageURL
      },
      name () {
        return this.$store.state.base.name
      }
    },
    mounted () {
    },
    methods: {
      confirm(){
        this.$store.commit('changeName',this.form.name)
        this.$store.commit('changeUrl',this.imageUrl)
        this.visible = false
      },
      handleAvatarSuccess(res, file){
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return  isLt2M;
      }
    }
  }
</script>

<style scoped lang="scss">
  .admin {
    .box-card {
      .block {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .name {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
      }
    }

    .form-content {
      position: relative;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
    }
  }

</style>
