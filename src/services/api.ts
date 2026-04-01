export type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
    origin: {
        name: string;
    };
};

export type CharacterResponse = {
    info: {
        next: string | null;
        prev: string | null;
    };
    results: Character[];
};


export async function CharacterList(page: number): Promise<CharacterResponse> {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);

if (!response.ok) {
    if (response.status === 429) {
        throw new Error("Trop de requêtes, veuillez attendre avant de réessayer !");
    }
    throw new Error("Une erreur s'est produite lors du chargement des personnages.");
}

return response.json();// retourne la liste des personnages

}

export async function CharacterById(id: number): Promise<Character> {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

    if (!response.ok) {
        throw new Error("Impossible de charger ce personnage.");
    }
    return response.json(); // Retourne les détails d'un personnage spécifique
}