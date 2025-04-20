import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Carousel from '../Carousel.vue'
import type { ComponentPublicInstance } from 'vue'

type CarouselComponent = ComponentPublicInstance<{
  activeIndex: number
  visibleIndices: number[]
  next: () => void
  prev: () => void
  goToIndex: (index: number) => void
}>

describe('Carousel', () => {
  const mockData = [
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
    { id: 3, name: 'Item 3', description: 'Description 3' },
  ]

  const mockColumns = [
    { field: 'name', label: 'Name' },
    { field: 'description', label: 'Description' },
  ]

  // Unit tests
  it('renders with default props', async () => {
    const wrapper = mount(Carousel, {
      props: {
        data: mockData,
        columns: mockColumns,
      },
    })

    // Wait for initial render
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.image-container').exists()).toBe(true)

    // Get the first rendered item's columns
    const firstItemColumns = wrapper.find('.content-container').findAll('.mb-4')
    expect(firstItemColumns.length).toBe(mockColumns.length)

    // Verify column labels
    mockColumns.forEach((col, index) => {
      expect(firstItemColumns[index].find('.text-sm.font-medium.text-heading').text()).toBe(
        col.label,
      )
    })
  })

  it('navigates between items', async () => {
    const wrapper = mount(Carousel, {
      props: {
        data: mockData,
        columns: mockColumns,
      },
    })

    const vm = wrapper.vm as unknown as CarouselComponent

    // Test next button functionality
    await vm.next()
    await new Promise((resolve) => setTimeout(resolve, 300)) // Wait for debounce + reactivity
    await wrapper.vm.$nextTick()
    expect(vm.activeIndex).toBe(1)

    // Test prev button functionality
    await vm.prev()
    await new Promise((resolve) => setTimeout(resolve, 300)) // Wait for debounce + reactivity
    await wrapper.vm.$nextTick()
    expect(vm.activeIndex).toBe(0)

    // Test goToIndex
    await vm.goToIndex(2)
    await new Promise((resolve) => setTimeout(resolve, 300)) // Wait for debounce + reactivity
    await wrapper.vm.$nextTick()
    expect(vm.activeIndex).toBe(2)
  })

  // Widget tests
  it('handles touch events', async () => {
    const wrapper = mount(Carousel, {
      props: {
        data: mockData,
        columns: mockColumns,
      },
    })

    const vm = wrapper.vm as unknown as CarouselComponent
    const carousel = wrapper.find('#carousel')

    // Simulate swipe right (should go to previous)
    await carousel.trigger('touchstart', { changedTouches: [{ screenX: 100 }] })
    await carousel.trigger('touchmove', { changedTouches: [{ screenX: 200 }] })
    await carousel.trigger('touchend')

    // Wait for debounce to complete
    await new Promise((resolve) => setTimeout(resolve, 250))
    expect(vm.activeIndex).toBe(mockData.length - 1) // Should wrap around to last item

    // Simulate swipe left (should go to next)
    await carousel.trigger('touchstart', { changedTouches: [{ screenX: 200 }] })
    await carousel.trigger('touchmove', { changedTouches: [{ screenX: 100 }] })
    await carousel.trigger('touchend')

    // Wait for debounce to complete
    await new Promise((resolve) => setTimeout(resolve, 250))
    expect(vm.activeIndex).toBe(0)
  })

  it('handles wheel events', async () => {
    const wrapper = mount(Carousel, {
      props: {
        data: mockData,
        columns: mockColumns,
      },
    })

    const vm = wrapper.vm as unknown as CarouselComponent
    const carousel = wrapper.find('#carousel')

    // Simulate wheel right
    await carousel.trigger('wheel', { deltaX: 30 })

    // Wait for debounce to complete
    await new Promise((resolve) => setTimeout(resolve, 250))
    expect(vm.activeIndex).toBe(1)

    // Simulate wheel left
    await carousel.trigger('wheel', { deltaX: -30 })

    // Wait for debounce to complete
    await new Promise((resolve) => setTimeout(resolve, 250))
    expect(vm.activeIndex).toBe(0)
  })

  // Integration tests
  it('updates when data changes', async () => {
    const wrapper = mount(Carousel, {
      props: {
        data: mockData,
        columns: mockColumns,
      },
    })

    const vm = wrapper.vm as unknown as CarouselComponent

    // Change data prop
    const newData = [...mockData, { id: 4, name: 'Item 4', description: 'Description 4' }]
    await wrapper.setProps({ data: newData })

    expect(vm.activeIndex).toBe(0)
    expect(vm.visibleIndices.length).toBe(newData.length <= 10 ? newData.length : 10)
  })

  it('renders slots correctly', async () => {
    const wrapper = mount(Carousel, {
      props: {
        data: mockData,
        columns: mockColumns,
      },
      slots: {
        image:
          '<template #image="props"><div class="custom-image">{{ props.row.name }}</div></template>',
        actions:
          '<template #actions="props"><button class="custom-action">Action</button></template>',
      },
    })

    expect(wrapper.find('.custom-image').exists()).toBe(true)
    expect(wrapper.find('.custom-action').exists()).toBe(true)
  })
})
