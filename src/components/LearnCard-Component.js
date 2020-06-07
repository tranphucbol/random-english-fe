import React, { useState, useEffect } from 'react';
import '../css/tailwind.css'
import Radio from '@material-ui/core/Radio';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';


const LearnCard = (props) => {


  return (
    <div className="rowBox container-fluid" style={{ "maxWidth": "100%", 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}  >
        <div>
          <img src="http://www.hi-reit.com/wp-content/uploads/InvestigateCommercialLandlord.jpg" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""/>
        </div>
          <div key="questionPanel" className='panel' style={{ width: '50%' }}>
            <div className="panel-body" style={{ width: '100%', padding: '20px' }}>
              <h1 id="question" className="text-blue-700" >Nghĩa của từ: <b>sadfg</b></h1>
              <div id="concept" style={{ marginTop: '10px' }}>
              </div>
            </div>
        </div>
    </div>
  )
}

export default LearnCard;

