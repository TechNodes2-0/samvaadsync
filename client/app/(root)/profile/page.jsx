import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserById } from "@/lib/actions/user.action";
import { getTimeSinceJoining } from "@/utils";
import { currentUser } from "@clerk/nextjs";

export default async function page() {
  const userid = await currentUser();
  const user = await getUserById(userid.id);
  console.log(user);

  return (
    <div className="h-full p-8 bg-gray-200">
      <div className="pb-8 bg-white rounded-lg shadow-xl">
        <div className="w-full h-[250px]">
          <Image
            src="https://i.stack.imgur.com/vhoa0.jpg"
            className="w-full h-full rounded-tl-lg rounded-tr-lg"
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col ml-10 -mt-20 items-left">
          <Image
            src={user?.picture}
            className="w-40 border-4 border-white rounded-full"
            width={100}
            height={100}
          />
          <p className="text-2xl">{user?.name}</p>

          <p className="text-gray-700">{user?.email}</p>
          <p className="text-sm text-gray-500">
            {getTimeSinceJoining(user?.joinedAt)}
          </p>
        </div>
        <div className="flex flex-col items-start justify-start flex-1 px-8 mt-2">
          <div className="flex items-center mt-2 space-x-4">
            <button className="flex items-center px-4 py-2 space-x-2 text-sm text-gray-100 transition duration-100 bg-blue-600 rounded hover:bg-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
              </svg>
              <span>Connect</span>
            </button>
            <button className="flex items-center px-4 py-2 space-x-2 text-sm text-gray-100 transition duration-100 bg-blue-600 rounded hover:bg-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col my-4 space-y-4 2xl:flex-row 2xl:space-y-0 2xl:space-x-4">
        <div className="flex flex-col w-full 2xl:w-1/3">
          <div className="flex-1 p-8 bg-white rounded-lg shadow-xl">
            <h4 className="text-xl font-bold text-gray-900">Personal Info</h4>
            <ul className="mt-2 text-gray-700">
              <li className="flex py-2 border-y">
                <span className="w-24 font-bold">Full name </span>
                <span className="text-gray-700">{user?.name}</span>
              </li>
              <li className="flex py-2 border-b">
                <span className="w-24 font-bold">Birthday:</span>
                <span className="text-gray-700">24 Jul, 1991</span>
              </li>
              <li className="flex py-2 border-b">
                <span className="w-24 font-bold">Joined:</span>
                <span className="text-gray-700">10 Jan 2022 (25 days ago)</span>
              </li>
              <li className="flex py-2 border-b">
                <span className="w-24 font-bold">Mobile:</span>
                <span className="text-gray-700">(123) 123-1234</span>
              </li>
              <li className="flex py-2 border-b">
                <span className="w-24 font-bold">Email:</span>
                <span className="text-gray-700">{user?.email}</span>
              </li>
              <li className="flex py-2 border-b">
                <span className="w-24 font-bold">Location:</span>
                <span className="text-gray-700">Vadodara India</span>
              </li>
              <li className="flex py-2 border-b">
                <span className="w-24 font-bold">Languages:</span>
                <span className="text-gray-700">English, Spanish</span>
              </li>
              <li className="flex items-center py-2 space-x-2 border-b">
                <span className="w-24 font-bold">Elsewhere:</span>
                <Link href="#" title="Facebook">
                  <svg
                    className="w-5 h-5"
                    id="Layer_1"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 506.86 506.86"
                  >
                    <path
                      className="cls-1"
                      d="M506.86,253.43C506.86,113.46,393.39,0,253.43,0S0,113.46,0,253.43C0,379.92,92.68,484.77,213.83,503.78V326.69H149.48V253.43h64.35V197.6c0-63.52,37.84-98.6,95.72-98.6,27.73,0,56.73,5,56.73,5v62.36H334.33c-31.49,0-41.3,19.54-41.3,39.58v47.54h70.28l-11.23,73.26H293V503.78C414.18,484.77,506.86,379.92,506.86,253.43Z"
                    ></path>
                    <path
                      className="cls-2"
                      d="M352.08,326.69l11.23-73.26H293V205.89c0-20,9.81-39.58,41.3-39.58h31.95V104s-29-5-56.73-5c-57.88,0-95.72,35.08-95.72,98.6v55.83H149.48v73.26h64.35V503.78a256.11,256.11,0,0,0,79.2,0V326.69Z"
                    ></path>
                  </svg>
                </Link>
                <a href="#" title="Twitter">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 333333 333333"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path
                      d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm90493 110539c-6654 2976-13822 4953-21307 5835 7669-4593 13533-11870 16333-20535-7168 4239-15133 7348-23574 9011-6787-7211-16426-11694-27105-11694-20504 0-37104 16610-37104 37101 0 2893 320 5722 949 8450-30852-1564-58204-16333-76513-38806-3285 5666-5022 12109-5022 18661v4c0 12866 6532 24246 16500 30882-6083-180-11804-1876-16828-4626v464c0 17993 12789 33007 29783 36400-3113 845-6400 1313-9786 1313-2398 0-4709-247-7007-665 4746 14736 18448 25478 34673 25791-12722 9967-28700 15902-46120 15902-3006 0-5935-184-8860-534 16466 10565 35972 16684 56928 16684 68271 0 105636-56577 105636-105632 0-1630-36-3209-104-4806 7251-5187 13538-11733 18514-19185l17-17-3 2z"
                      fill="#1da1f2"
                    ></path>
                  </svg>
                </a>
                <Link href="#" title="LinkedIn">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 333333 333333"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path
                      d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm-18220 138885h28897v14814l418 1c4024-7220 13865-14814 28538-14814 30514-1 36157 18989 36157 43691v50320l-30136 1v-44607c0-10634-221-24322-15670-24322-15691 0-18096 11575-18096 23548v45382h-30109v-94013zm-20892-26114c0 8650-7020 15670-15670 15670s-15672-7020-15672-15670 7022-15670 15672-15670 15670 7020 15670 15670zm-31342 26114h31342v94013H96213v-94013z"
                      fill="#0077b5"
                    ></path>
                  </svg>
                </Link>
                <Link href="#" title="Github">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="0"
                    height="0"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 640 640"
                  >
                    <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col w-full 2xl:w-2/3">
          <div className="flex-1 p-8 bg-white rounded-lg shadow-xl">
            <h4 className="text-xl font-bold text-gray-900">About</h4>
            <p className="mt-2 text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              voluptates obcaecati numquam error et ut fugiat asperiores. Sunt
              nulla ad incidunt laboriosam, laudantium est unde natus cum
              numquam, neque facere. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Ut, magni odio magnam commodi sunt ipsum eum!
              Voluptas eveniet aperiam at maxime, iste id dicta autem odio
              laudantium eligendi commodi distinctio!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
