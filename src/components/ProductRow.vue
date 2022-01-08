<template>
    <tr>
        <td v-if="!modif">{{ product.productName }}</td>
        <td v-if="modif"><input type="text" v-model.trim="productC.productName"></td>
        <td v-if="!modif">{{ product.supplier?product.supplier.companyName:'' }}</td>
        <td v-if="modif"><select v-model="productC.supplierId" id="supplier-name">
                            <option v-for="s in suppliers" :key="s" :value="s.supplierId">{{ s.companyName }}</option>
                        </select></td>
        <td v-if="modif"><select v-model="productC.categoryId" id="category-name">
                            <option v-for="c in categories" :key="c" :value="c.categoryId">{{ c.categoryName }}</option>
                        </select></td>
        <td v-if="!modif">{{ product.category?product.category.categoryName:'' }}</td>
        <td v-if="!modif">{{ product.quantityPerUnit }}</td>
        <td v-if="modif"><input type="text" v-model.trim="productC.quantityPerUnit"></td>
        <td v-if="!modif">{{ product.unitPrice }}</td>
        <td v-if="modif"><input type="number" v-model.number="productC.unitPrice"></td>
        <td v-if="!modif">{{ product.unitsInStock }}</td>
        <td v-if="modif"><input type="number" v-model.number="productC.unitsInStock"></td>
        <td v-if="!modif">{{ product.unitsOnOrder }}</td>
        <td v-if="modif"><input type="number" v-model.number="productC.unitsOnOrder"></td>
        <td v-if="!modif">{{ product.reorderLevel }}</td>
        <td v-if="modif"><input type="number" v-model.number="productC.reorderLevel"></td>
        <td v-if="!modif">{{ product.discontinued }}</td>
        <td v-if="modif"><input type="checkbox" v-model="productC.discontinued">True/False</td>
        <td>{{ product.totalPrice}}</td>
        <td>
            <ul class="action-list d-flex flex-column">
                <li v-if="!modif"><a @click="modif=!modif" class="btn btn-primary" title="Change"><font-awesome-icon icon="pencil-alt"/></a></li>
                <li v-if="!modif"><a @click="DeleteProduct(product.productId)" class="btn btn-danger" title="Delete"><font-awesome-icon icon="trash"/></a></li>
                <li v-if="modif"><a @click="SaveProduct()" class="btn btn-warning" title="Save"><font-awesome-icon icon="save"/></a></li>
                <li v-if="modif"><a @click="Cancel()" class="btn btn-danger" title="Cancel"><font-awesome-icon icon="times-circle"/></a></li>
                <li v-if="!modif"><a @click="Info(product.productId)" class="btn btn-info" title="Info"><font-awesome-icon icon="info-circle"/></a></li>
            </ul>
        </td>
    </tr>
    <ProductDetails v-if="info" :product="productInfo" @close-modal-event="info=!info"/>
</template>

<script>
import ProductDetails from './ProductDetails.vue'
import { deleteDataId, putData, getDataId } from "@/utilities/axios-functions"
export default {
    name:'ProductRow',
    props:{
        product:Object,
        suppliers:Array,
        categories:Array
    },
    components:{
        ProductDetails
    },
    data(){
        return {
            modif:false,
            info:false,
            productC:{},
            supplier:{},
            category:{},
            productInfo:{}
        }
    },
    emits:['product-delete-event','product-change-event'],
    methods:{
        DeleteProduct(id){
            deleteDataId('Products',id)
            .then(response=>{
                if(response.status == 204)
                    alert('Successful data delete!')
                this.$emit('product-delete-event', this.product);
            })
            .catch(err=>{
                console.log(err)
            })
        },
        SaveProduct(){
            this.productC.unitPrice=this.productC.unitPrice==''?0:Math.abs(this.productC.unitPrice)
            this.productC.unitsInStock=this.productC.unitsInStock==''?0:Math.abs(this.productC.unitsInStock)
            this.productC.unitsOnOrder=this.productC.unitsOnOrder==''?0:Math.abs(this.productC.unitsOnOrder)
            this.productC.reorderLevel=this.productC.reorderLevel==''?0:Math.abs(this.productC.reorderLevel)
            
            if(this.productC.unitPrice==0){
                alert('Unit price can not be zero!')
                return
            }
            if(!this.productC.productName || !this.productC.quantityPerUnit){
                alert('Some field is empty, please fill it all!')
                return
            }
            this.productC.supplierName=this.suppliers.find(y=>y.supplierId==this.productC.supplierId).companyName
            this.productC.totalPrice=(this.productC.unitPrice * this.productC.unitsInStock).toFixed(2)
            
            let prod={}
            prod.productId=this.productC.productId
            prod.productName=this.productC.productName
            prod.supplierId=this.productC.supplierId
            prod.categoryId=this.productC.categoryId
            prod.quantityPerUnit=this.productC.quantityPerUnit
            prod.unitPrice=this.productC.unitPrice
            prod.unitsInStock=this.productC.unitsInStock
            prod.unitsOnOrder=this.productC.unitsOnOrder
            prod.reorderLevel=this.productC.reorderLevel
            prod.discontinued=this.productC.discontinued
            prod.category=this.productC.category
            prod.supplier=this.productC.supplier
            prod.orderDetails=this.productC.orderDetails

            putData('Products',prod.productId,prod)
            .then(response=>{
                if(response.status == 204 || response.status == 200)
                    alert('Successful data change!')
                this.modif=false
                this.$emit('product-change-event', this.productC);
            })
            .catch(err=>{
                console.log(err)
            })
            this.modif=!this.modif
        },
        Cancel(){
            this.modif=!this.modif
            this.productC=JSON.parse(JSON.stringify(this.product))
        },
        Info(id){
            getDataId('Products',id)
            .then(response=>{
                this.productInfo=response.data
                this.productInfo.unitPrice=this.productInfo.unitPrice ? this.productInfo.unitPrice : 0
                this.productInfo.unitsInStock=this.productInfo.unitsInStock ? this.productInfo.unitsInStock : 0
                this.productInfo.totalPrice=(this.productInfo.unitPrice * this.productInfo.unitsInStock).toFixed(2)
                this.info=true
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.productC=JSON.parse(JSON.stringify(this.product))
    }
}
</script>

<style>

</style>