
import { useState } from "react";
import { Sidebar } from "../components/sections/Sidebar";
import { DocumentsSection } from "../components/sections/DocumentsSection";
import { AccountSection } from "../components/sections/AccountSection";

export  const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("documents");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "documents":
        return <DocumentsSection />;
      case "account":
        return <AccountSection />;
      default:
        return <DocumentsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <main 
        className={`flex-1 p-8 transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {activeSection === "documents" ? "Documents" : "Account"}
            </h1>
            <p className="text-gray-600">
              {activeSection === "documents" 
                ? "Manage and view your uploaded documents" 
                : "View and edit your account information"
              }
            </p>
          </div>
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};