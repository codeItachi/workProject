<template>
    <div class="modal" :class="modalstyle" @click="shutModal()">
        <div>
            <div class="modal-container" @click="stopDefault">
                <slot></slot>
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

        ready(){
            this.$on('modal_status', function(status){
                this.modalstyle.show = status;
            }
        },

        methods:{
            shutModal(){
                this.modalstyle.show = false;
            }
            
        },

        props:{
            
        }
    }
</script>