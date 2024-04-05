function Sneaker ({ sneaker, setSelectedModel }) {
    const handleHoverSneaker = (e) => {
        if (e.target.classList[0] === "sneaker") {
            e.target.querySelector(".sneaker-pic").style.transform = "scale(1.1)";
        }
        else {
            e.target.parentElement.querySelector(".sneaker-pic").style.transform = "scale(1.1)";
        }
    }
    
    const handleSneakerMouseLeave = (e) => {
        if (e.target.classList[0] === "sneaker") {
            e.target.querySelector(".sneaker-pic").style.transform = "scale(1)";
        }
        else {
            e.target.parentElement.querySelector(".sneaker-pic").style.transform = "scale(1)";
        }
    }
    return (
        <div 
            className="sneaker" 
            onClick={() => {setSelectedModel(sneaker)}} 
            onMouseEnter={handleHoverSneaker} 
            onMouseLeave={handleSneakerMouseLeave}
        >
            <div className="sneaker-pic-container">
                <img src={`src/assets/images/${sneaker.image}.jpg`} alt="sneaker photo" className='sneaker-pic'/>
            </div>
            <h3>{sneaker.name}</h3>
            <h4>${sneaker.price}</h4>
        </div>
    )
}

export default Sneaker