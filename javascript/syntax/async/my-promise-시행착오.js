//*********************************** */
//  Promise 기초  **





//*********************************** */
//1. Promise 선언


var _promise = function (param) {

	return new Promise(function (resolve, reject) {

		// 비동기를 표현하기 위해 setTimeout 함수를 사용 
		window.setTimeout(function () {

			// 파라메터가 참이면, 
			if (param) {

				// 해결됨 
				resolve("해결 완료");
			}

			// 파라메터가 거짓이면, 
			else {

				// 실패 
				reject(Error("실패!!"));
			}
		}, 3000);
	});
};

//Promise 실행
_promise(true)
.then(function (text) {
	// 성공시
	console.log(text);
}, function (error) {
	// 실패시 
	console.error(error);
});


//new Promise를 var _promise에 저장 후, _promise.then()으로 프로미스가 다 끝나면 실행




//1.1 그냥 Promise vs return new Promise

//그냥 Promise를 써서 리스트 객체에 데이터 쌓아도, 해당 function 안에만 사용가능하지, 바깥에서는 사용 불가.

//스코프 범위 때문.

//그런데 return new Promise하고 resolve(result) 해주면, .then(result)로 받아서 스코프 바깥에서도 사용 가능.





//*********************************** */
// 2. Promise.all()** -- 여러 Promise 동작하게 하고 싶다면? 



var promise1 = new Promise(function (resolve, reject) {

	// 비동기를 표현하기 위해 setTimeout 함수를 사용 
	window.setTimeout(function () {

		// 해결됨 
		console.log("첫번째 Promise 완료");
		resolve("11111");

	}, Math.random() * 20000 + 1000);
});

var promise2 = new Promise(function (resolve, reject) {

	// 비동기를 표현하기 위해 setTimeout 함수를 사용 
	window.setTimeout(function () {

		// 해결됨 
		console.log("두번째 Promise 완료");
		resolve("222222");

	}, Math.random() * 10000 + 1000);
});


Promise.all([promise1, promise2]).then(function (values) {
	console.log("모두 완료됨", values);
});


//두가지 프로미스를 한번에 실행해서 병렬적으로 처리하기1






//2. 예시 2

const promises = [
  getRepos = new Promise(function (resolve, reject) {
    const resp = fetch(APIURL+'/user'+'/repos?per_page=100'+createdSort+experience_GITHUB_API_TOKEN).then(result => result.json());
    resolve(resp);
  }),
  loading = new Promise(function (resolve, reject){
    setTimeout(() => {
      resolve();
    }, 1000 * 3);
  }),
];

async function loadingReady(){
return await Promise.all(promises).then(values => {
    document.getElementsByClassName("loading")[0].style.display = 'none';
    document.getElementsByClassName("container")[0].style.display = 'block';
    
    return values[0];
  }
);
}



//두가지 프로미스를 한번에 실행해서 병렬적으로 처리하기2 

//Promise.all()안에 []객체 사용. 1번과 완전 같은 방식을 쪼금 다르게 표현한 것.







//*********************************** */
//3. Promise의 for-loop(병렬적 처리) **

function delay() {
	return new Promise(resolve => setTimeout(resolve, 300));
}

async function delayedLog(item) {
	await delay();
	console.log(item);
}

