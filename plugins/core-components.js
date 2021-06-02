import Vue from 'vue';

import PostsList from '~/components/Posts/PostsList.vue'
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'

Vue.component('AppButton', AppButton);
Vue.component('AppControlInput', AppControlInput);
Vue.component('PostsList', PostsList);
