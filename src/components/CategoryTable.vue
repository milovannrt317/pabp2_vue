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
                        <h4 class="title">Categories</h4>
                        <a @click='dodajNovi' style="margin-left: auto" class="btn btn-warning"><font-awesome-icon icon="plus-circle"/> Add New</a>
                        
                    </div>
                </div>
                <div class="panel-body table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Category name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <CategoryRow v-for="c in categories" :key="c.categoryId" :category="c" @category-delete-event="categoryDeleteHandler($event)" @category-change-event="categoryChangeHandler($event)" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>


<CategoryAdd v-if="mdl" @category-add-event="categoryAddHandler($event)" @close-modal-event="mdl=!mdl"/>

</template>

<script>
import CategoryRow from './CategoryRow.vue'
import CategoryAdd from './CategoryAdd.vue'
import { getData } from "@/utilities/axios-functions"
export default {
    name:'ProductTable',
    data(){
        return{
            categories:[],
            mdl:false
        }
    },
    methods:{
        dodajNovi(){
            this.mdl=true
        },
        categoryAddHandler(obj){
            this.categories.push(obj)
            this.categories.sort((b,a)=> a.categoryId - b.categoryId)
        },
        categoryDeleteHandler(obj){
            this.categories.splice(this.categories.indexOf(obj), 1)
        },
        categoryChangeHandler(obj){
            let pr=this.categories.find(x=>x.categoryId==obj.categoryId)
            Object.entries(obj).forEach(item => {
                pr[item[0]]=item[1]
            })
        },
        GetCategories(){
            getData('Categories')
            .then(response=>{
                this.categories=response.data
                this.categories.sort((b,a)=> a.categoryId - b.categoryId)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    components:{
        CategoryRow,
        CategoryAdd
    },
    mounted(){
        this.GetCategories()
  }, 
  computed:{
      totalResult(){
          return this.categories.length
      }
  }
}
</script>

<style scoped>
@import "/css/table.css"
</style>