import { ScheduleSection } from '../redux/types/room';

type RootStackParamsList = {
  SplashScreen: undefined;
  WelcomScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  AddConnectionScreen: undefined;
  EmailRecoveryScreen: undefined;
  PreviewConnectionScreen: undefined;
  AppInfoScreen: undefined;
  ConfigurationScreen: undefined;
  FactorySettingsResetScreen: undefined;
  NotificationsScreen: undefined;
  SettingsScreen: undefined;
  SettingsListScreen: undefined;
  SystemStatusScreen: undefined;
  TermsOfUseScreen: undefined;
  HomeScreen: undefined;
  RoomCreationScreen: undefined;
  RoomsListScreen: undefined;
  RoomsSettingsScreen: { roomId: number, weekdayIndex?: number };
  WeekScheduleScreen: { roomId: number, copiedWeekday?: ScheduleSection };
  PersonalDataScreen: undefined;
}

export default RootStackParamsList
