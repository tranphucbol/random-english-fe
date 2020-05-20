import React from 'react';

const Profile = (props)=>{
  const fetch = data => {
    fetch(props.apiEndpoint+'/users/profile', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': props.cookie
    },
    body: JSON.stringify({
      email: data.Email,
      password: data.password
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.token != null){
        let expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (15*60*1000)); // 15 min expiration
        localStorage.setItem("login","true");
        props.setCookie('authentication',data.token,{
          expires: expireDate,
          path: '/',
          httpOnly: false,
        });
        props.setCurUser(data.email);
      }
    })
  }
  //   useEffect(() => {
  //     fetch("")
  //         .then(res => res.json())
  //         .then(
  //             (result) => {
  //               if(result){
  //                 let dataInfection = [];
  //                 let dataMaybeInfection = [];
  //                 let dataCured = [];
  //                 Object.keys(result).map(day=>{
  //                   const date = (regexDay.exec(day))[0];
  //                   const ts = moment(date,'D/M').valueOf()+24*60*60*1000; //plus 1 day 
  //                   dataInfection.push({x:ts, y: result[day][0]});
  //                   dataMaybeInfection.push({x:ts, y: result[day][1]});
  //                   dataCured.push({x:ts, y: result[day][2]});
  //                 });
  //                 console.log(result);
  //                 dataInfection.sort((a,b)=>a.x> b.x? 1:-1)
  //                 dataMaybeInfection.sort((a,b)=>a.x> b.x? 1:-1)
  //                 dataCured.sort((a,b)=>a.x> b.x? 1:-1)
  //                 setDataInfection(dataInfection);
  //                 setDataMaybeInfection(dataMaybeInfection);
  //                 setDataCured(dataCured);
  //               }
  //             },
  //             (error) => {
  //             }
  //         )
  // }, [])
  return (<div className="w-full max-w-xs" style={{margin: '50px auto'}}>
    <h2>Login Successful</h2>
  </div>)
}

export default Profile;