async function processArray(array) {
	// map array to promises
	const promises = array.map(delayedLog);
	// wait until all promises are resolved
	await Promise.all(promises);
	console.log('Done!');
  }

  
  //2-Promise.all()의 연장선임.




  
  //**주의- 아래처럼 병렬처리하면 안됨!

  //안되는 방법1

  async function processArray(array) {
	  array.forEach(async (item) => {
      await delayedLog(item);
    })
    console.log('Done!');
  }

  //comment: .forEach말고 .map을 쓰자

  //안되는 방법2

  async function processArray(array) {
    for (const item of array) {
      await delayedLog(item);
    }
    console.log('Done!');
  }

  //comment: for-of 말고 .map을 쓰자






  //*********************************** */
  //4. 비동기의 순차적 실행

  new Promise((r1, r2) => {
    console.log('Hello Promise1!');
    r1();
  })
  .then(() => {
      console.log('Hello Promise2!');

      new Promise((r1, r2) => {
          console.log('Hello Promise3!');
          r1();
      })
      .then(() => {
          console.log('Hello Primise4!');
      })
  })


  


  //4-1. 비동기에서 순차적 실행 실전 적용

  const APIURL = 'https://api.github.com';
  const experience_GITHUB_API_TOKEN="&access_token=" + "" 
  const username = 'doohwancho';
  let data = [];
  data.push({
      "fullname":"LeetCode.ps",
      "totalCommit":0,
      "lastSha":"",
      "commitMessages":[],
  });

  new Promise((resolve, reject) => {
      console.log('Hello Promise1!');
      let commitLogs = fetch(APIURL+"/repos/"+username+"/"+data[0].fullname+"/commits?per_page=100&sort=author-date&order=desc&sha="+data[0].lastSha+experience_GITHUB_API_TOKEN).then(rst => rst.json()); 
      resolve(commitLogs);
  })
  .then((result) => {
      console.log('Hello Promise2!');
      console.log(result);
      data[0].lastSha = result[result.length-1].sha;
      console.log(data[0].lastSha);

      return new Promise((resolve, reject) => {
          console.log('Hello Promise3!');
          let commitLogs = fetch(APIURL+"/repos/"+username+"/"+data[0].fullname+"/commits?per_page=100&sort=author-date&order=desc&sha="+data[0].lastSha+experience_GITHUB_API_TOKEN).then(rst => rst.json()); 
          resolve(commitLogs);
      })
      .then((result) => {
          console.log('Hello Primise4!');
          console.log(result);
          data[0].lastSha = result[result.length-1].sha;
          console.log(data[0].lastSha);

          return new Promise((resolve, reject) => {
              console.log('Hello Promise5!');
              let commitLogs = fetch(APIURL+"/repos/"+username+"/"+data[0].fullname+"/commits?per_page=100&sort=author-date&order=desc&sha="+data[0].lastSha+experience_GITHUB_API_TOKEN).then(rst => rst.json()); 
              resolve(commitLogs);
          })
          .then((result) => {
              console.log('Hello Primise6!');
              console.log(result);
              data[0].lastSha = result[result.length-1].sha;
              console.log(data[0].lastSha);
          })
      })
  })



  //4-2. new Promise().then()을 재귀로 간소화 하기

  
const APIURL = 'https://api.github.com';
const experience_GITHUB_API_TOKEN="&access_token=" + "";
const username = 'doohwancho';
let data = [];
data.push({
    "fullname":"LeetCode.ps",
    "totalCommit":0,
    "lastSha":"",
    "commitMessages":[],
});


function recursion(repo, limit, i, lastSha) {
    return new Promise((resolve, reject) => {
        let commitLogs = fetch(APIURL+"/repos/"+username+"/"+repo.fullname+"/commits?per_page=100&sort=author-date&order=desc&sha="+lastSha+experience_GITHUB_API_TOKEN).then(rst => rst.json()); 
        resolve(commitLogs);
    })
    .then(async (result) => {
        let name = repo.fullname.split('.',2);
        let language = name[1];
        let project =  name[0];
    
        let commitCnt = 0;
        for(let entry of result){ 
            repo.commitMessages.push({
                sha : entry.sha,
                message : entry.commit.message
            });
            commitCnt++;
        } 
    
        repo.language = language;
        repo.project = project;
        repo.totalCommit += commitCnt;
        repo.lastSha = result[result.length-1].sha;

        if(i < 3 && repo.totalCommit === limit){
            recursion(repo, limit+100, i+1, repo.lastSha);
        }
        return repo;
    });
}


