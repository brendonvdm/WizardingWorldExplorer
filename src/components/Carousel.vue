<template>
  <div class="relative">
    <div
      id="carousel"
      class="overflow-hidden relative min-h-130"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @wheel="handleScroll"
    >
      <TransitionGroup :name="direction === 'next' ? 'slide' : 'slide-prev'" tag="div">
        <div
          v-for="(row, index) in data"
          v-show="activeIndex === index"
          :key="(row as any)[rowKey]"
          class="p-6 rounded-lg shadow-lg"
        >
          <div class="flex flex-col md:flex-row gap-6">
            <div
              class="image-container md:w-1/3 bg-primary text-primary-contrast p-4 rounded-lg"
              :class="(row as any)?.name?.toLowerCase()"
            >
              <slot name="image" :row="row">
                <div class="w-full h-48 flex items-center justify-center rounded bg-primary-dark">
                  <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16v16H4V4zm2 4v10h12V8H6z" />
                    <path d="M10.5 15.5l-3-3 3-3 1.5 1.5-1.5 1.5 1.5 1.5-1.5 1.5z" />
                  </svg>
                </div>
              </slot>
            </div>

            <div class="content-container md:w-2/3">
              <div v-for="col in columns" :key="(col as any).field">
                <slot :name="(col as any).field" :row="row">
                  <div class="mb-4">
                    <div class="text-sm font-medium text-heading">
                      {{ (col as any).label }}
                    </div>
                    <div class="mt-1 text-lg text-text">
                      {{ (row as any)[(col as any).field] }}
                    </div>
                  </div>
                </slot>
              </div>

              <div v-if="$slots.actions" class="mt-4">
                <slot name="actions" :row="row" />
              </div>
            </div>
          </div>

          <slot name="details" :row="row" />
        </div>
      </TransitionGroup>
    </div>

    <div class="flex justify-center gap-2">
      <Button
        v-for="index in visibleIndices"
        :key="index"
        class="w-3 h-3 rounded-full transition-colors cursor-pointer"
        :class="{
          'bg-primary': activeIndex === index,
          'border-2 border-text': activeIndex !== index,
          [(data as any)[index]?.name?.toLowerCase()]: activeIndex == index,
          [(data as any)[index]?.name?.toLowerCase() + '-border']: activeIndex !== index,
        }"
        @click="goToIndex(index)"
      ></Button>
    </div>
    <div class="flex justify-center gap-2">
      <div class="text-text">{{ activeIndex + 1 }} / {{ data.length }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, computed, defineExpose } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  rowKey: {
    type: String,
    default: 'id',
  },
})

const activeIndex = ref(0)
const direction = ref('next')
const touchStartX = ref(0)
const touchEndX = ref(0)

const visibleIndices = computed(() => {
  if (props.data.length <= 10) return Array.from({ length: props.data.length }, (_, i) => i)

  let start = Math.max(0, activeIndex.value - 5)
  start = Math.min(start, props.data.length - 10)

  return Array.from({ length: 10 }, (_, i) => start + i)
})

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.changedTouches[0].screenX
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0].screenX
}

const handleTouchEnd = () => {
  const diff = touchStartX.value - touchEndX.value

  if (diff > 50) {
    next()
  } else if (diff < -50) {
    prev()
  }
}
const handleScroll = (e: WheelEvent) => {
  const deltaX = e.deltaX

  if (deltaX > 20) {
    next()
  } else if (deltaX < -20) {
    prev()
  }
}

const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  timeout = 200,
): ((...args: Parameters<T>) => void) => {
  let timer: unknown
  return (...args: Parameters<T>) => {
    clearTimeout(timer as number)
    timer = setTimeout(() => fn(...args), timeout)
  }
}

const next = debounce(() => {
  direction.value = 'next'
  activeIndex.value = (activeIndex.value + 1) % props.data.length
})

const prev = debounce(() => {
  direction.value = 'prev'
  activeIndex.value = (activeIndex.value - 1 + props.data.length) % props.data.length
})

const goToIndex = (index: number) => {
  direction.value = index > activeIndex.value ? 'next' : 'prev'
  activeIndex.value = index
}

watch(props.data, () => {
  goToIndex(0)
})

// Expose methods and properties for testing
defineExpose({
  activeIndex,
  visibleIndices,
  next,
  prev,
  goToIndex,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleScroll
})
</script>

<style scoped>
/* Base transition timing */
.slide-enter-active,
.slide-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.3s ease-out;
  position: absolute;
  width: 100%;
}

/* Next direction animations */
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}

/* Previous direction animations */
.slide-prev-enter-from {
  transform: translateX(-100%);
}
.slide-prev-leave-to {
  transform: translateX(100%);
}
</style>
