https://www.youtube.com/watch?v=w7ejDZ8SWv8
https://github.dev/bradtraversy/react-crash-2021
2021 ver


# A. Fundamental
## A.1. function vs class based components

![React%20Cras%20819dd/Untitled.png](React%20Cras%20819dd/Untitled.png)
옛날엔 class based가 정석이었는데,
최근 트랜드는 function based가 정석.

# B. env

npx create-react-app my-app
cd my-app
npm start

## B.1. package.json
```json
{

"name": "react-task-tracker",

"version": "0.1.0",

"private": true,

"dependencies": {

"@testing-library/jest-dom": "^5.11.4",

"@testing-library/react": "^11.1.0",

"@testing-library/user-event": "^12.1.10",

"json-server": "^0.16.3",

"react": "^17.0.1",

"react-dom": "^17.0.1",

"react-icons": "^4.1.0",

"react-router-dom": "^6.0.2",

"react-scripts": "4.0.1",

"web-vitals": "^0.2.4"

},

"scripts": {

"start": "react-scripts start",

"build": "react-scripts build",

"test": "react-scripts test",

"eject": "react-scripts eject",

"server": "json-server --watch db.json --port 5000"

},

"eslintConfig": {

"extends": [

"react-app",

"react-app/jest"

]

},

"browserslist": {

"production": [

">0.2%",

"not dead",

"not op_mini all"

],

"development": [

"last 1 chrome version",

"last 1 firefox version",

"last 1 safari version"

]

}

}
```

npm install

# C. structure
![[Pasted image 20220803191040.png]]

모든게 `<Router />`안에 `<Routes />`안에 `<Route />`안에 있구나.




## C.1. App.js

### C.1.1. import [[React Hooks]] and npm modules
```javascript
import { useState, useEffect } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
```

### C.1.2. import components
```javascript
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
```

## C.2. [[useState]]
```javascript
const [showAddTask, setShowAddTask] = useState(false)

const [tasks, setTasks] = useState([])
```

### C.2.1. 왜 쓴거고 useState(false) 는 뭐지?

#### C.2.1.1. ans

```javascript
const [showAddTask, setShowAddTask] = useState(false)
```
의 경우,

```javascript
return (

<Router>

<div className='container'>

<Header

onAdd={() => setShowAddTask(!showAddTask)}

showAdd={showAddTask}

/>
```

Router로

`<Header />`에 보낼 때,
Header.js에서
![[Pasted image 20220803190252.png]]
넘겨준 showAdd의 boolean 값에 따라, red, green, close,add toggle 된다.




```javascript
const [tasks, setTasks] = useState([])
```
의 경우, tasks라는 변수를 빈 배열로 초기화 하는 것


## C.3. [[useEffect]]
```javascript
useEffect(() => {

const getTasks = async () => {

const tasksFromServer = await fetchTasks()

setTasks(tasksFromServer)

}

  

getTasks()

}, [])
```

### C.3.1. Q. A가 변경되면 B도 변경해주세요 라는데
두번째 파라미터가 [] 비어있다.
그럼 왜쓴거지?


## C.4. CRUD
```javascript
// Fetch Tasks

const fetchTasks = async () => {

const res = await fetch('http://127.0.0.1:5000/tasks')

const data = await res.json()

  

return data

}

  

// Fetch Task

const fetchTask = async (id) => {

const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`)

const data = await res.json()

  

return data

}

  

// Add Task

const addTask = async (task) => {

const res = await fetch('http://127.0.0.1:5000/tasks', {

method: 'POST',

headers: {

'Content-type': 'application/json',

},

body: JSON.stringify(task),

})

  

const data = await res.json()

  

setTasks([...tasks, data])

  

// const id = Math.floor(Math.random() * 10000) + 1

// const newTask = { id, ...task }

// setTasks([...tasks, newTask])

}

  

// Delete Task

const deleteTask = async (id) => {

const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {

method: 'DELETE',

})

//We should control the response status to decide if we will change the state or not.

res.status === 200

? setTasks(tasks.filter((task) => task.id !== id))

: alert('Error Deleting This Task')

}

  

// Toggle Reminder

