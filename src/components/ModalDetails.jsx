import { useEffect, useRef, useState } from "react"
import Sneaker from "./Sneaker"
import getImageUrl from "../utilities/getImageUrl"

function ModalDetails ({ bgModalRef, setSelectedModel, selectedModel, data, setCart, cart }) {
    const [selectedSize, setSelectedSize] = useState(null)
    const sneakerKeys = Object.keys(data)
    const maxId = sneakerKeys[sneakerKeys.length - 1]
    const followingSneakers = [null, null, null, null]
    const availableSizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5]

    function handleAddToCart(id) {
        if (selectedSize === null) {
            return
        }
        setCart((prevCart) => {
            if(!prevCart.hasOwnProperty(`@${id + selectedSize}`)){
                const newCart = { 
                    [`@${id + selectedSize}`]: { 
                        ...selectedModel, 
                        size: 8 + (selectedSize * 0.5),
                        quantity: 1,
                    },
                    ...prevCart,
                }
                return newCart
            }

            if(prevCart[`@${id + selectedSize}`].quantity === 5){
                return prevCart
            }

            const newCart = { ...cart }
            newCart[`@${id + selectedSize}`].quantity += 1
            return newCart
        })

        setSelectedSize(null)
    }

    useEffect(() => {
        setSelectedSize(null)
    }, [selectedModel])

    return (
        <div className="modal-bg" ref={ bgModalRef }>
            <div className="window-bar">
                <h3 onClick={() => setSelectedModel({})}>X</h3>
            </div>
            <div className="modal-details container">
                <div className="sneaker-details">
                    <picture className="item-pic">
                        <source srcSet={ getImageUrl( selectedModel.image, "webp" ) }/>
                        <img 
                        src={ getImageUrl( selectedModel.image, "jpg" ) } 
                        loading="lazy"
                        alt="sneaker pic" 
                        />
                    </picture>
                    <div className="sneaker-info">
                        <h2>{selectedModel.name}</h2>
                        <h3>$ {selectedModel.price}</h3>
                        <p> Taxes included</p>
                        <p>Size</p>
                        <div className="size-selector">
                            {availableSizes.map( (size, index) => (
                                <label 
                                key={index}
                                className={"size-option " + (index === selectedSize ? "selected" : "")} 
                                onClick={() => setSelectedSize(index)}
                                > 
                                {size} US
                                </label>
                            ))}
                        </div>
                        <button className="main-btn" onClick={() => handleAddToCart(selectedModel.id)}>Add to cart</button>
                    </div>
                </div>
                <h2>Shop More</h2>
                <div className="shop-more">
                    {followingSneakers.map( (sneakerId, index) => {
                        if (Object.keys(selectedModel).length === 0) {
                            return 
                        }
                        let nextItem = selectedModel.id + ((index + 1) * 10)  

                        if (nextItem > maxId) {
                            nextItem = nextItem - maxId - 10
                        }
                        return(
                            <Sneaker 
                            key={nextItem}
                            sneaker={data[nextItem]}
                            setSelectedModel={setSelectedModel}
                            />
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default ModalDetails