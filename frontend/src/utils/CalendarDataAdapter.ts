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
      heureDebut: string;
      heureFin: string;
      salleId: K;
    },
    K
  >(items: T[]): CalendarEvent<K>[] {
    return items.map((item) => {
      console.log("test date", new Date(2024, 9, 16, 10, 0));
      console.log("date from api", new Date(item.heureDebut));
      const startDate = new Date(item.heureDebut);
      const endDate = new Date(item.heureFin);

      return {
        title: item.nomOrganisation,
        start: startDate,
        end: endDate,
        resourceId: item.salleId,
      };
    });
  }
}

export default CalendarDataAdapter;
