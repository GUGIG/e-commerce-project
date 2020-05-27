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

                <div class="product-test">
                    <br />
                    <h3 class="d-inline-block">Products list</h3>
                    <button @click="addNew" class="btn btn-primary float-right">Add Product</button>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Modify</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in products" :key="product['.key']">
                                    <td>{{product.name}}</td>
                                    <td>{{product.price}}</td>
                                    <td>
                                        <button class="btn btn-primary">Edit</button>
                                        <button
                                            class="btn btn-danger"
                                            @click="deleteProduct(product['.key'])"
                                        >Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="modal fade"
            id="product"
            tabindex="-1"
            role="dialog"
            aria-labelledby="editLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editLabel">Edit Product</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <!-- main product -->
                            <div class="col-md-8">
                                <div class="form-group">
                                    <input
                                        type="text"
                                        placeholder="Product Name"
                                        v-model="product.name"
                                        class="form-control"
                                    />
                                </div>

                                <div class="form-group">
                                    <!-- <vue-editor v-model="product.description"></vue-editor> -->
                                    <textarea
                                        name="description"
                                        class="form-control"
                                        placeholder="Product description"
                                        v-model="product.description"
                                        id
                                        cols="30"
                                        rows="10"
                                    ></textarea>
                                </div>
                            </div>
                            <!-- product sidebar -->
                            <div class="col-md-4">
                                <h4 class="display-6">Product Details</h4>
                                <hr />

                                <div class="form-group">
                                    <input
                                        type="text"
                                        placeholder="Product price"
                                        v-model="product.price"
                                        class="form-control"
                                    />
                                </div>

                                <div class="form-group">
                                    <input
                                        type="text"
                                        placeholder="Product tags"
                                        class="form-control"
                                        v-model="product.tag"
                                    />
                                    <!-- @keyup.188="addTag" -->

                                    <!-- <div class="d-flex">
                                        <p v-for="tag in product.tags">
                                            <span class="p-1">{{tag}}</span>
                                        </p>
                                    </div>-->
                                </div>

                                <div class="form-group">
                                    <label for="product_image">Product Images</label>
                                    <input type="file" class="form-control" />
                                    <!-- @change="uploadImage" -->
                                </div>

                                <div class="form-group d-flex">
                                    <!-- <div class="p-1" v-for="(image, index) in product.images">
                                        <div class="img-wrapp">
                                            <img :src="image" alt width="80px" />
                                            <span
                                                class="delete-img"
                                                @click="deleteImage(image,index)"
                                            >X</span>
                                        </div>
                                    </div>-->
                                    <h3>image might be displayed here</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button
                            @click="addProduct()"
                            type="button"
                            class="btn btn-primary"
                        >Save changes</button>
                        <!-- v-if="modal == 'new'" -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../firebase";
import $ from "jquery";
// import Swal from "sweetalert2";

export default {
    name: "Products",
    data() {
        return {
            products: null,
            product: {
                name: null,
                description: null,
                price: null,
                tag: null,
                image: null
            },
            activeItem: null
        };
    },
    firestore() {
        return {
            products: db.collection("products")
        };
    },
    methods: {
        addNew() {
            $("#product").modal("show");
        },
        // watcher() {
        //     //initially, adds an listener to QuerySnapshot.
        //     // next time when this function's called, this function will check the listener to see if there's any change in QuerySnapshot THEN execute the callback that we added to the listener.
        //     db.collection("products").onSnapshot(querySnapshot => {
        //         this.products = [];
        //         querySnapshot.forEach(doc => {
        //             this.products.push(doc);
        //         });
        //         // console.log("Current cities in CA: ", cities.join(", "));
        //     });
        // },
        updateProduct() {
            // db.collection("products")
            //     .doc(this.activeItem)
            //     .update(this.product)
            //     .then(() => {
            //         $("#product").modal("hide");
            //         this.watcher();
            //         console.log("Document successfully updated!");
            //     })
            //     .catch(function(error) {
            //         // The document probably doesn't exist.
            //         console.error("Error updating document: ", error);
            //     });
        },
        editProduct() {
            // product as parameter
            // $("#product").modal("show");
            // this.product = product.data();
            // this.activeItem = product.id;
        },
        deleteProduct(docId) {
            if (confirm("Are you sure about that?")) {
                db.collection("products")
                    .doc(docId)
                    .delete()
                    .then(() => {
                        this.watcher();
                        console.log("Document successfully deleted!");
                    })
                    .catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
            }
        },
        // read all documents from the "products" collection from the firestore database.
        // readData() {
        //     this.products = [];
        //     db.collection("products")
        //         .get()
        //         .then(querySnapshot => {
        //             querySnapshot.forEach(doc => {
        //                 this.products.push(doc);
        //             });
        //         });
        // },
        addProduct() {
            // db.collection("products")
            //     .add(this.product)
            //     .then(docRef => {
            //         // to access "this", you should use lamda.
            //         this.watcher();
            //         console.log("Document written with ID: ", docRef.id);
            //         // this.readData();
            //     })
            //     .catch(function(error) {
            //         console.error("Error adding document: ", error);
            //     });
            this.$firestore.products.add(this.product);
            $("#product").modal("hide");
            // this.watcher();
        }
    },
    created() {
        // this.readData();
        // this.watcher();
    },
    props: {
        msg: String
    }
};
</script>

<style>
</style>