<!-- slider ×é¼þ -->
<template>
    <div class="slide-group">
        <div class="substance" :style="{transitionDuration: duration+'ms',width:scaleW+'px', transform:'translate3d('+$index*scaleW+'px, 0, 0)'}">
            <slot name="substance"></slot>
        </div>
        <div class="submenu" >
            <slot name="submenu"></slot>
        </div>
    </div>
</template>

<script>
module.exports = {
    props:{

    },
    data:function(){
        return {
            duration: 0,
            curOffset:0,
            scaleW:window.innerWidth,//页面宽度
            sliedrWrap:null,//滑块容器dom对象
            subMenu:null,//菜单容器dom对象
            subMenuWidth:0,//菜单容器dom对象宽度
            itemsDom:null,//滑动单元dom对象数组
            startTime:undefined,//记录手指按下时间
            endTime:undefined,//
            startX:undefined,//手指按下的坐标
            offsetX:0,//手指偏移量
            timer:null//计数器
        }
    },
    computed:{

    },
    ready:function(){
        this.init();
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
            this.offsetX = 0;
        },

        moveHandler:function(evt){
            evt.preventDefault();
            this.offsetX = evt.targetTouches[0].pageX - this.startX;
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
        },

        endHandler:function(evt){
            this.endTime = new Date() * 1;
            if(this.endTime - this.startTime >100){
                //move
                if(this.offsetX <= 0){
                    if(this.curOffset == this.subMenuWidth) return;
                    this.setTrans(this.sliedrWrap, this.scaleW, this.subMenuWidth);
                    this.curOffset = this.subMenuWidth;
                }else{
                    console.log("move to close");
                    this.setTrans(this.sliedrWrap, this.scaleW, 0);
                    this.curOffset = 0;
                }
            }else{
                //click
                if(this.curOffset == 0){
                    this.setTrans(this.sliedrWrap, this.scaleW, this.subMenuWidth);
                    this.curOffset = this.subMenuWidth;
                }else{
                    this.setTrans(this.sliedrWrap, this.scaleW, 0);
                    this.curOffset = 0;
                }
            }
        },

        setTrans:function(obj,time,target){
            obj.style.WebkitTransitionDuration = time+'ms';
            this.duration = time;
            obj.style.WebkitTransform = 'translate3d('+ target +'px, 0, 0)';
            
        },

        addListener:function(){
            this.sliedrWrap.addEventListener('touchstart', this.startHandler);
            this.sliedrWrap.addEventListener('touchmove', this.moveHandler);
            this.sliedrWrap.addEventListener('touchend', this.endHandler);
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
        height:60px;
        width:100%;
        background-color:#028dea;
        z-index:2;
    }

    .submenu
    {
        min-width:120px;
        height:60px;
        position:absolute;
        right:0;
        background-color:#ff5566;
        z-index:1;
    }
}
    
</style>