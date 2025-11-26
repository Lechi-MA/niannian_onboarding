export enum UserGoal {
  WORK_STUDY = 'WORK_STUDY',
  INSPIRATION = 'INSPIRATION',
  MEMO = 'MEMO'
}

export interface UserData {
  nickname: string;
  goal: UserGoal | null;
}

export enum OnboardingStep {
  WELCOME = 1,
  INTRO = 2,
  DROP_ZONE = 3,
  FEATURES = 4,
  FINISH = 5
}