<template>
  <div
    class="leading-normal tracking-normal text-white background"
    style="font-family: 'Source Sans Pro', sans-serif"
  >
    <Header />
    <Section id="make" title="画像を選択する">
      <div class="flex flex-wrap">
        <div class="w-full sm:w-1/2 p-6 mx-auto">
          <h3
            class="md:text-3xl text-lg text-gray-800 font-bold leading-none mb-3"
          >
            {{ $t("ライブラリから画像を選択") }}
          </h3>
          <p class="text-gray-600 mb-3 text-base">
            {{ $t("選択できる画像は40Mバイトまでです。") }}
          </p>
          <p class="text-gray-600 text-base">
            {{ $t("推奨は4:3程度の横長の画像です。") }}
          </p>
          <p class="text-gray-600 mb-3 text-base">
            {{ $t("縦長の画像の場合はうまく変換できない可能性が高いです。") }}
          </p>
          <label
            class="bg-blue-600 cursor-pointer inline-flex items-center hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full"
          >
            <svg
              class="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
              />
            </svg>
            <span class="ml-2 text-base leading-normal">{{
              $t("画像を選択")
            }}</span>
            <input
              id="file"
              ref="fileInput"
              type="file"
              accept=".jpeg, .png"
              class="hidden"
              @change="setImage"
            />
          </label>
          <p v-if="tooBig" class="text-red-500 mt-5">
            {{ $t("画像サイズが大き過ぎます。") }}<br />{{
              $t("40Mバイトまでの画像を選んでください。")
            }}
          </p>
        </div>
        <div class="w-full mt-3 sm:w-1/2 relative">
          <img
            v-if="!uploadImageUrl"
            src="../assets/img/background.jpg"
            alt="default"
            class="border-double border-4 border-gray-600"
            width="100%"
          />
          <img
            v-if="uploadImageUrl"
            class="border-double border-4 border-gray-600"
            width="100%"
            :src="uploadImageUrl"
          />
        </div>
      </div>
    </Section>
    <Section title="背景エフェクトを選ぶ">
      <div class="md:p-0 p-6 md:mb-3 w-full">
        <p
          class="w-full text-center mt-3 text-gray-600 md:text-2xl text-base"
          v-if="!uploadImageUrl && !changedImageUrl"
        >
          {{ $t("先に画像を選択してください") }}
        </p>
        <p class="w-full text-center mt-3 text-gray-600 md:text-2xl text-base">
          {{
            $t(
              "境界線のはっきりしていない画像の場合、うまく背景画像があたりません。"
            )
          }}
        </p>
      </div>

      <div
        v-for="back in backs"
        :key="back.id"
        class="md:w-1/3 w-1/2 p-1 cursor-pointer"
        :class="{
          'opacity-50 pointer-events-none': !uploadImageUrl || overlay,
        }"
      >
        <div
          class="rounded-lg shadow-lg transform transition hover:scale-105 duration-300 ease-in-out"
          :class="{ 'border-4 border-blue-600': selectedBack === back[1] }"
          @click="selectedBack = back[1]"
        >
          <img
            :src="back[0]"
            class="block w-full h-auto object-contain"
            alt="art"
          />
        </div>
      </div>
    </Section>
    <Section title="画像の上に重ねるエフェクトを選ぶ">
      <div class="md:p-0 p-6 md:mb-3 w-full">
        <p
          class="w-full text-center mt-3 text-gray-600 md:text-2xl text-base"
          v-if="!uploadImageUrl && !changedImageUrl"
        >
          {{ $t("先に画像を選択してください") }}
        </p>
      </div>
      <div
        v-for="front in fronts"
        :key="front.id"
        class="md:w-1/3 w-1/2 p-1 cursor-pointer"
        :class="{
          'opacity-50 pointer-events-none': !uploadImageUrl || overlay,
        }"
      >
        <div
          class="rounded-lg shadow-lg transform transition hover:scale-105 duration-300 ease-in-out"
          :class="{ 'border-4 border-blue-600': selectedFront === front[1] }"
          @click="selectedFront = front[1]"
        >
          <img
            :src="front[0]"
            class="block w-full h-auto object-contain"
            alt="art"
          />
        </div>
      </div>
    </Section>
    <Section title="漫画化風画像を作る">
      <div
        v-if="uploadImageUrl"
        class="cursor-pointer bg-blue-600 md:w-1/3 mx-auto w-full p-2 text-center rounded-full hover:bg-blue-400 font-bold text-lg text-white"
        @click="getManga"
      >
        {{ $t("画像を漫画化する") }}
      </div>
      <p
        class="w-full text-center mt-3 text-gray-600 text-2xl mb-3"
        v-if="!uploadImageUrl && !changedImageUrl"
      >
        {{ $t("先に画像を選択してください") }}
      </p>
      <div class="w-full mx-auto">
        <Loaging v-if="overlay" />
      </div>

      <div v-if="changedImageUrl" class="w-full sm:w-1/2 p-6 mx-auto">
        <h3
          class="md:text-3xl text-lg text-gray-800 font-bold leading-none mb-3"
        >
          {{ $t("漫画が作成されました！") }}
        </h3>
        <p class="text-gray-600 mb-3 text-base">
          {{ $t("シェアや保存などしてお楽しみください。") }}
        </p>
        <ul class="flex space-x-6 mx-auto">
          <li>
            <div @click="OpenTwitterModal" class="cursor-pointer">
              <img
                alt="twitter"
                src="../assets/img/twitter.svg"
                :width="size"
                :height="size"
              />
            </div>
          </li>
          <li>
            <div @click="OpenFBModal" class="cursor-pointer">
              <img
                alt="twitter"
                src="../assets/img/facebook.svg"
                :width="size"
                :height="size"
              />
            </div>
          </li>
          <li>
            <a :href="changedImageUrl" download>
              <img
                alt="line"
                src="../assets/img/download.svg"
                :width="size"
                :height="size"
              />
            </a>
          </li>
        </ul>
      </div>
      <div class="w-full mt-3 sm:w-1/2 relative">
        <img
          v-if="changedImageUrl"
          class="border-double border-4 border-gray-600"
          :src="changedImageUrl"
          width="100%"
        />
      </div>
    </Section>
    <Modal v-if="twitterModalFlag">
      <div>
        <img
          v-if="changedImageUrl"
          class="border-double border-4 mt-3 border-gray-600 mx-auto modalImageClass block w-full h-auto object-cover"
          :src="changedImageUrl"
        />
        <div @click="CloseModal" class="absolute cursor-pointer top-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-8 h-8"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <button
          @click="tweetButton"
          class="text-center mx-auto bg-blue-600 text-white font-bold rounded-b py-4 w-full shadow-lg hover:bg-blue-400"
        >
          {{ $t("ツイートする") }}
        </button>
      </div>
    </Modal>
    <Modal v-if="FBModalFlag">
      <div>
        <img
          v-if="changedImageUrl"
          class="border-double border-4 mt-3 border-gray-600 mx-auto modalImageClass block w-full h-auto object-cover"
          :src="changedImageUrl"
        />
        <div @click="CloseModal" class="absolute cursor-pointer top-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-8 h-8"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <button
          @click="tweetButton"
          class="text-center mx-auto bg-blue-600 text-white font-bold rounded-b py-4 w-full shadow-lg hover:bg-blue-400"
        >
          {{ $t("シェアする") }}
        </button>
      </div>
    </Modal>
    <Footer />
  </div>
