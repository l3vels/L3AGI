export const FINANCIAL_YEAR_START_MONTH_OPTIONS = [
  { label: 'January', value: 'january' },
  { label: 'February', value: 'february' },
  { label: 'March', value: 'march' },
  { label: 'April', value: 'april' },
  { label: 'May', value: 'may' },
  { label: 'June', value: 'june' },
  { label: 'July', value: 'july' },
  { label: 'August', value: 'august' },
  { label: 'September', value: 'september' },
  { label: 'October', value: 'october' },
  { label: 'November', value: 'november' },
  { label: 'December', value: 'december' },
]

export const COMPANY_ROLE_OPTIONS = [
  { label: 'Founder', value: 'Founder' },
  { label: 'CTO', value: 'CTO' },
  { label: 'Game Designer', value: 'Game Designer' },
  { label: 'Game Developer', value: 'Game Developer' },
  { label: 'Artist', value: 'Artist' },
  { label: 'Sound Designer', value: 'Sound Designer' },
  { label: 'Game Producer', value: 'Game Producer' },
  { label: 'Quality Assurance Tester', value: 'Quality Assurance Tester' },
  { label: 'Narrative Designer/Writer', value: 'Narrative Designer/Writer' },
  { label: 'Level Designer', value: 'Level Designer' },
  { label: 'Marketing and Public Relations', value: 'Marketing and Public Relations' },
  { label: 'Community Manager', value: 'Community Manager' },
]

export const COMPANY_SIZE_OPTIONS = [
  {
    value: '1-4',
    label: '1-4',
  },
  {
    value: '5-9',
    label: '5-9',
  },
  {
    value: '10-19',
    label: '10-19',
  },
  {
    value: '20-49',
    label: '20-49',
  },
  {
    value: '50-250',
    label: '50-250',
  },
  {
    value: '251-500',
    label: '251-500',
  },
  {
    value: '501-1000',
    label: '501-1000',
  },
  {
    value: 'Greater than 1000',
    label: 'Greater than 1000',
  },
  {
    value: 'Unsure',
    label: 'Unsure',
  },
]

export interface Option {
  label: string
  value: string
}

export const GAME_CATEGORY_OPTIONS: Option[] = [
  { value: 'Action', label: 'Action' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Animal', label: 'Animal' },
  { value: 'Art & Creativity', label: 'Art & Creativity' },
  { value: 'Board & Card', label: 'Board & Card' },
  // { value: 'Girl', label: 'Girl' },
  { value: 'Multiplayer', label: 'Multiplayer' },
  { value: 'Puzzle', label: 'Puzzle' },
  { value: 'Racing', label: 'Racing' },
  { value: 'Shooting', label: 'Shooting' },
  { value: 'Skill Games', label: 'Skill Games' },
  // { value: 'Special', label: 'Special' },
  { value: 'Simulation', label: 'Simulation' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Strategy', label: 'Strategy' },
  { value: 'Vehicle', label: 'Vehicle' },
  { value: 'Sci-Fi', label: 'Sci-Fi' },
]

export const COLLECTION_CATEGORY_OPTIONS = [
  { value: 'Art', label: 'Art' },
  { value: 'Lands', label: 'Lands' },
  { value: 'Collectibles', label: 'Collectibles' },
  { value: 'Guns', label: 'Guns' },
  { value: 'Skins', label: 'Skins' },
  { value: 'Properties', label: 'Properties' },
]

export const ASSET_TYPE_OPTIONS = [
  { value: 'Nested', label: 'Nested' },
  { value: 'Main', label: 'Main' },
]

export const PROPERTY_TYPE_OPTIONS = [
  { value: 'Array', label: 'Array' },
  { value: 'Object', label: 'Object' },
  { value: 'String', label: 'String' },
  { value: 'Number', label: 'Number' },
]
