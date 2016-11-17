<!-- slider ×é¼þ -->
<template>
    <div class="slide-group">
        <div class="substance" :style="{transitionDuration: duration+'ms',transform:'translate3d('+$index*scaleW+'px, 0, 0)'}">
            <slot name="substance"></slot>
        </div>
        <div class="submenu" :class="{'menuStyle':menuStyle}">
            <slot name="submenu"></slot>
        </div>
    </div>
</template>

<script>
const direction_updown = 0;
const direction_up = 1;
const direction_down = 2;
const direction_leftright = 5;
const direction_left = 6;
const direction_right = 7;

module.exports = {
    
    data(){
        return {
            duration: 0,
            curOffset:0,
            menuStyle:false,
            unslide:false,
            scaleW:window.innerWidth,//页面宽度
            sliedrWrap:null,//滑块容器dom对象
            subMenu:null,//菜单容器dom对象
            subMenuWidth:0,//菜单容器dom对象宽度
            itemsDom:null,//滑动单元dom对象数组
            startTime:undefined,//记录手指按下开始时间
            endTime:undefined,//记录手指按下结束时间
            startX:undefined,//手指按下的X坐标
            startY:undefined,//手指按下的Y坐标
            offsetX:0,//手指偏移量
            timer:null,//计数器
        }
    },
    props:{
        index:{
        },
        menuOpen:{
            type:Function
        },
        menuClose:{
            type:Function
        },
        opened:{

        },
        disab:{
            type:Boolean,
        }
    },
    ready(){
        this.init();

        //唯一滑动
        this.$watch('opened',(val)=>{
            if(this.index !== val){
                this.close();
            }
        });

        //外部条件关闭
        this.$watch('disab',(disab)=>{
            if(disab){
                this.close();
            }
        });
    },
    computed:{
        offsetDirection(){
            if(Math.abs(this.offsetX) - Math.abs(this.offsetY) < 0 && this.offsetY <0) return direction_up;//向上滑动
            if(Math.abs(this.offsetX) - Math.abs(this.offsetY) < 0 && this.offsetY >0) return direction_down;//向下滑动
            if(Math.abs(this.offsetX) - Math.abs(this.offsetY) > 0 && this.offsetX < 0) return direction_left;//向左滑动
            if(Math.abs(this.offsetX) - Math.abs(this.offsetY) > 0 && this.offsetX > 0) return direction_right;//向右滑动
        }
    },

    methods:{
        init:function(){
            this.sliedrWrap = this.$el.getElementsByClassName('substance')[0];
            this.subMenu = this.$el.getElementsByClassName('submenu')[0];
            this.subMenuWidth = -this.subMenu.offsetWidth;
            this.addListener();
        },

        startHandler:function(evt){
            this.startTime = new Date() * 1;
            this.startX = evt.touches[0].pageX;
            this.startY = evt.touches[0].pageY;
            this.offsetX = 0;
            this.offsetY = 0;
        },

        moveHandler:function(evt){
            if(this.disab){
                return;
            }

            this.offsetX = evt.targetTouches[0].pageX - this.startX;
            this.offsetY = evt.targetTouches[0].pageY - this.startY;

            if(this.offsetX < 0){
                this.menuStyle = true;
            }

            if(Math.abs(this.offsetX) / Math.abs(this.offsetY) > 3 ){
                evt.preventDefault();

                if(this.curOffset <= 0 && this.offsetX <= 0){
                    if(this.curOffset == this.subMenuWidth) return;
                    this.setTrans(this.sliedrWrap, 0, this.offsetX);
                    return;
                }
                if(this.offsetX >= 0 && this.curOffset <= 0){
                    if(this.curOffset == 0)return;
                    if(this.curOffset == this.subMenuWidth && (this.curOffset + this.offsetX) > 0) return;
                    this.setTrans(this.sliedrWrap, 0, this.curOffset + this.offsetX);
                }
            }else{
                return;
            }
        },

        endHandler:function(evt){
            //外部禁止滑动关闭滑动菜单
            if(this.disab){
                this.close();
                return;
            }

            if(Math.abs(this.offsetX) / Math.abs(this.offsetY) > 3 ){
                if(this.offsetX < -30 && this.curOffset ==0){
                        this.open();
                }
                if(this.offsetX < 0 && this.curOffset ==0){
                    this.close();
                }
                if(this.offsetX > 0 && this.curOffset == this.subMenuWidth){
                    this.open();
                }
                if(this.offsetX > 30 && this.curOffset == this.subMenuWidth){
                    this.close();
                }else{
                    return;
                }
            }
            else{
                this.close();
                return;
            }
        },
        //关闭状态清除按钮背景色--防止列表滚动动画层渲染滞后看见遮罩后面的按钮
        clearMenuShutStyle:function(evt){
            if(this.curOffset == 0){
                this.menuStyle = false;
            }
        },

        setTrans(obj,time,target){
            obj.style.WebkitTransitionDuration = time+'ms';
            this.duration = time;
            obj.style.WebkitTransform = 'translate3d('+ target +'px, 0, 0)';
        },

        addListener(){
            this.sliedrWrap.addEventListener('touchstart', this.startHandler);
            this.sliedrWrap.addEventListener('touchmove', this.moveHandler);
            this.sliedrWrap.addEventListener('touchend', this.endHandler);
            this.sliedrWrap.addEventListener("webkitTransitionEnd", this.clearMenuShutStyle);//监听CSS滑动结束时间
        },

        open(){
            this.setTrans(this.sliedrWrap, 300, this.subMenuWidth);
            this.menuOpen && this.menuOpen(this.index);
            this.curOffset = this.subMenuWidth;
        },

        close(){
            this.setTrans(this.sliedrWrap, 300, 0);
            this.menuClose && this.menuClose(this.index);
            this.curOffset = 0;
        }
    }
}
</script>

<style lang="scss">
.slide-group
{
    position:relative;

    .substance
    {
        transition-property: all;
        transition-delay: 0;
        transition-timing-function:  ease;
        position:absolute;
        display:block;
        left:0;
        top:0;
        height:auto;
        width:100%;
        z-index:2;
        background-color:#fff;
    }

    .submenu
    {
        height:auto;
        min-width:120px;
        position:absolute;
        right:0;
        z-index:1;
    }
}
    
</style>