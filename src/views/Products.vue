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
                    <button @click="openAddModal" class="btn btn-primary float-right">Add Product</button>
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
                                <tr v-for="p in products" :key="p.id">
                                    <td>{{p.name}}</td>
                                    <td>{{p.price}}</td>
                                    <td>
                                        <button
                                            class="btn btn-primary"
                                            @click="openEditModal(p)"
                                        >Edit</button>
                                        <button
                                            class="btn btn-danger"
                                            @click="deleteProduct(p)"
                                        >Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal -->
        <div
            class="modal fade"
            id="product"
            tabindex="-1"
            role="dialog"
            aria-labelledby="editLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-if="modal == 'new'" class="modal-title" id="editLabel">Add Product</h5>
                        <h5 v-if="modal == 'edit'" class="modal-title" id="editLabel">Edit Product</h5>
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
                                    <vue-editor v-model="product.description"></vue-editor>
                                    <!-- <textarea
                                        name="description"
                                        class="form-control"
                                        placeholder="Product description"
                                        v-model="product.description"
                                        id
                                        cols="30"
                                        rows="10"
                                    ></textarea>-->
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
                                        placeholder="Product tags (Use , to separate tags)"
                                        class="form-control"
                                        v-model="tag"
                                        @keyup.188="addTag"
                                    />

                                    <!-- <div class="d-flex">
                                        <p v-for="tag in product.tags">
                                            <span class="p-1">{{tag}}</span>
                                        </p>
                                    </div>-->
                                </div>

                                <div class="form-group">
                                    <label for="product_image">Product Images</label>
                                    <input type="file" class="form-control" @change="holdImage" />
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
                            v-if="modal == 'new'"
                            @click="addProduct()"
                            type="button"
                            class="btn btn-primary"
                        >Add Product</button>
                        <button
                            v-if="modal == 'edit'"
                            @click="updateProduct()"
                            type="button"
                            class="btn btn-primary"
                        >Apply Changes</button>
                        <!-- v-if="modal == 'new'" -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { fb, db } from "../firebase";
import $ from "jquery";
import { VueEditor } from "vue2-editor";
// import Swal from "sweetalert2"; already imported in main.js

export default {
    name: "Products",
    data() {
        return {
            // products: null,
            product: null,
            activeItem: null,
            modal: null,
            tag: null,
            imageFile: null
        };
    },
    firestore() {
        return {
            products: db.collection("products")
        };
    },
    methods: {
        // 얘 맨 밑에 promise 리턴하게 한 다음에 then 쓰면 이미지 업로두 이후에 then이 실행되야하는거 아님?
        uploadImage() {
            let storageRef = fb
                .storage()
                .ref("products/" + this.imageFile.name);
            let uploadTask = storageRef.put(this.imageFile);     
            console.log("1");       

            // you MUST pass 3 callbacks to this method.
            const ult = async () => {
                console.log("2");
                await uploadTask.on(
                    "state_changed",
                    snapshot => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        console.log(snapshot);
                    },
                    error => {
                        // Handle unsuccessful uploads
                        console.log(error);
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        uploadTask.snapshot.ref
                            .getDownloadURL()
                            .then(downloadURL => {
                                console.log("File available at", downloadURL);
                                this.product.image = downloadURL;
                            });
                    }
                );
                console.log("3");
                return;
            }
            console.log("4");
            return ult();
        },
        holdImage(event) {
            this.imageFile = event.target.files[0];
            // this.uploadImage();
        },
        addTag() {
            this.product.tags.push(this.tag);
            this.tag = "";
        },
        initializeProduct() {
            this.product = {
                name: null,
                description: null,
                price: null,
                tags: [],
                image: null
            };
            this.tag = null;
            this.imageFile = null;
        },
        // open the modal window with new mode.
        openAddModal() {
            this.initializeProduct();
            this.modal = "new";
            $("#product").modal("show");
        },
        // open the modal window with edit mode.
        openEditModal(product) {
            this.modal = "edit";
            this.product = Object.assign({}, product);
            this.activeItem = this.product.id;
            delete this.product.id;
            $("#product").modal("show");
        },
        // update the document in the database.
        updateProduct() {
            this.$firestore.products
                .doc(this.activeItem)
                .update(this.product)
                .then(() => {
                    window.Toast.fire({
                        icon: "success",
                        title: "edited successfully!"
                    });
                });
            $("#product").modal("hide");
        },
        // adding a product to the database.
        async addProduct() {
            await this.uploadImage();
            console.log("teehee");
            this.$firestore.products.add(this.product);
            $("#product").modal("hide");
        },
        // delete a document in the database.
        deleteProduct(product) {
            this.Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(result => {
                if (result.value) {
                    this.$firestore.products
                        .doc(product.id)
                        .delete()
                        .then(() => {
                            // this.Swal.fire(
                            //     "Deleted!",
                            //     "Your file has been deleted.",
                            //     "success"
                            // );
                            window.Toast.fire({
                                icon: "success",
                                title: "Deletion completed"
                            });
                        })
                        .catch(error => {
                            console.error("deletion failed! error >> ", error);
                        });
                }
            });
        },
        collapseThisShit() {
            // deleteProduct(docId) {
            //     // docId as parameter
            //     if (confirm("Are you sure about that?")) {
            //         db.collection("products")
            //             .doc(docId)
            //             .delete()
            //             .then(() => {
            //                 this.watcher();
            //                 console.log("Document successfully deleted!");
            //             })
            //             .catch(function(error) {
            //                 console.error("Error removing document: ", error);
            //             });
            //     }
            // }
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
            // addProduct() {
            //     db.collection("products")
            //         .add(this.product)
            //         .then(docRef => {
            //             // to access "this", you should use lamda.
            //             this.watcher();
            //             console.log("Document written with ID: ", docRef.id);
            //             // this.readData();
            //         })
            //         .catch(function(error) {
            //             console.error("Error adding document: ", error);
            //         });
            //     this.watcher();
            // },
            // updateProduct() {
            //     db.collection("products")
            //         .doc(this.activeItem)
            //         .update(this.product)
            //         .then(() => {
            //             $("#product").modal("hide");
            //             this.watcher();
            //             console.log("Document successfully updated!");
            //         })
            //         .catch(function(error) {
            //             // The document probably doesn't exist.
            //             console.error("Error updating document: ", error);
            //         });
            // },
        }
    },
    created() {
        this.initializeProduct();
    },
    props: {
        msg: String
    },
    components: {
        VueEditor
    }
};
</script>

<style>
</style>