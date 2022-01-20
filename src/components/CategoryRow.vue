<template>
    <tr>
        <td v-if="!modif">{{ category.categoryName }}</td>
        <td v-if="modif"><input type="text" v-model.trim="categoryC.categoryName"></td>
        <td v-if="!modif">{{ category.description }}</td>
        <td v-if="modif"><input type="text" v-model.trim="categoryC.description"></td>
        <td>
            <ul class="action-list d-flex flex-column">
                <li v-if="!modif"><a @click="modif=!modif" class="btn btn-primary" title="Change"><font-awesome-icon icon="pencil-alt"/></a></li>
                <li v-if="!modif"><a @click="DeleteCategory(category.categoryId)" class="btn btn-danger" title="Delete"><font-awesome-icon icon="trash"/></a></li>
                <li v-if="modif"><a @click="SaveCategory()" class="btn btn-warning" title="Save"><font-awesome-icon icon="save"/></a></li>
                <li v-if="modif"><a @click="Cancel()" class="btn btn-danger" title="Cancel"><font-awesome-icon icon="times-circle"/></a></li>
                <li v-if="!modif"><a @click="Info(category.categoryId)" class="btn btn-info" title="Info"><font-awesome-icon icon="info-circle"/></a></li>
            </ul>
        </td>
    </tr>
    <CategoryDetails v-if="info" :category="categoryInfo" @close-modal-event="info=!info"/>
</template>

<script>
import CategoryDetails from './CategoryDetails.vue'
import { deleteDataId, putData, getDataId } from "@/utilities/axios-functions"
export default {
    name:'ProductRow',
    props:{
        category:Object
    },
    components:{
        CategoryDetails
    },
    data(){
        return {
            modif:false,
            info:false,
            categoryC:{},
            categoryInfo:{}
        }
    },
    emits:['category-delete-event','category-change-event'],
    methods:{
        DeleteCategory(id){
            deleteDataId('Categories',id)
            .then(response=>{
                if(response.status == 204 || response.status == 200)
                    alert('Successful data delete!')
                this.$emit('category-delete-event', this.category);
            })
            .catch(err=>{
                console.log(err)
            })
        },
        SaveCategory(){
            if(!this.categoryC.categoryName || !this.categoryC.description){
                alert('Some field is empty, please fill it all!')
                return
            }

            putData('Categories',this.category.categoryId,this.categoryC)
            .then(response=>{
                if(response.status == 204 || response.status == 200)
                    alert('Successful data change!')
                this.modif=false
                this.$emit('category-change-event', this.categoryC);
            })
            .catch(err=>{
                console.log(err)
            })
            this.modif=!this.modif
        },
        Cancel(){
            this.modif=!this.modif
            this.categoryC=JSON.parse(JSON.stringify(this.category))
        },
        Info(id){
            getDataId('Categories',id)
            .then(response=>{
                this.categoryInfo=response.data
                this.info=true
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.categoryC=JSON.parse(JSON.stringify(this.category))
    }
}
</script>

<style>

</style>