<!-- src/components/LottieAnimation.vue -->
<template>
    <div ref="lottieContainer" :style="{ width: width, height: height }"></div>
</template>

<script>
import lottie from "lottie-web";
const animations = require.context("../assets/lottie", false, /\.json$/);

export default {
    props: {
        mark: {
            type: String,
            default: "star",
        },
        width: {
            type: String,
            default: "24px",
        },
        height: {
            type: String,
            default: "24px",
        },
    },
    mounted() {
        this.loadAnimation();
    },
    methods: {
        loadAnimation() {
            lottie.loadAnimation({
                container: this.$refs.lottieContainer,
                renderer: "svg",
                loop: true,
                autoplay: true,
                animationData: animations(`./${this.mark}.json`),
            });
        },
    },
};
</script>

<style scoped></style>
