export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export interface Tickets {
  ticketId: string;
  createdBy: string;
  description: string;
  modifiedBy: string;
  modifiedTime: string;
  status: string;
  title: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  userLevelId: string;
}

export interface UserLoginResp {
  userId: string;
  userLevel: string;
}

export interface UserLevel {
  userLevelId: string;
  userLevelType: string;
}

export interface CreateTicketData {
  title: string | undefined;
  description: string | undefined;
}
