import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import { CharacterList, type Character } from '../services/api';


type Info = {
    next: string | null;
    prev: string | null;
};

function Home() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [info, setInfo] = useState<Info>({ next: null, prev: null });
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCharacters = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await CharacterList(page);
                setCharacters(data.results);
                setInfo(data.info);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Une erreur est survenue, veuillez réessayer plus tard.");
                }
            } finally {
                setLoading(false);
            }
        };
        loadCharacters();
    }, [page]);

    const handlePrev = () => {
        if (info.prev) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const handleNext = () => {
        if (info.next) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container">
            <h1 className="page-title">Multivers Explorer</h1>

            <div className="grid">
                {characters.map((character) => (
                    <Card key={character.id} character={character} />
                ))}
            </div>

            <Pagination
                hasPrev={info.prev !== null}
                hasNext={info.next !== null}
                onPrev={handlePrev}
                onNext={handleNext}
                disabled={loading}
            />
        </div>
    );
}

export default Home;