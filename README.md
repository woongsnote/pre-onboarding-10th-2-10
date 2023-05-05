# 원티드 프리온보딩 인턴십 2주차 과제
추천 검색어를 제공하는 검색창을 구현하는 과제입니다.

## 프로젝트 시작 방법
### Repository Clone
```bash
git clone https://github.com/pre-onboarding-team10/pre-onboarding-10th-2-10.git
```

### npm으로 설치 진행
```bash
npm i
```

## Usage
### Local Dev Server 실행
```bash
npm start
```

### Build
```bash
npm build
```


## 과제 목적

- 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현
- Best Practice 선정하여 제출하기

<br/>

## 과제 진행 방법

1주차 과제와 마찬가지로 기능별 개발단위를 나누어 각자 구현한 다음, Pull Request를 통해 코드리뷰, Best Practice를 선정하였습니다.

- 기능별 개발단위
1. 검색창 화면 구성하기
2. API 호출시 로컬 캐싱 구현하기
3. UI 작업

<br/>

## 상세 구현 내용

### 1. 키보드만으로 추천 검색어들로 이동 가능하도록 구현
```javascript
const SuggestionList = ({ suggestions, focusedIndex, setFocusedIndex }) => {
  const suggestionListRef = useRef(null);
  const MAX_SUGGESTIONS = 7;
  const startIndex = Math.max(0, focusedIndex - MAX_SUGGESTIONS + 1);

  const renderedSuggestions = suggestions.slice(
    startIndex,
    startIndex + MAX_SUGGESTIONS
  );

  useEffect(() => {
    setFocusedIndex(-2);
  }, [suggestions, setFocusedIndex, MAX_SUGGESTIONS]);

  return (
      <ul className="suggestion-list" ref={suggestionListRef}>
        {suggestions.length <= MAX_SUGGESTIONS
          ? suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                index={index}
                focusedIndex={focusedIndex}
                setFocusedIndex={setFocusedIndex}
                suggestionName={suggestion.name}
              />
            ))
          : renderedSuggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                index={startIndex + index}
                focusedIndex={focusedIndex}
                setFocusedIndex={setFocusedIndex}
                suggestionName={suggestion.name}
              />
            ))}
      </ul>
  );
};
```
- SuggestionList: 제안 목록을 렌더링하고 키보드를 사용하여 선택한 제안의 포커스를 처리하는 역할을 담당

- suggestions: 각각 이름 속성을 포함하는 제안 객체의 배열
- focusedIndex: 현재 초점이 맞춰진 제안의 인덱스
- setFocusedIndex: 현재 초점이 맞춰진 제안을 업데이트하는 함수
- MAX_SUGGESTIONS: 한 번에 표시할 수 있는 최대 제안 수를 나타내는 상수
- SuggestionList의 useEffect는 suggestions, setFocusedIndex 또는 MAX_SUGGESTIONS이 변경될 때마다 focusedIndex를 -2로 재설정하는 데 사용됩니다. 이는 컴포넌트가 처음 렌더링될 때 또는 검색어가 업데이트될 때 focus가 기존 검색어 위치에 맞춰지지 않도록 하는 데 사
- renderedSuggestions 변수는 현재 startIndex 및 MAX_SUGGESTIONS를 기준으로 제안 배열을 슬라이스하는 데 사용됩니다. 이렇게 하면 한 번에 최대 수의 제안만 렌더링되므로 성능이 향상되고 검색어 목록이 너무 길어지는 것 방지


```javascript
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();

      setFocusedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
      );
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();

      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }

    if (e.key === 'Enter' && focusedIndex !== undefined && focusedIndex >= 0) {
      e.preventDefault();

      setKeyword(suggestions[focusedIndex].name);
    }
  };

  return handleKeyDown;
};
```

- ArrowDown: 목록의 다음 검색어로 focus를 이동
- ArrowUp: 목록에서 이전 검색어로 focus를 이동
- Enter: 현재 초점이 맞춰진 검색어를 선택하고, 해당 이름으로 setKeyword 함수를 업데이트
이러한 컴포넌트를 사용하면 검색어 목록에 대한 키보드 이벤트를 재사용할 수 있는 방법을 제공하므로 검색어가 사용되는 다양한 상황에서 유용하게 사용할 수 있다는 이점 존재

	1. 검색창에 focus가 있는 상태에서 방향키 아래를 누르면 첫 검색어로 focus가 이동
	2. 가장 마지막 검색어에서 방향키 아래를 누를 시, 첫 검색어로 이동
	3. 검색어는 최대 7개씩 화면에 보여줌. 그 이상의 검색어는 아래 방향키를 누를 때 노출

<br />

### 2. API 호출시 로컬 캐싱 구현하기
- 로컬 캐싱
	- 캐싱 기능을 담당하는 Cache class를 정의
		https://github.com/pre-onboarding-team10/pre-onboarding-10th-2-10/blob/4a75abd1ff39b760bcdc2d3f58265c4d5069b55f/src/apis/apiClient.js#L3-L41
	- 전역 변수로 선언된 ApiClient 인스턴스 필드에 요청 캐시 데이터 저장
		- 로컬 캐시 저장소 선정 기준은 캐싱 데이터 타입, 업데이트 주기, 지속성, 용량, 성능
			- 캐싱 데이터 타입 기준은 다 적합해 보임
			- 업데이트 주기는 최대한 빠르게 > 지속성은 크게 중요하지 않음
			- 용량 > 추천 검색어 리스트 데이터 많지 않음
			- 검색 액션은 앱에 진입 후 초반 단계에서 수행되는 액션 > 처리 속도 (성능) 매우 중요
			⇒ memory에 저장
