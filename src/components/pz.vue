<template>
    <div class="m-pz" v-if="data">
        <el-tabs v-model="key" type="card">
            <el-tab-pane
                :label="item.name"
                :name="item.key"
                v-for="item in data"
                :key="item.id"
            >
                <a class="u-pz-link" target="_blank" :href="url">
                    <i class="el-icon-link"></i> 点击查看配装详情
                </a>
                <iframe
                    :src="src"
                    scrolling="no"
                    width="1280"
                    height="720"
                    style="border:none;background:none;max-width:100%;overflow:hidden;"
                ></iframe>
            </el-tab-pane>
        </el-tabs>
        <slot></slot>
    </div>
</template>

<script>
import {__Root} from '@jx3box/jx3box-common/data/jx3box.json'
export default {
    name: "Pz",
    props: ["raw"],
    components: {},
    data: function () {
        return {
            key : '0',
            schema: null,
        };
    },
    computed: {
        data: function () {
            let arr = []
            if(this.raw && this.raw.length){
                this.raw.forEach((item,i) => {
                    if(item.id){
                        arr.push({
                            id : item.id,
                            key : String(i),
                            name : item.name || '未命名'
                        })
                    }
                })
                return arr
            }
            return false
        },
        id : function (){
            return this.data?.[~~this.key]['id']
        },
        src: function () {
            return `${__Root}pz/iframe.html?id=${this.id}&mode=horizontal`;
        },
        url: function () {
            return `/pz/#/view/${this.id}`;
        },
    },
    methods: {
        receiveMessage: function () {
            const vm = this;
            window.addEventListener(
                "message",
                function (event) {
                    vm.schema = event.data;
                },
                false
            );
        },
    },
    mounted: function () {
        this.receiveMessage()
    },
};
</script>

<style scoped lang="less">
.u-pz-link {
    .db;
    .fz(15px);
    .mb(5px);
    &:hover {
        color: @pink;
    }
}
</style>