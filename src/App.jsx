import githubIcon from '/github.svg'
import linkedInIcon from '/linkedin.svg'
import { 
  useEffect, 
  useRef, 
  useState} from 'react'
import Header from './components/Header'
import ModalDetails from './components/ModalDetails'
import { db } from './data/data'
import Sneaker from './components/Sneaker'
import Notification from './components/Notification'

function App() {
  const initializeCart = () => {
    const initialCart = localStorage.getItem('cart')
    return initialCart ? JSON.parse(initialCart) : {}
  }
  
  const [selectedModel, setSelectedModel] = useState({})
  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initializeCart)
  const [notifications, setNotifications] = useState([])
  const [openCart, setOpenCart] = useState(null)

  const bgModalRef = useRef(null)

  function addNotification( type ){
    const notiExists = notifications.findIndex( noti => noti == type )
    if (notiExists < 0) {
      setNotifications([...notifications, type])
    }
  }
  

  useEffect(() => {
      if (Object.keys(selectedModel).length > 0) {
          document.body.style.overflow = "hidden"
          bgModalRef.current.style.display = "unset"
          bgModalRef.current.scrollTo(  { behavior: 'smooth', top: 0 } )
          setTimeout(() => {
            bgModalRef.current.classList.add("visible")
          }, 1);
      }
      else {
          bgModalRef.current.classList.remove("visible")
          setTimeout(() => {
            bgModalRef.current.style.display = "none"
            document.body.style.overflow = !openCart ? "unset" : "hidden";
          }, 400);
      }
  }, [selectedModel])

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <>
    <ModalDetails 
    bgModalRef={bgModalRef} 
    setSelectedModel={setSelectedModel} 
    selectedModel={selectedModel}
    data={data}
    setCart={setCart}
    cart={cart}
    addNotification={addNotification}
    />
    <Header
    cart={cart}
    openCart={openCart}
    setOpenCart={setOpenCart}
    setCart={setCart}
    addNotification={addNotification}
    />
    <main>
      <div className="banner">
        <div className="banner-text">
          <div className="container">
            <h1>Exclusive Designs Available</h1>
            <p>
            Step into a world where exclusivity and style collide to offer you the finest selection of premium sneakers. Our meticulously curated collection features coveted releases from top brands, ensuring that every step you take is a statement of sophistication.
            </p>
          </div>
        </div>
      </div>

      <div className="collection container">
        <h2>Our Collection</h2>
        <div className="sneaker-grid">
            { Object.keys(data).map( (sneakerId) => (
                <Sneaker 
                key={sneakerId} 
                sneaker={data[sneakerId]}
                setSelectedModel={setSelectedModel}
                />
            ))}
        </div>
      </div>
      <div className="notifications-container">
        {notifications.map( (notification) => (
          <Notification 
          key={notification} 
          type={notification}
          setNotifications={setNotifications}
          setOpenCart={setOpenCart}
          setSelectedModel={setSelectedModel}
          />
        ))}
      </div>
    </main>

    <footer className='container footer'>
      <p>© 2024, Yael Ruíz. All rights reserved.</p>
      <div className="social-networks">
        <a href="https://www.linkedin.com/in/yael-ru%C3%ADz-s%C3%A1nchez-712728279/" target="_blank" className='social-network-link'>
          <img src={linkedInIcon} alt="social-network" />
        </a>
        <a href="https://github.com/itsyaelx" target="_blank" className='social-network-link'>
          <img src={githubIcon} alt="social-network" />
        </a>
      </div>
      <p>Technologies: vite.js, React.js, and CSS</p>
    </footer>
    </>
  )
}

export default App
