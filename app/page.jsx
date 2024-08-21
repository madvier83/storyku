"use client";
import DashboardLayout from "@/layouts/DashboardLayout";
import { MdMoreHoriz, MdOutlineFilterAlt } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import tagOptions from "@/constants/tagOptions";

export default function Home() {
  const router = useRouter();
  const detailsRef = useRef(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const closeDetails = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };

  const onSubmit = async (data) => {
    closeDetails();
    setLoading(true);
    setSearch("");
    try {
      const queryParams = new URLSearchParams(data).toString();
      const response = await fetch(`/api/stories?${queryParams}`);
      const stories = await response.json();
      setStories(stories);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch filtered stories", error);
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/stories?search=${encodeURIComponent(search)}`
      );
      const stories = await response.json();
      setStories(stories);
    } catch (error) {
      console.error("Failed to fetch search results", error);
    }
  };

  const fetchStories = async () => {
    try {
      const response = await fetch("/api/stories");
      if (response.ok) {
        const data = await response.json();
        setStories(data);
      } else {
        console.error("Failed to fetch stories");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  async function deleteStory(id) {
    try {
      const response = await fetch(`/api/stories?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(`Error: ${response.status} - ${errorData.error}`);
      }

      const result = await response.json();
      fetchStories();
    } catch (error) {
      console.error("Failed to delete story:", error.message);
    }
  }

  useEffect(() => {
    fetchStories();
    localStorage.removeItem("chapters");
    sessionStorage.removeItem("story-form");
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl">
        <h1>Stories</h1>
        <div className="flex flex-wrap gap-4 justify-between items-center mt-8">
          <form
            onSubmit={handleSearchSubmit}
            className="input bg-gray-100 flex w-full max-w-xs items-center gap-2"
          >
            <MdOutlineSearch className="text-2xl" />
            <input
              type="text"
              className="grow"
              placeholder="Search by Writers/Title"
              value={search}
              onChange={handleSearchChange}
            />
            <button type="submit" className="hidden">
              Search
            </button>
          </form>

          <div className="flex items-center">
            <details ref={detailsRef} className="dropdown dropdown-end">
              <summary className="btn bg-white border shadow w-14 h-14 p-0 rounded-full">
                <MdOutlineFilterAlt className="text-3xl text-black" />
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-96 p-6 shadow mt-4 max-w-lg">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">Filter</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text">Category</span>
                    </div>
                    <select
                      className="select select-bordered w-full mt-2 text-[16px]"
                      {...register("category")}
                    >
                      <option value="all">All</option>
                      <option value="uncategorized">Uncategorized</option>
                      {tagOptions.map((tag, index) => (
                        <option key={index} value={tag.value}>
                          {tag.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text">Status</span>
                    </div>
                    <select
                      className="select select-bordered w-full mt-2 text-[16px]"
                      {...register("status")}
                    >
                      <option value="all">All</option>
                      <option value="publish">Publish</option>
                      <option value="draft">Draft</option>
                    </select>
                  </label>
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={() => reset()}
                      className="py-3 px-6 font-semibold border border-gray-200 rounded-full"
                    >
                      Reset
                    </button>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={closeDetails}
                        className="py-3 px-6 font-semibold border border-gray-200 rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn px-6 bg-orange-500 rounded-full text-white"
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                </form>
              </ul>
            </details>

            <div className="border h-12 mx-4 opacity-40"></div>

            <div
              onClick={() => router.push("/stories/create")}
              className="btn btn-primary rounded-full px-8 text-lg"
            >
              <IoMdAdd className="text-2xl" />
              Add Story
            </div>
          </div>
        </div>

        <div className="mt-8">
          <table className="table w-full">
            <thead>
              <tr className="text-black font-semibold">
                <th>No</th>
                <th>Title</th>
                <th>Writers</th>
                <th>Category</th>
                <th>Keyword</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {stories.length > 0 ? (
                stories.map((story, index) => (
                  <tr key={story._id}>
                    <td>{index + 1}</td>
                    <td>{story.title}</td>
                    <td>{story.writerName}</td>
                    <td className="capitalize">{story.category}</td>
                    <td>
                      <div className="flex gap-2">
                        {story.tags?.map((tag, index) => {
                          return (
                            <div
                              key={index}
                              className="bg-slate-100 p-3 capitalize rounded-full text-center text-slate-500 w-min px-4"
                            >
                              {tag.label}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td>
                      {story.status == "publish" ? (
                        <div className="bg-emerald-100 p-3 capitalize rounded-full text-center text-emerald-500 w-min px-8">
                          {story.status}
                        </div>
                      ) : (
                        <div className="bg-amber-100 p-3 capitalize rounded-full text-center text-amber-500 w-min px-8">
                          {story.status}
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="dropdown dropdown-left">
                        <div tabIndex={0}>
                          <MdMoreHoriz className="text-2xl text-black" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                        >
                          <li>
                            <div
                              className="text-blue-500"
                              onClick={() => {
                                router.push(`/stories/detail/${story._id}`);
                              }}
                            >
                              Detail
                            </div>
                          </li>
                          <li>
                            <div
                              className="text-emerald-500"
                              onClick={() => {
                                router.push(`/stories/update/${story._id}`);
                              }}
                            >
                              Update
                            </div>
                          </li>
                          <li>
                            <div
                              className="text-rose-500"
                              onClick={() => {
                                if (
                                  confirm("Delete this chapter permanently?")
                                ) {
                                  deleteStory(story._id);
                                }
                              }}
                            >
                              Delete
                            </div>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  {loading ? (
                    <td colSpan="7" className="text-center">
                      Loading Data ...
                    </td>
                  ) : (
                    <td colSpan="7" className="text-center">
                      No stories available
                    </td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
