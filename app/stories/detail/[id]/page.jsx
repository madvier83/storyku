"use client";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IoMdAdd, IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { MdMoreHoriz } from "react-icons/md";
import useFormPersist from "react-hook-form-persist";
import moment from "moment";
import Select from "react-select";

const tagOptions = [
  { value: "fantasy", label: "Fantasy" },
  { value: "fiction", label: "Fiction" },
  { value: "romance", label: "Romance" },
  { value: "music", label: "Music" },
  { value: "school", label: "School" },
  { value: "science", label: "Science" },
  { value: "technology", label: "Technology" },
  { value: "mathematics", label: "Mathematics" },
  { value: "engineering", label: "Engineering" },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#F6F6F6",
    borderColor: "#F6F6F6",
    minHeight: "45px",
    borderRadius: "8px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: "45px",
    padding: "0 6px",
    borderRadius: "8px",
  }),
  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "45px",
    opacity: ".5",
  }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "#F57C2B",
      borderRadius: "27px",
      padding: "4px 8px",
      color: "#fff",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "#fff",
  }),
};

export default function Page({ params }) {
  const router = useRouter();
  const { id } = params;

  const [chapters, setChapters] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const {
    control,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  async function getStoryById(id) {
    setLoadingData(true);
    try {
      const response = await fetch(`/api/stories?id=${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.error}`);
      }

      const story = await response.json();

      const localChapters = JSON.parse(localStorage.getItem("chapters"));
      if (!localChapters) {
        localStorage.setItem("chapters", JSON.stringify(story.chapters));
        setChapters(story.chapters || []);
      } else {
        setChapters(localChapters);
      }

      reset({
        title: story.title,
        writerName: story.writerName,
        synopsis: story.synopsis,
        category: story.category,
        tags: story.tags,
        coverImage: story.coverImage,
        status: story.status,
      });

      setLoadingData(false);
    } catch (error) {
      console.error("Failed to fetch story:", error);
      setLoadingData(false);
    }
  }

  useEffect(() => {
    getStoryById(id);
    const storedChapters = JSON.parse(localStorage.getItem("chapters")) || [];
    setChapters(storedChapters);
  }, [id]);

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl">
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li>
              <div className="text-gray-400">Stories Management</div>
            </li>
            <li>
              <div className="text-blue-500">Story Detail</div>
            </li>
          </ul>
        </div>
        <h1>Story Detail</h1>
        <div
          onClick={() => router.push("/")}
          className="btn btn-sm rounded-full mt-4"
        >
          <IoMdArrowBack />
          Back
        </div>

        {loadingData ? (
          <div className="pt-8 text-gray-400">
            <p>Loading data ...</p>
          </div>
        ) : (
          <form className="bg-white shadow p-8 mt-8 rounded-xl">
            <div className="flex flex-col">
              <div className="flex gap-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Title</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Title"
                    disabled
                    className="input input-bordered w-full mt-4"
                    {...register("title")}
                    readOnly
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Writer Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Writer Name"
                    disabled
                    className="input input-bordered w-full mt-4"
                    {...register("writerName")}
                    readOnly
                  />
                </label>
              </div>
              <label className="form-control w-full mt-4">
                <div className="label">
                  <span className="label-text">Synopsis</span>
                </div>
                <textarea
                  className="textarea textarea-bordered w-full mt-4 text-[16px]"
                  placeholder="Synopsis"
                  disabled
                  {...register("synopsis")}
                  readOnly
                ></textarea>
              </label>
              <div className="grid grid-cols-2 gap-x-4">
                <label className="form-control w-full mt-4">
                  <div className="label">
                    <span className="label-text">Category</span>
                  </div>
                  <select
                    className="select select-bordered w-full mt-4 text-[16px]"
                    {...register("category")}
                    disabled
                  >
                    <option value="uncategorized" defaultValue="uncategorized">
                      Uncategorized
                    </option>
                    {tagOptions.map((tag, index) => (
                      <option key={index} value={tag.value}>
                        {tag.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form-control w-full mt-4">
                  <div className="label">
                    <span className="label-text mb-4">Tags/Keywords Story</span>
                  </div>
                  <Controller
                    name="tags"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <Select
                        isMulti
                        options={tagOptions}
                        className=""
                        classNamePrefix="select"
                        {...field}
                        isDisabled
                        styles={customStyles}
                      />
                    )}
                  />
                </label>
                <label className="form-control w-full mt-4">
                  <div className="label">
                    <span className="label-text">Cover Image</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Cover Image"
                    disabled
                    className="input input-bordered w-full mt-4"
                    {...register("coverImage")}
                    readOnly
                  />
                </label>
                <label className="form-control w-full mt-4">
                  <div className="label">
                    <span className="label-text">Status</span>
                  </div>
                  <select
                    className="select select-bordered w-full mt-4 text-[16px]"
                    {...register("status")}
                    disabled
                  >
                    <option value="publish" defaultValue="publish">
                      Publish
                    </option>
                    <option value="draft">Draft</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-8">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Last Updated</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {chapters.length > 0 ? (
                    chapters.map((chapter, index) => (
                      <tr key={index}>
                        <td>{chapter.title}</td>
                        <td>
                          {moment(chapter.lastUpdated).format("DD MMMM YYYY")}
                        </td>
                        <td>
                          <div className="dropdown">
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
                                    router.push(
                                      `/stories/detail/${id}/chapter/${chapter.id}`
                                    );
                                  }}
                                >
                                  Detail
                                </div>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No chapters found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