- 모든 API의 get 요청에 대해 캐싱 기능이 수행되도록 ApiClient class의 private get method에서 캐싱 기능을 구현
	https://github.com/pre-onboarding-team10/pre-onboarding-10th-2-10/blob/4a75abd1ff39b760bcdc2d3f58265c4d5069b55f/src/apis/apiClient.js#L75-L85
- expire time
	- 캐싱 데이터가 생성된 시간을 Data 인스턴스 필드에 저장하여 API 호출 시점에 current time과 cached time을 비교하여 expired 여부 확인

3. 입력마다 API 호출하지 않도록 API 호출 횟수 줄이기
- debounce util 함수를 구현하여 추천 검색어 리스트 데이터를 페치하는 함수 실행을 딜레이
	https://github.com/pre-onboarding-team10/pre-onboarding-10th-2-10/blob/4a75abd1ff39b760bcdc2d3f58265c4d5069b55f/src/utils/debounce.js#L1-L9

# Team History

- 23.05.03 검색창 화면 구성에 대한 토론 및 Best Practice 선정
- 23.05.04 로컬 캐싱 구현에 대한 토론 및 Best Practice 선정
- 23.05.05 UI 작업에 대한 Best Practice 선정

<br/>

# Best Practice 선정이유

- 검색창 화면 구성하기 : 검색화면, 키보드로 검색어 이동하기, input onChange이벤트 구현
- API 호출시 로컬 캐싱 구현 : 가장 적절한 로컬 캐싱 방법, 불필요한 api호출 최소화, 캐시 만료시간 구현
- UI 작업 : CSS 파일 분리, 자주 사용되는 변수 사용, 반응형 고려

<br/>

# Tech Stack

`React`, `Axios`, `http-proxy-middleware`

- 협업 도구: `Discord`, `Notion`, `Github`, `Zep`

<br/>

# Directory

```bash
📦src
 ┣ 📂apis
 ┃ ┗ 📜apiClient.js
 ┣ 📂assets
 ┃ ┗ 📂css
 ┃ ┃ ┣ 📜search-bar.css
 ┃ ┃ ┣ 📜styles.css
 ┃ ┃ ┣ 📜suggestion.css
 ┃ ┃ ┗ 📜variables.css
 ┣ 📂components
 ┃ ┣ 📜.keep
 ┃ ┣ 📜SearchBarInput.js
 ┃ ┣ 📜SuggestionItem.js
 ┃ ┣ 📜SuggestionList.js
 ┃ ┗ 📜Title.js
 ┣ 📂hooks
 ┃ ┣ 📜useInputChange.js
 ┃ ┗ 📜useKeywordSuggestion.js
 ┣ 📂pages
 ┃ ┣ 📜.keep
 ┃ ┗ 📜SearchBar.js
 ┣ 📂utils
 ┃ ┣ 📜debounce.js
 ┃ ┗ 📜suggestKeyboardHandler.js
 ┣ 📜.DS_Store
 ┣ 📜App.js
 ┣ 📜index.js
 ┗ 📜setupProxy.js
```

# Team Members

<table border>
  <tbody>
    <tr>
       <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/101001956?v=4"  alt="정민상님"/><br />
        <br/>
        <a href="https://github.com/jeongminsang">
          <img src="https://img.shields.io/badge/팀장 : 정민상-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src='https://avatars.githubusercontent.com/u/90402926?v=4'  alt="전종훈님"/><br />
        <br/>
        <a href="https://github.com/JunJongHun">
          <img src="https://img.shields.io/badge/전종훈-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/97023321?v=4"  alt="종아인님"/><br />
       <br/>
        <a href="https://github.com/04ian80">
          <img src="https://img.shields.io/badge/종아인-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/81045794?v=4"  alt="정윤혁님"/><br/>
                <br/>
        <a href="https://github.com/hyukzz">
          <img src="https://img.shields.io/badge/정윤혁-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
     </tr>
         <tr>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/77673029?v=4"  alt="최지미님"/><br />
       <br/>
        <a href="https://github.com/rabbit-22">
          <img src="https://img.shields.io/badge/최지미-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/83802168?v=4"  alt="문지웅님"/><br/>
       <br/>
        <a href="https://github.com/woongsnote">
          <img src="https://img.shields.io/badge/문지웅-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/106802169?v=4"  alt="양우진님"/><br/>
                <br/>
        <a href="https://github.com/yan9vvoojin">
          <img src="https://img.shields.io/badge/양우진-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/59640337?v=4"  alt="전애지님"/><br/>
       <br/>
        <a href="https://github.com/AEJIJEON">
          <img src="https://img.shields.io/badge/전애지-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="200px">
        <img width="100%" src="https://avatars.githubusercontent.com/u/97525377?v=4"  alt="백인빈님"/><br/>
       <br/>
        <a href="https://github.com/blueline1984">
          <img src="https://img.shields.io/badge/백인빈-000?style=flat-round&logo=GitHub&logoColor=white"/>
        </a>
      </td>
     </tr>
  </tbody>
</table>

<br/>
