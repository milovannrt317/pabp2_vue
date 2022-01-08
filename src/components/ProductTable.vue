<template>
<div class="container">
    <div class="d-flex flex-row justify-content-end">
        <h6>Total results: {{ totalResult }} </h6>
    </div>
    <div class="row">
        <div class="col-md-offset-0 col-md-12">
            <div class="panel">
                <div class="panel-heading">
                    <div class="d-flex flex-row">
                        <h4 class="title">Products</h4>
                        <a @click='dodajNovi' style="margin-left: auto" class="btn btn-warning"><font-awesome-icon icon="plus-circle"/> Add New</a>
                        
                    </div>
                </div>
                <div class="panel-body table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Supplier name</th>
                                <th>Category name</th>
                                <th>Quantity per unit</th>
                                <th>Unit price</th>
                                <th>Units in stock</th>
                                <th>Units on order</th>
                                <th>Reorder level</th>
                                <th>Discontinued</th>
                                <th>Total price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ProductRow v-for="p in products" :key="p.productId" :product="p" :categories="categories" :suppliers="suppliers" @product-delete-event="productDeleteHandler($event)" @product-change-event="productChangeHandler($event)" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>


<ProductAdd v-if="mdl" :categories="categories" :suppliers="suppliers" @product-add-event="productAddHandler($event)" @close-modal-event="mdl=!mdl"/>

</template>

<script>
import ProductRow from './ProductRow.vue'
import ProductAdd from './ProductAdd.vue'
import { getData } from "@/utilities/axios-functions"
export default {
    name:'ProductTable',
    data(){
        return{
            products:[],
            suppliers:[],
            categories:[],
            mdl:false
        }
    },
    methods:{
        dodajNovi(){
            this.mdl=true
        },
        productAddHandler(obj){
            obj.totalPrice=(obj.unitPrice * obj.unitsInStock).toFixed(2)
            this.products.push(obj)
            this.products.sort((b,a)=> a.productId - b.productId)
            //this.PrikaziProizvode()
        },
        productDeleteHandler(obj){
            this.products.splice(this.products.indexOf(obj), 1)
        },
        productChangeHandler(obj){
            let pr=this.products.find(x=>x.productId==obj.productId)
            Object.entries(obj).forEach(item => {
                pr[item[0]]=item[1]
            })
        },
        GetProducts(){
            getData('Products')
            .then(response=>{
                this.products=response.data
                this.products.forEach(x=>{
                    x.unitPrice=x.unitPrice ? x.unitPrice : 0
                    x.unitsInStock=x.unitsInStock ? x.unitsInStock : 0
                    x.totalPrice=(x.unitPrice * x.unitsInStock).toFixed(2)
                    })
                this.products.sort((b,a)=> a.productId - b.productId)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        GetCategories(){
            getData('Categories')
            .then(response=>{
                this.categories=response.data
            })
            .catch(err=>{
                console.log(err)
            })
        },
        GetSuppliers(){
            getData('Suppliers')
            .then(response=>{
                this.suppliers=response.data
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    components:{
        ProductRow,
        ProductAdd
    },
    mounted(){
        this.GetCategories()
        this.GetSuppliers()
        this.GetProducts()
  }, 
  computed:{
      totalResult(){
          return this.products.length
      }
  }
}
</script>

<style scoped>
@import "/css/table.css"
</style>