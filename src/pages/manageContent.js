import React from "react";
import { Link } from "react-router-dom";
import ContentCard from "../component/ContentCard";

const ManageContent = () => {
  return (
    <div>
      <div className="card-grid">
        <ContentCard
          title="Create Quiz"
          description="Build a new quiz and assign it to your students."
          icon="📝"
          to="manage-quizzes"
        />
        <ContentCard
          title="Create Quiz"
          description="Build a new quiz and assign it to your students."
          icon="📝"
          to="quizzes"
        />
      </div>
    </div>
  );
};

export default ManageContent;
