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

    const { data } = toRefs(props.chartdata);
    let opacityshow = ref(props.opacityshow);

    onMounted(() => {
      initechart();
    });
    const initechart = () => {
      // 基于准备好的dom，初始化echarts实例
      let serieslist: any = [];

      //   // 绘制图表
      myCharts.value = echarts.init(myChart.value!);
      myCharts.value.setOption(
        {
          title: {
            show: false,
            text: "Life Expectancy and GDP by Country",
            left: "5%",
            top: "3%",
          },
          legend: {
            show: false,
            right: "10%",
            top: "3%",
            data: ["1990", "2015"],
          },
          grid: {
            left: "8%",
            top: "10%",
            bottom: "10%",
          },
          xAxis: {
            axisLabel: {
              show: true,
              interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
              margin: 10,
              textStyle: {
                fontSize: 12,
              },
            },
            axisLine: { show: true, lineStyle: { color: "#fff", width: 2 } },
            splitLine: {
              show: false,
              lineStyle: {
                type: "dashed",
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: 12,
              },
              // formatter: '{value} %'
            },
            axisLine: { show: false, lineStyle: { color: "#fff", width: 2 } },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
              },
            },
            axisTick: {
              show: false,
            },
            scale: true,
          },
          series: [
            {
              name: "1990",
              data: data.value[0],
              type: "scatter",
              symbolSize: function (data: any) {
                return Math.sqrt(data[2]) / 5e2;
              },
              emphasis: {
                focus: "series",
                label: {
                  show: true,
                  formatter: function (param: any) {
                    return param.data[3];
                  },
                  position: "top",
                },
              },
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(120, 36, 50, 0.5)",
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: "rgb(251, 118, 123)",
                  },
                  {
                    offset: 1,
                    color: "rgb(204, 46, 72)",
                  },
                ]),
              },
            },
            {
              name: "2015",
              data: data.value[1],
              type: "scatter",
              symbolSize: function (data: any) {
                return Math.sqrt(data[2]) / 5e2;
              },
              emphasis: {
                focus: "series",
                label: {
                  show: true,
                  formatter: function (param: any) {
                    return param.data[3];
                  },
                  position: "top",
                },
              },
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(25, 100, 150, 0.5)",
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: "rgb(129, 227, 238)",
                  },
                  {
                    offset: 1,
                    color: "rgb(25, 183, 207)",
                  },
                ]),
              },
            },
          ],
        },
        true,
      );
    };

    return {
      myChart,
    };
  },
});
</script>

<style></style>
