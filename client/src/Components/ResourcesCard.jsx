import React, { useEffect, useState } from "react";
import "../Styles/ResourcesCards.css";
import AuthService from "../Services/AuthService";

export default function ResourcesCards() {
  const [resources, setResources] = useState([]); // State to hold the resources
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to save a resource
  // const handleSave = async (resource) => {
  //   console.log("User Data-: ", userData._id);

  //   // Ensure the user is logged in
  //   if (!userData || !userData._id) {
  //     alert("You need to log in to save resources.");
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem("token"); // Retrieve token from localStorage
  //     if (!token) {
  //       alert("Authentication token not found. Please log in.");
  //       return;
  //     }

  //     const endpoint = "http://localhost:3002/api/resources/save";
  //     const response = await fetch(endpoint, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`, // Pass token in Authorization header
  //       },
  //       body: JSON.stringify({
  //         userId: userData._id, // Use the user ID from the context
  //         resource: resource,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to save resource. Status: " + response.status);
  //     }

  //     const data = await response.json();
  //     alert(data.message);
  //     setResources((prev) => [...prev, data.savedResource]); // Append the saved resource
  //   } catch (error) {
  //     console.error("Error saving resource:", error);
  //     alert("Error saving resource: " + error.message);
  //   }
  // };
  const handleSave = async (resource) => {
    console.log("User Data-: ", userData._id); // Log userId for debugging

    // Ensure the user is logged in
    if (!userData || !userData._id) {
      alert("You need to log in to save resources.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        alert("Authentication token not found. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:3002/api/resources/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
        body: JSON.stringify({
          userId: userData._id, // Use the user ID from the context
          resource: resource, // Pass the resource data
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save resource. Status: " + response.status);
      }

      const data = await response.json(); // Parse the response
      alert(data.message);
      setResources((prev) => [...prev, data.savedResource]); // Append the saved resource
    } catch (error) {
      console.error("Error saving resource:", error);
      alert("Error saving resource: " + error.message);
    }
  };

  // Fetch resources and user data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch resources
        const response = await fetch("http://localhost:3002/api/resources");
        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }
        const resourcesData = await response.json();

        // Fetch user data using the token stored in localStorage
        const user_data = await AuthService.getUserData(
          localStorage.getItem("token")
        );

        // Set state values
        setResources(resourcesData); // Set the fetched resources in state
        setUserData(user_data); // Set the fetched user data
        setLoading(false); // Stop the loading indicator
      } catch (error) {
        console.error(error); // Handle errors appropriately
        setError("Failed to load resources or user data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Render a loading indicator if the user data is still being fetched
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="resources-cards">
      {resources.map((resource) => (
        <div className="card">
          <strong>Title:</strong> {resource?.title || "No Title"}
          <br />
          <strong>Description: </strong>{" "}
          {resource?.description || "No Description"}
          <p>
            <strong>Type:</strong> {resource?.type || "N/A"}
          </p>
          <p>
            <strong>Course:</strong> {resource?.course?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Academic Year:</strong> {resource?.academicYear || "N/A"}
          </p>
          <a
            href={resource?.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="view-button">View</button>
          </a>
          <button className="save-button" onClick={() => handleSave(resource)}>
            Save
          </button>
        </div>
      ))}
    </div>
  );
}
