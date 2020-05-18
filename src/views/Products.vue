<template>
    <div class="products">
        <div class="container">
            <div class="container h-100">
                <div class="intro h-100">
                    <div class="row h-100 justify-content-center align-items-center">
                        <div class="col-md-6">
                            <h3>Products Page</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, saepe?</p>
                        </div>
                        <div class="col-md-6">
                            <img src="../assets/svg/products.svg" alt="overview" class="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Product",
    props: {
        msg: String
    }
};
</script>

<style>
</style>