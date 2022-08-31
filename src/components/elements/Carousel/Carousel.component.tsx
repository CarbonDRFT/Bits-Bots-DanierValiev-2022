import Icon from '../Icon';

import { useState } from 'react';

import './Carousel.style.scss';

type Props = {
  slides: string[];
  startingSlide?: number;
  showSlideIndicators?: boolean;
  showControls?: boolean;
  extraStyles?: React.CSSProperties;
};

const Carousel = ({ slides, startingSlide = 0, showSlideIndicators = true, showControls = true, extraStyles }: Props): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState<number>(startingSlide);

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(slides.length - 1)
    }
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  }

  return (
    <div className="carousel" style={extraStyles}>
      <div className="carousel__slides">
        {slides.map(
          (slide, index) => (
            <img
              key={index}
              src={slide}
              alt={slide}
              className={`carousel__slide ${index === currentSlide ? 'carousel__slide--visible' : ''}`}
            />
          )
        )}
      </div>
      {showSlideIndicators ? (
        <div className="carousel__slide-indicators">
          {slides.map(
            (_, index) => (
              <div
                key={index}
                className={`carousel__slide-indicator ${currentSlide === index ? 'carousel__slide-indicator--active' : ''}`}
              />
            )
          )}
        </div>
      ) : null}
      {showControls ? (
        <>
          <div className="carousel__control carousel__control--left" onClick={handlePrevious}>
            <Icon name="chevron-circle-left" type="fas" />
          </div>
          <div className="carousel__control carousel__control--right" onClick={handleNext}>
            <Icon name="chevron-circle-right" type="fas" />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Carousel;
