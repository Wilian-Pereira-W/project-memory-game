/* eslint-disable no-unused-vars */
import './styles.css';

export interface CardProps {
  id: string;
  flipped?: boolean;
  name: string;
  url: string;
  handleClick?: (id: string) => void;
}

function Card({ flipped = false, url, name, handleClick, id }: CardProps) {
  const handleClickFn = (id: string) => {
    if (handleClick) {
      handleClick(id);
    }
  };

  const cardContentClassNames = ['card_content'];
  flipped && cardContentClassNames.push('card_content_flipped');

  return (
    <div className="card" onClick={() => handleClickFn(id)}>
      <div className={cardContentClassNames.join(' ')}>
        <div className="card_face card_face_front">W</div>
        <div className="card_face card_face_back">
          <img src={url} alt={name} />
        </div>
      </div>
    </div>
  );
}

export default Card;
