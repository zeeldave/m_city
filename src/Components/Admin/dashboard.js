import React from "react";
import AdminLayout from "../../Hoc/adminLayout";

const Dashboard = (props) => {
  console.log(props);
  return (
    <AdminLayout>
      <div className="user_dashboard">
        <div>This is your Dashboard</div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
