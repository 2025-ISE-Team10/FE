import LoginPage from "./component/LoginPage"
import StartingInterface from "./component/StartingInterface"

function App() {

  return (
    <>
    {/* <LoginPage /> */}
    {/* <StartingInterface /> */} 
      <StartingInterface />
      <footer className="mt-auto px-4 py-6 text-sm text-center text-gray-500 bg-white border-t">
        <div className="space-x-4">
        <a href="#">FAQ</a>
        <a href="#">고객센터</a>
        <a href="#">이용약관</a>
        </div>
        <p className="mt-2">© 2025 Geup Inc.</p>
    </footer>
    </>
  )
}

export default App
