<template>
    <div class="account">
    </div>
</template>
<style>
    
</style>
<script>
    export default{
        data(){
            return{
                panelIndex: 1,
            }
        },
        route:{
            data(transftion){
                accountMessage.get_status().then((status)=>{
                    switch (status.state){
                        case 'login':
                            console.log('ssssss');
                            break;
                    }
                }).catch((error)=>{

                });
            }
        },
        components:{
        },
        methods:{
            goto(index){
                this.panelIndex = index;
            }
        },
        computed:{
        }
    }
</script>