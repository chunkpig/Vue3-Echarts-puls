<template>
  <div id="inData">
    <div class="headline"></div>
    <div class="Content flex justify-between">
      <div class="left">
        <div class="information">
          <cart-coupon-title title="基础信息数据1" />
          <div class="width echartcalc">
            <scatter :chartdata="scatterEchart" />
          </div>
        </div>
        <div class="information">
          <cart-coupon-title title="基础信息数据2" />
        </div>
        <div class="information">
          <cart-coupon-title title="基础信息数据3" />
          <div class="width echartcalc">
            <affairs :chartdata="linedata" />
          </div>
        </div>
      </div>
      <div class="cuisine"></div>
      <div class="right">
        <div class="information">
          <cart-coupon-title title="基础信息数据1" />
          <div class="width echartcalc">
            <affairs :chartdata="chartdata" />
          </div>
        </div>
        <div class="information">
          <cart-coupon-title title="基础信息数据2" />
          <div class="width echartcalc">
            <!-- <worsted :chartdata="chartdata" /> -->
          </div>
        </div>
        <div class="information">
          <cart-coupon-title title="基础信息数据3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, provide } from "vue";
import Affairs from "./conpoments/affairs.vue";
import Scatter from "./conpoments/scatter.vue";
import worsted from "./conpoments/worsted.vue";
import CartCouponTitle from "@/components/CartCouponTitle.vue";
export default defineComponent({
  components: { Affairs, CartCouponTitle, Scatter, worsted },
  setup() {
    const chartdata = reactive({
      data: [
        {
          name: "入库",
          echart_type: "line",
          xdata: [9, 30, 9, 60, 70, 20, 59],
          colorlist: ["#FF9A22", "#0090FF"],
        },
        {
          name: "出库",
          xdata: [20, 30, 20, 30, 20, 30, 20, 30, 20, 30],
          colorlist: ["#C6E579", "#26C0C0"],
          echart_type: "bar",
        },
      ],
      xdata: [1, 2, 3, 4, 5, 6, 7],
    });
    const scatterEchart = reactive({
      data: [
        [
          [2604, 77, 17096869, "Australia", 1990],
          [31163, 77.4, 27662440, "Canada", 1990],
          [22816, 78, 1154605773, "China", 1990],
          [13670, 74.7, 10582082, "Cuba", 1990],
          [28599, 75, 4986705, "Finland", 1990],
          [29476, 77.1, 56943299, "France", 1990],
          [31476, 75.4, 78958237, "Germany", 1990],
          [28666, 78.1, 254830, "Iceland", 1990],

          [2076, 67.9, 20194354, "North Korea", 1990],
          [12087, 72, 42972254, "South Korea", 1990],
          [24021, 75.4, 3397534, "New Zealand", 1990],
          [43296, 76.8, 4240375, "Norway", 1990],
          [10088, 70.8, 38195258, "Poland", 1990],
          [19349, 69.6, 147568552, "Russia", 1990],
          [10670, 67.3, 53994605, "Turkey", 1990],
        ],
        [
          [44056, 81.8, 23968973, "Australia", 2015],
          [43294, 81.7, 35939927, "Canada", 2015],

          [21291, 78.5, 11389562, "Cuba", 2015],
          [38923, 80.8, 5503457, "Finland", 2015],
          [37599, 81.9, 64395345, "France", 2015],
          [44053, 81.1, 80688545, "Germany", 2015],
          [42182, 82.8, 329425, "Iceland", 2015],
          [59103, 76.8, 1311050527, "India", 2015],
          [36162, 83.5, 126573481, "Japan", 2015],
          [1390, 71.4, 25155317, "North Korea", 2015],
          [34644, 80.7, 50293439, "South Korea", 2015],
          [34186, 80.6, 4528526, "New Zealand", 2015],
          [64304, 81.6, 5210967, "Norway", 2015],
          [11334, 76.9, 1376048943, "China", 2015],

          [38225, 81.4, 64715810, "United Kingdom", 2015],
          [53354, 79.1, 321773631, "United States", 2015],
        ],
      ],
    });
    const linedata = reactive({
      data: [
        {
          name: "",
          echart_type: "line",
          xdata: [9, 30, 9, 60, 70, 20, 59],
          colorlist: ["#D7504B", "#FE8463"],
        },
      ],
      xdata: [1, 2, 3, 45, 6, 7],
    });
    return {
      chartdata,
      scatterEchart,
      linedata,
    };
  },
});
</script>
<style lang="scss" scoped>
#inData {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(180deg, #1e366f, #000000);
  .headline {
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    height: 2.1rem;
    color: #fff;
    padding: 10px 0;
    border-bottom: 1px solid #345;
    border-image: -webkit-linear-gradient(
        180deg,
        rgba(30, 54, 111, 0.4) 20%,
        #fff 50%,
        rgba(30, 54, 111, 0.4) 80%
      )
      1 10;
  }
  .Content {
    width: 98%;
    height: calc(100% - 80px);
    margin: auto;
    margin-top: 10px;
    box-sizing: border-box;
    .left,
    .right {
      width: 27%;
      height: 100%;
      overflow: hidden;
      .information {
        width: 100%;
        height: 32%;
        margin-bottom: 10px;
        box-sizing: border-box;
      }
    }
    .cuisine {
      width: 45%;
      height: 100%;
    }
  }
  .echartcalc {
    height: calc(100% - 45px);
  }
}
</style>
