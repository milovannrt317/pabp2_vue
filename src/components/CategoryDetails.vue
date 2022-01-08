<template>
<div class="bootstrap-modal-no-jquery">
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Category details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div>
                            <span class="d-inline-block"><b>Category name: </b></span><span class="mx-2">{{ category.categoryName }}</span>
                        </div>
                        <div>
                            <span class="d-inline-block"><b>Description: </b></span><span class="mx-2">{{ category.description }}</span>
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
    name:'CategoryDetails',
    props:{
        category:Object
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