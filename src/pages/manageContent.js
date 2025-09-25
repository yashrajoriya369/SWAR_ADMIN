import React from "react";
import ContentCard from "../component/ContentCard";

const contentItems = [
  {
    title: "Create Quiz",
    description: "Build a new quiz and assign it tot your students",
    icon: "📝",
    to: "manage-quizzes",
  },
  {
    title: "All Quizzes",
    description: "View and manage all created quizzes.",
    icon: "📚",
    to: "quizzes",
  },
];

const ManageContent = () => {
  return (
    <div>
      <div className="card-grid">
        {contentItems.map((item, index) => (
          <ContentCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            to={item.to}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageContent;
