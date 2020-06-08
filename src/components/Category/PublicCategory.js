import React from 'react';
import AddCategoryButton from './AddCategoryButton';

const PublicCategory = ({
  id,
  name,
  reload
}) => {
  return (
    <div className="rounded-lg shadow-lg" style={{ height: 275 }}>
      <header
        className="flex items-center rounded-t-lg bg-white px-3"
        style={{ height: "20%" }}
      >
        <a href="/" className="text-gray-700 font-bold hover:text-blue-800">
          {name}
        </a>
      </header>
      <div
        className="flex items-center bg-white px-3"
        style={{
          height: "60%",
          background: "linear-gradient(#075788 0%, #0b7cc1 80%)",
        }}
      >
        <div className="w-full">
          <a
            href="/"
            className="block text-white text-center"
            style={{ fontSize: "72pt", color: "rgba(255,255,255,0.5)" }}
          >
            {name}
          </a>
        </div>
      </div>
      <footer
        className="flex items-center flex-row-reverse rounded-b-lg bg-white px-3"
        style={{ height: "20%" }}
      >
        {/* <PrivacyButton
          id={id}
          isPublic={isPublic}
          allowChangePrivacy={allowChangePrivacy}
        />

        <DeleteButton className="mr-2" id={id} reload={reload} /> */}
        <AddCategoryButton id={id} reload={reload} />
      </footer>
    </div>
  );
};

export default PublicCategory;