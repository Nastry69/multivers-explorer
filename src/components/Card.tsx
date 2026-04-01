import { Link } from "react-router-dom";
import type { Character } from "../services/api";

type CardProps = {
    character: Character;
};

// Composant pour afficher une carte de personnage
export function Card({ character }: CardProps) {
    return (
        <div className="card">
            <img src={character.image} alt={character.name} className="card-image" />
            <h2>{character.name}</h2>
            <p>Espèce : {character.species}</p>
            <Link to={`/character/${character.id}`} className="card-link">
                Voir les détails
            </Link>
        </div>
    );
}

export default Card;