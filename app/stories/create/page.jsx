"use client";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IoMdArrowBack } from "react-icons/io";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Redirect or show success message
        router.push("/");
      } else {
        // Handle error
        console.error("Failed to submit form");
        setLoading(false);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl">
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li>
              <div className="text-gray-400">Stories Management</div>
            </li>
            <li>
              <div className="text-blue-500">Add Stories</div>
            </li>
          </ul>
        </div>
        <h1>Add Stories</h1>
        <div
          onClick={() => router.back()}
          className="btn btn-sm rounded-full mt-4"
        >
          <IoMdArrowBack />
          Back
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow p-8 mt-8 rounded-xl"
        >
          <div className="flex flex-col">
            <div className="flex gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <input
                  type="text"
                  placeholder="Title"
                  className="input input-bordered w-full mt-4"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-red-500 mt-2">{errors.title.message}</p>
                )}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Writer Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Writer Name"
                  className="input input-bordered w-full mt-4"
                  {...register("writerName", {
                    required: "Writer Name is required",
                  })}
                />
                {errors.writerName && (
                  <p className="text-red-500 mt-2">
                    {errors.writerName.message}
                  </p>
                )}
              </label>
            </div>
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text">Synopsis</span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full mt-4 text-[16px]"
                placeholder="Synopsis"
                {...register("synopsis", { required: "Synopsis is required" })}
              ></textarea>
              {errors.synopsis && (
                <p className="text-red-500 mt-2">{errors.synopsis.message}</p>
              )}
            </label>
            <div className="grid grid-cols-2 gap-x-4">
              <label className="form-control w-full mt-4">
                <div className="label">
                  <span className="label-text">Category</span>
                </div>
                <input
                  type="text"
                  placeholder="Category"
                  className="input input-bordered w-full mt-4"
                  {...register("category", {
                    required: "Category is required",
                  })}
                />
                {errors.category && (
                  <p className="text-red-500 mt-2">{errors.category.message}</p>
                )}
              </label>
              <label className="form-control w-full mt-4">
                <div className="label">
                  <span className="label-text">Tags/Keywords Story</span>
                </div>
                <input
                  type="text"
                  placeholder="Tags/Keywords Story"
                  className="input input-bordered w-full mt-4"
                  {...register("tags", { required: "Tags are required" })}
                />
                {errors.tags && (
                  <p className="text-red-500 mt-2">{errors.tags.message}</p>
                )}
              </label>
              <label className="form-control w-full mt-4">
                <div className="label">
                  <span className="label-text">Cover Image</span>
                </div>
                <input
                  type="text"
                  placeholder="Cover Image"
                  className="input input-bordered w-full mt-4"
                  {...register("coverImage", {
                    required: "Cover Image is required",
                  })}
                />
                {errors.coverImage && (
                  <p className="text-red-500 mt-2">
                    {errors.coverImage.message}
                  </p>
                )}
              </label>
              <label className="form-control w-full mt-4">
                <div className="label">
                  <span className="label-text">Status</span>
                </div>
                <input
                  type="text"
                  placeholder="Status"
                  className="input input-bordered w-full mt-4"
                  {...register("status", { required: "Status is required" })}
                />
                {errors.status && (
                  <p className="text-red-500 mt-2">{errors.status.message}</p>
                )}
              </label>
            </div>

            <div className="flex justify-end mt-4">
              <div className="">
                <button
                  onClick={() => router.back()}
                  className="py-3 px-6 font-semibold border h-14 mr-2 border-gray-200 rounded-full"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary rounded-full px-8 text-lg mt-4 max-w-52 ml-auto"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Saving..." : "Save"} {/* Show loading text */}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

{
  /* <div
              onClick={() => router.push("/stories/create/add-chapter")}
              className="btn btn-primary rounded-full px-8 text-lg mt-8 max-w-52 ml-auto"
            >
              <IoMdAdd className="text-2xl" />
              Add Chapter
            </div> */
}

{
  /* <div className="overflow-x-auto mt-8">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Last Updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>
                    <div className="">
                      <MdMoreHoriz className="text-2xl text-black" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <div className="">
              <button
                onClick={() => router.back()}
                className="py-3 px-6 font-semibold border h-14 mr-2 border-gray-200 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-full px-8 text-lg mt-4 max-w-52 ml-auto"
              >
                Save
              </button>
            </div>
          </div> */
}
