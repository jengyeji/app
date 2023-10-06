import logo from './logo.svg';
import './App.css';
import React from 'react';

const jsonLocalStorage = {
  setItem: (key,value)=>{
    localStorage.setItem(key,JSON.stringify(value));
  },
  getItem: (key)=>{
    return JSON.parse(localStorage.getItem(key));
  },
};

function Title(props) {
  return <h1>{props.children}</h1>;
}

const Form = ({ updateCounter }) => {
  const [value, setValue] = React.useState(''); //초기값은 빙문자열
  const [errorMessage, setErrorMessage] = React.useState("");
  // 한글 검증
  const hangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);


  function handleInputChange(data) {
    const userValue = data.target.value;

    if (hangul(userValue)) {
      setErrorMessage('한글은 입력할 수 없습니다.');
    } else {
      setErrorMessage('');
    }
    setValue(userValue.toUpperCase());
  }
  function handleFormSubmit(reflesh) {
    reflesh.preventDefault();
    setErrorMessage('');
    // 에러메시지를 빈문자열로 바꿔주고 검사실행
    if (value === '') {
      setErrorMessage('값이 없으므로 추가 할 수 없습니다.');
      return;
    }
    updateCounter();
  }

  // onchange는 뭔가가 들어오면 바로 바꿔준다.
  return (
    <form action="" onSubmit={handleFormSubmit}>
      <input type="text" name="name" placeholder="상품명을 입력하세요"
        onChange={handleInputChange} value={value}
      />
      <button type="submit">추가</button>
      <p style={{ color: "#f00" }}>{errorMessage}</p>
    </form>
  );
};

const MainCard = ({ src, handleHeartClick,choiceFavorites}) => {
  const heartIcon = choiceFavorites ? '💖' : '🖤';
  return (
    <div className="main-card">
      <img
        src={src}
        alt="올리브 오일"
        width="400"
        style={{ border: "1px solid red" }}
      />
      <button onClick={handleHeartClick}>{heartIcon}</button>
    </div>
  );
};

const FoodItem = ({ src }) => {
  return (
    <li>
      <img src={src}
        alt="올리브오일"
        style={{
          width: "150px",
          height: "100px",
          backgroundSize: "contain",
        }}
      />
    </li>
  );
};

const Favorites = ({ favorites }) => {
  return (
    <ul className="favorites">
      {favorites.map(food => <FoodItem src={food} key={food} />)}
    </ul>
  );
};

// [상속 : 앱 컴포넌트]
const App = () => {
  const foodOne = 'img/food-one.jpg';
  const foodTwo = 'img/food-two.jpg';
  const foodThree = 'img/food-three.jpg';
  const [mainFood, setMainFood] = React.useState(foodOne); //
  const [favorites, setFavorites] = React.useState(jsonLocalStorage.getItem('favorites')||[]); 
  const [counter, setCounter] = React.useState(jsonLocalStorage.getItem('counter')); //JSON

  // 하트 버튼
    const choiceFavorites = favorites.includes(mainFood); 
  
  function updateCounter(event) {
    const nextCounter = counter + 1;

    setCounter(nextCounter);
    setMainFood(foodTwo);
    console.log('counter', counter);
    console.log('nextcounter:', nextCounter);
   ;
    jsonLocalStorage.setItem('counter', nextCounter);
  }


  function handleHeartClick() {
    const nextFavorites = [...favorites, mainFood];
    console.log('하트 버튼 클릭한다!!');

    setFavorites(nextFavorites);
    jsonLocalStorage.setItem('favorites',nextFavorites);
  }

  return (
    <div>
      <Title>페이지 {counter}</Title>
     
      <Form updateCounter={updateCounter} />
      <MainCard
       src={mainFood} 
       handleHeartClick={handleHeartClick}
       choiceFavorites = {choiceFavorites} 
       />
      <Favorites favorites={favorites} />
    </div>
  )
};
export default App;
