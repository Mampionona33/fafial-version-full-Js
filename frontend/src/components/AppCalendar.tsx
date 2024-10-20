import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr"; // Importer la localisation française
import "react-big-calendar/lib/css/react-big-calendar.css"; // Importer les styles du calendrier
import { useReservations } from "../hooks/useReservations";
import { useSalles } from "../hooks/useSalles";
import { useEffect, useState } from "react";
import CalendarDataAdapter, {
  CalendarEvent,
} from "../utils/CalendarDataAdapter";

const localizer = momentLocalizer(moment);

// Configurer la localisation de moment en français
moment.locale("fr");

// interface ResourceProps {
//   id: number;
//   title: string;
// }

const AppCalendar = () => {
  const { reservations } = useReservations();
  const { salles } = useSalles();
  const [resources, setRessources] = useState<
    { id: string | number; title: string }[]
  >([]);
  const [eventList, setEventList] = useState<CalendarEvent<unknown>[]>([]);

  // Liste des ressources (par exemple, des salles de réunion)
  // const resources: ResourceProps[] = [
  //   { id: 1, title: "Salle A" },
  //   { id: 2, title: "Salle B" },
  //   { id: 3, title: "Salle C" },
  // ];

  useEffect(() => {
    if (salles) {
      // S'assurer que `salles` est correctement adapté
      const adaptedRessources = CalendarDataAdapter.adaptRessources(salles);
      setRessources(adaptedRessources);
    }

    if (reservations) {
      // S'assurer que `reservations` est correctement adapté
      const adaptedEvents = CalendarDataAdapter.adaptEvents(reservations);
      setEventList(adaptedEvents);
    }
  }, [salles, reservations]);

  // Liste des événements associés aux ressources
  // const eventList = [
  //   {
  //     title: "Réunion importante",
  //     start: new Date(2024, 9, 1, 16, 9, 0),
  //     end: new Date(2024, 9, 16, 10, 0),
  //     resourceId: 1, // Associé à la Salle A
  //   },
  //   {
  //     title: "Appel client",
  //     start: new Date(2024, 9, 16, 11, 0),
  //     end: new Date(2024, 9, 16, 12, 0),
  //     resourceId: 2, // Associé à la Salle B
  //   },
  //   {
  //     title: "Présentation du projet",
  //     start: new Date(2024, 9, 16, 14, 0),
  //     end: new Date(2024, 9, 16, 15, 0),
  //     resourceId: 3, // Associé à la Salle C
  //   },
  // ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: "59vh",
          width: "100%",
          maxWidth: "100%",
          fontSize: "12px",
        }}
        messages={{
          next: "Suivant",
          previous: "Précédent",
          today: "Aujourd'hui",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          agenda: "Agenda",
          date: "Date",
          time: "Heure",
          event: "Événement",
          noEventsInRange: "Aucun événement dans cette période",
        }}
        resources={resources} // Passer la liste des ressources au calendrier
        resourceIdAccessor="id" // Identifier la ressource par "id"
        resourceTitleAccessor="title" // Le titre de la ressource est défini par "title"
        defaultView="month" // Afficher une vue par defaut sur le mois
      />
    </div>
  );
};

export default AppCalendar;
