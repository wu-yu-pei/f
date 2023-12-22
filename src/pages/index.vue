<template>
  <h4 v-if="!data" class="text-center pt-150">加载中...</h4>

  <h4 v-if="!data && code === 401" class="text-center pt-150">
    抱歉,由于某些原因你无法查看网站内容。
  </h4>

  <div v-if="data && code !== 401" class="w-[100vw] h-[100vh] pa-20!">
    <ul class="app">
      <template v-for="(item, index) in data">
        <li @click.stop="() => to(item.book_id)">
          <img
            v-lazy="`http://192.210.232.179:7777/juejin/${item.book_id}.png`"
            src="../assets/load2.png"
            alt=""
          />
          <div class="content">
            <h3 class="singe-line">{{ item.book_name }}</h3>
            <p class="double-line">{{ item.book_summary }}</p>
            <div class="bottom">
              <div class="bottom-price">
                ¥{{ Math.floor(item.book_price / 100 / 5) }}.99
                <sub class="fs-8 c-blue absolute">最低</sub>
              </div>
              <div
                class="bottom-button"
                @click.stop="() => submit(item.book_name)"
              >
                获取
              </div>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>

  <div class="tips w-400" v-if="show && data">
    <h3>声明</h3>
    <p>1. 所有小册均以md的形式交付</p>
    <p>2. <span class="c-red">ctrl + f 搜索</span></p>
    <p>3. 若长时间没有回复请, <span class="c-red">请耐心等待</span></p>
    <p>4. 本网站资源仅用于学习,小册均收集于网络,如有侵权请联系删除</p>
    <p class="c-red text-right">声明时间: 2023-12-11 12:00:00</p>
    <div class="close" @click="close">[关闭]</div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
import axios from 'axios';
const startDate = +new Date();
const data = ref();
const code = ref();
axios.get('http://192.210.232.179:7899/books').then((res) => {
  data.value = res.data.data;
  code.value = res.data.code;
});

function submit(book_id: any) {
  const phone = prompt('请输入你的微信 我会立即联系你');
  if (!phone?.trim()) {
    return;
  }
  axios
    .post('http://192.210.232.179:7899/submit', { book_id, phone })
    .then((res) => {
      alert('提交成功,请注意微信信息');
    });
}

function to(id: any) {
  window.open(`https://juejin.cn/book/${id}`, '_blank');
}

const show = ref(true);
setTimeout(() => {
  show.value = false;
}, 10000);
function close() {
  show.value = false;
}

// lazy load
const vLazy = {
  mounted(el: HTMLImageElement, binding: any) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.src = binding.value;
          observer.unobserve(el);
        }
      });
    });
    observer.observe(el);
  },
};

// 离开
window.addEventListener('beforeunload', () => {
  const time = (+new Date() - startDate) / 1000;
  console.log(time);
  fetch(`http://192.210.232.179:7899/leave?time=${time}`, {
    method: 'GET',
    keepalive: true,
  });
});

axios({
  url: 'https://chaipip.com/aiwen.html',
  method: 'get',
  proxy: {
    host: '125.46.83.162',
    port: 63000,
  },
}).then((res) => {
  console.log(res);
});
</script>

<style scoped>
.tips {
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  padding: 10px 10px;
  padding-bottom: 20px;
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #6c6969;
  border-radius: 10px;
  color: #fff;
}
.tips .close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}
.tips .close:hover {
  color: red;
}
.tips p {
  font-size: 12px;
}
.singe-line {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}
.double-line {
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  padding: 20px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 0 auto;
}

ul li {
  display: flex;
  cursor: help;
  list-style: none;
  width: 300px;
  max-width: 100%;
  aspect-ratio: 2/1;
}
ul li img {
  height: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 20px;
  overflow: hidden;
}
.content h3 {
}
.content p {
  font-size: 14px;
  color: #2d2c2c;
}
.bottom {
  display: flex;
  justify-content: space-between;
}
.bottom-price {
  color: red;
  font-weight: 800;
  font-size: 20px;
}
.bottom-button {
  text-align: center;
  line-height: 30px;
  width: 60px;
  height: 30px;
  color: #fff;
  letter-spacing: 5px;
  border-radius: 2px;
  cursor: pointer;
  opacity: 0.5;
  background-color: red;
}
.bottom-button:hover {
  opacity: 0.8;
  background-color: red;
}
</style>
