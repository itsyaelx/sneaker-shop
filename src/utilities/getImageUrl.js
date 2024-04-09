function getImageUrl( image, ext ) {
    return new URL(`/src/assets/${image}.${ext}`, import.meta.url).href
}

export default getImageUrl