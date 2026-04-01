import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CharacterById, type Character } from "../services/api";
import ReviewForm from "../components/Review";

function ProfileDetails() {
    const { id } = useParams();
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const numericId = parseInt(id);

        const loadCharacter = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await CharacterById(numericId);
                setCharacter(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Une erreur est survenue.");
                }
            } finally {
                setLoading(false);
            }
        };

        loadCharacter();
    }, [id]);

    if (loading) {
        return <p>Chargement…</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!character) {
        return <p>Aucun personnage trouvé.</p>;
    }

    return (
        <div className="container">
            <Link to="/" className="back-link">← Retour à l’accueil</Link>

            <div className="detail-card">
                <h1 className="detail-title">{character.name}</h1>

                <img
                    src={character.image}
                    alt={character.name}
                    className="detail-img"
                />

                <div className="detail-infos">
                    <p><strong>Statut :</strong> {character.status}</p>
                    <p><strong>Espèce :</strong> {character.species}</p>
                    <p><strong>Origine :</strong> {character.origin.name}</p>
                </div>

                <ReviewForm />
            </div>
        </div>
    );
}
    export default ProfileDetails;