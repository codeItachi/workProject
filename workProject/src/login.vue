<template>
    <div></div>
</template>
<style>

</style>
<script>
    import auth from './auth';
    import config from './config';
    export default{
        route:{
            data({to:{query:query}}){
                let url = config.baseurl + "#!/" + query.url;
                console.log(url);
                auth.login(url);
            }
        },
    }
</script>