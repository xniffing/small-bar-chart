import Vue from 'vue';
import Dev from '@/serve-dev.vue';
import Buefy from "buefy";
import '../assets/scss/app.scss'

Vue.use(Buefy)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
