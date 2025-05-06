import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  assignee?: {
    name: string;
    avatar: string;
  };
}

interface TaskBoardProps {
  tasks?: Task[];
  onTaskMove?: (taskId: string, newStatus: Task["status"]) => void;
  onTaskClick?: (task: Task) => void;
  isLoading?: boolean;
}

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Design System Updates",
    description: "Update component library with new design tokens",
    status: "todo",
    assignee: {
      name: "Alice Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate new backend endpoints",
    status: "in-progress",
    assignee: {
      name: "Bob Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
  },
  {
    id: "3",
    title: "User Testing",
    description: "Conduct user testing sessions",
    status: "done",
    assignee: {
      name: "Carol Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    },
  },
];

const TaskBoard = ({
  tasks = defaultTasks,
  onTaskMove = () => {},
  onTaskClick = () => {},
  isLoading = false,
}: TaskBoardProps) => {
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const columns = [
    { id: "todo", title: "To Do", color: "bg-gray-50", borderColor: "border-gray-200" },
    { id: "in-progress", title: "In Progress", color: "bg-blue-50", borderColor: "border-blue-100" },
    { id: "done", title: "Done", color: "bg-green-50", borderColor: "border-green-100" },
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task["status"]) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    onTaskMove(taskId, status);
  };

  return (
    <div className="w-full h-full bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-gray-900">Task Board</h2>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 h-9 shadow-sm transition-colors">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`${column.color} rounded-xl p-4 border ${column.borderColor}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id as Task["status"])}
          >
            <h3 className="font-medium text-gray-900 mb-4 flex items-center">
              <span
                className={`h-2 w-2 rounded-full mr-2 ${
                  column.id === "todo"
                    ? "bg-gray-400"
                    : column.id === "in-progress"
                    ? "bg-blue-400"
                    : "bg-green-400"
                }`}
              ></span>
              {column.title}
            </h3>

            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[150px]">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full border-4 border-gray-100 border-t-blue-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500/20 animate-pulse" />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-500 mt-3">Loading tasks...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks
                  .filter((task) => task.status === column.id)
                  .map((task) => (
                    <motion.div
                      key={task.id}
                      className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
                      draggable
                      drag
                      // onDragStart={(e) => handleDragStart(e, task.id)}
                      onClick={() => onTaskClick(task)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="font-medium text-gray-800">{task.title}</h4>
                      <p className="text-sm text-gray-500">{task.description}</p>
                      {task.assignee && (
                        <div className="mt-3 flex items-center gap-2">
                          <img
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                            className="h-6 w-6 rounded-full"
                          />
                          <span className="text-sm text-gray-600">{task.assignee.name}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
