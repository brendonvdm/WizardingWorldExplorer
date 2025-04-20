export interface House {
  id: string
  name: string
  houseColors: string
  founder: string
  animal: string
  element: string
  ghost: string
  commonRoom: string
  heads: {
    id: string
    firstName: string
    lastName: string
  }[]
  traits: {
    id: string
    name: string
  }[]
}

export interface Spell {
  id: string
  name: string
  incantation: string
  effect: string
  canBeVerbal: boolean
  type: string
  light: string
  creator: string | null
}

export interface WizardingWorldState {
  selectedSpell: Spell | null
  spells: SearchableData<Spell>
  selectedHouse: House | null
  houses: SearchableData<House>
  selectedElixir: Elixir | null
  elixirs: SearchableData<Elixir>
}

export interface Elixir {
  id: string
  name: string
  effect: string
  sideEffects: string
  characteristics: string
  time: string
  difficulty: string
  ingredients?: Ingredient[]
  inventors?: Wizard[]
  manufacturer?: string
}

export interface Wizard {
  id: string
  firstName: string
  lastName: string
}

export interface Ingredient {
  id: string
  name: string
}

export interface SearchableData<T> {
  loading: boolean
  error: Error | null
  searchText: string
  data: T[]
}
