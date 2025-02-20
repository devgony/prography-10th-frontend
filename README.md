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
- [x] useReducer를 활용하여 global state 에 대한 유형별 액션 정의
- [x] useActionState 를 활용한 form submit 처리
- [x] zod 라이브러리를 사용하여 폼 데이터 유효성 검사 및 에러 메시지 표시
- [x] View Transition API 를 활용하여 진행단계 변화 시 fade in/out 효과 구현
- [x] View Transition 을 커스텀하여 carousel 형태의 리크루팅 폼 구현
- [x] tailwind animation 을 각 button 및 아이콘에 적용
