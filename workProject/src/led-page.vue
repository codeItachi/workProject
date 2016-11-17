<template>
    <div class="led-page">
        <tab :tabs="tabs">
            <tab-item name="ad_lists">
                <lists>
                    <swipe dir="left" imgsrc="./static/ad.png">
                        <div slot="display"></div>
                        <sub_menu :menu="menu"></sub_menu>
                    </led>
                </lists>
            </tab-item>
            <tab-item name="led_params">
                <div>item2</div>
            </tab-item>
        </tab>
    </div>
</template>
<style>

</style>
<script>
    import Common from './components/common/common';
    import leds from './components/leds';
    import led from './components/led';
    import tab from './components/tab';
    import tabItem from './components/tab-item';
    export default{
        data(){
            return {
                tabs: [
                    {title:"广告",bind:'ad_lists',tag:0},
                    {title:"参数",bind:'led_params'},
                ],

            }
        },
        components: {
            tab, tabItem, leds, led
        },
        methods: {

        },
        computed: {

        }
    }
</script>