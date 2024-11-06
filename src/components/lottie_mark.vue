<!-- src/components/LottieAnimation.vue -->
<template>
    <div ref="lottieContainer" :style="{ width: width, height: height }"></div>
</template>

<script>
import lottie from "lottie-web";
import { cloneDeep } from "lodash";
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
            const data = cloneDeep(animations(`./${this.mark}.json`));
            const ref = this.$refs.lottieContainer;
            lottie.loadAnimation({
                container: ref,
                renderer: "svg",
                loop: true,
                autoplay: true,
                animationData: data,
            });
        },
    },
};
</script>

<style scoped></style>
