import React from "react";
import ImagesGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const SlidersImages = ({
  images,
  imageStyle,
  thumbnailPosition,
  showBullets,
  showPlayButton,
  showThumbnails,
  showIndex,
  showNav,
  showFullscreenButton,
  disableThumbnailScroll,
  disableArrowKeys,
  disableSwipe,
  disableSwipeThreshold,
  useBrowserFullscreen,
  preventDefaultTouchmoveEvent,
  slideDuration,
  slideInterval,
  startIndex,
  handleSlide,
  handleBeforeSlide,
  handleScreenChange,
  handlePause,
  handlePlay,
  handleClick,
  handleImageLoad,
  handleThumbnailError,
  handleError,
  handleTouchMove,
  handleTouchEnd,
  handleTouchStart,
  ...otherProps
}) => {
  // console.log("IMAGES XXXXXX", images);

  const imagesToDisplay = images.map((image) => {
    return {
      original: image,
      thumbnail: image,
    };
  });

  // console.log("============= images", imagesToDisplay);
  return (
    <div style={imageStyle}>
      <ImagesGallery
        items={imagesToDisplay}
        thumbnailPosition={thumbnailPosition} //posicion de las miniaturas
        showBullets={showBullets} //puntos de navegacion
        showThumbnails={showThumbnails} //miniaturas
        showIndex={showIndex} //numero de imagen
        showNav={showNav} //botones de navegacion < >
        showPlayButton={showPlayButton} //boton de play reproduccion automatica
        showFullscreenButton={showFullscreenButton} //boton de pantalla completa
        disableThumbnailScroll={disableThumbnailScroll} //desactivar el desplazamiento de miniaturas
        disableArrowKeys={disableArrowKeys} //desactivar las teclas de flecha
        disableSwipe={disableSwipe} //desactivar el deslizamiento tactil en dispositivos moviles
        disableSwipeThreshold={disableSwipeThreshold}
        useBrowserFullscreen={useBrowserFullscreen} //usar pantalla completa del navegador
        preventDefaultTouchmoveEvent={preventDefaultTouchmoveEvent}
        slideDuration={slideDuration} //duracion de la animacion al cambiar de imagen
        slideInterval={slideInterval} //intervalo de tiempo entre imagenes con la reproduccion automatica
        startIndex={startIndex} //indice de la imagen inicial
        onSlide={handleSlide} //evento al cambiar de imagen
        onBeforeSlide={handleBeforeSlide}
        onScreenChange={handleScreenChange}
        onPause={handlePause}
        onPlay={handlePlay}
        onClick={handleClick}
        onImageLoad={handleImageLoad} //evento al cargar una imagen
        onThumbnailError={handleThumbnailError} //evento al cargar una miniatura
        onError={handleError} //evento al cargar una imagen
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        additionalClass="custom-gallery-class"
        useTranslate3D={true}
        {...otherProps}
      />
    </div>
  );
};

export default SlidersImages;
