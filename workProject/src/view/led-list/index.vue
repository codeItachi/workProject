<template>
    <div>
        <page-head>
            <span v-if="!searchMode" slot="left" class="left list" v-gesture:tap.stop.prevent="putMethod()"></span>
            <span v-else="searchMode" slot="left" class="left map" v-gesture:tap.stop.prevent="putMethod()"></span>
            <span slot="center" class="center">我的LED屏({{ledCount}}{{groupNumber}})</span>
            <span slot="right" class="led-right" v-gesture:tap.stop.prevent="led_add">添加屏</span>
        </page-head>
        <content v-if="!searchMode">
            <list>
                <led-item-group  slot="list" v-for="group in groups | orderBy 'etime' -1"
                                 :group="group",
                                 :group-style="groupStyle"
                                 :opened.sync="group_opened"
                                 :prev-page="prevPage"
                                 :next-page="nextPage"
                                 :gselect-click="gselectClick"
                                 :page-style="pageStyle"
                                 :count="lists | countBy group.id">
                    <led-item
                            v-for="led in lists | groupBy group.id"
                            :led="led"
                            :select-led="selectled"
                            :index="$index"
                            :opened.sync="opened"
                            :info-put="infoPut"
                            :info-edit="infoEdit"
                            :info-del="infoDel"
                            :current-page="currentPage"
                            :pagenumber="pagenumber"
                            :group="group"
                            >
                    </led-item>
                </led-item-group>
            </list>
        </content>

        <content v-else class="map-show">
            <map :sselects="sselects" :xselects="xselects" :gselects="gselects">
            </map>
        </content>
        <page-foot>
            <!-- <button :class="{'active':active}" v-gesture:tap.stop.prevent="submit">
                <span>{{submit_title}}</span>
            </button> -->
            <span slot="left" class="btn-left" :class="{'disab' : !pagePrev}" v-gesture:tap.stop.prevent="prevPage()">上一页</span>
            <a slot="submit" v-gesture:tap.stop.prevent="submit" :class="{'active':active}">
                <span class="num">{{submitNum}}</span>
                <span class="txt">投放</span>
            </a>
            <span slot="right" class="btn-right" :class="{'disab' : !pageNext}" v-gesture:tap.stop.prevent="nextPage()">下一页</span>
        </page-foot>
    </div>
</template>
<style lang="scss">
    @import "./layout.scss";
