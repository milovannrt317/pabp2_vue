<template>
    <nav class="navbar navbar-default navbar-expand-sm navbar-toggleable-sm navbar-transparent-black bg-white box-shadow mb-3">
      <div class="container">
        <router-link class="navbar-brand" to="/">Projekat 2</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/categories">Categories</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">Products</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
    
}
</script>