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

type ApplyAction =
  | { type: "UPDATE_PROGRESS"; payload: Progress }
  | { type: "UPDATE_AGREED"; payload: boolean }
  | {
      type: "UPDATE_PERSONAL";
      payload: { name: string; email: string; phone: string };
    }
  | { type: "UPDATE_ROLE"; payload: Role }
  | { type: "RESET" };

function applyReducer(state: ApplyState, action: ApplyAction): ApplyState {
  switch (action.type) {
    case "UPDATE_PROGRESS":
      return { ...state, progress: action.payload };
    case "UPDATE_AGREED":
      return { ...state, form: { ...state.form, agreed: action.payload } };
    case "UPDATE_PERSONAL":
      return {
        ...state,
        form: {
          ...state.form,
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
        },
      };
    case "UPDATE_ROLE":
      return { ...state, form: { ...state.form, role: action.payload } };
  }
  throw new Error("Unhandled action type");
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
