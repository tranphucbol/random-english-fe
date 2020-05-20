import React from 'react';
import handleResponse from '../helper/ResponseHandler';
import { Redirect } from 'react-router-dom';

const Profile = (props)=>{
  const data =
    fetch(props.apiEndpoint+'/users/profile', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + props.cookie,
    },
    })
    .then(res => handleResponse);

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
  // if authorization fails
  if(data === false)
    return <Redirect to="/login"></Redirect>
  else // render the profile page
  return (<div className="w-full max-w-xs" style={{margin: '50px auto'}}>
    <h2>Login Successful</h2>
  </div>)
}

export default Profile;

