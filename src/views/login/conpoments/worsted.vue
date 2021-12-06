<template>
  <div ref="myChart" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  computed,
  PropType,
  reactive,
  onMounted,
  onBeforeUnmount,
  ref,
  toRefs,
} from "vue";
import * as echarts from "echarts";
import resizecom from "@/components/resize";
export default defineComponent({
  props: {
    chartdata: {
      type: Object,
      default: () => ({}),
    },
    nameColor: {
      type: String,
      default: "#fff",
    },
    opacityshow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const myChart = ref<HTMLElement>();

    const { myCharts } = resizecom();

    const { legend, data, xdata } = toRefs(props.chartdata);
    let opacityshow = ref(props.opacityshow);
    let dataIndex = data.value.length;
    let dataValue = data.value;
    onMounted(() => {
      initechart();
    });
    const initechart = () => {
      // 基于准备好的dom，初始化echarts实例
      let serieslist: any = [];

      //   // 绘制图表
      // myCharts.value = echarts.init(myChart.value!);
      // myCharts.value.setOption(
      //   {})
    };
    return {
      myChart,
    };
  },
});
</script>

<style></style>
