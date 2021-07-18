<template>
  <div class="w-full mx-auto">
    <div class="w-full text-center mt-3 text-gray-600 md:text-2xl text-lg mb-3">
      {{ message }}
    </div>
    <div class="time-loader w-full mx-auto"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: this.$t("変換中..."),
    };
  },
  mounted() {
    setTimeout(() => {
      this.message = this.$t("ただいま愛情込めて描いています");
    }, 2000);
    setTimeout(() => {
      this.message = this.$t("おまたせしてすみません");
    }, 4000);
    setTimeout(() => {
      this.message = this.$t("焦らずにお待ち下さい");
    }, 6000);
    setTimeout(() => {
      this.message = this.$t("遅すぎますか？");
    }, 8000);
    setTimeout(() => {
      this.message = this.$t("決してサボってるわけではないんです");
    }, 10000);
    setTimeout(() => {
      this.message = this.$t("只今大慌てで描いています");
    }, 12000);
    setTimeout(() => {
      this.message = this.$t("もう少し..もう少しだけお待ち下さい");
    }, 14000);
    setTimeout(() => {
      this.message = this.$t("この画像重くないですか？");
    }, 16000);
    setTimeout(() => {
      this.message = this.$t("でも頑張って描いていますよ");
    }, 18000);
    setTimeout(() => {
      this.message = this.$t("あとちょっとだと思うんです");
    }, 20000);
    setTimeout(() => {
      this.message = this.$t("あまりにも素敵な画像なので魅入ってしまいました");
    }, 22000);
    setTimeout(() => {
      this.message = this.$t("おまたせしてすみません");
    }, 24000);
    setTimeout(() => {
      this.message = this.$t("只今大慌てで描いています");
    }, 26000);
    setTimeout(() => {
      this.message = this.$t("もう少し..もう少しだけお待ち下さい");
    }, 28000);
  },
};
</script>
<style>
.time-loader {
  width: 120px;
  height: 20px;
  -webkit-mask: linear-gradient(90deg, #333 70%, #0000 0) left/20% 100%;
  background: linear-gradient(#333 0 0) left -25% top 0 /20% 100% no-repeat #ddd;
  animation: ct7 1s infinite steps(6);
}
@keyframes ct7 {
  100% {
    background-position: right -25% top 0;
  }
}
</style>
