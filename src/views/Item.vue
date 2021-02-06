<template>
  <div class="item_container">
    <section>
      <header class="top_tips">
        <span class="num_tip">题目{{ itemNum }}</span>
      </header>
    </section>
    <div class="item_back item_container_style">
      <div class="item_list_container" v-if="itemDetail.length > 0">
        <header class="item_title">{{ itemData.topic_name }}</header>
        <ul>
          <li
            v-for="(item, index) in itemData.topic_answer"
            :key="item.topic_name"
            @click="choosed(index, item.topic_answer_id)"
            class="item_list"
          >
            <span
              class="option_style"
              v-bind:class="{ has_choosed: choosedNum == index }"
              >{{ choosedType(index) }}</span
            >
            <span class="option_detail">{{ item.answer_name }}</span>
          </li>
        </ul>
      </div>
    </div>
    <span
      class="next_item button_style"
      v-if="itemNum < itemDetail.length"
      @click="nextItem"
    ></span>
    <span class="submit_item button_style" v-else @click="submitAnswer"></span>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      itemId: null, //题目ID
      choosedNum: null, //选中答案索引
      choosedId: null //选中答案id
    };
  },
  computed: {
    ...mapState([
      "itemNum", //第几题
      "level", //第几周
      "itemDetail", //题目详情
      "timer", //计时器
      "answerid"
    ]),
    itemData: function() {
      return this.itemDetail[this.itemNum - 1];
    }
  },
  methods: {
    ...mapMutations([
      "addNum",
      "rememberTime",
      "rememberAnswer",
      "initializeData"
    ]),
    //点击下一题
    nextItem() {
      if (this.choosedNum !== null) {
        this.choosedNum = null;
        //保存答案，题目索引加一，跳到下一题
        this.rememberAnswer(this.choosedId);
        this.addNum();
      } else {
        alert("你好没有选择答案哦！");
      }
    },
    //索引0-3对应答案A-B
    choosedType: type => {
      switch (type) {
        case 0:
          return "A";
        case 1:
          return "B";
        case 2:
          return "C";
        case 3:
          return "D";
      }
    },
    //选中答案信息
    choosed(type, id) {
      this.choosedNum = type;
      this.choosedId = id;
    },
    //到达最后一题，交卷，清空定时器，跳转分数页面
    submitAnswer() {
      if (this.choosedNum !== null) {
        this.rememberAnswer(this.choosedId);
        clearInterval(this.timer);
        this.$router.push("score");
      } else {
        alert("您还没有选择答案哦！");
      }
    }
  },
  created() {
    //进入题目页面，开始计时
    this.rememberTime();
  }
};
</script>
<style lang="less">
.top_tips {
  position: absolute;
  height: 7.35rem;
  width: 3.25rem;
  top: -1.3rem;
  right: 1.6rem;
  background: url("../assets/WechatIMG2.png") no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  .num_tip {
    position: absolute;
    left: 0.48rem;
    bottom: 1.1rem;
    height: 0.7rem;
    width: 2.5rem;
    font-size: 0.6rem;
    font-family: "黑体";
    font-weight: 600;
    color: #a57c50;
    text-align: center;
  }
}
.item_container_style {
  height: 11.625rem;
  width: 13.15rem;
  background-repeat: no-repeat;
  position: absolute;
  top: 4.1rem;
  left: 1rem;
}
.item_back {
  background-image: url("../assets/2-1.png");
  background-size: 100% 100%;
}
.button_style {
  display: block;
  height: 2.1rem;
  width: 4.35rem;
  background-size: 100% 100%;
  position: absolute;
  top: 16.5rem;
  left: 50%;
  margin-left: -2.4rem;
  background-repeat: no-repeat;
}
.next_item {
  background-image: url("../assets/2-2.png");
}
.submit_item {
  background-image: url("../assets/3-1.png");
}
.item_list_container {
  position: absolute;
  height: 7rem;
  width: 8rem;
  top: 2.4rem;
  left: 3rem;
  -webkit-font-smoothing: antialiased;
}
.item_title {
  font-size: 0.65rem;
  color: #92c0ef;
  line-height: 0.7rem;
}
.item_list {
  font-size: 0;
  margin-top: 0.4rem;
  width: 10rem;
  span {
    display: inline-block;
    font-size: 0.6rem;
    color: #92c0ef;
    vertical-align: middle;
  }
  .option_style {
    height: 0.725rem;
    width: 0.725rem;
    border: 1px solid #fff;
    border-radius: 50%;
    line-height: 0.725rem;
    text-align: center;
    margin-right: 0.3rem;
    font-size: 0.5rem;
    font-family: "Arial";
  }
  .has_choosed {
    background-color: #ffd400;
    color: #575757;
    border-color: #ffd400;
  }
  .option_detail {
    width: 7.5rem;
    padding-top: 0.11rem;
  }
}
</style>
