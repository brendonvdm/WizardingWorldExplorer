import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils'
import HousesView from '../HousesView.vue'
import { createTestingPinia } from '@pinia/testing'

describe('HousesView', () => {
  it('renders title and description', () => {
    const wrapper = mount(HousesView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        mocks: {
          $primevue: { config: {} }
        },
        stubs: {
          'font-awesome-icon': true,
          'Button': true
        }
      }
    })
    expect(wrapper.text()).toContain('Hogwarts Houses')
    expect(wrapper.text()).toContain('Explore the different houses of the wizarding world.')
  })

  it('renders filter input', () => {
    const wrapper = mount(HousesView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        mocks: {
          $primevue: { config: {} }
        },
        stubs: {
          'font-awesome-icon': true,
          'Button': true
        }
      }
    })
    expect(wrapper.find('input[placeholder="Filter houses..."]').exists()).toBe(true)
  })
})
