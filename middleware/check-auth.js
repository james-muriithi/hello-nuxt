export default function(context){
  if(context.client){
    context.store.dispatch('initAuth', null)
  }else{
    context.store.dispatch('initAuth', context.req)
  }
}
