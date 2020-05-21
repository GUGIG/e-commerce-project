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

                <hr />

                <h3>Basic CRUD (create/read/update/delete) in Firebase and Vue</h3>

                <div class="product-test">
                    <div class="form-group">
                        <input
                            type="text"
                            placeholder="Product Name"
                            v-model="product.name"
                            class="form-control"
                        />
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Price" v-model="product.price" class="form-control" />
                    </div>
                    <div class="form-group">
                        <button @click="saveData" class="btn btn-primary">Save Data</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../firebase";

export default {
    name: "Product",
    data() {
        return {
            product: {
                name: null,
                price: null
            }
        };
    },
    methods: {
        saveData() {
            db.collection("products")
                .add(this.product)
                .then((docRef) => { // to access "this", you should use lamda.
                    console.log("Document written with ID: ", docRef.id);
                    this.resetData();
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        },
        resetData() {
            Object.assign(this.$data, this.$options.data.apply(this));
        }
    },
    props: {
        msg: String
    }
};
</script>

<style>
</style>