import './scss/main.scss'
import Button from './components/button/Button'
function App() {
  return (
    <>
      <h1>With Bootstrap</h1>
      <Button variant='outline-primary' size='sm'>Click me</Button>
      <Button variant="secondary">
        Button primary
      </Button>
    </>
  )
}

export default App
