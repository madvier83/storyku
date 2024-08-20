"use client";
import DashboardLayout from "@/layouts/DashboardLayout";
import { MdMoreHoriz, MdOutlineFilterAlt } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import { useRouter } from "next/navigation";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchStories();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl">
        <h1>Stories</h1>
        <div className="flex justify-between items-center mt-8">
          <label className="input bg-gray-100 flex w-full max-w-xs items-center gap-2">
            <MdOutlineSearch className="text-2xl" />
            <input
              type="text"
              className="grow"
              placeholder="Search by Writers/Title"
            />
          </label>

          <div className="flex items-center">
            <details className="dropdown dropdown-end">
              <summary className="btn bg-white border shadow w-14 h-14 p-0 rounded-full">
                <MdOutlineFilterAlt className="text-3xl text-black" />
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-96 p-6 shadow mt-4 max-w-lg">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">Filter</h2>
                </div>
                <label className="form-control w-full mt-4">
                  <div className="label">
                    <span className="label-text">Category</span>
                  </div>
                  <select
                    className="select select-bordered"
                    defaultValue={null}
                  >
                    <option disabled>Pick one</option>
                  </select>
                </label>
                <label className="form-control w-full mt-4">
                  <div className="label">
                    <span className="label-text">Status</span>
                  </div>
                  <select
                    className="select select-bordered"
                    defaultValue={null}
                  >
                    <option disabled>Pick one</option>
                  </select>
                </label>
                <div className="flex justify-between mt-8">
                  <button className="py-3 px-6 font-semibold border border-gray-200 rounded-full">
                    Reset
                  </button>
                  <div className="flex gap-2">
                    <button className="py-3 px-6 font-semibold border border-gray-200 rounded-full">
                      Cancel
                    </button>
                    <button className="btn px-6 bg-orange-500 rounded-full">
                      Filter
                    </button>
                  </div>
                </div>
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

        <div className="overflow-x-auto mt-8">
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
                    <td>{story.category}</td>
                    <td>{story.tags}</td>
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
                      <div className="">
                        <MdMoreHoriz className="text-2xl text-black" />
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
