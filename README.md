# Prography-10th-frontend

## 요구사항

- [x] 1. 리쿠르팅 **진행단계**를 표시합니다.
- [x] 2. 제출하기 버튼을 누르기 전까지 리크루팅 **폼 데이터가 유지**되어야 합니다.
- [x] 3. 필수 입력 항목이 있으며, 필수 항목을 입력하기 전까지는 다음 단계로 넘어갈 수 없어야 합니다.
- [x] 4. 다음 단계로 넘어갈 경우, 필수 입력 항목이 누락되었을 때 **경고 표시 및 알림**이 제공되어야 합니다.
- [x] 5. 특정항목에 대한 **예시 데이터**를 표시해야 합니다.
- [x] 6. API통신을 위한 리쿠르팅 **폼 데이터** 구성해야 합니다.
- [x] 7. 이 외에도 UI/UX적으로 필요한 기능이 있다면 **자유롭게 추가**해 주세요.

## 추가구현

- [x] Context API 를 활용하여 form data 를 global state 로 관리

[ApplyProvider.tsx](./src/providers/ApplyProvider.tsx)

```typescript
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
```

- [x] useReducer를 활용하여 global state 에 대한 유형별 액션 정의

[ApplyProvider.tsx](./src/providers/ApplyProvider.tsx)

```typescript
export function applyReducer(
  state: ApplyState,
  action: ApplyAction,
): ApplyState {
  switch (action.type) {
    case ApplyActionType.UPDATE_PROGRESS:
      return { ...state, progress: action.payload };
    case ApplyActionType.UPDATE_CONSENT:
      return { ...state, form: { ...state.form, consent: action.payload } };
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
//..
const [state, dispatch] = useReducer(applyReducer, initialApplyState);
```

- [x] useActionState 를 활용한 form submit 처리

[Apply.tsx](./src/pages/Apply.tsx)

```typescript
const handleSubmit = async (_: any, data: FormData) => {
  switch (progress) {
    case Progress.One: {
      const consent = data.get("consent") as "true" | "false" | undefined;
      const payload = consent && consent === "true";
      dispatch({
        type: ApplyActionType.UPDATE_CONSENT,
        payload,
      });

      const { success, error } = consentSchema.safeParse({ consent });
      if (!success) {
        return error.flatten();
      }

      animatedNavigate("next", progress, dispatch);
      return;
    }
    case Progress.Two: {
      const formData = {
        name: data.get("name")?.toString() ?? "",
        email: data.get("email")?.toString() ?? "",
        phone: data.get("phone")?.toString() ?? "",
      };

      dispatch({
        type: ApplyActionType.UPDATE_PERSONAL,
        payload: formData,
      });

      const { success, error } = personalSchema.safeParse(formData);
      if (!success) {
        return error.flatten();
      }

      animatedNavigate("next", progress, dispatch);
      break;
    }
    case Progress.Three:
      const roleResult = roleSchema.safeParse({
        role: data.get("role"),
      });

      if (!roleResult.success) {
        return roleResult.error.flatten();
      }

      const action = {
        type: ApplyActionType.UPDATE_ROLE,
        payload: roleResult.data.role,
      } as const;
      dispatch(action);

      const { form: updatedForm } = applyReducer({ progress, form }, action);
      try {
        const response = await fetch("https://dummyjson.com/products/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedForm),
        });

        alert(
          `리쿠팅 폼 데이터 API
요청: ${JSON.stringify(updatedForm)}
상태:  ${response.status},
응답: ${JSON.stringify(await response.json())}`,
        );
      } catch (error) {
        alert("서버에 연결할 수 없습니다. 네트워크를 확인해주세요");
        break;
      }
      navigate("/complete");
      break;
  }
};
const [state, action] = useActionState(handleSubmit, null);
```

- [x] zod 라이브러리를 사용하여 폼 데이터 유효성 검사 및 에러 메시지 표시

[formSchema.ts](./src/schemas/formSchema.ts)

```typescript
export const consentSchema = z.object({
  consent: z.literal("true", {
    errorMap: () => ({ message: "개인정보 수집에 동의해주세요." }),
  }),
});

export const personalSchema = z.object({
  name: z.string().min(2, "이름은 두 글자 이상이여야 합니다."),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  phone: z
    .string()
    .regex(
      /^((010-?\d{4})|(0\d{1,2}-?\d{3,4}))-?\d{4}$/,
      "올바른 휴대폰 번호 형식이 아닙니다.",
    ),
});

export const roleSchema = z.object({
  role: z.nativeEnum(Role, {
    errorMap: () => ({ message: "역할을 선택해주세요." }),
  }),
});
```

- [x] View Transition API 를 활용하여 진행단계 변화 시 fade in/out 효과 구현

![progress.gif](./assets/progress.gif)

[animatedNavigate.ts](./src/utils/animatedNavigate.ts)

```typescript
document.startViewTransition(() =>
  flushSync(() =>
    dispatch({
      type: ApplyActionType.UPDATE_PROGRESS,
      payload,
    }),
  ),
);
```

- [x] View Transition 을 커스텀하여 carousel 형태의 리크루팅 폼 구현

![apply.gif](./assets/apply.gif)

[animatedNavigate.ts](./src/utils/animatedNavigate.ts)

```typescript
export default function animatedNavigate(
  direction: "next" | "back",
  progress: number,
  dispatch: Dispatch<ApplyAction>,
) {
  const payload = direction === "next" ? progress + 1 : progress - 1;

  const style = document.createElement("style");
  style.id = "view-transition-style";
  style.innerHTML = `::view-transition-old(view-apply-form) {
  animation: ${direction}SlideOut 1s;
}
::view-transition-new(view-apply-form) {
animation: ${direction}SlideIn 1s;
}`;

  document.head.appendChild(style);

  // document.startViewTransition(() =>
  //..
}
```

- [x] tailwind animation 을 각 button 및 아이콘에 적용

[Home.tsx](./src/pages/Home.tsx)

```typescript
<Link
    to="/apply"
    className="animate-pulse rounded-md bg-blue-500 px-6 py-2 text-white hover:animate-none"
>
    지원하기
</Link>
```