</style>
<script lang="babel">
    document.addEventListener("touchstart", function(){}, true);
    import Vue from 'vue';
    import vueGesture from 'vue-gesture';
    Vue.use(vueGesture);

    import pageHead from './head.vue';
    import Content from './content.vue';
    import pageFoot from './foot.vue';
    import LedItem from './led-item.vue';
    import selector from './selector.vue';
    import list from './list.vue';
    import map from './map.vue';
    import modal from '../../components/modal.vue';
    import socket from '../../socket';
    import ledItemGroup  from './led-item-group.vue';
    import ledMessage from '../../message/led.js';
    import adMessage from '../../message/advertisement.js';
    import {array_remove,array_exist} from '../../common.js';

    const separator = '+';

    Vue.filter('groupBy', function(leds, gid){
        let temp = [];
        leds.forEach((led)=>{
            if(led.gid == gid){
                temp.push(led);
            }
        });
        return temp;
    });

    Vue.filter('countBy', function(leds, gid){
        let count = 0;
        leds.forEach((led)=>{
            if(led.gid == gid){
                count++;
            }
        });
        return count;
    });


    export default{
        data(){
            return {
                pagenumber:8,
                group_opened:null,
                groupStyle:false,
                pageStyle:true,
                currentPage:1,
                groups:[
                    // {id:"es",name:'我的分组'}
                ],
                ledCount:0,

                timer:null,
                lists:[

                ],
                pselects:[],//选择法Group
                sselects:[],//选择法LED
                xselects:[],//排除法LED
                gselects:[],
                active:false,//底部按钮状态
                opened: null,//slider-menu
                searchMode:false,//选择模式

                //模态
                styleStatu:{
                    'prompt':true, //模态class
                    'show': false
                },
                id:null,//删除当前节目ID
            }
        },

        destroyed(){
            clearTimeout(this.timer);
        },

        route:{
            data({to:{query}}){
                this.$loading.show();
                this.pselects = this.slit_separator(query.pids);
                this.sselects = this.slit_separator(query.sids,true);
                this.gselects = this.slit_separator(query.gids);
                this.xselects = this.slit_separator(query.xids,true);
                socket.ready = () =>{
                    this.loadData();
                }
            }
        },

        methods:{
            refresh_group_led(){
                let len = this.lists.length;
                for(let i=0; i<len;i++){
                    let led = this.lists[i];
                    let select = this.led_select(led);
                    if(led.select != select){
                        led.select = select;
                        this.lists.$set(i, led);
                    }else{
                    }
                }
            },
            gselectClick(gid, status){
                switch (status){
                    case 1:
                        let len = this.gselects.length;
                        for(let i=0; i<len; i++){
                            if(this.gselects[i] == gid){
                                this.gselects.$remove(this.gselects[i]);
                                break;
                            }
                        }
                        this.refresh_group_led();
                        break;
                    case 3:
                        array_remove.apply(this.sselects, [gid,function(gid,ele){
                            if(gid == ele.gid) return true;
                            return false;
                        }]);

                        array_remove.apply(this.xselects, [gid,function(gid,ele){
                            if(ele.gid == gid) return true;
                            return false;
                        }]);

                        array_remove.apply(this.gselects, [gid,function(gid,ele){
                            if(ele == gid) return true;
                            return false;
                        }]);

                        this.gselects.push(gid);
                        this.refresh_group_led();
                        break;
                    default:
                        break;
                }
            },

            //分页
            prevPage(){

                if(!this.pagePrev || !this.pageButton){
                    //this.$toast({text:'第一页'});
                    return;
                }
                var groupData = this.getgroup(this.group_opened);
                groupData.page = groupData.page - 1;
                this.currentPage = groupData.page;
                this.setgroup(groupData);
                this.refreshGroup(this.group_opened, groupData.page);
            },

            nextPage(group){
                if(!this.pageNext || !this.pageButton){
                    //this.$toast({text:'最后一页'});
                    return;
                }
                var groupData = this.getgroup(this.group_opened);
                groupData.page = groupData.page + 1;
                this.currentPage = groupData.page;
                this.setgroup(groupData);
                this.refreshGroup(this.group_opened, groupData.page);
            },

            led_select(led){
                if(this.gselects.indexOf(led.gid) > -1){
                    let xlen = this.xselects.length;
                    for(let i=0; i < xlen; i++){
                        if(this.xselects[i].gid == led.gid && this.xselects[i].sid == led.id){
                            return false;
                        }
                    }
                    return true;
                }
                let slen = this.sselects.length;
                for(let z=0; z < slen; z++){
                    if(this.sselects[z].gid == led.gid && this.sselects[z].sid == led.id){
                        return true;
                    }
                }
                return false;
            },

            refreshGroup(group, page){
                ledMessage.page(group, page,this.pagenumber).then(result=>{
                    array_remove.apply(this.lists, [group,(group,led)=>{
                        if(led.gid == group){
                            return true;
                        }else{
                            return false;
                        }
                    }]);

                    let maxlen = this.lists.length;
                    for(let j = 0; j < result.length; j++){
                        let led = result[j];
                        led.select = false;
                        this.lists.$set(j+maxlen, led);
                    }
                    this.refresh_group_led();
                }).catch(code=>{

                });
            },
            getgroup(group){
                let len = this.groups.length;
                for(let i = 0; i < len; i++){
                    let groupData = this.groups[i];
                    if(groupData.id == group){
                        return groupData;
                    }
                }
            },

            setgroup(group, newGroupData){
                let len = this.groups.length;
                for(let i = 0; i < len; i++){
                    let oldGroupData = this.groups[i];
                    if(oldGroupData.id == group){
                        this.groups.$set(i, newGroupData);
                        return;
                    }
                }
            },

            loadData(){
                ledMessage.get_list(this.pagenumber).then(result=>{
                    this.ledCount = result.ledcount;
                    this.groups = this.init_group_selects(result.groups);
                    let list = result.leds.map(item=>{
                        item.select = this.sselects.indexOf(item.id) != -1;
                        if(this.pselects.length > 0){
                            item.disab = true;
                        }
                        item.gid = item.gid == '' ? 0 : item.gid;
                        return item;
                    });
                    this.lists = list;
                    this.timer_sync_lists();
                    this.$loading.close();
                }).catch(code=>{
                    if(code == '未登录账号'){
                        this.$router.go({path:'/login'});
                    }
                });
            },

            init_group_selects(groups){
                return groups.map((group)=>{
                    group.select = 1;
                    return group;
                });
            },

            // temp
            fixgroups(groups){
                return groups.map(group=>{
                    group.page = 1;
                    group.pages = Math.ceil(Math.random() * 10);
                    return group;
                });
            },

            led_add(){
                this.$router.go({'name':'led-add'});
            },
            infoPut(id){
                this.$route.router.go({path: '/new-ad-list?sids=' + id});
            },

            putMethod(){
                this.searchMode = !(this.searchMode);
            },

            infoDel(id, gid, device){
                this.$modalcb({
                    title: '温馨提示',
                    content: '是否删除当前LED屏？',
                    cancelTitle: '取消',
                    submitTitle: '删除',
                }).then(()=>{
                    ledMessage.del_led(device).then((ret)=> {
                        this.$toast({
                            text: ret,
                            time: 1000,
                            func: () => {
                                this.ledCount = this.ledCount - 1;
                                let groupData = this.getgroup(this.group_opened);
                                groupData.count = groupData.count  - 1;
                                groupData.pages = Math.ceil(groupData.count / this.pagenumber);
                                groupData.page = Math.min(groupData.pages, groupData.page);
                                array_remove.apply(this.xselects,[{sid:id,gid:gid},function (gs, ele) {
                                    if(gs.gid == ele.gid && gs.sid == ele.sid){
                                        return true;
                                    }else{
                                        return false;
                                    }
                                }]);
                                this.setgroup(this.group_opened, groupData);
                                this.refreshGroup(this.group_opened, groupData.page);
                                this.refresh_group_status(gid);
                            }
                        })
                    }).catch(code=>{
                        this.$toast({text:code});
                    });
                }).catch(()=>{

                });

            },

            infoEdit(id){
                this.$route.router.go({path:'/led-detail?id=' + id});
            },

            slit_separator(strs, isobj){
                if(strs){
                    let arrs = strs.split(separator);
                    if(isobj){
                        return arrs.map((obj)=>{
                            return JSON.parse(obj);
                        });
                    }else{
                        return arrs;
                    }
                }else{
                    return []
                }
            },

            concat_separator(ids, func){
                if(func){
                    return ids.map(func).join(separator);
                }else{
                    return ids.join(separator);
                }
            },

            submit(){
                if(this.scount <= 0){
                    this.$toast({text:'请选择屏'});
                    return;
                }
                if(this.active){
                    this.active = false;
                    this.$loading.startup("正在发送");

                    if(this.pselects.length <= 0){
                        let func = function(obj){
                            obj = {gid:obj.gid,sid:obj.sid};
                            return JSON.stringify(obj);
                        };
                        let sids = this.concat_separator(this.sselects,func);
                        let pids = this.concat_separator(this.pselects);
                        let xids = this.concat_separator(this.xselects,func);
                        let gids = this.concat_separator(this.gselects);
                        this.$router.go({name:'new-ad-list',query:{sids:sids,pids:pids,gids:gids,xids:xids}});
                        this.$loading.close();
                        return;
                    }
                    adMessage.toufang({sids: this.sselects, pids:this.pselects, xids:this.xselects,gids:this.gselects}).then(oid=>{
                        this.active = true;
                        this.$loading.close();
                        this.$router.replace({'name':'toufang-intro',params:{id:oid}});
                    })
                }else{
                    return;
                }
            },

            timer_sync_lists(){
                this.timer = setTimeout(()=>{
                    this.refresh_onlinestatus();
                    this.timer_sync_lists();
                },6000);
            },
            refresh_onlinestatus(){
                let onlines = ledMessage.get_onlinestatus(this.devices);
                onlines.then(result => {
                    let rlen = result.length;
                    let llen = this.lists.length;
                    for(let j = 0; j < llen; j++){
                        let led = this.lists[j];
                        for(let i = 0; i < rlen; i++){
                            let status = result[i];
                            if(led.device == status.device){
                                if(led.online_status != status.status){
                                    led.online_status = status.status;
                                    led.last_status_time = status.last_status_time;
                                    this.lists.$set(j, led);
                                }
                                break;
                            }
                        }
                    }
                }).catch(()=>{});
            },
            selectled(gid, sid, status){
                if(this.gselects.indexOf(gid) > -1){
                    if(status){
                        let xlen = this.xselects.length;
                        for(let i = 0; i < xlen; i++){
                            let gs = this.xselects[i];
                            if(gs.gid == gid && gs.sid == sid){
                                this.xselects.$remove(gs);
                                break;
                            }
                        }
                    }else{
                        this.xselects.push({gid:gid,sid:sid});
                    }
                }else{
                    if(status){
                        this.sselects.push({gid:gid,sid:sid});
                    }else{
                        let len = this.sselects.length;
                        for(let i = 0; i < len; i++){
                            let gs = this.sselects[i];
                            if(gs.gid == gid && gs.sid == sid){
                                this.sselects.$remove(gs);
                                break;
                            }
                        }
                    }
                }
                this.refresh_group_status(gid);
            },
            refresh_group_status(gid){
                let group = this.getgroup(gid);
                if(this.gselects.indexOf(gid) > -1){
                    group.select = 3;
                    let xlen = this.xselects.length;
                    let group_xlen = 0;
                    for(let j = 0; j < xlen; j++){
                        if(this.xselects[j].gid == gid){
                            group_xlen +=1;
                            group.select = 2;
                        }
                    }
                    if(group_xlen == group.count){
                        group.select = 1;
                        array_remove.apply(this.xselects, [gid,function(gid,ele){
                            if(ele.gid == gid) return true;
                            return false;
                        }]);
                    }
                }else{
                    let len = this.sselects.length;
                    let cur = 0;
                    for(let i = 0; i < len; i++){
                        let gs = this.sselects[i];
                        if(gs.gid == gid){
                            cur+=1;
                        }
                    }
                    if(cur <= 0 ){
                        group.select = 1;
                    }else if(group.count > cur){
                        group.select = 2;
                    }else {
                        group.select = 3;
                    }
                }
                this.setgroup(group);
            }
        },

        computed:{
            // allSelect(){
            //     let length = this.groups.length;
            //     for(let i=0; i < length; i++){
            //         if(!this.groups[i].select) return false;
            //     }
            //     return true;
            // },
            submitNum(){
                // let ret = '';
                let scount = this.scount;
                if(scount > 0 ){
                    // ret = "已选择屏("+scount+")，点击投放广告";
                    this.active = true;
                }else{
                    // ret = "请选择屏("+0+")";
                    this.active = false;
                }
                return scount;
            },

            pageButton(){
                let gg = ()=>{
                    let group = this.getgroup(this.group_opened);
                    return group.pages > 1;
                };
                let ret = this.group_opened != null && gg();
                return ret;
            },
            pagePrev(){
                let gg = ()=>{
                    let group = this.getgroup(this.group_opened);
                    return group.page > 1;
                };
                return this.pageButton && gg();
            },
            pageNext(){
                let gg = ()=>{
                    let group = this.getgroup(this.group_opened);
                    return group.page < group.pages;
                };
                return this.pageButton && gg();
            },
            scount(){
                let count = 0;
                let glen = this.gselects.length;
                for(let i = 0; i < glen; i++){
                    let gid = this.gselects[i];
                    let group = this.getgroup(gid);

                    count +=group.count || 0;
                }
                count-=this.xselects.length;
                let slen = this.sselects.length;
                count+=slen;
                return count;
            },
            devices(){
                return this.lists.map(led=>led.device);
            }
        },

        components: {
            pageHead, Content,selector, pageFoot, LedItem,list,map,ledItemGroup,modal
        }
    }
</script>
