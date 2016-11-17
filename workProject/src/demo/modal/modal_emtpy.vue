<template>
    <div class="modal_emtpy">
        <modal_template>
            <div slot="header">
                modal_emtpy_header
            </div>
            <div slot="body">
                modal_emtpy_body
            </div>
        </modal_template>
    </div>
</template>
<style>

</style>
<script>
    import modal_template from './modal_template';
    export default{
        data(){
            return{
            }
        },
        components:{
            modal_template,
        },
        methods:{
        },
        computed:{
        }
    }
</script>