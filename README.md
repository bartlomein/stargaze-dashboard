# Stargaze Dashboard

This is a SSR application that will a selected wallets NFTs. A user can go to `/dashboard/<WALLET_ADDRESS>` and look at the NFTs owned by the wallet and the last price paid

- Sort by descending or ascending based last price paid
- Select the number of NFTs shown
- Select a color for the background of the dashboard
- Drag and drop cards to make a custom order to view
- Delete a card to not show it
- Save layouts and retrieve them later
- Connect your Keprl wallet and click on address to view your wallet's NFTs

## Installation

1. Clone the repository
2. Run `npm install`

## Running

Run `npm run dev` inside project root

## Testing

Run `npm run test` inside the project root

### Libraries used

1. Reactjs
2. NextJS
3. React-query
4. Button, Input, Card, Dropdown components from shadcn
5. Zustand for state management (Not used much now but in the future if this application is to grow, will be useful)
6. React-icons
