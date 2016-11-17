<template>
    <div class="login">
    </div>
</template>
<script lang="babel">

    import accountMessage from 'message/account';
    import store from '../../store';
    let storeImpl = store('user');
    export default {
        components:{
        },
        props:{
        },
        data(){
            return{
            }
        },
        route:{
            data(transition){
                accountMessage.unbind().then(()=>{
                    storeImpl.del('access');
                    this.$router.redirect('/login');
                }).catch(()=>{
                    storeImpl.del('access');
                    this.$router.redirect('/login');
                })
            }
        },
        computed:{

        }
    }
</script>
<style lang="scss" >
</style>