(async () => console.log(await recursion(data[0], 100, 0, "")))()






  //************************************
  //실전 적용

  //github-contributor promise-logic

  //work-flow

  //--(get all repos name)- Promise.all(arr.map(async(repo) => { await getCommits(repo)})) --- .then()
  //                         --- GET/repo1
  //                       	 	--- GET/repo2
  //                       			--- GET/repo3
  //                       				--- GET/repo4
  //                       					--- GET/repo-n  ...................... DONE!   --- use the data!


  //step1) user의 모든 repo 이름 가져오기. 
  //	   이때, 일반 function엔 return new Promise((resolve, reject) => { resolve(결과값) }); 
  //       repo이름들을 가져온 결과값이 무조건 끝나고 난 후, 다음 스텝 실행해야 하기 때문에,
  //	   getRepos(username).then(); .then()을 써서 해당 실행이 모두 끝나면, 다음 스텝 실행.

  //	   또 하나 재밌는 점은, 일반 function이다보니, await이용 안하고, fetch()만 한 후, .then(result => result.json())으로 string->json화 한 후, resolve(resp);로 결과값 넘김.
  //       const resp = fetch(url).then(result => result.json());
  //	   resolve(resp);

  //	   reject처리도 따로 해주는게 좋음. get전송 실패시 어떻게 처리할까에 관한 것임.


  //step2) repo중 유효한 repo만 필터링

  //step3) 비동기 병렬처리
  //       일반 function(array){
  //  	   		return await Promise.all(array.map(async (repo) => { let commitLogs = await tossRepo(repo); }));
  //	   }
  //	   비동기 병렬처리는 await Promise.all()을 이용. .all()은 안에 있는 애들이 비동기처리 다 끝나기 전까지 기다림.
  //	   array.map((repo) => {await tossRepo(repo)})가 아닌, async(repo) 써야 함. await가 있는 함수들은 모두 async가 붙어야 하기 때문.
    

  //step4) await로 비동기 병렬처리의 한개단위 전송 처리

  //	   let commitLogs = await tossRepo(repo);

  //       await으로 받은함수는, 같이 async - await으로 받음.
  //	   async function tossRepo(repo) {
  //   			return await getCommits(repo.fullname);
  // 	   }

  //		function getCommits(fullname) {
  //			return new Promise((resolve, reject) => {
  //				const resp = fetch(url).then(result => result.json());
  //				resolve(resp);
  //			});
  //		}


  //step5) data manipulation -> return repo (=== return await processArray(data))

  //	 getRepos(username).then(async function (repos) { return await processArray(data); });

  //step6) use data

	// .then(function(data){

	// 	for(let entity of data){
	// 		console.log(entity);
	// 	}
	// });

const APIURL = 'https://api.github.com';
const experience_GITHUB_API_TOKEN="&access_token=a94c7c01e98784d71fd7c5492b32ef4278efa91b" //https://stackoverflow.com/questions/13394077/is-there-a-way-to-increase-the-api-rate-limit-or-to-bypass-it-altogether-for-git
const username = 'doohwancho';
const visibility = '&visibility='; //all, public, private. default:all
const createdSort = '&sort=pushed&direction=asc';

//step1)
function getRepos(username) {
  return new Promise((resolve, reject) => {
    const resp = fetch(APIURL+'/users/'+username+'/repos?per_page=100'+createdSort+experience_GITHUB_API_TOKEN).then(result => result.json());
    resolve(resp);
  });
} 

//step4)
function getCommits(fullname) {
  return new Promise((resolve, reject) => {
    const resp = fetch(APIURL+"/repos/"+username+"/"+fullname+"/commits?per_page=100&sort=author-date&order=desc"+experience_GITHUB_API_TOKEN).then(result => result.json()); //?per_page=100
    resolve(resp);
  });
}

//step4)
async function tossRepo(repo) {
  return await getCommits(repo.fullname);
}


async function processArray(array) {
	//step3)
	return await Promise.all(array.map(async (repo) => {
	 
	//step4)
    let commitLogs = await tossRepo(repo);
	
	//step5)
    let name = repo.fullname.split('.',2);
    let language = name[1];
    let project =  name[0];
    let commitMessages = [];

    for(let entry of commitLogs.reverse()){
      commitMessages.push({
        message : entry.commit.message
      });
    }
  
    let totalCommit = commitMessages.length;
    repo.language = language;
    repo.project = project;
    repo.totalCommit = totalCommit;
    repo.commitMessages = commitMessages;

    return repo;
  }
  ));
}


// //step1)
// getRepos(username).then(async function (repos) {
//   let data = [];
  
//   //step2)
//   for(let repo of repos){
//     if(repo.name !== undefined && repo.name.indexOf('.') >= 0){
//       data.push({
//         "fullname": repo.name,
//       });
//     }
//   }
//   //step3,4,5)
//   //step6)
//   return await processArray(data);
// }).then(function(data){

// 	for(let entity of data){
// 		console.log(entity);
// 	}
// });
