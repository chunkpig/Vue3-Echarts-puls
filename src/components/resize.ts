import { debounce } from "@/utils/debounce";
import {
  ref,
  toRefs,
  computed,
  onMounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
} from "vue";
export default function () {
  const myCharts = toRefs<any>(null);
  // const resizeHandler = ref<any>(null);
  const resizeHandler = debounce(() => {
    if (myCharts.value) {
      myCharts.value.resize();
    }
  }, 200);
  onMounted(() => {
    initResizeEvent();
  });
  onBeforeUnmount(() => {
    destroyResizeEvent();
    if (myCharts.value) {
      return;
    }
    myCharts.value.dispose();
    myCharts.value.off("click");
    myCharts.value = null;
  });
  onActivated(() => {
    initResizeEvent();
    if (myCharts.value) {
      myCharts.value.resize();
    }
  });
  onDeactivated(() => {
    destroyResizeEvent();
  });
  const initResizeEvent = () => {
    window.addEventListener("resize", resizeHandler);
  };
  const destroyResizeEvent = () => {
    window.removeEventListener("resize", resizeHandler);
  };
  return {
    myCharts,
  };
}
