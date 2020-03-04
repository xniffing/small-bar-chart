<script>
    import Vue from 'vue';
    import SmallBarGraph from '@/small-bar-graph.vue';

    export default Vue.extend({
        name: 'ServeDev',
        components: {
            SmallBarGraph
        },
        data() {
            return {
                graphData: {
                    name: 'Domains Monitored',
                    data: [
                        10, 10, 2
                    ],
                }
            }
        }
    });
</script>

<template>
  <div id="app" style="background: black; height: 100vh">
    <div class="container is-flex">
      <SmallBarGraph
          style="z-index: 0;"
          :title="graphData.name"
          :data-object="graphData"
          is-dark
          is-medium
      />
    </div>
  </div>
</template>
