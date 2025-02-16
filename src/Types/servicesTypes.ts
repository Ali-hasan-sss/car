// servicesTypes.ts
export interface Service {
  id: number;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
  image: string;
  description?: { en: string; ar: string };
}

export interface ServicesState {
  servicesList: Service[];
  selectedService: Service | null;
}

export type ServiceAction =
  | { type: "FETCH_SERVICES_SUCCESS"; payload: Service[] }
  | { type: "SELECT_SERVICE"; payload: Service };
