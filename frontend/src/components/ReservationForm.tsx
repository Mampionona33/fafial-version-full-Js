import AppLabel from "./AppLabel";
import AppInput from "./AppInput";
import AppTextarea from "./AppTextarea";
import AppSelect from "./AppSelect";
import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ReservationService from "../services/ReservationService";
import {
  PayementStatut,
  StatutReservation,
  UtilisateurType,
  ReservationInterface,
  ValidationStatut,
  ReservationFormulaireInterface,
} from "../interfaces/ReservationInterface";
import { nanoid } from "nanoid";
import { useAuth } from "../hooks/useAuth";
import { useSalles } from "../hooks/useSalles";
import SelectOptionAdapter from "../utils/SelectOptionAdapter";
import { toast, ToastContainer } from "react-toastify";
import { usePaymentMethodes } from "../hooks/usePaymentMethodes";
import reservationReducer, {
  initialState,
} from "../reducers/reservationReducer";
import { resetReservation, setReservation } from "../actions/reservationAction";
import acomptesReducer from "../reducers/acomptReducer";
import {
  addAcompte,
  deleteAcompte,
  resetAcompte,
} from "../actions/AcomptesAction";
import IndeterminateProgressBar from "./IndeterminateProgressBar";
import { useParams } from "react-router-dom";

