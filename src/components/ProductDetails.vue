<template>
<div class="bootstrap-modal-no-jquery">
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Product details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div>
                            <span class="d-inline-block"><b>Product name: </b></span><span class="mx-2">{{ product.productName }}</span>
                        </div>
                        <div>
                            <span class="d-inline-block"><b>Category: </b></span><span class="mx-2">{{ product.category?product.category.categoryName:'' }}</span>
                        </div>
                        <div>
                            <span class="d-inline-block"><b>Supplier: </b></span><span class="mx-2">{{ product.supplier?product.supplier.companyName:'' }}</span>
                        </div>
                        <div>
                            <span class="d-inline-block"><b>Quantity per unit: </b></span><span class="mx-2">{{ product.quantityPerUnit }}</span>
                        </div>
                        <div>
                            <span class="d-inline-block"><b>Unit price: </b></span><span class="mx-2">{{ product.unitPrice }}</span>
                        </div>
                        <div>
                            <span class="d-inline-block"><b>Units in stock: </b></span><span class="mx-2">{{ product.unitsInStock }}</span>
                        </div>
                        <div>
                            <span class="d-inline-block"><b>Total price: </b></span><span class="mx-2">{{ product.totalPrice}}</span>
                        </div>
                        <div>
                            <span class="d-inline-block"><b>Units on order: </b></span><span class="mx-2">{{ product.unitsOnOrder }}</span>
                        </div>
                        <div>
                            <span class="d-inline-block"><b>Discontinued: </b></span><span class="mx-2">{{ product.discontinued }}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>   
</template>

<script>
export default {
    name:'ProductDetails',
    props:{
        product:Object
    },
    emits:['close-modal-event'],
    methods: {
        closeModal() {
            this.$emit('close-modal-event');
        }
    }
}
</script>

<style scoped>
@import "/css/table.css"
</style>