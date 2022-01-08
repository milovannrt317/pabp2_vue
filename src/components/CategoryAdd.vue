<template>
<div class="bootstrap-modal-no-jquery">
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add new category</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-sm-12">
                                <label for="category-name" class="col-form-label">Name:</label>
                                <input v-model.trim="category.categoryName" type="text" class="form-control" id="category-name">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <label for="category-description" class="col-form-label">Description:</label>
                                <input v-model.trim="category.description" type="text" class="form-control" id="category-description">
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
        categories:Array
    },
    data(){
        return{
            category:{}
        }
    },
    emits:['close-modal-event','category-add-event'],
    methods: {
      closeModal() {
        this.$emit('close-modal-event');
      },
      async saveChanges() {
        if(!this.category.categoryName || !this.category.description){
            alert('Some field is empty, please fill it all!')
            return
        }

        this.category.categoryName=this.category.categoryName.charAt(0).toUpperCase() + this.category.categoryName.slice(1)

        postData('Categories',this.category)
        .then(response=>{
            this.category.categoryId=response.data.categoryId
            alert('Successful data add!')
            this.$emit('category-add-event', this.category);
            this.closeModal();
        })
        .catch(err=>{
            console.log(err)
        })
      }
    }
}
</script>

<style>
.modal {
    display: block!important;
  }
</style>