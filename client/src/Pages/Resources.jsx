// Resources.jsx
import React from "react";
// import SearchBar from "../Components/SearchBar";
import FilterSection from "../Components/FilterSection";
import ResourcesCards from "../Components/ResourcesCard";
// import SavedResources from "../Components/SavedResources";
import UploadResources from "../Components/UploadResources";

// import HeaderBar from "../Components/HeaderBar";
// import FooterBar from "../Components/FooterBar";
export default function Resources() {
  return (
    <div className="resources-page">
      {/* <HeaderBar /> */}
      {/* <SearchBar /> */}
      <FilterSection />
      <ResourcesCards />
      {/* <SavedResources /> */}
      <UploadResources />
      {/* <FooterBar /> */}
    </div>
  );
}