const ReservationForm = ({
  reservationData,
}: {
  reservationData?: ReservationFormulaireInterface;
}) => {
  const generateRef = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}${month}${day}`;
    const randomString = nanoid(7);
    return `RES-${formattedDate}-${randomString}`;
  };

  const { user } = useAuth();
  const { salles } = useSalles();
  const { paymentMethodes } = usePaymentMethodes();
  const { idReservation } = useParams();

  const [salleOptions, setSalleOptions] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [methodePaiement, setMethodePaiement] = React.useState<
    { label: string; value: string }[]
  >([]);

  const [state, dispatch] = useReducer(reservationReducer, initialState);
  const [acomptes, AcomptesDispatch] = useReducer(acomptesReducer, []);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!state.reservation.reference) {
      dispatch(
        setReservation({ ...state.reservation, reference: generateRef() })
      );
    }

    if (salles && salleOptions.length === 0) {
      setSalleOptions(SelectOptionAdapter.adapt(salles));
    }

    if (paymentMethodes && methodePaiement.length === 0) {
      setMethodePaiement(SelectOptionAdapter.adapt(paymentMethodes));
    }

    if (
      reservationData &&
      idReservation &&
      state.reservation.reference !== reservationData.reference
    ) {
      dispatch(setReservation({ ...reservationData }));
    }
  }, [
    salles,
    paymentMethodes,
    reservationData,
    state.reservation,
    idReservation,
    salleOptions.length,
    methodePaiement.length,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formattedDateDebut = new Date(state.reservation.dateDebut as string);
    const formattedDateFin = new Date(state.reservation.dateFin as string);
    const updatedAcomptes = acomptes.map((acompte) => ({
      ...acompte,
      montant: acompte.montant,
      datePrevue: acompte.datePrevue,
      modePaiement: acompte.modePaiement,
      id: undefined,
      statut: PayementStatut.EN_ATTENTE,
    }));

    if (!user || !user.id) {
      throw new Error("Utilisateur non connecté");
    }

    const reservationData: ReservationInterface = {
      createdById: user?.id,
      reference: state.reservation.reference,
      nomOrganisation: state.reservation.nomOrganisation,
      nomPrenomContact: state.reservation.nomPrenomContact,
      email: state.reservation.email,
      telephone: state.reservation.telephone,
      nombrePersonnes: state.reservation.nombrePersonnes,
      dateDebut: formattedDateDebut,
      heureDebut: state.reservation.heureDebut,
      dateFin: formattedDateFin,
      heureFin: state.reservation.heureFin,
      salleId: state.reservation.salleId,
      acomptes: updatedAcomptes,
      activite: state.reservation.activite,
      remarques: state.reservation.remarques,
      statut: StatutReservation.OUVERT,
      utilisateurType: UtilisateurType.STAFF,
      validationStatus: ValidationStatut.VALIDE,
    };

    try {
      const res = await ReservationService.create(reservationData);
      if (res.status === 201) {
        toast.success(res.data.message, { position: "bottom-right" });
      } else if (res.status === 400) {
        toast.error(res.data.message, { position: "bottom-right" });
      }
      dispatch(resetReservation());
      AcomptesDispatch(resetAcompte());
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Erreur lors de la création de la réservation", {
        position: "bottom-right",
        toastId: "error-reservation",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center h-full w-full py-8 px-4">
        <div className="bg-white p-8 shadow-md w-full max-w-3xl">
          <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">
            Réservation de Salle
          </h1>
          <hr className="mb-6" />
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Référence */}
            <div>
              <AppLabel htmlFor="reference">Référence</AppLabel>
              <AppInput
                id="reference"
                type="text"
                value={state.reservation.reference}
                disabled
                placeholder="Référence"
              />
            </div>

            {/* Nom Organisation */}
            <div>
              <AppLabel htmlFor="nomOrganisation">
                Nom de l'organisation
              </AppLabel>
              <AppInput
                id="nomOrganisation"
                type="text"
                placeholder="Nom de l'organisation"
                value={state.reservation.nomOrganisation}
                onChange={(e) =>
                  dispatch(
                    setReservation({
                      ...state.reservation,
                      nomOrganisation: e.target.value,
                    })
                  )
                }
              />
            </div>

            {/* Nom Prenom Contact */}
            <div>
              <AppLabel htmlFor="nomPrenomContact">
                Nom et prénom du contact
              </AppLabel>
              <AppInput
                id="nomPrenomContact"
                type="text"
                placeholder="Nom et prénom"
                value={state.reservation.nomPrenomContact}
                onChange={(e) =>
                  dispatch(
                    setReservation({
                      ...state.reservation,
                      nomPrenomContact: e.target.value,
                    })
                  )
                }
              />
            </div>

            {/* Email */}
            <div>
              <AppLabel htmlFor="email">Email</AppLabel>
              <AppInput
                id="email"
                type="email"
                placeholder="exemple@domaine.com"
                value={state.reservation.email}
                onChange={(e) =>
                  dispatch(
                    setReservation({
                      ...state.reservation,
                      email: e.target.value,
                    })
                  )
                }
              />
            </div>

            {/* Téléphone */}
            <div>
              <AppLabel htmlFor="telephone">Téléphone</AppLabel>
              <AppInput
                id="telephone"
                type="text"
                placeholder="Numéro de téléphone"
                value={state.reservation.telephone}
                onChange={(e) =>
                  dispatch(
                    setReservation({
                      ...state.reservation,
                      telephone: e.target.value,
                    })
                  )
                }
              />
            </div>

            {/* Nombre de personnes */}
            <div>
              <AppLabel htmlFor="nombrePersonnes">Nombre de personnes</AppLabel>
              <AppInput
                id="nombrePersonnes"
                type="number"
                min={1}
                required
                placeholder="Nombre de personnes"
                value={state.reservation.nombrePersonnes}
                onChange={(e) => {
                  dispatch(
                    setReservation({
                      ...state.reservation,
                      nombrePersonnes: parseInt(e.target.value),
                    })
                  );
                }}
              />
            </div>

            {/* Date et Heure de début */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <AppLabel htmlFor="dateDebut">Date de début</AppLabel>
                <AppInput
                  id="dateDebut"
                  type="date"
                  required
                  value={state.reservation.dateDebut as string}
                  onChange={(e) =>
                    dispatch(
                      setReservation({
                        ...state.reservation,
                        dateDebut: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div>
                <AppLabel htmlFor="heureDebut">Heure de début</AppLabel>
                <AppInput
                  id="heureDebut"
                  type="time"
                  required
                  value={state.reservation.heureDebut as string}
                  onChange={(e) =>
                    dispatch(
                      setReservation({
                        ...state.reservation,
                        heureDebut: e.target.value,
                      })
                    )
                  }
                />
              </div>
            </div>

            {/* Date et Heure de fin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <AppLabel htmlFor="dateFin">Date de fin</AppLabel>
                <AppInput
                  id="dateFin"
                  type="date"
                  required
                  value={state.reservation.dateFin as string}
                  onChange={(e) =>
                    dispatch(
                      setReservation({
                        ...state.reservation,
                        dateFin: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div>
                <AppLabel htmlFor="heureFin">Heure de fin</AppLabel>
                <AppInput
                  id="heureFin"
                  type="time"
                  required
                  value={state.reservation.heureFin as string}
                  onChange={(e) =>
                    dispatch(
                      setReservation({
                        ...state.reservation,
                        heureFin: e.target.value,
                      })
                    )
                  }
                />
              </div>
            </div>

            {/* Salle */}
            <div>
              <AppLabel htmlFor="salleId">Salle</AppLabel>
              <AppSelect
                id="salleId"
                options={salleOptions}
                value={state.reservation.salleId}
                onChange={(e) =>
                  dispatch(
                    setReservation({
                      ...state.reservation,
                      salleId: e,
                    })
                  )
                }
              />
            </div>

            {/* Activité */}
            <div className="col-span-1 md:col-span-2">
              <AppLabel htmlFor="activite">Activité</AppLabel>
              <AppTextarea
                id="activite"
                placeholder="Description de l'activité"
                value={state.reservation.activite}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  dispatch(
                    setReservation({
                      ...state.reservation,
                      activite: e.target.value,
                    })
                  )
                }
              />
            </div>

            {/* Remarques */}
            <div className="md:col-span-2">
              <AppLabel htmlFor="remarques">Remarques</AppLabel>
              <AppTextarea
                id="remarques"
                placeholder="Vos remarques"
                value={state.reservation.remarques}
                onChange={(e) =>
                  dispatch(
                    setReservation({
                      ...state.reservation,
                      remarques: e.target.value,
                    })
                  )
                }
              />
            </div>

            {/* Acomptes */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-600">Acomptes</h2>

              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <AppLabel htmlFor="val_account">Montant acompte</AppLabel>
                  <AppInput
                    id="val_account"
                    type="number"
                    value={state.reservation.acomptes.montant}
                    onChange={(e) =>
                      dispatch(
                        setReservation({
                          ...state.reservation,
                          acomptes: {
                            ...state.reservation.acomptes,
                            montant: parseInt(e.target.value),
                          },
                        })
                      )
                    }
                    placeholder="Montant en €"
                  />
                </div>
                <div>
                  <AppLabel htmlFor="date_paiement">
                    Date prévue de paiement
                  </AppLabel>
                  <AppInput
                    type="date"
                    id="date_paiement"
                    value={state.reservation.acomptes.datePrevue}
                    onChange={(e) =>
                      dispatch(
                        setReservation({
                          ...state.reservation,
                          acomptes: {
                            ...state.reservation.acomptes,
                            datePrevue: e.target.value as string,
                          },
                        })
                      )
                    }
                  />
                </div>
                <div>
                  <AppLabel htmlFor="mode_paiement">Mode de paiement</AppLabel>
                  <AppSelect
                    id="mode_paiement"
                    options={methodePaiement}
                    onChange={(value) =>
                      dispatch(
                        setReservation({
                          ...state.reservation,
                          acomptes: {
                            ...state.reservation.acomptes,
                            modePaiement: value as string,
                          },
                        })
                      )
                    }
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <h3 className="text-xl font-semibold text-gray-600 py-2 underline">
                  Liste des acomptes :
                </h3>
                <ul>
                  {acomptes.map((acompte) => (
                    <li
                      key={acompte.id}
                      className="flex justify-between items-center space-y-2"
                    >
                      <span>{acompte.datePrevue}</span>
                      <span>{acompte.montant} Ar</span>
                      <span>{acompte.modePaiement}</span>
                      <button
                        onClick={() => {
                          AcomptesDispatch(deleteAcompte(acompte.id as string));
                        }}
                        className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white"
                      >
                        Supprimer
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-center items-center">
              <input
                type="button"
                onClick={(e: React.FormEvent) => {
                  e.preventDefault();
                  AcomptesDispatch(
                    addAcompte({
                      id: uuidv4(),
                      montant: state.reservation.acomptes.montant,
                      datePrevue: state.reservation.acomptes.datePrevue,
                      modePaiement: paymentMethodes.filter(
                        (method) =>
                          method.id === state.reservation.acomptes.modePaiement
                      )[0].name,
                      statut: PayementStatut.EN_ATTENTE,
                    })
                  );
                  dispatch(
                    setReservation({
                      ...state.reservation,
                      acomptes: {
                        ...state.reservation.acomptes,
                        montant: 0,
                        datePrevue: "",
                        modePaiement: "",
                      },
                    })
                  );
                }}
                value="Ajouter acompte"
                className="bg-gray-600 hover:bg-gray-500 text-white py-1 px-8 rounded cursor-pointer"
              />
            </div>
            {loading && (
              <div className="w-full col-span-1 md:col-span-2">
                <IndeterminateProgressBar />
              </div>
            )}

            {/* Submit */}
            <div className="text-center flex justify-center items-center w-full col-span-1 md:col-span-2">
              <input
                type="submit"
                value="Enregistrer"
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-1 mt-6 cursor-pointer rounded-md"
              />
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default ReservationForm;
