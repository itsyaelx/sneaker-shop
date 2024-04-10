import logo from '/logo.svg'
import cartIcon from '/cartIcon.svg'
import { useEffect, useRef, useState } from 'react'
import getImageUrl from '../utilities/getImageUrl'

function Header ({ cart, setCart }) {
    const [openCart, setOpenCart] = useState(null)

    //State derivado
    const isEmpty = Object.keys(cart).length === 0
    const total = isEmpty ? 0 : Object.keys(cart).reduce
    ( 
        (total, key) => {
            total += cart[key].price * cart[key].quantity
            return total
        }, 0
    )
    const itemCount = isEmpty ? 0 : Object.keys(cart).reduce
    (
        (total, key) => {
            total += cart[key].quantity
            return total
        }, 0
    )

    const bgCartRef = useRef(null)
    const panelCartRef = useRef(null)
    const cartRef = useRef(null)

    const handleClickBg = (e) => {
        if (e.target.classList[0] === "cart-bg") {
            setOpenCart(false)
        }
    }

    const incrementQuantity = ( key ) => {
        if (cart[key].quantity === 5) {
            return 
        }
        const newCart = { ...cart }
        newCart[key].quantity += 1
        setCart(newCart)
    }

    const decreaseQuantity = ( key ) => {
        if (cart[key].quantity === 1) {
            return 
        }
        const newCart = { ...cart }
        newCart[key].quantity -= 1
        setCart(newCart)
    }

    const removeFromCart = ( key ) => {
        const newCart = { ...cart }
        delete(newCart[key])
        setCart(newCart)
    }

    const clearCart = () => setCart({})

    useEffect(() => {
        if (openCart === true) {
            document.body.style.overflow = "hidden";
            bgCartRef.current.classList.add("showing-bg")
            panelCartRef.current.classList.add("displaying-panel")
            cartRef.current.classList.add("displaying-cart")
        } 
        else if (openCart === false) {
            bgCartRef.current.classList.add("hidding-bg") 
            panelCartRef.current.classList.add("hidding-panel")
            setTimeout(() => {
                bgCartRef.current.classList.remove("showing-bg")
                bgCartRef.current.classList.remove("hidding-bg")
                panelCartRef.current.classList.remove("displaying-panel")
                panelCartRef.current.classList.remove("hidding-panel")
                cartRef.current.classList.remove("displaying-cart")
                document.body.style.overflow = "unset";
            }, 200);
        }
    }, [openCart])

    return (
        <header>
            <div className='main-nav container'>
                <div className="logo-container">
                <img src={logo} alt="logo" className='img-logo'/>
                </div>
                <nav>
                <div className="cart-container" onClick={() => {setOpenCart(true)}}>
                    {
                    itemCount === 0 
                    ? "" 
                    : <div className="cart-item-counter">{itemCount}</div>
                    }
                    <img src={cartIcon} alt="cartButton" />
                </div>
                </nav>
            </div>

            <div ref={bgCartRef} className="cart-bg" onClick={handleClickBg}>
                <div ref={panelCartRef} className="cart-panel">
                    <div ref={cartRef} className="cart">
                    <div className="cart-bar">
                        <h3 onClick={() => setOpenCart(false)}>X</h3>
                    </div>
                    <h3 className='cart-title'>Your Cart</h3>
                    {
                        isEmpty
                        ? 
                        (<h3 className='cart-empty-msg'>Your Cart Is Empty</h3>) 
                        :
                        (
                            <>
                            <div className="cart-table">
                                { Object.keys(cart).map( (key, index) => (
                                    <div className='cart-item' key={index}>
                                        <picture className='cart-item-image-container'>
                                            <source srcSet={ getImageUrl( cart[key].image, "webp" ) }/>
                                            <img 
                                            src={ getImageUrl( cart[key].image, "jpg" ) } 
                                            loading="lazy"
                                            alt="sneak pic" className="cart-pic" 
                                            />
                                        </picture>
                                        <div className='cart-item-details'> 
                                            <h5>{cart[key].name}</h5>
                                            <p className='cart-item-price'>Price: $ {cart[key].price}</p>
                                            <p className='cart-item-size'>Size: {cart[key].size} US</p>
                                            <div className="quantity-controller">
                                                <button 
                                                className='item-btn'
                                                onClick={() => decreaseQuantity(key)}
                                                > - </button>
                                                <p className='quantity-indicator'>{cart[key].quantity}</p>
                                                <button 
                                                className='item-btn' 
                                                onClick={() => incrementQuantity(key)}
                                                > + </button>
                                            </div>
                                        </div>
                                        <div className='remove-item-btn-container'>
                                            <button 
                                            className='item-btn remove-item-btn'
                                            onClick={() => removeFromCart(key)}> x </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                            <div className="cart-footer">
                            <p className='total-bill'> Total: <span>$ {total} </span></p>
                            <button className="main-btn" onClick={clearCart}>Clear</button>
                        </div>
                        </>
                        )
                    }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header