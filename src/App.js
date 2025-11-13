import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, CheckCircle, Circle, Trash2, Github, Linkedin } from "lucide-react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((t) =>
    filter === "completed"
      ? t.completed
      : filter === "pending"
      ? !t.completed
      : true
  );

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-700 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-gray-900"
      }`}
    >
      {/* Landing Page */}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center justify-center text-center space-y-6"
          >
            <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
              ✨ TodoFlow
            </h1>
            <p className="max-w-md text-lg opacity-90">
              A beautiful and smart to-do manager built by{" "}
              <span className="font-semibold">Sheetal Yadav</span> 💻
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStarted(true)}
              className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-100 transition"
            >
              Get Started 🚀
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App */}
      <AnimatePresence>
        {started && (
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-3xl shadow-2xl w-full max-w-lg backdrop-blur-lg mt-6 ${
              darkMode
                ? "bg-gray-800/70 border border-gray-700"
                : "bg-white/60 border border-white/30"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-extrabold tracking-tight">
                TodoFlow 📝
              </h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:scale-110 transition-transform"
              >
                {darkMode ? (
                  <Sun className="text-yellow-300" />
                ) : (
                  <Moon className="text-gray-700" />
                )}
              </button>
            </div>

            {/* Input */}
            <div className="flex mb-4">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add your next task..."
                className={`flex-grow p-3 rounded-l-xl outline-none border focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus:ring-indigo-400 text-white"
                    : "bg-white border-gray-300 focus:ring-indigo-500"
                }`}
              />
              <button
                onClick={addTask}
                className="bg-indigo-600 text-white px-6 rounded-r-xl hover:bg-indigo-700 transition"
              >
                Add
              </button>
            </div>

            {/* Filters */}
            <div className="flex justify-around mb-5 text-sm font-semibold">
              {["all", "pending", "completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`capitalize px-3 py-1 rounded-full ${
                    filter === f
                      ? darkMode
                        ? "bg-indigo-500 text-white"
                        : "bg-indigo-600 text-white"
                      : darkMode
                      ? "text-gray-400 hover:text-indigo-400"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Task List */}
            <ul className="space-y-3">
              <AnimatePresence>
                {filteredTasks.map((t, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center justify-between p-3 rounded-2xl shadow-sm ${
                      darkMode
                        ? "bg-gray-700/70 border border-gray-600"
                        : "bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div
                      onClick={() => toggleComplete(index)}
                      className="flex items-center cursor-pointer"
                    >
                      {t.completed ? (
                        <CheckCircle className="text-green-500 mr-2" />
                      ) : (
                        <Circle className="text-gray-400 mr-2" />
                      )}
                      <span
                        className={`text-lg ${
                          t.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {t.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(index)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {/* Empty State */}
            {filteredTasks.length === 0 && (
              <p className="text-center mt-6 opacity-70 italic">
                No {filter} tasks 💤
              </p>
            )}

            {/* Footer */}
            <footer className="mt-10 text-center text-sm opacity-80">
              <div className="flex justify-center gap-4 mb-2">
                <a
                  href="https://github.com/sheeturao29"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sheetal-yadav-28a789293/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="hover:scale-110 transition-transform" />
                </a>
              </div>
              <p>© 2025 • Built with ❤️ by Sheetal Yadav</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
