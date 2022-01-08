import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import FontAwesomeIcon from '@/utilities/fontawesome-icons'
import router from '@/utilities/router-links'

createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(router)
    .mount('#app')
