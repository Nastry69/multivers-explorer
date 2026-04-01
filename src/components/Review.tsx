import { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

//Création du schéma
const reviewSchema = z.object({
    evaluatorName: z.string("Veuillez saisir un nom d’évaluateur valide.").min(3, "Le nom de l’évaluateur doit contenir au moins 3 caractères."),
    email: z.string("Veuillez saisir un email valide.").email("Veuillez saisir un email valide."),
    rating: z.number("Veuillez saisir une note valide.").min(1, "La note doit être comprise entre 1 et 5.").max(5, "La note doit être comprise entre 1 et 5."),
    comment: z.string("Le commentaire est optionnel").max(200, "Le commentaire ne doit pas dépasser 200 caractères.").optional().or(z.literal("")),
});

// Type pour les valeurs attendues pour le formulaire
type ReviewValues = {
    evaluatorName: string;
    email: string;
    rating: number | "";
    comment: string;
};

// Composant du formulaire
function ReviewForm() {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [submittedValues, setSubmittedValues] = useState<ReviewValues | null>(null);

    const initialValues: ReviewValues = {
        evaluatorName: "",
        email: "",
        rating: "",
        comment: "",
    };

    return (
        <div className="review-section">
            <h2 className="section-title">Laisser une note sur ce personnage</h2>

            {/* Initialisation de Formik avec les valeurs initiales*/}
            <Formik
                initialValues={initialValues}
                validationSchema={toFormikValidationSchema(reviewSchema)}
                onSubmit={(values, { resetForm }) => {
                    const finalValues = { 
                        ...values, 
                        rating: Number(values.rating), // Convertit la note en nombre
                    };

                    setSubmittedValues(finalValues); // Stocke les valeurs soumises pour affichage dans la modal
                    dialogRef.current?.showModal(); // Affiche la modal
                    resetForm();
                }}
            >
                {({ setFieldValue, values }) => ( 
                    <Form className="review-form">
                        <div className="form-group">
                            <label htmlFor="evaluatorName">Nom de l’évaluateur</label>
                            <Field id="evaluatorName" name="evaluatorName" type="text" />
                            <ErrorMessage
                                name="evaluatorName"
                                component="div"
                                className="error"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field id="email" name="email" type="email" />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="error"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="rating">Note</label>
                            <Field
                                id="rating"
                                name="rating"
                                type="number"
                                min="1"
                                max="5"
                                value={values.rating}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value;
                                    setFieldValue("rating", value === "" ? "" : Number(value));
                                }}
                            />
                            <ErrorMessage
                                name="rating"
                                component="div"
                                className="error"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="comment">Commentaire</label>
                            <Field
                                id="comment"
                                name="comment"
                                as="textarea"
                                maxLength={200}
                            />
                            <ErrorMessage
                                name="comment"
                                component="div"
                                className="error"
                            />
                        </div>

                        <button type="submit" className="submit-btn">Valider</button>

                        <dialog ref={dialogRef}>
                            <div className="dialog-content">
                                <h3 className="dialog-title">Évaluation envoyée</h3>

                                {submittedValues && (
                                    <div>
                                        <p><strong>Nom :</strong> {submittedValues.evaluatorName}</p>
                                        <p><strong>Email :</strong> {submittedValues.email}</p>
                                        <p><strong>Note :</strong> {submittedValues.rating}</p>
                                        <p><strong>Commentaire :</strong> {submittedValues.comment || "Aucun commentaire"}</p>
                                    </div>
                                )}

                                <button type="button" onClick={() => dialogRef.current?.close()}>
                                    Fermer
                                </button>
                            </div>
                        </dialog>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ReviewForm;