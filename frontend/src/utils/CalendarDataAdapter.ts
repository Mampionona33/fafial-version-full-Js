export interface CalendarEvent<K> {
  title: string;
  start: Date;
  end: Date;
  resourceId: K;
}
class CalendarDataAdapter {
  constructor() {}

  public static adaptRessources<
    T extends { id: K; name: string },
    K extends string | number
  >(items: T[]): { id: K; title: string }[] {
    return items.map((item) => ({
      id: item.id,
      title: item.name,
    }));
  }

  // Utilisation d'un type explicite pour les événements du calendrier
  public static adaptEvents<
    T extends {
      nomOrganisation: string;
      dateDebut: Date; // Utilisation de Date directement
      heureDebut: string;
      dateFin: Date; // Utilisation de Date directement
      heureFin: string;
      salleId: K;
    },
    K
  >(items: T[]): CalendarEvent<K>[] {
    return items.map((item) => {
      const startDate = CalendarDataAdapter.combineDateAndTime(
        item.dateDebut,
        item.heureDebut
      );
      const endDate = CalendarDataAdapter.combineDateAndTime(
        item.dateFin,
        item.heureFin
      );

      return {
        title: item.nomOrganisation, // Utilise nomOrganisation comme titre
        start: startDate, // Date de début combinée
        end: endDate, // Date de fin combinée
        resourceId: item.salleId, // Id de la salle ou ressource associée
      };
    });
  }

  // Combiner la date et l'heure en un objet Date
  private static combineDateAndTime(date: Date, time: string): Date {
    console.log(date, time);
    const timeParts = time.split(":"); // Supposer que l'heure est au format "HH:MM"
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      parseInt(timeParts[0], 10), // Heures
      parseInt(timeParts[1], 10), // Minutes
      0 // Seconds à 0
    );
  }
}

export default CalendarDataAdapter;
