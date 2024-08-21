"use client";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Page({ params }) {
  const router = useRouter();
  const { id, id_chapter } = params;
  const { register, handleSubmit, setValue } = useForm();
  const [initialDate, setInitialDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = () => {
      const existingChapters =
        JSON.parse(localStorage.getItem("chapters")) || [];
      const chapter = existingChapters.find((ch) => ch.id == id_chapter);
      if (chapter) {
        setValue("title", chapter.title || "");
        setValue("story", chapter.story || "");
        setValue("lastUpdated", chapter.lastUpdated || "");
        setInitialDate(
          chapter.lastUpdated || new Date().toISOString().split("T")[0]
        );
      } else {
        console.error("Chapter not found");
      }

      setLoading(false);
    };

    fetchChapter();
  }, [id, setValue]);

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl">
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li>
              <div className="text-gray-400">Stories Management</div>
            </li>
            <li>
              <div className="text-gray-400">Story Detail</div>
            </li>
            <li>
              <div className="text-blue-500">Chapter Detail</div>
            </li>
          </ul>
        </div>
        <h1>Chapter Detail</h1>
        <div
          onClick={() => router.back()}
          className="btn btn-sm rounded-full mt-4"
        >
          <IoMdArrowBack />
          Back
        </div>

        <form className="bg-white shadow p-8 mt-8 rounded-xl">
          <div className="flex flex-col">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                type="text"
                disabled
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
                disabled
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
        </form>
      </div>
    </DashboardLayout>
  );
}
