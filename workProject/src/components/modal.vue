<template>
    <div class="modal" :class="modalstyle" @click="shutModal()">
        <div>
            <div class="modal-container" @click="stopDefault">
                <slot name="head"></slot>
                <slot name="body"></slot>
                <div class="modal-foot">
                    <button class="btn-default" type="button" @click="cancers()"><slot name="cancer">取消</slot></button>
                    <slot name="confirm"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
            }
        },

        methods:{
            shutModal(){
                this.modalstyle.show = false;
            },
            cancers(){
                this.modalstyle.show = false;
            },
            confirm(){
                this.modalstyle.show = false;
            },
            stopDefault(event){
              event.stopPropagation();
            }
        },

        props:{
            modalstyle:{
                required:true,
                type:Object,
            },
        }
    }
</script>