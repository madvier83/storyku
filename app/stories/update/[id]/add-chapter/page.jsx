"use client";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Page({ params }) {
  const router = useRouter();
  const { id } = params;
  const { register, handleSubmit, setValue } = useForm();
  const [initialDate, setInitialDate] = useState("");

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setInitialDate(currentDate);
    setValue("lastUpdated", currentDate);
  }, [setValue]);

  const onSubmit = (data) => {
    const chapter = {
      id: Date.now(),
      title: data.title,
      story: data.story,
      lastUpdated: data.lastUpdated,
    };

    const existingChapters = JSON.parse(localStorage.getItem("chapters")) || [];
    existingChapters.push(chapter);
    localStorage.setItem("chapters", JSON.stringify(existingChapters));
    router.push(`/stories/update/${id}`);
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
              <div className="text-gray-400">Add Stories</div>
            </li>
            <li>
              <div className="text-blue-500">Add Chapter</div>
            </li>
          </ul>
        </div>
        <h1>Add Chapter</h1>
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
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full mt-4"
                {...register("title", { required: true })}
              />
            </label>
            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text">Story</span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full mt-4"
                placeholder="Story"
                {...register("story", { required: true })}
              ></textarea>
              {/* <QuillEditor {...register("story")} onChange={(content) => setValue("story", content)} /> */}
            </label>

            <input
              type="hidden"
              {...register("lastUpdated")}
              value={initialDate}
            />
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
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
