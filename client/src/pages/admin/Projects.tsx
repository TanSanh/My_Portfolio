import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  X,
  Loader2,
  Search,
  RefreshCw,
  Upload,
  Camera,
} from "lucide-react";
import { projectService, Project } from "../../services/projectService";
import { uploadService } from "../../services/uploadService";

interface ProjectFormData {
  title: { en: string; vi: string };
  description: { en: string; vi: string };
  image: string;
  technologies: string[];
  link: string;
  github: string;
}

const emptyForm: ProjectFormData = {
  title: { en: "", vi: "" },
  description: { en: "", vi: "" },
  image: "",
  technologies: [],
  link: "",
  github: "",
};

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(emptyForm);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectService.getAll();
      setProjects(data.sort((a: Project, b: Project) => a.order - b.order));
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setShowModal(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || "",
      technologies: project.technologies || [],
      link: project.link || "",
      github: project.github || "",
    });
    setImageFile(null);
    setImagePreview(project.image || "");
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData({ ...formData, image: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = formData.image;

      // Upload new image if selected
      if (imageFile) {
        setUploading(true);
        const uploadResult = await uploadService.uploadImage(imageFile);
        imageUrl = uploadResult.url;
        setUploading(false);
      }

      const submitData = { ...formData, image: imageUrl };

      if (editingProject) {
        await projectService.update(editingProject._id, submitData);
      } else {
        await projectService.create(submitData);
      }
      await fetchProjects();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await projectService.delete(id);
      await fetchProjects();
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const addTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.title.vi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((t) =>
        t.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your portfolio projects ({projects.length} total)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchProjects}
            className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg text-sm transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a1a] border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
      </motion.div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-gray-500">
            {searchTerm ? "No projects match your search" : "No projects yet. Create your first one!"}
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative rounded-xl p-[1px] bg-gradient-to-br from-white/10 to-white/5 group"
            >
              <div className="bg-[#0a0a1a] rounded-xl overflow-hidden flex flex-col h-full">
                {/* Image */}
                <div className="h-48 bg-dark-300/50 relative overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title.en}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-700" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-white font-semibold mb-1 truncate">
                    {project.title.en}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                    {project.description.en}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 bg-white/5 text-gray-400 text-xs rounded">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Spacer */}
                  <div className="flex-1"></div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(project._id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0a0a1a] rounded-xl w-full max-w-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="text-xl font-bold text-white">
                  {editingProject ? "Edit Project" : "Create Project"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                    Project Image
                  </label>
                  <div className="relative">
                    {imagePreview ? (
                      <div className="relative group">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm transition-colors"
                          >
                            Change
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-sm transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-48 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-primary/30 transition-colors"
                      >
                        <Upload className="w-10 h-10 text-gray-500" />
                        <div className="text-center">
                          <p className="text-gray-400 text-sm">
                            Click to upload image
                          </p>
                          <p className="text-gray-600 text-xs mt-1">
                            PNG, JPG, GIF, WEBP (max 5MB)
                          </p>
                        </div>
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      Title (EN)
                    </label>
                    <input
                      type="text"
                      value={formData.title.en}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: { ...formData.title, en: e.target.value },
                        })
                      }
                      required
                      className="w-full px-4 py-2.5 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                      placeholder="Project name in English"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      Title (VI)
                    </label>
                    <input
                      type="text"
                      value={formData.title.vi}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: { ...formData.title, vi: e.target.value },
                        })
                      }
                      required
                      className="w-full px-4 py-2.5 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                      placeholder="Tên dự án bằng tiếng Việt"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      Description (EN)
                    </label>
                    <textarea
                      value={formData.description.en}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            en: e.target.value,
                          },
                        })
                      }
                      required
                      rows={3}
                      className="w-full px-4 py-2.5 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all resize-none"
                      placeholder="Project description in English"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      Description (VI)
                    </label>
                    <textarea
                      value={formData.description.vi}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            vi: e.target.value,
                          },
                        })
                      }
                      required
                      rows={3}
                      className="w-full px-4 py-2.5 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all resize-none"
                      placeholder="Mô tả dự án bằng tiếng Việt"
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                    Technologies
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTech())
                      }
                      className="flex-1 px-4 py-2.5 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                      placeholder="Add technology and press Enter"
                    />
                    <button
                      type="button"
                      onClick={addTech}
                      className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTech(tech)}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={formData.link}
                      onChange={(e) =>
                        setFormData({ ...formData, link: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) =>
                        setFormData({ ...formData, github: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-dark-300/50 border border-white/5 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50"
                  >
                    {saving || uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {uploading ? "Uploading..." : "Saving..."}
                      </>
                    ) : editingProject ? (
                      "Update Project"
                    ) : (
                      "Create Project"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0a0a1a] rounded-xl p-6 max-w-sm w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Delete Project</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Are you sure you want to delete this project? This action cannot be
                undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