</template>

<script>
import getMangaImage from "~/assets/lib/getManga";
import postImageData from "~/assets/lib/postImageData";
import resizeImage from "~/assets/lib/resizeImage";
import Modal from "~/components/Modal.vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Section from "~/components/Section.vue";
import Loaging from "~/components/Loaging.vue";
import None from "~/assets/img/none.jpg";
import Back1 from "~/assets/img/back_effects/1.jpg";
import Back2 from "~/assets/img/back_effects/2.jpg";
import Back3 from "~/assets/img/back_effects/3.jpg";
import Back4 from "~/assets/img/back_effects/4.jpg";
import Back5 from "~/assets/img/back_effects/5.jpg";
import Front1 from "~/assets/img/front_effects/1.png";
import Front2 from "~/assets/img/front_effects/2.png";
import Front3 from "~/assets/img/front_effects/3.png";
import Front4 from "~/assets/img/front_effects/4.png";
import Front5 from "~/assets/img/front_effects/5.png";
import Front6 from "~/assets/img/front_effects/6.png";
import Front7 from "~/assets/img/front_effects/7.png";
import Front8 from "~/assets/img/front_effects/8.png";
export default {
  asyncData({ app }) {
    const locale = app.$cookies.get("locale");
    return {
      defaultLang: locale,
    };
  },
  components: {
    Modal,
    Header,
    Footer,
    Section,
    Loaging,
  },
  data() {
    return {
      changedImageUrl: "",
      uploadImageUrl: "",
      overlay: false,
      base64: "",
      uuid: "",
      twitterModalFlag: false,
      FBModalFlag: false,
      imageData: "",
      isFetched: false,
      tooBig: false,
      backs: [
        [None, 0],
        [Back1, 1],
        [Back2, 2],
        [Back3, 3],
        [Back4, 4],
        [Back5, 5],
      ],
      fronts: [
        [None, 0],
        [Front1, 1],
        [Front2, 2],
        [Front3, 3],
        [Front4, 4],
        [Front5, 5],
        [Front6, 6],
        [Front7, 7],
        [Front8, 8],
      ],
      selectedFront: 0,
      selectedBack: 0,
    };
  },
  computed: {
    size() {
      return 54;
    },
    url() {
      return `https://manga.art-creator.net/manga/${this.uuid}`;
    },
    twitterURL() {
      const shareText = this.$t("漫画ツクールで素敵な漫画を作ったよ");
      const hash = this.$t("#漫画ツクール");
      return (
        `https://twitter.com/intent/tweet?url=${this.url}&text=` +
        encodeURIComponent(shareText + `\r\n` + hash)
      );
    },
    facebookURL() {
      const shareText = this.$t("漫画ツクールで素敵な漫画を作ったよ");
      const hash = this.$t("#漫画ツクール");
      return `https://www.facebook.com/sharer/sharer.php?u=${this.url}&t=${shareText}\n${hash}`;
    },
  },
  mounted() {
    if (this.defaultLang) {
      return;
    }
    const userLanguage = navigator.language;
    const setLang = userLanguage === "ja" ? "ja" : "en";
    this.$cookies.set("locale", setLang);
    this.$i18n.locale = setLang;
  },
  methods: {
    tweetButton() {
      if (this.isFetched) {
        window.open(this.twitterURL, "_blank");
      }
    },
    FBButton() {
      if (this.isFetched) {
        window.open(this.facebookURL, "_blank");
      }
    },
    async OpenTwitterModal() {
      this.twitterModalFlag = true;
      this.uuid = this.generateUuid();
      await postImageData(this.uuid, this.imageData).then(() => {
        this.isFetched = true;
        window.history.pushState(null, null, `/manga/${this.uuid}`);
      });
    },
    async OpenFBModal() {
      this.FBModalFlag = true;
      this.uuid = this.generateUuid();
      await postImageData(this.uuid, this.imageData).then(() => {
        this.isFetched = true;
        window.history.pushState(null, null, `/manga/${this.uuid}`);
      });
    },
    CloseModal() {
      this.twitterModalFlag = false;
      this.FBModalFlag = false;
      this.isFetched = false;
      window.history.pushState(null, null, "/");
    },
    checkImageSize(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        if (file.size > 40 * 1000 * 1000) {
          this.tooBig = true;
          return;
        }
        this.tooBig = false;
        reader.onload = (e) => {
          this.uploadImageUrl = reader.result;
          const image = new Image();
          image.src = e.target.result;
          image.onload = () => {
            resolve(image);
          };
        };
        reader.readAsDataURL(file);
      });
    },
    async setImage(e) {
      const [file] = e.target.files;
      const image = await this.checkImageSize(file);
      if (image) {
        this.base64 = await resizeImage(image, 1200, 1200);
      }
      if (this.$refs.fileInput.value) {
        this.$refs.fileInput.value = "";
      }
    },
    getManga() {
      if (this.base64) {
        this.getResult(this.base64, this.selectedBack, this.selectedFront);
      }
    },
    generateUuid() {
      let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
      for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
          case "x":
            chars[i] = Math.floor(Math.random() * 16).toString(16);
            break;
          case "y":
            chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
            break;
        }
      }
      return chars.join("");
    },
    async getResult(file, back, front) {
      this.overlay = true;
      const res = await getMangaImage(file, back, front);
      if (res.status !== 200) {
        alert(
          this.$t(
            "サーバーエラーが発生しました。しばらく経ってから再度お試しください。"
          )
        )
          ? ""
          : window.location.reload();
        console.error(res);
        return;
      }
      this.imageData = res.data.image;
      this.changedImageUrl = "data:image/png;base64," + this.imageData;
      this.overlay = false;
    },
  },
};
</script>
<style>
.gradient {
  background: linear-gradient(90deg, #38382e 0%, #000 100%);
}
.background {
  background-image: url("~/assets/img/background.jpg");
  background-repeat: repeat;
  background-size: 768px 432px;
}
.modalImageClass {
  max-height: 350px;
}
</style>
