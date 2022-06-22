export interface ErrorsData {
  message: string;
  statusCode: string;
}

export enum LoadingStatus {
  LOADED = 'LOADED',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  NEVER = 'NEVER',
  SUCCESS = 'SUCCESS',
}

export enum WeekdaysTypes {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
  ALL_DAYS = 'allDays',
}

interface Post {
  id: number
  name: string
}

export type PostsResponse = Post[];
