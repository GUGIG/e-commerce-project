<template>
    <div class="home">
        <NavBar></NavBar>
        <div class="container h-100">
            <div class="intro h-100">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-md-6">
                        <h1 class="title">Vue Shop For Developers</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque possimus odit repellendus iure quasi exercitationem, voluptas debitis aliquam ipsum facere dicta facilis reprehenderit eum, ex ipsam officiis error tempore repellat!</p>
                    </div>
                    <div class="col-md-6">
                        <img src="../assets/svg/graphic.svg" alt="overview" class="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home"
};
</script>

<style lang="scss" scoped>
h1 {
    font-size: 3vw;
}
</style>