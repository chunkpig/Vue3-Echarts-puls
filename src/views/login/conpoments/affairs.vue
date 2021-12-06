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
      if (dataIndex > 0) {
        dataValue.forEach((element: any, index: number) => {
          serieslist.push({
            name: element.name ? element.name : "",
            type: element.echart_type ? element.echart_type : "bar",
            smooth: true,
            stack: "", //叠加
            barMaxWidth: 30,
            //修改柱状图颜色
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: element.colorlist[index] },
                  { offset: 1, color: "#3EACE5" },
                ]),
              },
            },
            //修改折线图
            lineStyle: {
              width: 5,
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: element.colorlist[index],
                },
                {
                  offset: 1,
                  color: element.colorlist[index],
                },
              ]),
              shadowColor: "rgba(0,0,0, 0.3)",
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            //折现阴影
            areaStyle: {
              opacity: opacityshow,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: element.colorlist[index],
                },
                {
                  offset: 1,
                  color: "rgba(98, 227, 255, 0)",
                },
              ]),
            },
            data: element.xdata,
          });
        });
      }
      //   // 绘制图表
      myCharts.value = echarts.init(myChart.value!);
      myCharts.value.setOption(
        {
          legend: {
            right: 10,
            top: "1%",
            textStyle: {
              color: props.nameColor,
            },
            data: legend ? legend.value : "",
          },
          tooltip: {
            trigger: "axis",
            position: function (
              pos: any,
              params: any,
              dom: any,
              rect: any,
              size: any,
            ) {
              var obj: any = { bottom: "5%" };
              obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
              return obj;
            },
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "1%",
            right: "4%",
            bottom: "1%",
            top: "20%",
            //	padding:'0 0 10 0',
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              axisLabel: {
                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                margin: 10,
                textStyle: {
                  fontSize: 12,
                },
              },
              axisLine: {
                show: true,
                lineStyle: { color: props.nameColor, width: 2 },
              },
              splitLine: {
                show: false,
                lineStyle: props.nameColor,
              },
              axisTick: {
                show: false,
              },
              data: xdata.value,
            },
          ],
          yAxis: [
            {
              type: "value",
              splitNumber: 5,
              axisLabel: {
                textStyle: {
                  fontSize: 12,
                },
                // formatter: '{value} %'
              },
              axisLine: {
                lineStyle: {
                  color: props.nameColor,
                  width: 1,
                },
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: true,
                lineStyle: { color: props.nameColor },
              },
            },
          ],
          dataZoom: [
            {
              type: "inside",
              startValue: 0,
              endValue: 10,
            },
          ],
          series: serieslist,
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
