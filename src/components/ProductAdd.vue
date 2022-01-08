<template>
<div class="bootstrap-modal-no-jquery">
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add new product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                                <label for="product-name" class="col-form-label">Name:</label>
                                <input v-model.trim="product.productName" type="text" class="form-control" id="product-name">
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <label for="supplier-name" class="col-form-label">Supplier name:</label>
                                <select v-model="supplier" class="form-control" id="supplier-name">
                                    <option :value="JSON.parse('{}')" disabled hidden>--Select a supplier--</option>
                                    <option v-for="s in suppliers" :key="s" :value="s">{{ s.companyName }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                                <label for="supplier-name" class="col-form-label">Category name:</label>
                                <select v-model="category" class="form-control" id="supplier-name">
                                    <option :value="JSON.parse('{}')" disabled hidden>--Select a category--</option>
                                    <option v-for="c in categories" :key="c" :value="c">{{ c.categoryName }}</option>
                                </select>
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <label for="quantityPerUnit" class="col-form-label">Quantity per unit:</label>
                                <input v-model.trim="product.quantityPerUnit" type="text" class="form-control" id="quantityPerUnit">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                                <label for="unitPrice" class="col-form-label">Unit price:</label>
                                <input v-model.number="product.unitPrice" type="number" class="form-control" id="unitPrice">
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <label for="unitsInStock" class="col-form-label">Units in stock:</label>
                                <input v-model.number="product.unitsInStock" type="number" class="form-control" id="unitsInStock">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                                <label for="total-price" class="col-form-label">Total price:</label>
                                <input type="text" disabled :value="UkupnaCena" class="form-control" id="total-price">
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <label for="unitsOnOrder" class="col-form-label">Units on order:</label>
                                <input v-model.number="product.unitsOnOrder" type="number" class="form-control" id="unitsOnOrder">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-12">
                                <label for="reorderLevel" class="col-form-label">Reorder level:</label>
                                <input v-model.number="product.reorderLevel" type="number" class="form-control" id="reorderLevel">
                            </div>
                            <div class="col-md-6 col-sm-12">
                                <label for="discontinued" class="col-form-label">Discontinued: </label>
                                <input v-model="product.discontinued" type="checkbox" id="discontinued"> True/False
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-primary" @click="saveChanges">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</div>   
</template>

<script>
import { postData } from "@/utilities/axios-functions"
export default {
    name:'ProductAdd',
    props:{
        categories:Array,
        suppliers:Array
    },
    data(){
        return{
            supplier:{},
            category:{},
            product:{}
        }
    },
    emits:['close-modal-event','product-add-event'],
    methods: {
      closeModal() {
        this.$emit('close-modal-event');
      },
      async saveChanges() {
        if(Object.keys(this.supplier).length === 0 && Object.getPrototypeOf(this.supplier) === Object.prototype){
            alert('Please pick some supplier from list!')
            return
        }
        if(!this.product.discontinued)
            this.product.discontinued=false
        this.product.supplierId=this.supplier.supplierId
        this.product.categoryId=this.category.categoryId
        this.product.category=null
        this.product.supplier=null
        this.product.orderDetails=[]
        this.product.unitPrice=this.product.unitPrice==undefined?0:Math.abs(this.product.unitPrice)
        this.product.unitsInStock=this.product.unitsInStock==undefined?0:Math.abs(this.product.unitsInStock)
        this.product.unitsOnOrder=this.product.unitsOnOrder==undefined?0:Math.abs(this.product.unitsOnOrder)
        this.product.reorderLevel=this.product.reorderLevel==undefined?0:Math.abs(this.product.reorderLevel)

        if(this.product.unitPrice==0){
            alert('Unit price can not be zero!')
            return
        }
        if(!this.product.productName || !this.product.quantityPerUnit){
            alert('Some field is empty, please fill it all!')
            return
        }

        this.product.productName=this.product.productName.charAt(0).toUpperCase() + this.product.productName.slice(1)

        await postData('Products',this.product)
        .then(response=>{
          this.product.productId=response.data.productId
          alert('Successful data add!')
        })
        .catch(err=>{
            console.log(err)
        })
        this.product.supplierName=this.supplier.companyName
        this.product.categoryName=this.category.categoryName
        this.$emit('product-add-event', this.product);
        this.closeModal();
      }
    },
    computed:{
        UkupnaCena(){
            if(this.product.unitPrice!=undefined && this.product.unitsInStock!=undefined)
                return (this.product.unitPrice * this.product.unitsInStock).toFixed(2)
            else
                return '0'
        }
    }
}
</script>

<style>
.modal {
    display: block!important;
  }
</style>