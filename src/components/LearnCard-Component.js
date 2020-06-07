import React from 'react';
import '../css/tailwind.css'

const LearnCard = (props) => {
  return (
    <div className="rowBox container-fluid" style={{ "maxWidth": "100%", 'width': '100%', 'display': 'flex', 'alignItems': 'center' }}  >
        <div>
          <img src="http://www.hi-reit.com/wp-content/uploads/InvestigateCommercialLandlord.jpg" className="img-fluid" alt=""/>
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

