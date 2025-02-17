import { createContext, useReducer } from "react";
import { Role } from "../components/apply/Three";

export enum Progress {
  One = 1,
  Two = 2,
  Three = 3,
}

interface IForm {
  agreed: boolean;
  name: string;
  email: string;
  phone: string;
  role: Role;
}

interface ApplyState {
  progress: Progress;
  form: IForm;
}

export enum ApplyActionType {
  UPDATE_PROGRESS = "UPDATE_PROGRESS",
  UPDATE_AGREED = "UPDATE_AGREED",
  UPDATE_PERSONAL = "UPDATE_PERSONAL",
  UPDATE_ROLE = "UPDATE_ROLE",
}

type ApplyAction =
  | { type: ApplyActionType.UPDATE_PROGRESS; payload: Progress }
  | { type: ApplyActionType.UPDATE_AGREED; payload: boolean }
  | {
      type: ApplyActionType.UPDATE_PERSONAL;
      payload: { name: string; email: string; phone: string };
    }
  | { type: ApplyActionType.UPDATE_ROLE; payload: Role };

export function applyReducer(
  state: ApplyState,
  action: ApplyAction,
): ApplyState {
  switch (action.type) {
    case ApplyActionType.UPDATE_PROGRESS:
      return { ...state, progress: action.payload };
    case ApplyActionType.UPDATE_AGREED:
      return { ...state, form: { ...state.form, agreed: action.payload } };
    case ApplyActionType.UPDATE_PERSONAL:
      return {
        ...state,
        form: {
          ...state.form,
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
        },
      };
    case ApplyActionType.UPDATE_ROLE:
      return { ...state, form: { ...state.form, role: action.payload } };
  }
}

const initialApplyState: ApplyState = {
  progress: Progress.One,
  form: {
    agreed: false,
    name: "",
    email: "",
    phone: "",
    role: Role.Frontend,
  },
};

export const ApplyContext = createContext<{
  state: ApplyState;
  dispatch: React.Dispatch<ApplyAction>;
}>({
  state: initialApplyState,
  dispatch: () => null,
});

export default function ApplyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(applyReducer, initialApplyState);

  return (
    <ApplyContext.Provider value={{ state, dispatch }}>
      {children}
    </ApplyContext.Provider>
  );
}
