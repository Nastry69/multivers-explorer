// Typage pour les props du composant Pagination
type PaginationProps = {
    hasPrev: boolean;
    hasNext: boolean;
    onPrev: () => void;
    onNext: () => void;
    disabled: boolean;
};

// Composant pour la pagination
function Pagination
({
    hasPrev,
    hasNext,
    onPrev,
    onNext,
    disabled = false,
}: PaginationProps) {

    return (
        <div className="btn-pagination">
            <button onClick={onPrev} disabled={!hasPrev || disabled}>
                Précédent
            </button>
            <button onClick={onNext} disabled={!hasNext || disabled}>
                Suivant
            </button>
        </div>
    );
}

export default Pagination;