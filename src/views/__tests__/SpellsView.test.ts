import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils'
import SpellsView from '../SpellsView.vue'
import { createTestingPinia } from '@pinia/testing'

describe('SpellsView', () => {
  it('renders title and description', () => {
    const wrapper = mount(SpellsView, {
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
    expect(wrapper.text()).toContain('Spells')
    expect(wrapper.text()).toContain('Discover various spells from the wizarding world.')
  })

  it('renders filter input', () => {
    const wrapper = mount(SpellsView, {
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
    expect(wrapper.find('input[placeholder="Filter spells..."]').exists()).toBe(true)
  })
})
