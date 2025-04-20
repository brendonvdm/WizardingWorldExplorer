import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'
import { createPinia, setActivePinia } from 'pinia'
import { createApp } from 'vue'
import { RouterLinkStub } from '@vue/test-utils'

// Create test app with pinia
const app = createApp({})
app.use(createPinia())

describe('HomeView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the component', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays welcome message', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    expect(wrapper.text()).toContain('Welcome')
  })

  it('has navigation links', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    // Check for Card components instead of RouterLink
    const cards = wrapper.findAllComponents({ name: 'Card' })
    expect(cards.length).toBeGreaterThan(0)
  })
})
