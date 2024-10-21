export interface CalendarEvent<K> {
  id?: K;
  title: string;
  start: Date;
  end: Date;
  resourceId: K;
}
