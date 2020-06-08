import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
} from "react-share";

const FooterComponent = (props) => {
  return (
    // <div className="flex h-auto p-4 mt-10 align-stretch"
    // style={{background:' linear-gradient(135deg, rgba(34,38,31,1) 0%, rgba(34,38,31,1) 16%, rgba(31,59,8,1) 55%, rgba(31,59,8,1) 100%)',
    // boxShadow:'0px 0px 10px 5px #888888'}}
    // >
    //     <div className="w-1/3 bg-opacity-0 text-center text-white">
    //         <p style={{textShadow: '0 2px 4px rgba(0,0,0,10'}} className="text-2xl block mt-4 mb-2 lg:inline-block lg:mt-0 text-white font-weight-bold text-white-600 mr-4">About</p>
    //         <div className="text">
    //         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    //         </div>
    //     </div>

    //     <div className="w-1/3 bg-opacity-0 text-center">
    //     <p style={{textShadow: '0 2px 4px rgba(0,0,0,10'}} className="text-2xl block mt-4 mb-2 lg:inline-block lg:mt-0 text-white font-weight-bold text-white-600 mr-4">Term of Service</p>
    //         <div>
    //         Term of Service
    //         </div>
    //     </div>

    //     <div className="w-1/3 bg-opacity-0 text-center">
    //     <p style={{textShadow: '0 2px 4px rgba(0,0,0,10'}} className="text-2xl block mt-4 mb-2 lg:inline-block lg:mt-0 text-white font-weight-bold text-white-600 mr-4">Social Links</p>
    //         <div className="flex">
    //         <div className="w-1/2 text-left ml-3">
    //         </div>

    //         <div className="w-1/2 text-right leading-9 mr-5">
    //             <div className="inline text-xl text-white mt-2 mr-3">Send us a mail!</div><EmailShareButton><EmailIcon className="inline-block" round size={40}></EmailIcon></EmailShareButton><br/>
    //             <div className="inline text-xl text-white mt-2  mr-3">Follow us on Facebook</div><FacebookShareButton><FacebookIcon className="inline-block" round size={40}></FacebookIcon></FacebookShareButton><br/>

    //             <div className="inline text-xl text-white mt-2  mr-3">Tweet@us</div><TwitterShareButton><TwitterIcon className="inline-block" round size={40}></TwitterIcon></TwitterShareButton><br/>

    //             <div className="inline text-xl text-white mt-2  mr-3">Our instagram</div><InstapaperShareButton><InstapaperIcon className="inline-block" round size={40}></InstapaperIcon></InstapaperShareButton><br/>

    //         </div>
    //         </div>
    //     </div>
    // </div>

    <div className="absolute bottom-0 w-full">
      <div
        className="flex h-auto p-4 mt-10 text-white align-stretch"
        style={{ background: "rgba(51,54,59,.95)" }}
      >
        <div className="w-1/2 mt-2">
          &copy;2020 RandomEnglish Team. All rights reserved.
        </div>
        <div className="w-1/2 text-right">
          <EmailShareButton>
            <EmailIcon className="inline-block" round size={40}></EmailIcon>
          </EmailShareButton>
          <FacebookShareButton>
            <FacebookIcon
              className="inline-block ml-2"
              round
              size={40}
            ></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton>
            <TwitterIcon
              className="inline-block ml-2"
              round
              size={40}
            ></TwitterIcon>
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
