import React, { useState } from "react";
import "../Styles/FilterSection.css"; // Import CSS for styling

export default function FilterSection() {
  const courses = [
    "B.Tech - Computer Science Engineering",
    "B.Tech - Artificial Intelligence and Machine Learning",
    "B.Tech - Internet of Things",
    "BCA - Bachelor of Computer Applications",
    "BA - Bachelor of Arts",
    "BSc - Bachelor of Science",
    "B.Tech - Mechanical Engineering",
    "B.Tech - Electronics and Communication Engineering",
    "B.Tech - Civil Engineering",
    "B.Tech - Electrical and Electronics Engineering",
    "MBA - Master of Business Administration",
    "MCA - Master of Computer Applications",
    "MSc - Master of Science",
    "MA - Master of Arts",
    "B.Tech - Data Science",
    "B.Com - Bachelor of Commerce",
    "B.Tech - Agriculture Engineering",
    "B.Tech - Chemical Engineering",
    "B.Tech - Biotechnology",
    "B.Tech - Cyber Security",
    "B.Tech - Aeronautical Engineering",
    "B.Tech - Architecture",
    "B.Tech - Automobile Engineering",
    "B.Sc - Nursing",
    "B.Pharma - Bachelor of Pharmacy",
    "Diploma in Engineering",
    "B.Sc - Biochemistry",
    "B.Sc - Bioinformatics",
    "B.Sc - Statistics",
    "BA - English",
    "B.Tech - Information Technology",
    "B.Com (Hons) - Bachelor of Commerce",
    "BBA - Bachelor of Business Administration",
    "M.Tech - Computer Science Engineering",
    "M.Tech - Electronics and Communication Engineering",
    "M.Tech - Mechanical Engineering",
    "M.Tech - Civil Engineering",
    "M.Tech - Electrical and Electronics Engineering",
    "M.Sc - Biotechnology",
    "M.Sc - Physics",
    "M.Sc - Chemistry",
    "M.Sc - Mathematics",
    "MSW - Master of Social Work",
    "LLB - Bachelor of Laws",
    "LLM - Master of Laws",
    "PGDM - Post Graduate Diploma in Management",
    "B.Sc - Psychology",
    "B.Sc - Architecture",
    "B.Com - Computer Applications",
    "M.Com - Master of Commerce",
    "MPA - Master of Performing Arts",
    "PGDM - Banking",
    "PGDM - Finance",
    "PGDM - Marketing",
    "PGDM - HR",
    // Add more courses as needed
  ];
  const universities = [
    "Acharya Nagarjuna University",
    "Abdul Kalam Technical University, Lucknow",
    "Aligarh Muslim University",
    "Amity University",
    "Annamalai University",
    "Andhra University",
    "Banaras Hindu University",
    "Bharathiar University",
    "Bharati Vidyapeeth Deemed University",
    "Birla Institute of Technology",
    "Birla Institute of Technology and Science, Pilani",
    "Chandigarh University",
    "Chaudhary Charan Singh University (CCSU)",
    "Chhatrapati Shivaji Maharaj University",
    "Dr. B.R. Ambedkar University",
    "Delhi Technological University",
    "Don Bosco University",
    "D.Y. Patil University",
    "Gandhi Institute of Technology and Management",
    "Gujarat University",
    "Guru Gobind Singh Indraprastha University",
    "Guru Nanak Dev University",
    "Himachal Pradesh University",
    "Indian Institute of Management Ahmedabad",
    "Indian Institute of Management Bangalore",
    "Indian Institute of Management Calcutta",
    "Indian Institute of Management Indore",
    "Indian Institute of Management Kozhikode",
    "Indian Institute of Management Lucknow",
    "Indian Institute of Management Raipur",
    "Indian Institute of Management Ranchi",
    "Indian Institute of Management Udaipur",
    "Indian Institute of Management Visakhapatnam",
    "Indian Institute of Technology Bhilai",
    "Indian Institute of Technology Bombay",
    "Indian Institute of Technology Delhi",
    "Indian Institute of Technology Gandhinagar",
    "Indian Institute of Technology Hyderabad",
    "Indian Institute of Technology Kanpur",
    "Indian Institute of Technology Kharagpur",
    "Indian Institute of Technology Madras",
    "Indian Institute of Technology Roorkee",
    "Indian Institute of Technology Tirupati",
    "Indian Institute of Technology Varanasi",
    "Indian Statistical Institute",
    "Indira Gandhi National Open University",
    "Indira Gandhi Institute of Aeronautics",
    "Jamia Hamdard",
    "Jamia Millia Islamia",
    "Jawaharlal Nehru Technological University",
    "Jawaharlal Nehru University",
    "K. L. University",
    "Karnataka University",
    "KREA University",
    "Lady Shri Ram College for Women",
    "Mahatma Gandhi University",
    "Manipal Academy of Higher Education",
    "Manipal University Jaipur",
    "Mizoram University",
    "National Institute of Fashion Technology",
    "National Institute of Technology Agartala",
    "National Institute of Technology Karnataka",
    "National Institute of Technology Kurukshetra",
    "National Institute of Technology Patna",
    "National Institute of Technology Rourkela",
    "National Institute of Technology Silchar",
    "National Institute of Technology Tiruchirappalli",
    "Pandit Deendayal Petroleum University",
    "Panjab University",
    "Post Graduate Institute of Medical Education and Research",
    "Rajiv Gandhi University",
    "Rajasthan Technical University",
    "Shiv Nadar University",
    "Sardar Vallabhbhai Patel University of Agriculture and Technology",
    "Sardar Patel University",
    "Symbiosis International University",
    "Tezpur University",
    "Thapar Institute of Engineering and Technology",
    "Tata Institute of Social Sciences",
    "University of Agricultural Sciences, Bangalore",
    "University of Allahabad",
    "University of Calcutta",
    "University of Delhi",
    "University of Jammu",
    "University of Kashmir",
    "University of Lucknow",
    "University of Madras",
    "University of Mumbai",
    "University of Mysore",
    "University of Pune",
    "University of Rajasthan",
    "University of Science and Technology",
    "Vardhman Mahaveer Open University",
    "VIT University",
    "Yashwantrao Chavan Maharashtra Open University",
    "Narsee Monjee Institute of Management Studies",
    "Nirma University of Science and Technology",
    "Bennett University",
    "National Institute of Industrial Engineering",
    "National Institute of Fashion Technology",
    "National Institute of Technical Teachers Training and Research",
    "Rajiv Gandhi University of Knowledge Technologies",
    "Indian Institute of Management Raipur",
    "Indian Institute of Management Kashipur",
    "Gujarat Technological University",
    "Sardar Vallabhbhai Patel Institute of Technology",
    "Amrita University",
    "ICFAI University",
    "Gandhi Institute of Management Studies",
    "Rajasthan University of Health Sciences",
    "Shivaji University",
    "University of Burdwan",
    "Jadavpur University",
    "Bharati Vidyapeeth University",
    "Maharashtra Institute of Technology",
    "University of Petroleum and Energy Studies",
    "SRM Institute of Science and Technology",
    "Lovely Professional University",
    "Doon University",
    "Kalasalingam Academy of Research and Education",
    "R.V. College of Engineering",
    "St. Xavier's College",
    "T.A. Pai Management Institute",
    "Birla Institute of Technology, Mesra",
    "Chennai Mathematical Institute",
    "Indira Gandhi Institute of Aeronautics",
    "National Institute of Fashion Technology, Mumbai",
    "National Institute of Technology, Delhi",
    "Manipal University, Jaipur",
    "National Institute of Technology, Silchar",
    "National Institute of Technical Teachers Training and Research",
    "Mahatma Gandhi Antarrashtriya Hindi Vishwavidyalaya",
    "Gandhigram Rural Institute",
    "Bishop Heber College",
    "Shree Chandraprabhu Jain College",
    "Satyawati College",
    "Vivekananda Institute of Professional Studies",
    "Mahatma Jyotiba Phule Rohilkhand University",
    "Mizoram University",
    "Sri Ramachandra Institute of Higher Education and Research",
    "Tezpur University",
    "University of Madras",
    "Bharath Institute of Higher Education and Research",
    "Kavikulaguru Kalidasa Sanskrit University",
    "Sambalpur University",
    "Kerala University",
    "Bharati Vidyapeeth University",
    "Shivaji University",
    "Jawaharlal Nehru University",
    "Utkal University",
    "Central University of Jharkhand",
    "University of Hyderabad",
  ];

  const courseYears = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "Final Year",
    // Add more years as needed
  ];

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCourseYear, setSelectedCourseYear] = useState("");

  const handleFilter = () => {
    // Logic to filter resources based on selected values
    console.log("Filters applied:", {
      selectedCourse,
      selectedUniversity,
      selectedCourseYear,
    });
  };

  const handleClearFilters = () => {
    setSelectedCourse("");
    setSelectedUniversity("");
    setSelectedCourseYear("");
  };

  return (
    <div className="filter-section">
      <h2>Filter Resources</h2>
      <div className="filters">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>

        <select
          value={selectedUniversity}
          onChange={(e) => setSelectedUniversity(e.target.value)}
        >
          <option value="">Select University</option>
          {universities.map((university, index) => (
            <option key={index} value={university}>
              {university}
            </option>
          ))}
        </select>

        <select
          value={selectedCourseYear}
          onChange={(e) => setSelectedCourseYear(e.target.value)}
        >
          <option value="">Select Course Year</option>
          {courseYears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button onClick={handleFilter}>Apply Filters</button>
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>
    </div>
  );
}
