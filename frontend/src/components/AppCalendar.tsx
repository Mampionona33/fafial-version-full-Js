import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr"; // Importer la localisation française
import "react-big-calendar/lib/css/react-big-calendar.css"; // Importer les styles du calendrier
import { useReservations } from "../hooks/useReservations";
import { useSalles } from "../hooks/useSalles";
import { useEffect, useState } from "react";
import CalendarDataAdapter from "../utils/CalendarDataAdapter";
import { CalendarEvent } from "../interfaces/CalendarEventInterface";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

moment.locale("fr");

const AppCalendar = () => {
  const { reservations } = useReservations();
  const { salles } = useSalles();
  const [resources, setRessources] = useState<
    { id: string | number; title: string }[]
  >([]);
  const [eventList, setEventList] = useState<CalendarEvent<unknown>[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (salles) {
      const adaptedRessources = CalendarDataAdapter.adaptRessources(salles);
      setRessources(adaptedRessources);
    }

    if (reservations) {
      const adaptedEvents = CalendarDataAdapter.adaptEvents(reservations);
      setEventList(adaptedEvents);
    }
  }, [salles, reservations]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        selectable
        endAccessor="end"
        style={{
          height: "59vh",
          width: "100%",
          maxWidth: "100%",
          fontSize: "12px",
        }}
        onSelectEvent={(event) => navigate(`reservations/${event.id}`)}
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