const toggleReminder = async (id) => {

const taskToToggle = await fetchTask(id)

const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

  

const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {

method: 'PUT',

headers: {

'Content-type': 'application/json',

},

body: JSON.stringify(updTask),

})

  

const data = await res.json()

  

setTasks(

tasks.map((task) =>

task.id === id ? { ...task, reminder: data.reminder } : task

)

)

}
```



### C.4.1. addTask()시 [[useState]] 처리
```javascript
setTasks([...tasks, data])
```
이 역시 [[순수 함수]]


### C.4.2. delete시에 에러 처리
```javascript
// Delete Task

const deleteTask = async (id) => {

const res = await fetch(`http://127.0.0.1:5000/tasks/${id}`, {

method: 'DELETE',

})

//We should control the response status to decide if we will change the state or not.

res.status === 200

? setTasks(tasks.filter((task) => task.id !== id))

: alert('Error Deleting This Task')

}
```

http response status가 200이면, 
tasks를 [[useState]]를 이용해서 refresh




### C.4.3. delete시에 [[순수 함수]]
```javascript
//We should control the response status to decide if we will change the state or not.

res.status === 200

? setTasks(tasks.filter((task) => task.id !== id))

: alert('Error Deleting This Task')
```

원래 객체 조작하는게 아니라, 새로운 객체 만들어 넣는다..


## C.5. return JSX
![[Pasted image 20220803191040.png]]



### C.5.1. Router
path='/' 하면, /으로 이동시켜주나보네

#### C.5.1.1. Q. 내부가 어떻게 구현되어있지?




# D. Components
## D.1. Header
### D.1.1. propType
```javascript
import PropTypes from 'prop-types'

Header.propTypes = {

title: PropTypes.string.isRequired,

}
```

strict type 사용하기 위해

### D.1.2. defaultProps
```javascript
Header.defaultProps = {

	title: 'Task Tracker',

}
```

혹시나 props 못받았을 때, 깨질까봐

## D.2. Button



## D.3. Footer
### D.3.1. `<Link />`
```javascript
import { Link } from 'react-router-dom'

  

const Footer = () => {

return (

<footer>

<p>Copyright &copy; 2021</p>

<Link to='/about'>About</Link>

</footer>

)

}

  

export default Footer
```

링크를 지원해주는구나 react-router-dom에서



## D.4. About


## D.5. Task
![[Pasted image 20220803192548.png]]
### D.5.1. `<FaTimes />`로 또다른 react component구나.

### D.5.2. onClick={() => onDelete(task.id)}
함수로 전해주네. 그냥 전해주면 바로 실행되나 봄. [[IIFE]]

### D.5.3. className
html에서는 그냥 class= 이었는데, react에서는 className을 쓰나봄

완전 pure한 html이 아니네




## D.6. Tasks
![[Pasted image 20220803192845.png]]
.map으로 개별 task마다 task component 붙여줌

## D.7. AddTask

![[Pasted image 20220803193103.png]]
useState를 App.js에서 관리하는게 아니라, 여기서 관리하네?
아 개별 task의 attributes라서 그런거구나.

onSubmit에서 
submit하기 전에 form에 텍스트 채웠는지, 확인해주고,
onAdd() 하네?
onAdd() 끝나면, form을 다 비우고.

![[Pasted image 20220803193111.png]]




# E. Database


```jsx
npm install json-server
```
package.json
```json
"scripts": {
	...
	"server": "json-server --watch db.json --port 5000"
}
```

```jsx
npm run server
```


db.json
```json
{

"tasks": [

{

"id": 2,

"text": "Meeting at School",

"day": "Feb 6th at 1:30pm",

"reminder": true

},

{

"text": "d",

"day": "c",

"reminder": true,

"id": 4

}

]

}
```

이걸 state 삼아서 관리


# F. Build
build한걸 포트 8000에 올리고 싶다면,

```jsx
npm install -g serve
```

```jsx
serve -s build -p 8000
```

## F.1. error! - unresolved yet

ERROR: Cannot copy server address to clipboard: Couldn't find the `xsel` binary and fallback didn't work. On Debian/Ubuntu you can install xsel with: sudo apt install xsel.

```
sudo update
sudo apt install xsel
serve -s build -p 8000
```
ERROR: Cannot copy server address to clipboard: Both xsel and fallback failed.



