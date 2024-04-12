import { useEffect, useRef, useState } from "react"

function Notification ({ type, setNotifications, setSelectedModel, setOpenCart }){
    const [visible, setVisible] = useState(true)
    const notificationRef = useRef(null)
    const progressBarRef = useRef(null)
    let timeOut1 = null
    let timeOut2 = null

    const notificationType = {
        "Item Added" :  <h5>Item added to cart. <a onClick={handleOpenCart}>Open cart</a></h5>,
        "Max Quantity": <h5>You have reached the maximum item quantity for this product.</h5>,
        "Item Removed" : <h5>Item removed from cart</h5>,
        "Select Size" : <h5>Please select size</h5>
    } 

    function removeSelf () {
        setNotifications((prevNoti) => {
            const newNoti = [...prevNoti]
                .filter((noti) => 
                    (noti != type)
                )
            return newNoti
        })
    }

    function handleOpenCart() {
        setVisible(false)
        setSelectedModel({})
        setOpenCart(true)
    }

    useEffect(() => {
        if (!visible) {
            clearTimeout(timeOut1)
            clearTimeout(timeOut2)
            notificationRef.current.classList.remove("--notification-visible")
            notificationRef.current.classList.add("--notification-gone")
            setTimeout(() => {
                notificationRef.current.classList.add("--notification-minimized")
            }, 300);
            setTimeout(() => {
                removeSelf()
            }, 600);
        }
        if (visible) {
            setTimeout(() => {
                notificationRef.current.classList.add("--notification-visible")
                progressBarRef.current.classList.add("--progressing")
            }, 0);
            timeOut1 = setTimeout(() => {
                notificationRef.current.classList.remove("--notification-visible")
            }, 4650);
            timeOut2 = setTimeout(() => removeSelf(), 5000);
        }
        return () => {
            clearTimeout(timeOut1)
            clearTimeout(timeOut2)
        }
    }, [visible])

    return(
        <div 
        ref={notificationRef} 
        className="notification"
        >
            <div className="notification-text-section">
                {notificationType[type]}
            </div>
            <div className="notification-btn-section">
                <button 
                className="notification-remove-btn"
                onClick={()=>setVisible(false)}
                >x</button>
            </div>
            <div 
            ref={progressBarRef} 
            className="progress-bar"
            ></div>
        </div>
    )
}

export default Notification