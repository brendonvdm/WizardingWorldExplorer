import { describe, it, expect, vi, beforeAll } from 'vitest';

// Mock window.matchMedia for PrimeVue components
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  });
});
import { mount } from '@vue/test-utils'
import ElixirsView from '../ElixirsView.vue'
import { createTestingPinia } from '@pinia/testing'

describe('ElixirsView', () => {
  it('renders title and description', () => {
    const wrapper = mount(ElixirsView, {
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
    expect(wrapper.text()).toContain('Magical Elixirs')
    expect(wrapper.text()).toContain('Explore magical elixirs and potions from the wizarding world.')
  })

  it('renders filter input', () => {
    const wrapper = mount(ElixirsView, {
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
    expect(wrapper.find('input[placeholder="Filter elixirs..."]').exists()).toBe(true)
  })
})
