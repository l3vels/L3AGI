import { useLocation } from 'react-router-dom'

const homeSuggestions = [
  'Give me the top three minted assets in a table for all games.',
  'Analyze my games and assets using our database to generate a report on player, transaction data, and other relevant insights.',
  'Import polygon contract with address "X" in game "Y"',
  'How many assets are in that game?',
  'How many unique players are in all my game?',
]
const gameSuggestions = [
  'How many assets are in that game?',
  'Give me table of top three minted assets in that game.',
  'How many unique players are in that game?',
  'Give me top three players in that game.',
  'Import ethereum contract with address "0xeaa4c58427c184413b04db47889b28b5c98ebb7b" in that game',
]
const collectionSuggestions = [
  'How many assets are in that collection?',
  'What is collection categories',
  'collection?',
  'How many collections are in that game?',
  'Can you tell some dad jokes?',
]
const playerSuggestions = [
  'Give me top 3 players in that game.',
  'What is player wallet address',
  'How many players are in that game?',
  'Give me top minted assets in that game.',
  'Can you tell some dad jokes?',
]

export const useSuggestions = () => {
  let chatSuggestions = homeSuggestions

  const location = useLocation()
  const { pathname } = location

  if (pathname.includes('player')) {
    chatSuggestions = playerSuggestions
  } else if (pathname.includes('collection')) {
    chatSuggestions = collectionSuggestions
  } else if (pathname.includes('game')) {
    chatSuggestions = gameSuggestions
  }

  return { chatSuggestions }
}
